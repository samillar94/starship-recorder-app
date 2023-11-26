/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";

interface Props {
  className: any;
}

export const PinButton1 = ({ className }: Props): JSX.Element => {
  return (
    <svg
      className={`pin-button-1 ${className}`}
      fill="none"
      height="38"
      viewBox="0 0 38 38"
      width="38"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className="g" filter="url(#filter0_d_195_4241)">
        <circle className="circle" cx="18.8902" cy="14.8902" fill="white" r="14.8902" />
      </g>
      <g className="g" clipPath="url(#clip0_195_4241)">
        <path
          className="path"
          d="M15.9143 10.0028C15.7248 10.032 15.5552 10.1323 15.4427 10.2819C15.3302 10.4314 15.284 10.6178 15.3143 10.8001C15.3446 10.9824 15.4489 11.1456 15.6043 11.2539C15.7597 11.3622 15.9534 11.4066 16.1429 11.3774H16.8571V14.1267H15.4286C14.6429 14.1267 14 14.7453 14 15.5014H18.2857V19.6253L18.9143 21L19.7143 19.6253V15.5014H24C24 14.7453 23.3571 14.1267 22.5714 14.1267H21.1429V11.3774H21.8571C22.0466 11.3774 22.2283 11.305 22.3622 11.1761C22.4962 11.0472 22.5714 10.8724 22.5714 10.6901C22.5714 10.5078 22.4962 10.333 22.3622 10.2041C22.2283 10.0752 22.0466 10.0028 21.8571 10.0028H16.1429C16.1001 9.99907 16.0571 9.99907 16.0143 10.0028C15.9857 10.0011 15.9571 10.0011 15.9286 10.0028L15.9143 10.0028Z"
          fill="black"
        />
      </g>
      <defs className="defs">
        <filter
          className="filter"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="37.7805"
          id="filter0_d_195_4241"
          width="37.7805"
          x="0"
          y="0"
        >
          <feFlood className="fe-flood" floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            className="fe-color-matrix"
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset className="fe-offset" dy="4" />
          <feGaussianBlur className="fe-gaussian-blur" stdDeviation="2" />
          <feComposite className="fe-composite" in2="hardAlpha" operator="out" />
          <feColorMatrix
            className="fe-color-matrix"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend className="fe-blend" in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_195_4241" />
          <feBlend
            className="fe-blend"
            in="SourceGraphic"
            in2="effect1_dropShadow_195_4241"
            mode="normal"
            result="shape"
          />
        </filter>
        <clipPath className="clip-path" id="clip0_195_4241">
          <rect className="rect" fill="white" height="11" transform="translate(14 10)" width="10" />
        </clipPath>
      </defs>
    </svg>
  );
};
