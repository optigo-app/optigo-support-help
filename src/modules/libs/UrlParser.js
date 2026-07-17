import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string";

// Encrypt (for URL-safe link)
export const encrypt = (value) => {
  if (!value) return "";
  return compressToEncodedURIComponent(String(value));
};

// Decrypt
export const decrypt = (value) => {
  if (!value) return "";
  return decompressFromEncodedURIComponent(value);
};
