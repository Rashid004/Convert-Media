/** @format */

import sharp from "sharp";

interface ImageConversionOptions {
  format: "webp" | "png" | "jpg" | "avif" | "jpeg" | "tiff";
  quality?: number;
}

export const convertImage = async (
  inputBuffer: Buffer,
  options: ImageConversionOptions
): Promise<Buffer> => {
  const { format, quality } = options;

  let sharpInstance = sharp(inputBuffer);

  switch (format) {
    case "webp":
      return sharpInstance.webp({ quality }).toBuffer();
    case "png":
      return sharpInstance.png({ quality }).toBuffer();
    case "jpg":
      return sharpInstance.jpeg({ quality }).toBuffer();
    case "avif":
      return sharpInstance.avif({ quality }).toBuffer();
    case "jpeg":
      return sharpInstance.jpeg({ quality }).toBuffer();
    case "tiff":
      return sharpInstance.tiff({ quality }).toBuffer();
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
};
