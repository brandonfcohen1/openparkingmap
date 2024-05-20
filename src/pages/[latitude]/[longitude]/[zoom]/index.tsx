import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { LngLatBounds } from "mapbox-gl";
import { overpassQuery } from "@/overpass/overpass";
import { FeatureCollection } from "geojson";
import { Window } from "@/components/Window";
import { analyzeParking } from "@/utils/analyzeParking";
import { validateViewport } from "@/utils/validateViewport";
import { defaultViewport } from "@/config/defaults";
import { MainMap } from "@/components/MainMap";
import { MapRef } from "react-map-gl";

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
  const [initialized, setInitialized] = useState(false);

  const mapRef = useRef<MapRef>(null);

  const router = useRouter();
  const { latitude, longitude, zoom } = router.query;

  useEffect(() => {
    const isValidViewport = validateViewport(latitude, longitude, zoom);
    const lat = Number(latitude);
    const lng = Number(longitude);
    const z = Number(zoom);

    if (isValidViewport && mapRef.current) {
      setViewport({
        latitude: lat,
        longitude: lng,
        zoom: z,
      });

      if (!initialized) {
        const map = mapRef.current.getMap();
        map.jumpTo({
          center: [lng, lat],
          zoom: z,
        });
        setInitialized(true);
      }
    }
  }, [initialized, latitude, longitude, zoom]);

  const handleParkingSearch = async (
    restrictTags: { key: string; tag: string }[]
  ) => {
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
      const parking = await overpassQuery(bounds, restrictTags);
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
