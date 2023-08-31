import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain={`${import.meta.env.VITE_DOMAIN}`}
    clientId={`${import.meta.env.VITE_CLIENT_ID}`}
    authorizationParams={{
      redirect_uri: "https://real-state-website-eight.vercel.app",
    }}
    audience="http://localhost:8000"
    scope="openid profile email"
  >
    <App />
  </Auth0Provider>
);
