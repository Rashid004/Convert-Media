/** @format */
import React from "react";
interface ConvertMediaProps {
    children: React.ReactElement;
    format?: "webp" | "png" | "jpg" | "avif";
    quality?: number;
    width?: number;
    height?: number;
    apiUrl?: string;
}
export declare const ConvertMedia: React.FC<ConvertMediaProps>;
export default ConvertMedia;
