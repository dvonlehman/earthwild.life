import React, { FC, CSSProperties } from "react";

export const BASE_URL = "https://res.cloudinary.com/dfvygwmml/image/upload/";

export function buildUrl(options: {
  path: string;
  width?: number;
  height?: number;
  crop?: "fill" | "crop";
}) {
  const params: string[] = [];
  if (options.width) {
    params.push(`w_${options.width}`);
  }
  if (options.height) {
    params.push(`h_${options.height}`);
  }
  if (options.crop) {
    params.push(`c_${options.crop}`);
  }

  return `${BASE_URL}${params.join(",")}/${options.path}`;
}

interface CloudinaryImageProps {
  path: string;
  alt: string;
  width?: number;
  height?: number;
  crop?: "fill" | "crop";
  className?: string;
  style?: CSSProperties;
}

const CloudinaryImage: FC<CloudinaryImageProps> = props => {
  const { width, height, crop, path } = props;
  const src = buildUrl({ path, width, height, crop });
  return (
    <img
      alt={props.alt}
      style={props.style}
      src={src}
      className={props.className}
    />
  );
};

export default CloudinaryImage;
