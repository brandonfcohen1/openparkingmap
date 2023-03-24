import React, { useState } from "react";
import mapboxgl, { LngLatBounds } from "mapbox-gl";
import { overpassQuery } from "@/overpass/overpass";
import { FeatureCollection } from "geojson";
import Map, { Source, Layer, useMap } from "react-map-gl";
import { Window } from "../components/Window";
import LoadingOverlay from "../components/LoadingOverlay";
import { analyzeParking } from "@/analysis/analyzeParking";
import { lngLatBoundsToPolygon } from "@/analysis/latLngBoundsToPolygon";
import ZoomModal from "@/components/ZoomModal";
import InfoModal from "@/components/InfoModal";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYnJhbmRvbmZjb2hlbiIsImEiOiJjbGZsdXA3Y3cwMHh5NDBwZ29tZmwwMHF5In0.5WrHreoWQq-cjrHoVt4P-w";

const initialViewState = {
  longitude: -118.482505,
  latitude: 34.0248477,
  zoom: 14,
};

const MainMap = () => {
  const [bounds, setBounds] = useState<LngLatBounds>();
  const [savedBounds, setSavedBounds] = useState<LngLatBounds>();
  const [loading, setLoading] = useState(false);
  const [parkingLots, setParkingLots] = useState({
    type: "FeatureCollection",
    features: [],
  } as FeatureCollection);
  const [parkingArea, setParkingArea] = useState(0);
  const [windowBoundArea, setWindowBoundArea] = useState(0);
  const [zoom, setZoom] = useState(initialViewState.zoom);
  const [showZoomModal, setShowZoomModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleParkingSearch = async () => {
    if (zoom < 14) {
      setShowZoomModal(true);
      return;
    }

    if (!bounds) {
      return;
    }

    setLoading(true);
    setSavedBounds(bounds);

    const parking = (await overpassQuery(bounds)) as FeatureCollection;
    setParkingLots(parking);
    setLoading(false);

    const { totalParkingArea, boundArea } = analyzeParking({ parking, bounds });
    setParkingArea(totalParkingArea);
    setWindowBoundArea(boundArea);
  };

  return (
    <>
      <div className="map-page">
        <Window
          handleParkingSearch={handleParkingSearch}
          loading={loading}
          parkingArea={parkingArea}
          windowBoundArea={windowBoundArea}
          setShowInfoModal={setShowInfoModal}
        />
        <div className="map-container">
          {loading && <LoadingOverlay />}
          {showZoomModal && (
            <ZoomModal
              showZoomModal={showZoomModal}
              setShowZoomModal={setShowZoomModal}
            />
          )}
          {showInfoModal && (
            <InfoModal
              showInfoModal={showInfoModal}
              setShowInfoModal={setShowInfoModal}
            />
          )}
          <Map
            initialViewState={initialViewState}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            onMoveEnd={async (e) => {
              setBounds(e.target.getBounds());
              setZoom(e.target.getZoom());
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
              />
            </Source>
            {savedBounds && (
              <Source
                id="bounds-polygon"
                type="geojson"
                data={lngLatBoundsToPolygon(savedBounds)}
              >
                <Layer
                  id="bounds-polygon-layer"
                  type="line"
                  paint={{
                    "line-color": "blue",
                    "line-width": 2,
                  }}
                />
              </Source>
            )}
          </Map>
        </div>
      </div>
    </>
  );
};

export default MainMap;
