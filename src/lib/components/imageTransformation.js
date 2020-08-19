import React from "react";

// import app config
import config from "config";

export const ImageTransformation = props => {
  const { imageName, dimensions } = props;
  const { CLOUDINARY_RESPONSE_LINK, CLOUD_NAME } = config;

  return dimensions.map(dims => {
    const { l: length, b: breadth, title } = dims;
    const tranformedImageUrl = `${CLOUDINARY_RESPONSE_LINK}/${CLOUD_NAME}/image/upload/w_${breadth},h_${length},c_crop/${imageName}`;
    const croppedTitle = `${title}: ${length} X ${breadth}`;

    return (
      <div key={length+breadth+title}>
        <div>{croppedTitle}</div>
        <div><img src={tranformedImageUrl} alt="transformedImage" width={breadth} height={length} /></div><br />
      </div>
    );
  });
};

export default ImageTransformation;
