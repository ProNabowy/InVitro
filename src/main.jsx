import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AppProvider } from "./context/AppContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { preloadRoutes } from "./routes/routes.jsx";

// Start preloading routes in the background
preloadRoutes();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>
);
