export const parseHelpUrl = (pathname, search) => {
  // Extract everything after '/help'
  const helpIndex = pathname.toLowerCase().indexOf("/help");
  const rawPath = helpIndex !== -1 ? pathname.slice(helpIndex + "/help".length) : "";

  // Split into segments and filter out empty strings
  const pathSegments = rawPath.split("/").filter(Boolean);

  // Parse query params normally
  const searchParams = new URLSearchParams(search);
  const queryParams = {};

  for (const [key, value] of searchParams.entries()) {
    // If value contains slashes, optionally split it too
    queryParams[key] = value.includes("/") ? value.split("/") : value;
  }

  return {
    raw: rawPath,
    segments: pathSegments,
    query: queryParams,
  };
};