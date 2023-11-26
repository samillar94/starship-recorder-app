import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import MapComponent from "./components/MapComponent";
import Header from "./components/Header";

const App: React.FC = () => {
  return (
    <div style={{ margin: 0 }}>
      <MapComponent />
      <Header />
    </div>
  );
};

const container = document.getElementById("app");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
