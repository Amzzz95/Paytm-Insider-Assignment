import React from "react";
import { DropZone as PolarisDropZone } from "@shopify/polaris";

const DropZone = props => {
  const { id, acceptedFile, fileType, onDrop, allowMultiple } = props;

  const fileUpload = <PolarisDropZone.FileUpload />;

  return (
    <PolarisDropZone
      id={id}
      accept={acceptedFile}
      type={fileType}
      onDrop={onDrop}
      allowMultiple={allowMultiple}
    >
      {fileUpload}
    </PolarisDropZone>
  );
};

export default DropZone;
