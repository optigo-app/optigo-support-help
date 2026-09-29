import imageCompression from "browser-image-compression";

export async function compressImagesToWebP(files, customOptions = {}) {
  const inputFiles = Array.isArray(files) ? files : [files];

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: "image/webp",
    initialQuality: 0.8,
    ...customOptions,
  };

  const results = [];

  for (const file of inputFiles) {
    if (!file?.type?.startsWith("image/")) continue;

    try {
      const compressedFile = await imageCompression(file, options);

      results.push({
        id: `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        originalName: file.name,
        originalSize: file.size,
        compressedName: file.name.replace(/\.[^/.]+$/, "") + ".webp",
        compressedSize: compressedFile.size,
        blob: compressedFile,
        previewUrl: URL.createObjectURL(compressedFile),
      });
    } catch (err) {
      console.warn("Failed to compress image, using original:", err);
      results.push({
        id: `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        originalName: file.name,
        originalSize: file.size,
        compressedName: file.name,
        compressedSize: file.size,
        blob: file,
        previewUrl: URL.createObjectURL(file),
      });
    }
  }

  return results;
}
