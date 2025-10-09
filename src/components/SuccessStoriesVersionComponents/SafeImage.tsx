'use client';
import Image from "next/image";
import { useState } from "react";

interface SafeImageProps {
    src?: string;
    alt: string;
    width: number;
    height: number;
    fill?: boolean;
    className?: string;
    unoptimized?: boolean;
    lazy?: boolean; // ✅ Added lazy loading toggle
}

export default function SafeImage({
    src,
    alt,
    width,
    height,
    fill = false,
    className = "",
    unoptimized = false,
    lazy = true, // ✅ Default to true
}: SafeImageProps) {
    const [error, setError] = useState(false);

    if (!src || error) {
        // When image fails or URL missing, show alt text instead
        return (
            <div
                className={`flex items-center justify-center bg-gray-200 text-gray-600 italic text-sm ${className}`}
                style={{ width, height }}
            >
                {alt || "Image not available"}
            </div>
        );
    }

    return (
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            fill={fill}
            unoptimized={unoptimized}
            className={className}
            onError={() => setError(true)}
            loading={lazy ? "lazy" : "eager"} // ✅ Conditionally enable/disable lazy loading
        />
    );
}
