import React from "react";
import ReactDOM from "react-dom";
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

ReactDOM.render(<App />, document.getElementById("app"));
