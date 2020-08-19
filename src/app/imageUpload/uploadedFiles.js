import React from "react";
import { Button, Stack, Thumbnail, ButtonGroup } from "@shopify/polaris";


const UploadedFile = props => {
  const { file, isDropZoneShown, loading, setIsDropZoneShown, uploadFile } = props;
  if(file === "" || isDropZoneShown){
    return false;
  }

  return (
    <Stack alignment="center" vertical>
      <Stack.Item fill>
        <Thumbnail alt="insider Image" size="large" source={file} />
      </Stack.Item>
      <Stack.Item>
      <ButtonGroup>
        <Button destructive onClick={() => setIsDropZoneShown(true)}>Remove Image</Button>
        <Button primary loading={loading} onClick={() => uploadFile()}>Upload Image</Button>
      </ButtonGroup>
      </Stack.Item>
    </Stack>
  )
};

export default UploadedFile;
