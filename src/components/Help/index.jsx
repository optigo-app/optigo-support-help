import { useEffect, useMemo, useState } from "react";
import { Box, Container } from "@mui/material";
import HelpFaqmModal from "./HelpFaqmModal";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import { Category, FaqList } from "../../constants/faqData";
import QuickGuide from "./QuickGuide";
import HelpTopicGrid from "./HelpTopicGrid";
import FeatureSection from "./FeatureSection";
import "./default.css";
import HelpHero from "./HelpHero";
import { searchFAQ } from "../../utils/Filtering";

const Main = ({ faqPathInfo }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [expanded, setExpanded] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [images, setImages] = useState([]);

    const showMore = faqPathInfo.query?.show_more;
    const showSearchResults = faqPathInfo.query?.query;

    useEffect(() => {
        if (showSearchResults) {
            setSearchQuery(showSearchResults);
        }
    }, [showSearchResults]);

    const showOnlyFaq = typeof showMore === "string" ? ["1", "true"].includes(showMore.toLowerCase()) : Boolean(showMore);

    const activeSearchQuery = showSearchResults || searchQuery;
    console.log("🚀 ~ Main ~ activeSearchQuery:", activeSearchQuery)
    const hasActiveSearch = activeSearchQuery && activeSearchQuery.trim().length > 0;

    const handleImageClick = (src) => {
        const allImages = getAllImagesFromFaqs(FaqList);
        const index = allImages.findIndex((img) => img.src === src);
        setImages(allImages);
        setLightboxIndex(index >= 0 ? index : 0);
        setOpen(true);
    };

    const getAllImagesFromFaqs = (faqList) => {
        const parser = new DOMParser();
        const all = [];
        FaqList?.forEach((faq) => {
            const doc = parser.parseFromString(faq.answer, "text/html");
            doc.querySelectorAll("img").forEach((img) => {
                all.push({ src: img.src, title: img?.alt, alt: img?.alt });
            });
        });
        return all;
    };

    const attachImageClickHandlers = (html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        doc.querySelectorAll("img").forEach((img) => {
            img.style.cursor = "zoom-in";
            img.onclick = (e) => {
                e.preventDefault();
                handleImageClick(img.src);
            };
        });
        return { __html: doc.body.innerHTML };
    };

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedCategory(null);
    };



    const SearchResults = useMemo(() => {
        if (!hasActiveSearch) {
            return {
                success: false,
                results: [],
                totalResults: 0,
                searchTime: 0,
                error: null,
            };
        }

        try {
            const res = searchFAQ(FaqList, activeSearchQuery.trim());
            if (!res.success && res.error === "Query must be a non-empty string") {
                return {
                    success: false,
                    results: [],
                    totalResults: 0,
                    searchTime: 0,
                    error: "Please enter a search query",
                };
            }

            return res;
        } catch (error) {
            console.error("Search error:", error);
            return {
                success: false,
                results: [],
                totalResults: 0,
                searchTime: 0,
                error: "An error occurred while searching",
            };
        }
    }, [activeSearchQuery, hasActiveSearch, searchQuery]);

    const faqDataToShow = hasActiveSearch ? SearchResults.results : FaqList;
    const shouldShowOtherComponents = !showOnlyFaq && !hasActiveSearch;

    return (
        <>
            <Box sx={{ backgroundColor: "#fff", minHeight: "100vh" }}>
                <HelpHero setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
                <Container maxWidth="lg" sx={{ py: 6 }}>
                    {shouldShowOtherComponents && (
                        <>
                            <FeatureSection />
                            <HelpTopicGrid handleCategoryClick={handleCategoryClick} />
                        </>
                    )}
                    <QuickGuide
                        queryWords={hasActiveSearch && [...new Set(activeSearchQuery.split(' '))]}
                        faqData={faqDataToShow} showTitle={!showOnlyFaq} shouldShowOtherComponents={shouldShowOtherComponents} SearchResults={SearchResults} attachImageClickHandlers={attachImageClickHandlers} handleImageClick={handleImageClick} expanded={expanded} handleChange={handleChange} searchResults={hasActiveSearch ? SearchResults : null} searchQuery={activeSearchQuery} isSearchActive={hasActiveSearch} />
                </Container>
            </Box>

            <Lightbox open={open} close={() => setOpen(false)} slides={images} index={lightboxIndex} zoom={{ maxZoomPixelRatio: 4 }} plugins={[Zoom, Captions]} />

            {selectedCategory && modalOpen && <HelpFaqmModal attachImageClickHandlers={attachImageClickHandlers} handleImageClick={handleImageClick} open={modalOpen} onClose={handleCloseModal} category={selectedCategory} faqs={Category[selectedCategory] || []} />}
        </>
    );
};

export default Main;
