// ─────────────────────────────────────────────────────────────────────────────
// wholesalerUtils.js
// Transforms raw JSON category data (Wholesaler.json, etc.) into the
// grouped section/items format used by TrainingData.js and HelpCenter.
//
// CHANGELOG 2026-05-02:
//   - Created to replace hardcoded TrainingData for the Wholesaler role.
//   - Filters: only modules WITH at least one real YouTube link are shown.
//   - Stores both English + Hindi YouTube IDs per item for the video player.
//   - Extensible: pass any future category JSON + a role prefix to reuse.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import FolderSpecialRoundedIcon from '@mui/icons-material/FolderSpecialRounded';
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import FactoryRoundedIcon from '@mui/icons-material/FactoryRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import PrecisionManufacturingRoundedIcon from '@mui/icons-material/PrecisionManufacturingRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { trainingFlowFlat } from './trainingFlowFlat';

// ─── Icon map: section name → MUI icon ───────────────────────────────────────
// Add new section names here as new categories / modules are onboarded.
const SECTION_ICON_MAP = {
    'User': <PersonRoundedIcon fontSize="small" />,
    'Masters & Policy': <FolderSpecialRoundedIcon fontSize="small" />,
    'PD': <PaletteRoundedIcon fontSize="small" />,
    'Sales CRM': <BusinessCenterRoundedIcon fontSize="small" />,
    'Books Keeping': <MenuBookRoundedIcon fontSize="small" />,
    'Inventory': <InventoryRoundedIcon fontSize="small" />,
    'Vendor': <FactoryRoundedIcon fontSize="small" />,
    'Account': <AccountBalanceWalletRoundedIcon fontSize="small" />,
    'Manufacturing': <PrecisionManufacturingRoundedIcon fontSize="small" />,
    'Company Details Setup': <SettingsRoundedIcon fontSize="small" />,
    'FAQ': <QuestionAnswerRoundedIcon fontSize="small" />,
};

/**
 * Extract YouTube video ID from a youtu.be or youtube.com URL.
 * Returns null if no valid ID is found.
 *
 * Supports:
 *   - https://youtu.be/XXXXXXXXXXX
 *   - https://www.youtube.com/watch?v=XXXXXXXXXXX
 */
export const extractYouTubeId = (url) => {
    if (!url || typeof url !== 'string') return null;
    // Short URL format
    const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{6,15})/);
    if (shortMatch) return shortMatch[1];
    // Long URL format
    const longMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{6,15})/);
    if (longMatch) return longMatch[1];
    return null;
};

/**
 * Generate a URL-safe slug from any string.
 * e.g. "Advance Price Policy" → "advance-price-policy"
 */
export const toSlug = (str) =>
    String(str)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

/**
 * Auto-generate a short description for a module.
 * Used when no manual description is provided in the JSON.
 */
const autoDesc = (moduleName, sectionName, hasSections = true) => {
    if (!hasSections) {
        return `Learn how to use ${moduleName} in Optigo ERP.`;
    }
    return `Learn how to use ${moduleName} in the ${sectionName} section of Optigo ERP.`;
};

/**
 * Transform a raw JSON category array (e.g. Wholesaler.json) into the
 * grouped section/items structure expected by TrainingData ROLES.
 *
 * Rules:
 *  - Only modules with at least one YouTube link (english OR hindi) are included.
 *  - Items are grouped by their "section" field.
 *  - Each item stores both youtubeIdEnglish and youtubeIdHindi when available.
 *  - youtubeId (primary) is used for card thumbnails; defaults to English, falls back to Hindi.
 *
 * @param {Array}  jsonData   — Raw array from the JSON file (e.g. Wholesaler.json)
 * @param {string} rolePrefix — Short prefix for generated item IDs (e.g. 'wh')
 * @returns {Array} menuData array compatible with TrainingData ROLES structure
 */
export const buildMenuDataFromJson = (jsonData, rolePrefix = 'item') => {
    if (!Array.isArray(jsonData) || jsonData.length === 0) return [];

    // Check if the data has any section
    const hasSections = jsonData.some(item => item.section !== null && item.section !== undefined && item.section !== '');
    const defaultSection = rolePrefix === 'fa' ? 'Factory' : 'Other';

    // ── 1. Filter: keep only modules that have at least one YouTube video ─────
    const withVideos = jsonData.filter((item) => {
        const enId = extractYouTubeId(item.youtube?.english);
        const hiId = extractYouTubeId(item.youtube?.hindi);
        return enId !== null || hiId !== null;
    });

    const normalize = (s) => String(s).toLowerCase().replace(/[^a-z0-9]/g, '');
    const getItemOrder = (item) => {
        const itemModule = normalize(item.module);
        const itemSection = item.section ? normalize(item.section) : '';
        
        const found = trainingFlowFlat.find(tf => {
            const tfModule = normalize(tf.module);
            const tfSection = normalize(tf.section);
            if (itemSection && tfModule !== itemSection) return false;
            return tfSection.includes(itemModule) || itemModule.includes(tfSection);
        });
        
        return found ? found.order : 999;
    };

    withVideos.forEach(item => {
        item._order = getItemOrder(item);
    });

    withVideos.sort((a, b) => a._order - b._order);

    const sectionMap = new Map();
    withVideos.forEach((item) => {
        const section = (hasSections ? (item.section || 'Other') : defaultSection).trim();
        if (!sectionMap.has(section)) sectionMap.set(section, []);
        sectionMap.get(section).push(item);
    });

    const sectionsArray = Array.from(sectionMap.entries()).map(([sectionName, items]) => {
        const minOrder = Math.min(...items.map(i => i._order));
        const sectionHindi = items.find(i => i.sectionHindi)?.sectionHindi || sectionName;
        return {
            section: sectionName,
            sectionHindi: sectionHindi,
            _minOrder: minOrder,
            icon: SECTION_ICON_MAP[sectionName] || <FolderRoundedIcon fontSize="small" />,
            items: items.map((item) => {
                const enId = extractYouTubeId(item.youtube?.english);
                const hiId = extractYouTubeId(item.youtube?.hindi);
                const primaryId = enId || hiId;

                const displayTitle = item.module;
                const displayTitleHindi = item.moduleHindi || item.module;
                const displaySectionHindi = item.sectionHindi || sectionHindi;

                return {
                    id: `${rolePrefix}-json-${item.srNo}`,
                    title: displayTitle,
                    titleHindi: displayTitleHindi,
                    slug: toSlug(item.module),
                    youtubeId: primaryId,
                    youtubeIdEnglish: enId,   
                    youtubeIdHindi: hiId,     
                    section: sectionName,
                    sectionHindi: displaySectionHindi,
                    desc: autoDesc(item.module, sectionName, hasSections),
                    descHindi: `ऑप्टिगो ईआरपी के ${displaySectionHindi} सेक्शन में ${displayTitleHindi} का उपयोग करना सीखें।`,
                };
            }),
        };
    });

    sectionsArray.sort((a, b) => a._minOrder - b._minOrder);

    return sectionsArray.map(s => {
        const { _minOrder, ...rest } = s;
        return rest;
    });
};
