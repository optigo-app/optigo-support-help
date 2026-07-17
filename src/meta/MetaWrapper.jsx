import { Helmet } from "react-helmet-async";
import { META_CONFIG } from "./index";

const MetaWrapper = ({ page, title, description }) => {
  if (!page) return null;
  const meta = META_CONFIG[page] || META_CONFIG?.NotFound;
  const displayTitle = title || meta?.title;
  const displayDescription = description || meta?.description;
  return (
    <Helmet>
      <title>{displayTitle}</title>
      <meta name="description" content={displayDescription} />
      <meta name="keywords" content={meta?.keywords} />
      <meta property="og:title" content={displayTitle} />
      <meta property="og:description" content={displayDescription} />
      <meta property="og:site_name" content="Optifo Central System" />
      <meta name="twitter:title" content={displayTitle} />
      <meta name="twitter:description" content={displayDescription} />
    </Helmet>
  );
};

export default MetaWrapper;
