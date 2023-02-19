import React, { useEffect, useState } from "react";
import mapboxgl, { LngLatBounds } from "mapbox-gl";
import { overpassQuery } from "@/overpass/overpass";
import { FeatureCollection } from "geojson";
import Map, { Source, Layer } from "react-map-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";

const initialViewState = {
  longitude: -122.4,
  latitude: 37.8,
  zoom: 14,
};

const MainMap = () => {
  const [parkingLots, setParkingLots] = useState({
    type: "FeatureCollection",
    features: [],
  } as FeatureCollection);

  const loadParkingLots = async (bounds: LngLatBounds) => {
    const geojson = await overpassQuery(bounds);
    setParkingLots(geojson);
  };

  return (
    <div className="map-page">
      <div className="map-container">
        <Map
          initialViewState={initialViewState}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onMoveEnd={async (e) => {
            const mapBounds = e.target.getBounds();
            await loadParkingLots(mapBounds);
          }}
        >
          <Source id="data" type="geojson" data={parkingLots}>
            <Layer
              id="data"
              type="fill"
              paint={{ "fill-color": "blue", "fill-opacity": 0.5 }}
            />
          </Source>
        </Map>
      </div>
    </div>
  );
};

export default MainMap;
