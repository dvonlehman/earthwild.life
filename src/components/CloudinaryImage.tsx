import React, { FC, CSSProperties } from "react";

const BASE_URL = "http://res.cloudinary.com/dfvygwmml/image/upload/";

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
  const params: string[] = [];
  if (props.width) {
    params.push(`w_${props.width}`);
  }
  if (props.height) {
    params.push(`h_${props.height}`);
  }
  if (props.crop) {
    params.push(`c_${props.crop}`);
  }

  return (
    <img
      alt={props.alt}
      style={props.style}
      src={`${BASE_URL}${params.join(",")}/${props.path}`}
      className={props.className}
    />
  );
};

export default CloudinaryImage;
