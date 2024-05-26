import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ReactQueryClientProvider } from "./components/ReactQueryClientProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReactQueryClientProvider>
      <App />
    </ReactQueryClientProvider>
  </React.StrictMode>
);
