import React from "react";
import { AppProvider, Frame, Page, TopBar, DisplayText } from "@shopify/polaris";
import PropTypes from "prop-types";

// import helper
import helper from "lib/helper";

const PublicLayout = props => {
  const { children = null } = props;
  const theme = {
    colors: {
      topBar: {
        background: "#36454f",
        color: "",
      },
    },
  };

  const getMenuLogo = brandNameText => {

    return (
      <div className="headerTitle">
        <DisplayText>{helper.ucFirst(brandNameText)}</DisplayText>
      </div>
    );
  };

  const menuText = name => (
    <a className="headerLink" href="/">
      {getMenuLogo(name)}
    </a>
  );

  const brandName = "Paytm Insider";
  return (
    <AppProvider theme={theme}>
      <Frame topBar={<TopBar contextControl={menuText(brandName)} />}>
        <Page>{children}</Page>
      </Frame>
    </AppProvider>
  );
};

PublicLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PublicLayout;
