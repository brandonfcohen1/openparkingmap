import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { LngLatBounds } from "mapbox-gl";
import { overpassQuery } from "@/overpass/overpass";
import { FeatureCollection } from "geojson";
import { Window } from "@/components/Window";
import { analyzeParking } from "@/analysis/analyzeParking";
import { defaultViewport } from "@/config/defaults";
import { MainMap } from "@/components/MainMap";

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
  const [showZoomModal, setShowZoomModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [viewport, setViewport] = useState(defaultViewport);
  const [error, setError] = useState(false);

  const mapRef = useRef<any>(null);

  const router = useRouter();
  const { latitude, longitude, zoom } = router.query;

  useEffect(() => {
    setViewport({
      latitude: Number(latitude),
      longitude: Number(longitude),
      zoom: Number(zoom),
    });

    if (mapRef.current) {
      const map = mapRef.current.getMap();
      map.jumpTo({
        center: [Number(longitude), Number(latitude)],
        zoom: Number(zoom),
      });
    }
  }, [latitude, longitude, zoom]);

  const handleParkingSearch = async () => {
    if (viewport.zoom < 13) {
      setShowZoomModal(true);
      return;
    }

    if (!bounds) {
      return;
    }

    setLoading(true);
    setSavedBounds(bounds);

    try {
      const parking = (await overpassQuery(bounds)) as FeatureCollection;
      setParkingLots(parking);
      setLoading(false);

      const { totalParkingArea, boundArea } = analyzeParking({
        parking,
        bounds,
      });
      setParkingArea(totalParkingArea);
      setWindowBoundArea(boundArea);
      setError(false);
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  };

  const downloadData = () => {
    const parkingData = JSON.stringify(parkingLots);
    const parkingDataBlob = new Blob([parkingData], {
      type: "application/json",
    });
    const parkingDataUrl = URL.createObjectURL(parkingDataBlob);
    const link = document.createElement("a");
    link.href = parkingDataUrl;
    link.download = "parkingData.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          error={error}
          downloadData={downloadData}
        />
        <MainMap
          showZoomModal={showZoomModal}
          setShowZoomModal={setShowZoomModal}
          showInfoModal={showInfoModal}
          setShowInfoModal={setShowInfoModal}
          loading={loading}
          parkingLots={parkingLots}
          savedBounds={savedBounds}
          setBounds={setBounds}
          viewport={viewport}
          setViewport={setViewport}
          mapRef={mapRef}
        />
      </div>
    </>
  );
};

export default MainPage;
