/** @format */

import React, { useEffect, useState, ComponentType } from "react";
import { ImageFormat } from "../../core/types";

/**
 * Create optimized image URL
 */
export const createOptimizedImageUrl = (options: {
  src: string;
  format?: ImageFormat;
  quality?: number;
  width?: number;
  height?: number;
  apiUrl?: string;
}): string => {
  const {
    src,
    format = "webp",
    quality = 80,
    width,
    height,
    apiUrl = "/api/convert",
  } = options;

  if (!src) {
    return "";
  }

  try {
    // Build the URL for the optimized image
    const params = new URLSearchParams();
    params.append("src", src);
    params.append("format", format);
    params.append("quality", quality.toString());

    if (width) {
      params.append("width", width.toString());
    }

    if (height) {
      params.append("height", height.toString());
    }

    // Create the optimized URL
    return `${apiUrl}?${params.toString()}`;
  } catch (err) {
    console.error("Error creating optimized URL:", err);
    return src;
  }
};

/**
 * Props for the OptimizedImage component
 */
export interface OptimizedImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * Target format for the converted image
   * @default 'webp'
   */
  format?: ImageFormat;

  /**
   * Quality of the output image (1-100)
   * @default 80
   */
  quality?: number;

  /**
   * Width of the output image in pixels
   */
  convertWidth?: number;

  /**
   * Height of the output image in pixels
   */
  convertHeight?: number;

  /**
   * Base URL for the conversion API endpoint
   * @default '/api/convert'
   */
  apiUrl?: string;

  /**
   * Whether to lazy load the image
   * @default true
   */
  lazy?: boolean;

  /**
   * Callback when the image is loaded
   */
  onImageLoad?: () => void;

  /**
   * Callback when there's an error loading the image
   */
  onImageError?: (error: Error) => void;
}

/**
 * A React component that optimizes images by converting them to a specified format
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  format = "webp",
  quality = 80,
  convertWidth,
  convertHeight,
  apiUrl = "/api/convert",
  lazy = true,
  onImageLoad,
  onImageError,
  alt = "",
  ...props
}) => {
  const [optimizedSrc, setOptimizedSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!src) {
      setError(new Error("No source provided"));
      setIsLoading(false);
      return;
    }

    try {
      // Create the optimized URL
      const url = createOptimizedImageUrl({
        src,
        format,
        quality,
        width: convertWidth,
        height: convertHeight,
        apiUrl,
      });

      setOptimizedSrc(url);
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
      setIsLoading(false);
      if (onImageError) {
        onImageError(err instanceof Error ? err : new Error("Unknown error"));
      }
    }
  }, [src, format, quality, convertWidth, convertHeight, apiUrl, onImageError]);

  const handleLoad = () => {
    if (onImageLoad) {
      onImageLoad();
    }
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const err = new Error("Failed to load optimized image");
    setError(err);
    if (onImageError) {
      onImageError(err);
    }

    // Fall back to original source if optimization fails
    if (e.currentTarget) {
      e.currentTarget.src = src || "";
    }
  };

  if (isLoading) {
    return null; // Or a loading placeholder
  }

  if (error) {
    // Fall back to the original image if there was an error
    return <img src={src} alt={alt} {...props} onLoad={handleLoad} />;
  }

  return (
    <img
      src={optimizedSrc || src}
      alt={alt}
      loading={lazy ? "lazy" : undefined}
      onLoad={handleLoad}
      onError={handleError}
      {...props}
    />
  );
};

/**
 * Props that will be extracted and handled by the optimization HOC
 */
type OptimizationProps = {
  src?: string;
  format?: ImageFormat;
  quality?: number;
  convertWidth?: number;
  convertHeight?: number;
  apiUrl?: string;
};

/**
 * HOC that enhances an existing image component with optimization capabilities
 *
 * @param ImageComponent - The component to enhance
 * @returns Enhanced component with optimization
 */
export function withImageOptimization<P extends { src?: string }>(
  ImageComponent: ComponentType<P>
) {
  type EnhancedComponentProps = Omit<P, "src"> & OptimizationProps;

  const EnhancedComponent = React.forwardRef<unknown, EnhancedComponentProps>(
    (props, ref) => {
      const {
        src,
        format = "webp",
        quality = 80,
        convertWidth,
        convertHeight,
        apiUrl = "/api/convert",
        ...rest
      } = props;

      const [optimizedSrc, setOptimizedSrc] = useState<string | null>(null);

      useEffect(() => {
        if (!src) return;

        try {
          // Create the optimized URL
          const url = createOptimizedImageUrl({
            src,
            format,
            quality,
            width: convertWidth,
            height: convertHeight,
            apiUrl,
          });

          setOptimizedSrc(url);
        } catch (err) {
          // Fall back to original source
          console.error("Error creating optimized URL:", err);
        }
      }, [src, format, quality, convertWidth, convertHeight, apiUrl]);

      // Cast the rest props to P to satisfy TypeScript
      const componentProps = {
        ...(rest as unknown as Omit<P, "src">),
        src: optimizedSrc || src,
      } as P;

      return <ImageComponent {...componentProps} ref={ref} />;
    }
  );

  // Set display name for debugging
  const componentName =
    ImageComponent.displayName || ImageComponent.name || "Component";
  EnhancedComponent.displayName = `withImageOptimization(${componentName})`;

  return EnhancedComponent;
}
