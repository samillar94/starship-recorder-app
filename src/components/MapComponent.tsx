import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import "/styleguide.css";

import "ol/ol.css";
import Feature from "ol/Feature";
import Map from "ol/Map";
import View from "ol/View";
import Overlay from "ol/Overlay";
import { Circle } from "ol/geom.js";
import { OSM, Vector as VectorSource } from "ol/source";
import { Fill, Stroke, Style, Text } from "ol/style.js";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer.js";
import { Projection, fromLonLat } from "ol/proj";
import { Rotate, MousePosition } from "ol/control";
import { createStringXY } from "ol/coordinate";
import CanvasImmediateRenderer from "ol/render/canvas/Immediate";

import { MarkerCircle } from "./MarkerCircle";

const MapComponent = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const startPosition = [-10818843.3, 2997374.6];
  const htmlMarkerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      const circleFeature = new Feature({
        geometry: new Circle(startPosition, 4.5),
      });

      let markerCircle = new Style({
        renderer(coordinates, state) {
          const [[x, y], [x1, y1]] = coordinates;
          const ctx = state.context;
          const dx = x1 - x;
          const dy = y1 - y;
          const radius = Math.sqrt(dx * dx + dy * dy);

          const innerRadius = 0;
          const outerRadius = radius * 1.4;

          const gradient = ctx.createRadialGradient(
            x,
            y,
            innerRadius,
            x,
            y,
            outerRadius
          );
          gradient.addColorStop(0, "rgba(255,0,0,0)");
          gradient.addColorStop(0.6, "rgba(255,0,0,0.2)");
          gradient.addColorStop(1, "rgba(255,0,0,0.8)");
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
          ctx.fillStyle = gradient;
          ctx.fill();

          ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
          ctx.strokeStyle = "rgba(255,0,0,1)";
          ctx.stroke();
        },
      });
      let markerText = new Style({
        text: new Text({
          text: "B10",
          font: "bold 10px DIN2014, Bahnschrift,sans-serif",
          fill: new Fill({
            color: "#000",
          }),
        }),
      });

      const markerStyles = [markerCircle, markerText];

      // circleFeature.setStyle(circleStyles);

      const map = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          new VectorLayer({
            source: new VectorSource({
              features: [circleFeature],
            }),
            style: function (feature, resolution) {
              var textsize = 0.4 / resolution;
              markerText?.getText()?.setScale(textsize);
              return markerStyles;
            },
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
