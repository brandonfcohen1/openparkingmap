import React, { useState } from "react";
import { LngLatBounds } from "mapbox-gl";
import { overpassQuery } from "@/overpass/overpass";
import { FeatureCollection } from "geojson";
import { Window } from "../components/Window";
import { analyzeParking } from "@/analysis/analyzeParking";

import { MainMap } from "@/components/MainMap";

const initialViewState = {
  longitude: -118.482505,
  latitude: 34.0248477,
  zoom: 14,
};

export const MainPage = () => {
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
        <MainMap
          showZoomModal={showZoomModal}
          setShowZoomModal={setShowZoomModal}
          showInfoModal={showInfoModal}
          setShowInfoModal={setShowInfoModal}
          loading={loading}
          parkingLots={parkingLots}
          bounds={bounds}
          savedBounds={savedBounds}
          zoom={zoom}
          setBounds={setBounds}
          setSavedBounds={setSavedBounds}
          setZoom={setZoom}
          initialViewState={initialViewState}
        />
      </div>
    </>
  );
};

export default MainPage;
