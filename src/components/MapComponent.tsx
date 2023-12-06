import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import "/styleguide.css";

import "ol/ol.css";
import Feature from "ol/Feature";
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
  polygon?: [number, number][];
  text: string;
  rgbAddAlpha: string;
};

const MapComponent = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const startPosition = [-10818843.3, 2997374.6];
  const htmlMarkerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      const things: Thing[] = [
        {
          position: [-10818843.3, 2997374.6],
          extentType: "Circle",
          radius: 4.5,
          text: "B10",
          rgbAddAlpha: "rgba(255,0,0,",
        },
        {
          position: [-10818853.3, 2997384.6],
          extentType: "Circle",
          radius: 4.5,
          text: "S28",
          rgbAddAlpha: "rgba(0,50,255,",
        },
      ];

      const thingFeatures: Feature[] = [];

      for (let thing of things) {
        const { position, extentType, radius, text, rgbAddAlpha } = thing;

        let geometry: Geometry = new Circle(position, radius);
        let markerStyles: Style[] = [];

        // set feature geometry according to extent

        const thingFeature = new Feature({
          geometry: geometry,
          ...thing,
        });

        let markerStyle = new Style({
          renderer(coordinates, state) {
            console.log(state);

            const [[x, y], [x1, y1]] = coordinates as [
              [number, number],
              [number, number]
            ];
            const renderRadius = x1 - x;
            const ctx = state.context;

            switch (extentType) {
              case "Circle":
                const innerRadius = 0;
                const outerRadius = renderRadius * 1.4;

                const gradient = ctx.createRadialGradient(
                  x,
                  y,
                  innerRadius,
                  x,
                  y,
                  outerRadius
                );
                gradient.addColorStop(0, thing.rgbAddAlpha + "0)");
                gradient.addColorStop(0.6, thing.rgbAddAlpha + "0.2)");
                gradient.addColorStop(1, thing.rgbAddAlpha + "0.8)");
                ctx.beginPath();
                ctx.arc(x, y, renderRadius, 0, 2 * Math.PI, true);
                ctx.fillStyle = gradient;
                ctx.fill();

                ctx.arc(x, y, renderRadius, 0, 2 * Math.PI, true);
                ctx.strokeStyle = thing.rgbAddAlpha + "1)";
                ctx.stroke();
                break;
              case "Polygon":
                // TODO
                break;
              case "Point":
              default:
            }
            console.log(state.resolution);

            if (state.resolution > 0.5) return;

            const sc = renderRadius;
            var fill = "#111";
            ctx.fillStyle = fill;

            var style = "bold";
            var size = 1;
            var font = "DIN2014, Bahnschrift,sans-serif";

            ctx.font = `${style} ${size * sc}px ${font}`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            ctx.fillText(text, x, y);
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

      const map = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          new VectorLayer({
            source: new VectorSource({
              features: thingFeatures,
            }),
            // style: function (feature, resolution) {
            //   var textsize = 0.4 / resolution;
            //   markerText?.getText()?.setScale(textsize);
            //   return markerStyles;
            // },
          }),
        ],
        view: new View({
          center: startPosition,
          zoom: 16,
          rotation: Math.PI / 4,
        }),
      });

      map.addControl(
        new MousePosition({
          projection: "EPSG:4326",
          coordinateFormat: createStringXY(5),
        })
      );

      // Assuming you have the map instance named 'map'
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
          stateProp="normal"
          code="B14.1 F:3"
          thingIds="#175"
        />
      );

      // Create a marker overlay
      const marker = new Overlay({
        position: markerPosition,
        positioning: "center-center",
        element: markerElement,
        stopEvent: false, // Allows interaction with the map under the marker
      });

      // Add the overlays to the map
      // map.addOverlay(marker);

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
