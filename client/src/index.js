import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createClient } from "@supabase/supabase-js";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

const supabase = createClient(
  "https://impcmmrmwumojbcntokw.supabase.co", // Project URL
  // Public anon key:
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltcGNtbXJtd3Vtb2piY250b2t3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgyMjA2OTEsImV4cCI6MjAyMzc5NjY5MX0.bAE5oLL1CVpyUgVCf8qIaxVmjqrYLiaDqeNjo1FCO7k"
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* SessionContextProvider allows React app to talk to Supabase */}
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
