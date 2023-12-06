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
import CanvasImmediateRenderer from "ol/render/canvas/Immediate";

import { MarkerCircle } from "./MarkerCircle";

type extentType = "Point" | "Circle" | "Polygon";

type Thing = {
  position: [number, number];
  extentType: extentType;
  radius: number; // Sets marker size
  shape?: [number, number][];
  fuzzShape?: [number, number][];
  text: string;
  rgb: string;
};

const renderCircle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  renderRadius: number,
  rgb: string,
  hover: boolean
) => {
  const innerRadius = 0;
  const outerRadius = renderRadius * 1.4;
  const lineWidth = hover ? 5 : 1;
  // const lineWidth = 2;

  const gradient = ctx.createRadialGradient(
    x,
    y,
    innerRadius,
    x,
    y,
    outerRadius
  );
  gradient.addColorStop(0, "rgba(" + rgb + ",0)");
  gradient.addColorStop(0.6, "rgba(" + rgb + ",0.2)");
  gradient.addColorStop(1, "rgba(" + rgb + ",0.8)");
  ctx.beginPath();
  ctx.arc(x, y, renderRadius, 0, 2 * Math.PI, true);
  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.arc(x, y, renderRadius, 0, 2 * Math.PI, true);
  ctx.strokeStyle = "rgba(" + rgb + ",1)";
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
  var size = 1;
  var font = "DIN2014, Bahnschrift,sans-serif";

  ctx.font = `${style} ${size * renderRadius}px ${font}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillText(text, x, y);
};

const renderFuzz = (fuzzShape: [number, number][]) => {
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
          zoom: 20,
          rotation: Math.PI / 4,
        }),
      });

      //TODO replace this with API call
      const things: Thing[] = [
        {
          position: [-10818843.3, 2997374.6],
          extentType: "Circle",
          radius: 4.5,
          text: "B10",
          rgb: "255,0,0",
        },
        {
          position: [-10818853.3, 2997384.6],
          extentType: "Circle",
          radius: 4.5,
          text: "S28",
          rgb: "0,50,255",
        },
      ];

      const thingFeatures: Feature[] = [];

      for (let thing of things) {
        const { position, extentType, radius, shape, fuzzShape, text, rgb } =
          thing;

        let geometry: Geometry = new Circle(position, radius);
        let markerStyles: Style[] = [];

        // set feature geometry according to extent

        const thingFeature = new Feature({
          geometry: geometry,
          ...thing,
          hover: false,
          show: false,
          renderRadius: 0,
        });

        let markerStyle = new Style({
          renderer(coordinates, state) {
            // console.log(state);

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

            if (!hover || !fuzzShape) return;
            renderFuzz(fuzzShape);
          },
        });
        markerStyles.push(markerStyle);

        // let markerTextOld = new Style({
        //   text: new Text({
        //     text: thing.text,
        //     font: "bold 10px DIN2014, Bahnschrift,sans-serif",
        //     fill: new Fill({
        //       color: "#000",
        //     }),
        //   }),
        // });
        // markerStyles.push(markerTextOld);

        thingFeature.setStyle(markerStyles);

        thingFeatures.push(thingFeature);
      }

      map.addLayer(
        new VectorLayer({
          source: new VectorSource({
            features: thingFeatures,
          }),
        })
      );

      map.addControl(
        new MousePosition({
          projection: "EPSG:4326",
          coordinateFormat: createStringXY(5),
        })
      );

      // tactile
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

      // Get map view to allow alignment of HTML elements to canvas
      const mapView = map.getView();
      const extent = mapView.calculateExtent(map.getSize());

      // 'extent' contains the bounding box coordinates in the map's projection
      console.log("Bounding Box Extent:", extent);

      // Convert marker coordinates to the map's projection
      // const markerPosition = fromLonLat(markerCoord);
      const markerPosition = startPosition;

      // Create a styled marker element (red circle)
      const markerElement = document.createElement("div");
      const root = createRoot(markerElement);
      root.render(
        <MarkerCircle
          className="marker-m-circle-instance"
          divClassName="marker-circle-2"
          divClassNameOverride="marker-circle-3"
          overlapGroupClassName="--special-yellow"
          stateProp="labelled"
          code="B14.1 F:3"
          thingIds="#175"
        />
      );

      // Create a marker overlay
      // Add the overlays to the map
      // map.addOverlay(marker);

      let lastClickedFeature: Feature | undefined | null = null;
      map.on("click", (evt) => {
        console.log(evt);
        const featureClicked = map.forEachFeatureAtPixel(
          evt.pixel,
          (feature) => {
            feature = feature as Feature;
            let { show, position, text, renderRadius } =
              feature.getProperties();
            let [x, y] = position;
            console.log(position);

            let rotation = mapView.getRotation();
            console.log(rotation);
            // rotation = 0; //TODO make this rotate correctly
            let resolution = mapView.getResolution();
            if (!resolution) resolution = 1;
            const rightOffset = 1;
            const upOffset = -1;
            x +=
              renderRadius *
              resolution *
              (Math.cos(rotation) * rightOffset +
                Math.sin(rotation) * upOffset);
            y +=
              renderRadius *
              resolution *
              (Math.sin(rotation) * rightOffset -
                Math.cos(rotation) * upOffset);
            position = [x, y];

            // console.log(text + show);
            const marker = new Overlay({
              position: position,
              positioning: "top-left",
              element: markerElement, // more to do here
              stopEvent: false, // Allows interaction with the map under the marker
            });

            if (show) {
              feature.setProperties({ show: false });
              map.removeOverlay(marker);
            } else {
              lastClickedFeature?.setProperties({ show: false });
              map.getOverlays().clear();
              feature.setProperties({ show: true });
              map.addOverlay(marker);
            }
            return feature;
          }
        );
        lastClickedFeature = featureClicked;
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
