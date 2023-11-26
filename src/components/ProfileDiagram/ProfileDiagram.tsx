/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { ProfileEdome } from "../ProfileEdome";
import { ProfileOgive } from "../ProfileOgive";
import { ProfileRing } from "../ProfileRing";
import { ProfileShortRing } from "../ProfileShortRing";
import "./style.css";
import "/styleguide.css";

interface Props {
  part:
    | "none"
    | "ship"
    | "d-edome"
    | "two"
    | "three"
    | "booster"
    | "one"
    | "four"
    | "ship-ML-4";
  className: any;
}

export const ProfileDiagram = ({ part, className }: Props): JSX.Element => {
  return (
    <div className={`profile-diagram ${part} ${className}`}>
      {(part === "booster" ||
        part === "four" ||
        part === "one" ||
        part === "ship-ML-4" ||
        part === "ship" ||
        part === "three" ||
        part === "two") && (
        <ProfileRing
          className={`${
            part === "one"
              ? "class"
              : part === "booster"
              ? "class-2"
              : part === "ship"
              ? "class-3"
              : part === "ship-ML-4"
              ? "class-4"
              : "class-5"
          }`}
        />
      )}

      {["booster", "four", "ship-ML-4", "ship", "three", "two"].includes(
        part
      ) && (
        <ProfileRing
          className={`${
            part === "booster"
              ? "class-6"
              : ["ship-ML-4", "ship"].includes(part)
              ? "class-7"
              : "class-8"
          }`}
        />
      )}

      {part === "d-edome" && (
        <ProfileEdome className="profile-edome-instance" />
      )}

      {["booster", "four", "ship-ML-4", "ship", "three"].includes(part) && (
        <ProfileRing
          className={`${
            part === "booster"
              ? "class-9"
              : part === "ship"
              ? "class-10"
              : part === "ship-ML-4"
              ? "class-11"
              : "class-12"
          }`}
        />
      )}

      {["booster", "four", "ship-ML-4", "ship"].includes(part) && (
        <ProfileRing
          className={`${
            part === "booster"
              ? "class-13"
              : part === "ship"
              ? "class-14"
              : part === "ship-ML-4"
              ? "class-15"
              : "class-16"
          }`}
        />
      )}

      {["booster", "ship-ML-4", "ship"].includes(part) && (
        <>
          <ProfileRing
            className={`${
              part === "ship-ML-4"
                ? "class-17"
                : part === "booster"
                ? "class-18"
                : "class-19"
            }`}
          />
          <ProfileRing
            className={`${
              part === "ship-ML-4"
                ? "class-20"
                : part === "booster"
                ? "class-21"
                : "class-22"
            }`}
          />
          <ProfileRing
            className={`${
              part === "ship-ML-4"
                ? "class-23"
                : part === "booster"
                ? "class-24"
                : "class-25"
            }`}
          />
          <ProfileRing
            className={`${part === "booster" ? "class-26" : "class-27"}`}
          />
          <ProfileRing
            className={`${
              part === "ship"
                ? "class-28"
                : part === "ship-ML-4"
                ? "class-29"
                : "class-30"
            }`}
          />
          <ProfileRing
            className={`${
              part === "ship"
                ? "class-31"
                : part === "ship-ML-4"
                ? "class-32"
                : "class-33"
            }`}
          />
          <ProfileRing
            className={`${
              part === "ship-ML-4"
                ? "class-34"
                : part === "booster"
                ? "class-35"
                : "class-36"
            }`}
          />
          <ProfileRing
            className={`${
              part === "ship-ML-4"
                ? "class-37"
                : part === "booster"
                ? "class-38"
                : "class-39"
            }`}
          />
          <ProfileRing
            className={`${part === "booster" ? "class-40" : "class-41"}`}
          />
          <ProfileRing
            className={`${
              part === "ship"
                ? "class-42"
                : part === "ship-ML-4"
                ? "class-43"
                : "class-44"
            }`}
          />
          <ProfileRing
            className={`${
              part === "ship"
                ? "class-45"
                : part === "ship-ML-4"
                ? "class-46"
                : "class-47"
            }`}
          />
          <ProfileRing
            className={`${
              part === "ship"
                ? "class-48"
                : part === "ship-ML-4"
                ? "class-49"
                : "class-50"
            }`}
          />
          <ProfileRing
            className={`${
              part === "ship-ML-4"
                ? "class-51"
                : part === "booster"
                ? "class-52"
                : "class-53"
            }`}
          />
          <ProfileRing
            className={`${part === "booster" ? "class-54" : "class-55"}`}
          />
          <ProfileRing
            className={`${
              part === "ship"
                ? "class-56"
                : part === "ship-ML-4"
                ? "class-57"
                : "class-58"
            }`}
          />
          <ProfileRing
            className={`${
              part === "ship"
                ? "class-59"
                : part === "ship-ML-4"
                ? "class-60"
                : "class-61"
            }`}
          />
        </>
      )}

      {part === "booster" && (
        <>
          <ProfileRing className="profile-6-ring" />
          <ProfileRing className="profile-ring-instance" />
          <ProfileRing className="profile-6-ring-instance" />
          <ProfileRing className="profile-ring-2" />
          <ProfileRing className="profile-ring-3" />
          <ProfileRing className="profile-ring-4" />
          <ProfileRing className="profile-ring-5" />
          <ProfileRing className="profile-ring-6" />
          <div className="overlap-group-5">
            <ProfileRing className="profile-ring-7" />
            <ProfileShortRing
              className="profile-short-ring-instance"
              rectangleClassName="profile-short-ring-2"
            />
            <ProfileShortRing
              className="profile-short-ring-3"
              rectangleClassName="profile-short-ring-2"
            />
            <ProfileShortRing
              className="profile-short-ring-4"
              rectangleClassName="profile-short-ring-2"
            />
            <ProfileShortRing
              className="profile-short-ring-5"
              rectangleClassName="profile-short-ring-2"
            />
          </div>
          <ProfileRing className="profile-ring-8" />
          <ProfileRing className="profile-ring-9" />
          <ProfileRing className="profile-ring-10" />
        </>
      )}

      {["ship-ML-4", "ship"].includes(part) && (
        <ProfileOgive
          className="profile-ogive-instance"
          subtract={
            part === "ship-ML-4" ? "/img/subtract-3.svg" : "/img/subtract-4.svg"
          }
        />
      )}
    </div>
  );
};

ProfileDiagram.propTypes = {
  part: PropTypes.oneOf([
    "none",
    "ship",
    "d-edome",
    "two",
    "three",
    "booster",
    "one",
    "four",
    "ship-ML-4",
  ]),
};
