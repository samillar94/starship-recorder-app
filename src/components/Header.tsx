import React, { useEffect, useRef } from "react";
import "/styleguide.css";

const Header = () => {
  return (
    <>
      <div
        style={{
          //   width: "100%",
          margin: "8px 40px 0px 40px",
          //   backgroundColor: "#f2f2f288",
          position: "absolute",
        }}
      >
        <h1 style={{ margin: "0px 8px" }}>Starship Recorder</h1>
      </div>
    </>
  );
};

export default Header;
