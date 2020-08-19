import React, { useState, useCallback } from "react";
import { Heading } from "@shopify/polaris";

// import app config
import config from "config";

// import helper
import helper from "lib/helper";

// import app components
import { Banner, DropZone, ImageTransformation } from "lib/components";

import UploadedFile from "./uploadedFiles";

const ImageUpload = () => {
  const [isDropZoneShown, setIsDropZoneShown] = useState(true);
  const [file, setFile] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("");
  const [banner, setBanner] = useState({
    isOpen: false,
    title: "",
    status: ""
  });
  const { CLOUDINARY_API_LINK,  UPLOAD_PRESET, CLOUD_NAME } = config;

  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

  const validateImage = file => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = window.URL.createObjectURL(file);
      img.onload = () => {
        const { height, width } = img;
        if (height === 1024 && width === 1024) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
          img.onerror = reject;
    })
  };

  const isValidSize = useCallback(
    async image => {
      const isValidImage = await validateImage(image);

      return isValidImage;
    }, []);

  const isTypeAllowed = useCallback(
    image => {
      return allowedTypes.includes(image.type);
    }, [allowedTypes]);

  const imageValidator = useCallback(
    async image => {
      const isValidImage = await isValidSize(image) && isTypeAllowed(image);
      if (!isValidImage) {
        setBanner({
          isOpen: true,
          status: "critical",
          title: "Image is Rejected, it should be 1024*1024 in size",
        });
      }
      return isValidImage;
    }, [isValidSize, isTypeAllowed]);

  const handleDrop = useCallback(
    async (_droppedFiles, acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length) {
        setBanner({
          isOpen: true,
          status: "critical",
          title: "File is Rejected, try to upload an image",
        });
        return false;
      }

      const uploadedImage = acceptedFiles[0];

      const isValidImage = await imageValidator(uploadedImage);
      if (!isValidImage) {
        return false;
      }

      setBanner({ isOpen: false });
      const promiseList = new Promise((resolve) => {
        const reader = new window.FileReader();
        reader.readAsDataURL(uploadedImage);
        reader.onloadend = () => {
          const result = reader.result || "";
          resolve(result);
        };
      });
      const response = await Promise.resolve(promiseList);
      setFile(response);
      setIsDropZoneShown(false);
    },
    [imageValidator],
  );

  const uploadFile = async () => {
    setImageLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    formData.append("upload_preset", UPLOAD_PRESET);
    const options = {
      method: "POST",
      body: formData,
    };

    const targetUrl = `${CLOUDINARY_API_LINK}/${CLOUD_NAME}/image/upload`;

    try {
      const response = await fetch(targetUrl, options);
      response.json().then(res => {
        const { public_id, format } = res;
        setUploadedImage(`${public_id}.${format}`);
      });
    } catch(e) {
      console.log("-----error-----", e);
    }

    setImageLoading(false);
  };

  if (uploadedImage) {
    return (
      <>
        <Heading>{helper.ucFirst("Transformed Images")}</Heading><br />
        <ImageTransformation
          imageName={uploadedImage}
          dimensions={[
            { l: 450, b: 755, title: "horizontal" },
            { l: 450, b: 365, title: "vertical" },
            { l: 212, b: 365, title: "horizontal small" },
            { l: 380, b: 380, title: "gallery" }
          ]}
        />
      </>
    );
  }

  return (
    <>
      <Banner title={banner.title} status={banner.status} isOpen={banner.isOpen} setBanner={setBanner} />
      <UploadedFile
        file={file}
        loading={imageLoading}
        isDropZoneShown={isDropZoneShown}
        setIsDropZoneShown={setIsDropZoneShown}
        uploadFile={uploadFile}
      />
      {isDropZoneShown && (
        <>
        <Heading><label htmlFor="onlyImage">Upload an Image</label></Heading><br />
        <div>
          <DropZone id="onlyImage" acceptedFile="image/*" fileType="image" onDrop={handleDrop} allowMultiple={false} />
        </div>
        </>
      )}
    </>
  );
};

export default ImageUpload;
