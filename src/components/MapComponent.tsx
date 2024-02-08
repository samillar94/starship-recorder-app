import axios from "axios";

import React, { Context, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import "/styleguide.css";

import "ol/ol.css";
import Feature, { FeatureLike } from "ol/Feature";
import Map from "ol/Map";
import View from "ol/View";
import Overlay from "ol/Overlay";
import { Geometry, Circle, Point, Polygon } from "ol/geom.js";
import { OSM, Vector as VectorSource } from "ol/source";
import { Fill, Stroke, Style, Text } from "ol/style.js";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer.js";
import { Projection, fromLonLat } from "ol/proj";
import { Rotate, MousePosition } from "ol/control";
import { createStringXY } from "ol/coordinate";

import { MarkerCircle } from "./MarkerCircle";
import { features } from "process";

const API_PORT = process.env.API_PORT || 3000;

type extentType = "Point" | "Circle" | "Polygon";

type Thing = {
  thingId: number;
  position: [number, number];
  extentType: extentType;
  radius: number; // Sets marker size
  shape?: [number, number][];
  fuzzShapes?: [number, number][][];
  text: string;
  rgb: string;
};

type ThingInViewData = {
  thingId: number;
  position: [number, number];
  crs: number;
  thingShortName?: string;
  articleShortName?: string;
  articleVersionSuffix?: string;
  partCode?: string | null;
  partAsset?: string | null;
  partUnits?: any[];
  schemeClass?: string;
};

const renderCircle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  renderRadius: number,
  rgb: string,
  hover: boolean
) => {
  const lineWidth = hover ? renderRadius * 0.05 : renderRadius * 0.01;

  // const innerRadius = 0;
  // const outerRadius = renderRadius * 1.4;
  // const gradient = ctx.createRadialGradient(
  //   x,
  //   y,
  //   innerRadius,
  //   x,
  //   y,
  //   outerRadius
  // );
  // gradient.addColorStop(0, "rgba(" + rgb + ",0)");
  // gradient.addColorStop(0.6, "rgba(" + rgb + ",0.2)");
  // gradient.addColorStop(1, "rgba(" + rgb + ",0.8)");
  ctx.beginPath();
  ctx.arc(x, y, renderRadius, 0, 2 * Math.PI, true);
  ctx.fillStyle = "rgb(" + rgb + ")"; // or gradient
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x, y, renderRadius * 0.95, 1.5 * Math.PI, Math.PI, false); //TODO use arc to display info
  ctx.strokeStyle = "rgba(255,255,255,1)";
  ctx.lineWidth = lineWidth;
  ctx.stroke();
};

