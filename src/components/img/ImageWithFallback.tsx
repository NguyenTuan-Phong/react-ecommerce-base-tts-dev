import React from 'react';

type ImageWithFallbackProps = React.ImgHTMLAttributes<HTMLImageElement>;

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, alt, ...props }) => {
  return (
    <img
      src={src || "/images/default.png"}
      alt={alt}
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = "/images/default.png";
      }}
      {...props}
    />
  );
};

export default ImageWithFallback;
