import React from "react";
import { AppProvider } from "@shopify/polaris";

import Routes from "./routes";

const App = () => (
  <AppProvider>
    <Routes />
  </AppProvider>
);

export default App;