const renderText = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  renderRadius: number,
  text: string
) => {
  var fill = "#111";
  ctx.fillStyle = fill;

  var style = "bold";
  var size = 0.8;
  var font = "DIN2014, Bahnschrift,sans-serif";

  ctx.font = `${style} ${size * renderRadius}px ${font}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillText(text, x, y);
};

const renderFuzz = (fuzzShapes: [number, number][][]) => {
  //TODO
};

const MapComponent = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const startPosition = [-10818843.3, 2997374.6];
  const htmlMarkerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: startPosition,
          zoom: 19,
          rotation: Math.PI / 4,
        }),
      });

      //TODO replace this with API call
      const things: Thing[] = [
        {
          thingId: -1,
          position: [-10818843.3, 2997374.6],
          extentType: "Circle",
          radius: 4.5,
          text: "B10",
          rgb: "242, 71, 38",
        },
        {
          thingId: -2,
          position: [-10818853.3, 2997384.6],
          extentType: "Circle",
          radius: 4.5,
          text: "S28",
          rgb: "45, 155, 240",
        },
      ];

      const thingFeatures: Feature[] = [];

      let thingsEP = `http://localhost:${API_PORT}/thing/inView`;

      axios.get(thingsEP).then((results) => {
        if (!results.data.data[0]) return;
        let thingsInView: ThingInViewData[] = results.data.data;
        for (let thingRaw of thingsInView) {
          const {
            thingId,
            position,
            partAsset,
            articleShortName,
            articleVersionSuffix,
            partCode,
            partUnits,
            schemeClass,
          } = thingRaw;

          const projPosition = fromLonLat(position) as [number, number];

          let text = `${articleShortName} ${articleVersionSuffix}\n${partCode}:`;
          if (partUnits) {
            let unitArray = [];
            for (let partUnit of partUnits) {
              const { numerator, denominator, subunit } = partUnit;
              let denominatorOptional = "";
              if (denominator != 1) denominatorOptional = denominator;
              const { editorialCode, displayedInCombo } = partUnit.unit;
              let unitBuilder = numerator + denominatorOptional + editorialCode;
              if (subunit) unitBuilder += subunit;
              unitArray.push(unitBuilder);
            }
            text += unitArray.join(".");
          }

          let rgb = "128,128,128";
          if (schemeClass == "SPECIAL") rgb = "206,163,8";

          const thing: Thing = {
            thingId: thingId,
            position: projPosition,
            extentType: "Circle",
            radius: 4.5,
            text: text,
            rgb: rgb,
          };
          things.push(thing);
        }

        console.log(things);

        for (let thing of things) {
          const { position, extentType, radius, shape, fuzzShapes, text, rgb } =
            thing;

          let geometry: Geometry = new Circle(position, radius);
          let markerStyles: Style[] = [];

          /// set feature geometry according to extent

          const thingFeature = new Feature({
            geometry: geometry,
            ...thing,
            hover: false,
            show: false,
            renderRadius: 0,
          });

          let markerStyle = new Style({
            renderer(coordinates, state) {
              const [[x, y], [x1, y1]] = coordinates as [
                [number, number],
                [number, number]
              ];
              const dx = x1 - x;
              const dy = y1 - y;
              const renderRadius = Math.sqrt(dx * dx + dy * dy);
              const ctx = state.context;
              const { hover } = state.feature.getProperties();

              thingFeature.setProperties({ renderRadius: renderRadius });

              switch (extentType) {
                case "Circle":
                  renderCircle(ctx, x, y, renderRadius, rgb, hover);
                  break;
                case "Polygon":
                  // TODO
                  break;
                case "Point":
                default:
              }

              if (state.resolution > 0.5) return;
              renderText(ctx, x, y, renderRadius, text);

              if (!hover || !fuzzShapes) return;
              renderFuzz(fuzzShapes);
            },
          });
          markerStyles.push(markerStyle);

          thingFeature.setStyle(markerStyles);
          console.log(thingFeature);

          thingFeatures.push(thingFeature);
        }
        map.addLayer(
          new VectorLayer({
            source: new VectorSource({
              features: thingFeatures,
            }),
          })
        );
      });

      map.addControl(
        new MousePosition({
          projection: "EPSG:4326",
          coordinateFormat: createStringXY(5),
        })
      );

      /// tactile
      let pointerOverFeature: Feature | null | undefined = null;
      map.on("pointermove", (evt) => {
        // console.log(evt.pixel);
        const featureOver = map.forEachFeatureAtPixel(evt.pixel, (feature) => {
          feature = feature as Feature;
          feature.setProperties({ hover: true });
          return feature;
        });
        // console.log(featureOver);

        if (pointerOverFeature && pointerOverFeature != featureOver) {
          pointerOverFeature.setProperties({
            hover: false,
          });
        }
        pointerOverFeature = featureOver;
      });

      /// Get map view to allow alignment of HTML elements to canvas
      const mapView = map.getView();

      /// 'extent' contains the bounding box coordinates in the map's projection
      const extent = mapView.calculateExtent(map.getSize());
      console.log("Bounding Box Extent:", extent);

      /// Marker element - will be filled in map.on click
      const markerElement = document.createElement("div");

      // Add the overlays to the map
      // map.addOverlay(marker);

      map.on("click", (evt) => {
        console.log(evt);
        const featureClicked = map.forEachFeatureAtPixel(
          evt.pixel,
          (feature) => {
            feature = feature as Feature;
            let { show, position, text, renderRadius, thingId } =
              feature.getProperties();

            // Position calculation
            let [x, y] = position;
            let rotation = mapView.getRotation();
            let resolution = mapView.getResolution();
            if (!resolution) resolution = 1;
            const rightOffset = 1;
            const upOffset = 1;
            x +=
              renderRadius *
              resolution *
              (Math.cos(rotation) * rightOffset -
                Math.sin(rotation) * upOffset);
            y +=
              renderRadius *
              resolution *
              (Math.sin(rotation) * rightOffset +
                Math.cos(rotation) * upOffset);
            position = [x, y];

            const root = createRoot(markerElement);
            root.render(
              <MarkerCircle
                className="marker-m-circle-instance"
                divClassName="marker-circle-2"
                divClassNameOverride="marker-circle-3"
                overlapGroupClassName="--special-yellow"
                stateProp="labelled"
                code={text}
                thingIds={thingId}
              />
            );

            const marker = new Overlay({
              position: position,
              positioning: "top-left",
              element: markerElement, //TODO take in feature properties
              stopEvent: false, /// true disallows interaction with the map under the marker
            });

            /// Overlay display logic
            // console.log(text + show);
            if (show) {
              feature.setProperties({ show: false });
              map.removeOverlay(marker);
            } else {
              for (let featureToUnshow of thingFeatures) {
                featureToUnshow.setProperties({ show: false });
              }
              map.getOverlays().clear();
              feature.setProperties({ show: true });
              map.addOverlay(marker);
            }

            return feature;
          }
        );
      });

      return () => map.dispose(); // Cleanup on unmount
    }
  }, []);

  return (
    <div style={{ position: "absolute", width: "100%", height: "100%" }}>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default MapComponent;
