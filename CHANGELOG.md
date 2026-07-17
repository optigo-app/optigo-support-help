# Change Log

All notable changes to this project will be documented in this file.

## [Unreleased] - 2026-04-25

### Fixed
- `src/constants/faqData.js`:
    - **Safe Grouping**: Replaced `Object.groupBy` with `reduce` to ensure compatibility and prevent potential runtime errors if the environment lacks support for ES2024 features.
    - **Null Safety**: Added null/undefined checks for `FaqList` before grouping.
- `src/modules/components/Delivery&Training/context/DeliveryProvider.js`:
    - **Robust Employee Grouping**: Hardened `EMPLOYEE_GROUP_BY_DESIGNATION` logic to use `reduce` and ensure a stable object is always returned.
- `src/modules/context/UseCallLog.js`:
    - **Robust Department Names**: Replaced `Object.groupBy` with `reduce` for grouping employees by designation, adding fallback for missing designation values.

### Reason
- Protect application against potential `Object.groupBy` compatibility issues and ensure stable object handling as requested by the user.

## [Unreleased] - 2026-04-23

### Updated
- `src/components/video help/HelpArticle.js`:
    - **Language Selection UI**: Refined the language selection prompt overlay with a more modern, balanced design.
    - **Uniform Cards**: Changed language buttons into uniform 180x180 square cards with fixed dimensions for better visual consistency.
    - **Enhanced Aesthetics**: Improved glassmorphism effects (increased blur and opacity), added shadow depth, and implemented dynamic scaling/rotation animations on hover for a premium feel.

### Reason
- Improve visual balance and professional appearance of the initial language selection step as requested by the user.

## [Unreleased] - 2026-04-10

### Fixed
- `src/components/video help/index.js`:
    - **IconButton import crash**: `IconButton` was imported from `yet-another-react-lightbox` causing `useLightboxProps must be used within a LightboxPropsContext.Provider` runtime error. Moved import to `@mui/material`.
    - **Garbled sidebar section headers**: MUI `ListSubheader` defaults to `position: sticky`, which caused overlapping/garbled text inside the already-sticky, overflow-scrolling sidebar. Added `position: 'relative'` to fix rendering.

- `src/components/video help/help.aspx`:
    - **Product Making Guide opens in new window**: Both `PageUselog` functions (local and `window.PageUselog`) now intercept "Product Making Guide", "Estimate", "Sales Counter", and "Employee Wise Issue Wt" titles and open them via `window.open(url, '_blank')` instead of loading in the same tab. The `addTab` function already had this guard, but `PageUselog` (called from the left menu sidebar) did not.
    - **Fixed undefined variable bug**: Both `PageUselog` functions referenced `lnk` (undefined) instead of `pagename_url` in the `indexOf("?")` check.

### Reason
- IconButton crash prevented the help page from rendering.
- Garbled text made sidebar section headings unreadable.
- Product Making Guide needed to open externally per user requirement.

## [Unreleased] - 2026-04-02

### Added
- `corpForgotPassword` method to `AuthController` in `src/apis/AuthController.js`.
- `corpResetPassword` method to `AuthController` in `src/apis/AuthController.js`.

### Updated
- `src/apis/AuthController.js`:
    - Refactored `_post` helper to accept optional request configuration.
    - Added `version: "R50B3"` header override EXCLUSIVELY to corporate methods (`corpForgotPassword`, `corpResetPassword`).
- `src/components/Auth_Ui/ChangePassword.jsx`:
    - Integrated `tt` (token) from URL query parameters.
    - Switched from `changePassword` to `corpResetPassword` API.
    - Enhanced response handling to support `stat` and `stat_msg` fields for accurate error reporting (e.g., expired links).
    - Added conditional rendering to only display UI when a valid `tt` token is present.
    - Removed redundant double encryption in `handleSubmit`.

### Reason
- Integration of corporate forgot password and reset password APIs as per user requirements.
