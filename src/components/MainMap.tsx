import React, { useEffect, useRef } from "react";
import mapboxgl, { LngLatBounds } from "mapbox-gl";
import { FeatureCollection } from "geojson";
import Map, { Source, Layer } from "react-map-gl";
import InfoModal from "./InfoModal";
import LoadingOverlay from "./LoadingOverlay";
import ZoomModal from "./ZoomModal";
import { lngLatBoundsToPolygon } from "@/analysis/latLngBoundsToPolygon";
import MapboxGeocoder, { GeocoderOptions } from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYnJhbmRvbmZjb2hlbiIsImEiOiJjbGZsdXA3Y3cwMHh5NDBwZ29tZmwwMHF5In0.5WrHreoWQq-cjrHoVt4P-w";

interface MainMapProps {
  parkingLots: FeatureCollection;
  loading: boolean;
  bounds: LngLatBounds | undefined;
  savedBounds: LngLatBounds | undefined;
  zoom: number;
  setZoom: (zoom: number) => void;
  showZoomModal: boolean;
  showInfoModal: boolean;
  setShowZoomModal: (showZoomModal: boolean) => void;
  setShowInfoModal: (showInfoModal: boolean) => void;
  setBounds: (bounds: LngLatBounds) => void;
  setSavedBounds: (savedBounds: LngLatBounds) => void;
  initialViewState: {
    longitude: number;
    latitude: number;
    zoom: number;
  };
}

export const MainMap = ({
  parkingLots,
  loading,
  bounds,
  savedBounds,
  zoom,
  setZoom,
  showZoomModal,
  showInfoModal,
  setShowZoomModal,
  setShowInfoModal,
  setBounds,
  setSavedBounds,
  initialViewState,
}: MainMapProps) => {
  const mapRef = useRef<any>(null);
  const geocoderContainerRef = useRef<any>(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current?.getMap();
      const center = map.getCenter();
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker: false,
        proximity: {
          longitude: center.lng,
          latitude: center.lat,
        },
      });
      geocoder.addTo(geocoderContainerRef.current);

      geocoder.on("result", (e) => {
        map.flyTo({
          center: e.result.center,
          zoom: 14,
        });
      });
    }
  }, [mapRef.current]);

  return (
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
        ref={mapRef}
      >
        <div ref={geocoderContainerRef} className="z-1 fixed top-4 right-4" />
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
  );
};
