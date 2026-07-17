// ─────────────────────────────────────────────────────────────────────────────
// TrainingData.js – Optigo Jewellery ERP Training Video Data
// Roles: Wholesaler (JSON-driven), Retailer, Factory (sample data)
//
// CHANGELOG 2026-05-02:
//   - Wholesaler menuData now generated from Wholesaler.json via buildMenuDataFromJson.
//   - Only modules with real YouTube links are displayed (filter in utility).
//   - Retailer and Factory remain sample data (unchanged).
//   - Future categories: add JSON file + call buildMenuDataFromJson with new prefix.
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

import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import DiamondRoundedIcon from '@mui/icons-material/DiamondRounded';
import PointOfSaleRoundedIcon from '@mui/icons-material/PointOfSaleRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';

import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import BalanceRoundedIcon from '@mui/icons-material/BalanceRounded';
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';
import FactCheckRoundedIcon from '@mui/icons-material/FactCheckRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import InsertChartRoundedIcon from '@mui/icons-material/InsertChartRounded';

import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded';
import PrecisionManufacturingRoundedIcon from '@mui/icons-material/PrecisionManufacturingRounded';

// Wholesaler & Factory JSON data + builder utility
import WholesalerJSON from '../../utils/help_utils/data/Wholesaler.json';
import FactoryJSON from '../../utils/help_utils/data/factory.json';
import { buildMenuDataFromJson } from '../../utils/help_utils/wholesalerUtils';

// Helper: generate a slug from a title
export const toSlug = (str) =>
    str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// ─────────────────────────────────────────────────────────────────────────────
// WHOLESALER – driven by Wholesaler.json (only modules with YouTube links shown)
// ─────────────────────────────────────────────────────────────────────────────
const wholesalerMenuData = buildMenuDataFromJson(WholesalerJSON, 'wh');



// ─────────────────────────────────────
// RETAILER – sample data
// ─────────────────────────────────────
const retailerMenuData = [
    {
        section: 'Getting Started',
        icon: <RocketLaunchRoundedIcon fontSize="small" />,
        items: [
            { id: 're-1', title: 'Retailer Dashboard Overview', slug: 'retailer-dashboard', duration: '5:00', views: '18K', youtubeId: 'ScMzIvxBSi4', desc: 'A quick tour of the retailer dashboard: daily sales, pending orders, and stock alerts.' },
            { id: 're-2', title: 'Store Setup & Branding', slug: 'store-setup-branding', duration: '6:30', views: '11K', youtubeId: 'dQw4w9WgXcQ', desc: 'Configure your store logo, theme colour, address and GST details.' },
            { id: 're-3', title: 'Staff & Role Management', slug: 'staff-role-management', duration: '4:45', views: '7.3K', youtubeId: 'vjVkiyKr3Dg', desc: 'Create staff accounts and assign counter-level access roles.' },
        ],
    },
    {
        section: 'Product Catalogue',
        icon: <DiamondRoundedIcon fontSize="small" />,
        items: [
            { id: 're-4', title: 'Adding Products', slug: 'adding-products', duration: '7:10', views: '9.6K', youtubeId: 'dQw4w9WgXcQ', desc: 'Add new jewellery products with images, weight, making charges and taxes.' },
            { id: 're-5', title: 'Category & Collection Setup', slug: 'category-collection', duration: '4:20', views: '6.2K', youtubeId: 'ScMzIvxBSi4', desc: 'Organise products into categories and seasonal collections.' },
            { id: 're-6', title: 'Pricing & Margin Rules', slug: 'pricing-margin-rules', duration: '5:55', views: '8.4K', youtubeId: 'vjVkiyKr3Dg', desc: 'Set dynamic pricing based on live metal rates and margin rules.' },
        ],
    },
    {
        section: 'Point of Sale',
        icon: <PointOfSaleRoundedIcon fontSize="small" />,
        items: [
            { id: 're-7', title: 'Creating a Sale (POS)', slug: 'creating-sale-pos', duration: '8:30', views: '22K', youtubeId: 'dQw4w9WgXcQ', desc: 'Walk through a complete sale on the POS counter including exchange and discount.' },
            { id: 're-8', title: 'Sale Return & Exchange', slug: 'sale-return-exchange', duration: '5:15', views: '12K', youtubeId: 'ScMzIvxBSi4', desc: 'Process customer returns and old gold exchange at the counter.' },
            { id: 're-9', title: 'Bills & Receipts Print', slug: 'bills-receipts-print', duration: '3:40', views: '9.1K', youtubeId: 'vjVkiyKr3Dg', desc: 'Print GST invoices, receipts and hallmark certificates from the POS.' },
        ],
    },
    {
        section: 'Customer Management',
        icon: <PeopleAltRoundedIcon fontSize="small" />,
        items: [
            { id: 're-10', title: 'Customer Profiles & KYC', slug: 'customer-profiles-kyc', duration: '5:50', views: '7.8K', youtubeId: 'dQw4w9WgXcQ', desc: 'Create customer profiles, upload KYC documents and manage loyalty points.' },
            { id: 're-11', title: 'Layaway / Advance Orders', slug: 'layaway-advance-orders', duration: '6:25', views: '5.4K', youtubeId: 'ScMzIvxBSi4', desc: 'Set up advance bookings and track partial payment schedules.' },
        ],
    },
    {
        section: 'Inventory & Stock',
        icon: <Inventory2RoundedIcon fontSize="small" />,
        items: [
            { id: 're-12', title: 'Stock Audit', slug: 'stock-audit', duration: '7:00', views: '6.7K', youtubeId: 'vjVkiyKr3Dg', desc: 'Run physical stock audits and reconcile with system inventory.' },
            { id: 're-13', title: 'Reorder & Purchase', slug: 'reorder-purchase', duration: '5:10', views: '4.9K', youtubeId: 'dQw4w9WgXcQ', desc: 'Set reorder points and raise purchase orders to your suppliers.' },
        ],
    },
    {
        section: 'Reports & Accounts',
        icon: <BarChartRoundedIcon fontSize="small" />,
        items: [
            { id: 're-14', title: 'Daily & Monthly Sales Reports', slug: 'sales-reports', duration: '4:35', views: '11K', youtubeId: 'ScMzIvxBSi4', desc: 'Generate and export daily, weekly and monthly sales reports.' },
            { id: 're-15', title: 'GST Reports & Filing', slug: 'gst-reports', duration: '6:00', views: '8.2K', youtubeId: 'vjVkiyKr3Dg', desc: 'Prepare GSTR-1 and GSTR-3B data exports for tax filing.' },
            { id: 're-16', title: 'Cash & Bank Ledger', slug: 'cash-bank-ledger', duration: '4:50', views: '6.5K', youtubeId: 'dQw4w9WgXcQ', desc: 'Track daily cash flow and reconcile with bank statements.' },
        ],
    },
];

