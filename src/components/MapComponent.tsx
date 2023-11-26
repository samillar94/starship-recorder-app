import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import "/styleguide.css";

import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Overlay from "ol/Overlay";
import { Projection, fromLonLat } from "ol/proj";
import Rotate from "ol/control/Rotate.js";
import MousePosition from "ol/control/MousePosition.js";
import { createStringXY } from "ol/coordinate";

import { MarkerCircle } from "./MarkerCircle";

const MapComponent = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const startPosition = [-10818843.3, 2997374.6];

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
      const markerPosition = [-10818843.3, 2997374.6];

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
      map.addOverlay(marker);

      map.on("moveend", () => {
        console.log("moved");
        const zoom = map.getView().getZoom();
        if (zoom) {
          const markerSize = 9 * 2 ** (9 - zoom); // Adjust the marker size based on zoom level
          markerElement.style.width = `${markerSize}px`;
          markerElement.style.height = `${markerSize}px`;
        }
      });

      // return () => map.dispose(); // Cleanup on unmount
    }
  }, []);

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "100%", position: "absolute" }}
    />
  );
};

export default MapComponent;
