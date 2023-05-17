import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";
import store from "./store/services/store";

// Create a root element for rendering the app
const root = ReactDOM.createRoot(document.getElementById("root"));
// Render the app inside the root element
root.render(
  // Wrap the app with the Redux store provider
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