// ─────────────────────────────────────
// FACTORY – driven by factory.json
// ─────────────────────────────────────
const factoryMenuData = buildMenuDataFromJson(FactoryJSON, 'fa');

// ─────────────────────────────────────
// ROLE CONFIG (used for landing page)
// ─────────────────────────────────────
export const ROLES = [
    {
        key: 'wholesaler',
        label: 'Wholesaler',
        subtitle: 'B2B Trading & Distribution',
        description: 'Full ERP training covering customer management, sales CRM, inventory, vendor operations and accounts for wholesale jewellery businesses.',
        icon: <StorefrontRoundedIcon fontSize="small" />,
        gradient: 'linear-gradient(135deg, #6D28D9 0%, #8B5CF6 60%, #A78BFA 100%)',
        accentColor: '#7C3AED',
        lightBg: '#F5F3FF',
        hasSections: true,
        totalVideos: wholesalerMenuData.reduce((a, s) => a + s.items.length, 0),
        menuData: wholesalerMenuData,
    },
    {
        key: 'retailer',
        label: 'Retailer',
        subtitle: 'Counter Sales & POS',
        description: 'Comprehensive training for retail jewellery shops covering POS, product catalogue, customer management, and GST reporting.',
        icon: <ShoppingBagRoundedIcon fontSize="small" />,
        gradient: 'linear-gradient(135deg, #0369A1 0%, #0EA5E9 60%, #38BDF8 100%)',
        accentColor: '#0284C7',
        lightBg: '#F0F9FF',
        hasSections: true,
        totalVideos: retailerMenuData.reduce((a, s) => a + s.items.length, 0),
        menuData: retailerMenuData,
    },
    {
        key: 'factory',
        label: 'Factory',
        subtitle: 'Manufacturing & Production',
        description: 'End-to-end factory management training covering job orders, karigar wages, material control, quality control and production reports.',
        icon: <PrecisionManufacturingRoundedIcon fontSize="small" />,
        gradient: 'linear-gradient(135deg, #B45309 0%, #D97706 60%, #FBBF24 100%)',
        accentColor: '#D97706',
        lightBg: '#FFFBEB',
        hasSections: true,
        totalVideos: factoryMenuData.reduce((a, s) => a + s.items.length, 0),
        menuData: factoryMenuData,
    },
];

// Helper: get all items flat for a role
export const getAllItemsForRole = (roleKey) => {
    const role = ROLES.find((r) => r.key === roleKey);
    if (!role) return [];
    return role.menuData.flatMap((section) => section.items);
};

// Helper: find item by slug within a role
export const findItemBySlug = (roleKey, slug) => {
    return getAllItemsForRole(roleKey).find((item) => item.slug === slug) || null;
};

// Helper: get recommended videos (same role, excluding current)
export const getRecommended = (roleKey, currentSlug, count = 4) => {
    return getAllItemsForRole(roleKey)
        .filter((item) => item.slug !== currentSlug)
        .slice(0, count);
};
