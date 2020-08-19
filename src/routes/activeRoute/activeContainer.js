import React from "react";
import PropTypes from "prop-types";

import { ActiveProvider } from "lib/context";
import ActiveLayout from "layout";

const ActiveContainer = props => {
  const { component: Component, ...rest } = props;
  return (
    <>
      <ActiveProvider
        value={{
          ...rest
        }}
      >
        <ActiveLayout>
          <Component />
        </ActiveLayout>
      </ActiveProvider>
    </>
  )
};

ActiveContainer.propTypes = {
  component: PropTypes.func,
};

export default ActiveContainer;
