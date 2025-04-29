/** @format */

import React, { useEffect, useState } from "react";
import { convertImage, ImageConversionOptions } from "../utils";

interface ConvertMediaProps {
  children: React.ReactElement;
  format?: "webp" | "png" | "jpg" | "avif";
  quality?: number;
}

export const ConvertMedia: React.FC<ConvertMediaProps> = ({
  children,
  format = "webp",
  quality = 80,
}) => {
  const [convertedSrc, setConvertedSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!React.isValidElement(children)) {
      console.error("ConvertMedia expects an img or video as its child");
      return;
    }

    const child = children as React.ReactElement;

    // Check if child is an img tag
    if (child.type === "img" && typeof child.props.src === "string") {
      const originalSrc = child.props.src;

      // For client-side, we'd use a service approach
      // Here's a placeholder for how it might work
      const apiEndpoint = `/api/convert-image?src=${encodeURIComponent(
        originalSrc
      )}&format=${format}&quality=${quality}`;
      setConvertedSrc(apiEndpoint);
    }
  }, [children, format, quality]);

  if (!React.isValidElement(children)) {
    return null;
  }

  // Clone the child element and replace its src if needed
  if (convertedSrc) {
    return React.cloneElement(children as React.ReactElement, {
      src: convertedSrc,
    });
  }

  return children;
};
