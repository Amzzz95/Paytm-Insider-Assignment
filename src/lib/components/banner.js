import React from "react";
import { Banner } from "@shopify/polaris";

const BannerComponent = props => {
  const { title, status, isOpen, setBanner } = props;
  return isOpen && <><Banner title={title} status={status} onDismiss={() => setBanner({ isOpen: false })} /><br/></>;
};

export default BannerComponent;
