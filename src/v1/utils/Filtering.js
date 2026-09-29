
/**
 * Fast and efficient FAQ search function
 * @param {Array} faqData - Array of FAQ objects
 * @param {string} query - Search query string
 * @param {Object} options - Search options
 * @returns {Object} - Search result object with success status and results
 */
function searchFAQ(faqData, query, options = {}) {
    const startTime = performance.now();

    // Default options
    const {
        caseSensitive = false,
        exactMatch = false,
        searchFields = ['question', 'answer', 'category', 'tags'],
        maxResults = 10,
        highlightMatches = false
    } = options;

    // Input validation
    if (!Array.isArray(faqData)) {
        return {
            success: false,
            error: "FAQ data must be an array",
            results: [],
            totalResults: 0,
            searchTime: 0
        };
    }

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
        return {
            success: false,
            error: "Query must be a non-empty string",
            results: [],
            totalResults: 0,
            searchTime: 0
        };
    }

    // Normalize query
    const normalizedQuery = caseSensitive ? query.trim() : query.trim().toLowerCase();
    const queryWords = normalizedQuery.split(/\s+/).filter(word => word.length > 0);

    if (queryWords.length === 0) {
        return {
            success: false,
            error: "Query contains no valid search terms",
            results: [],
            totalResults: 0,
            searchTime: 0
        };
    }

    // Helper function to strip HTML tags
    const stripHtml = (html) => {
        return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    };

    // Helper function to normalize text for searching
    const normalizeText = (text) => {
        const cleaned = typeof text === 'string' ? stripHtml(text) : String(text);
        return caseSensitive ? cleaned : cleaned.toLowerCase();
    };

    // Helper function to check if text matches query
    const textMatches = (text, scoreMultiplier = 1) => {
        const normalizedText = normalizeText(text);

        if (exactMatch) {
            return normalizedText.includes(normalizedQuery) ? scoreMultiplier : 0;
        }

        // Calculate match score based on word matches
        let score = 0;
        let matchedWords = 0;

        queryWords.forEach(word => {
            if (normalizedText.includes(word)) {
                matchedWords++;
                // Bonus for exact word boundaries
                const wordBoundaryRegex = new RegExp(`\\b${word}\\b`, caseSensitive ? 'g' : 'gi');
                const exactMatches = (normalizedText.match(wordBoundaryRegex) || []).length;
                score += exactMatches > 0 ? 2 : 1;
            }
        });

        // Bonus for matching all words
        if (matchedWords === queryWords.length) {
            score *= 1.5;
        }

        return score * scoreMultiplier;
    };

    // Search through FAQ items
    const results = [];

    faqData.forEach((item, index) => {
        let totalScore = 0;
        const matchDetails = {};

        // Search in different fields with different weights
        if (searchFields.includes('question') && item.question) {
            const score = textMatches(item.question, 3); // Higher weight for question matches
            totalScore += score;
            if (score > 0) matchDetails.question = true;
        }

        if (searchFields.includes('category') && item.category) {
            const score = textMatches(item.category, 2.5); // High weight for category matches
            totalScore += score;
            if (score > 0) matchDetails.category = true;
        }

        if (searchFields.includes('tags') && item.tags && Array.isArray(item.tags)) {
            let tagScore = 0;
            item.tags.forEach(tag => {
                const score = textMatches(tag, 2); // High weight for tag matches
                tagScore += score;
            });
            totalScore += tagScore;
            if (tagScore > 0) matchDetails.tags = true;
        }

        if (searchFields.includes('answer') && item.answer) {
            const score = textMatches(item.answer, 1); // Lower weight for answer matches
            totalScore += score;
            if (score > 0) matchDetails.answer = true;
        }

        // If there's a match, add to results
        if (totalScore > 0) {
            const result = {
                ...item,
                _searchScore: totalScore,
                _matchedFields: matchDetails,
                _originalIndex: index
            };

            // Add highlighting if requested
            if (highlightMatches) {
                result._highlighted = {
                    question: highlightText(item.question || '', queryWords, caseSensitive),
                    answer: highlightText(stripHtml(item.answer || ''), queryWords, caseSensitive),
                    category: highlightText(item.category || '', queryWords, caseSensitive)
                };
            }

            results.push(result);
        }
    });

    // Sort by relevance score (descending)
    results.sort((a, b) => b._searchScore - a._searchScore);

    // Limit results if specified
    const limitedResults = maxResults > 0 ? results.slice(0, maxResults) : results;

    const endTime = performance.now();
    const searchTime = Math.round((endTime - startTime) * 1000) / 1000; // Round to 3 decimal places

    return {
        success: true,
        results: limitedResults,
        totalResults: results.length,
        searchTime: searchTime,
        query: query,
        queryWords: queryWords
    };
}
function highlightText(text, queryWords, caseSensitive) {
    if (!text || !queryWords.length) return text;

    let highlightedText = text;
    queryWords.forEach(word => {
        const regex = new RegExp(`(${word})`, caseSensitive ? 'g' : 'gi');
        highlightedText = highlightedText.replace(regex, '<mark>$1</mark>');
    });
    return highlightedText;
}
function fuzzySearchFAQ(faqData, query, options = {}) {
    // First try exact search
    const exactResults = searchFAQ(faqData, query, options);

    if (exactResults.results.length > 0) {
        return exactResults;
    }

    // If no exact results, try fuzzy matching
    const fuzzyOptions = {
        ...options,
        exactMatch: false
    };

    // Try with individual words if multi-word query failed
    const queryWords = query.trim().split(/\s+/);
    if (queryWords.length > 1) {
        const combinedResults = new Map();

        queryWords.forEach(word => {
            if (word.length > 2) { // Skip very short words
                const wordResults = searchFAQ(faqData, word, fuzzyOptions);
                wordResults.results.forEach(result => {
                    const key = result.id;
                    if (combinedResults.has(key)) {
                        combinedResults.get(key)._searchScore += result._searchScore * 0.5;
                    } else {
                        result._searchScore *= 0.7; // Reduce score for partial matches
                        combinedResults.set(key, result);
                    }
                });
            }
        });

        const fuzzyResults = Array.from(combinedResults.values())
            .sort((a, b) => b._searchScore - a._searchScore);

        return {
            success: true,
            results: fuzzyResults.slice(0, options.maxResults || 10),
            totalResults: fuzzyResults.length,
            searchTime: exactResults.searchTime,
            query: query,
            queryWords: queryWords,
            fuzzyMatch: true
        };
    }

    return exactResults;
}


export  {
    searchFAQ,
    fuzzySearchFAQ ,
    highlightText
};