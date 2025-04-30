/** @format */

import React, { useEffect, useState } from "react";
import { createOptimizedImageUrl } from "../client";

interface ConvertMediaProps {
  children: React.ReactElement;
  format?: "webp" | "png" | "jpg" | "avif";
  quality?: number;
  width?: number;
  height?: number;
  apiUrl?: string;
}

export const ConvertMedia: React.FC<ConvertMediaProps> = ({
  children,
  format = "webp",
  quality = 80,
  width,
  height,
  apiUrl = "/api/convert",
}) => {
  const [convertedSrc, setConvertedSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!React.isValidElement(children)) {
      console.error("ConvertMedia expects an img as its child");
      return;
    }

    const child = children as React.ReactElement;

    // Check if child is an img tag
    if (child.type === "img" && typeof child.props.src === "string") {
      const originalSrc = child.props.src;

      // Create optimized URL
      const optimizedUrl = createOptimizedImageUrl({
        src: originalSrc,
        format,
        quality,
        width,
        height,
        apiUrl,
      });

      setConvertedSrc(optimizedUrl);
    }
  }, [children, format, quality, width, height, apiUrl]);

  if (!React.isValidElement(children)) {
    return null;
  }

  // Clone the child element and replace its src if needed
  if (convertedSrc && children.type === "img") {
    return React.cloneElement(children as React.ReactElement, {
      src: convertedSrc,
    });
  }

  return children;
};

export default ConvertMedia;
