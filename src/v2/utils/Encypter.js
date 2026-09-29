import CryptoJS from "crypto-js";

// Hash with SHA-1
export const hashSHA1 = (plainText) => {
  return CryptoJS.SHA1(plainText).toString(CryptoJS.enc.Hex);
};

// Verify SHA-1
export const verifySHA1 = (plainText, hash) => {
  return hashSHA1(plainText) === hash;
};

