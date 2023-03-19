import React, { useState } from "react";
import mapboxgl, { LngLatBounds } from "mapbox-gl";
import { overpassQuery } from "@/overpass/overpass";
import { FeatureCollection } from "geojson";
import Map, { Source, Layer, useMap } from "react-map-gl";
import { Window } from "../components/Window";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";

const initialViewState = {
  longitude: -118.482505,
  latitude: 34.0248477,
  zoom: 14,
};

const MainMap = () => {
  const [bounds, setBounds] = useState<LngLatBounds>();
  const [loading, setLoading] = useState(false);
  const [parkingLots, setParkingLots] = useState({
    type: "FeatureCollection",
    features: [],
  } as FeatureCollection);

  const handleParkingSearch = async () => {
    if (!bounds) {
      return;
    }
    setLoading(true);

    const geojson = (await overpassQuery(bounds)) as FeatureCollection;
    setParkingLots(geojson);
    setLoading(false);
  };

  return (
    <>
      <div className="map-page">
        <Window handleParkingSearch={handleParkingSearch} loading={loading} />
        <div className="map-container">
          <Map
            initialViewState={initialViewState}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            onMoveEnd={async (e) => {
              setBounds(e.target.getBounds());
            }}
            onRender={(e) => {
              setBounds(e.target.getBounds());
            }}
          >
            <Source type="geojson" data={parkingLots}>
              <Layer
                id="parkingData"
                type="fill"
                paint={{
                  "fill-color": "red",
                  "fill-opacity": 0.8,
                  "fill-outline-color": "black",
                }}
                minzoom={13}
              />
            </Source>
          </Map>
        </div>
      </div>
    </>
  );
};

export default MainMap;
