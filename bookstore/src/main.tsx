import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import { BrowserRouter } from "react-router-dom";
import { Theme } from "@radix-ui/themes";
import { Toaster } from "@/components/ui/toaster";
import "./index.css";
import "@radix-ui/themes/styles.css";
import "../app/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Theme>
          <App />
          <Toaster />
        </Theme>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
