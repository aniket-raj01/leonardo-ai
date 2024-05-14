import React from "react";

const ImageGallery = ({ imageUrls }) => {
  return (
    <div style={{ rowGap: 5 }}>
      {imageUrls.map((imageUrl, index) => (
        <img
          style={{ width: "100%", height: "auto", objectFit: "contain" }}
          key={index}
          src={imageUrl}
          alt={`Generated ${index}`}
        />
      ))}
    </div>
  );
};

export default ImageGallery;
