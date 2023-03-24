import React, { useEffect, useRef } from "react";
import mapboxgl, { LngLatBounds } from "mapbox-gl";
import { FeatureCollection } from "geojson";
import Map, { Source, Layer, GeolocateControl } from "react-map-gl";
import InfoModal from "./InfoModal";
import LoadingOverlay from "./LoadingOverlay";
import ZoomModal from "./ZoomModal";
import { lngLatBoundsToPolygon } from "@/analysis/latLngBoundsToPolygon";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYnJhbmRvbmZjb2hlbiIsImEiOiJjbGZsdXA3Y3cwMHh5NDBwZ29tZmwwMHF5In0.5WrHreoWQq-cjrHoVt4P-w";

interface Viewport {
  longitude: number;
  latitude: number;
  zoom: number;
}

interface MainMapProps {
  parkingLots: FeatureCollection;
  loading: boolean;
  savedBounds: LngLatBounds | undefined;
  showZoomModal: boolean;
  showInfoModal: boolean;
  setShowZoomModal: (showZoomModal: boolean) => void;
  setShowInfoModal: (showInfoModal: boolean) => void;
  setBounds: (bounds: LngLatBounds) => void;
  viewport: Viewport;
  setViewport: (viewport: Viewport) => void;
}

export const MainMap = ({
  parkingLots,
  loading,
  savedBounds,
  showZoomModal,
  showInfoModal,
  setShowZoomModal,
  setShowInfoModal,
  setBounds,
  viewport,
  setViewport,
}: MainMapProps) => {
  const mapRef = useRef<any>(null);
  const geocoderContainerRef = useRef<any>(null);
  const geolocateControlRef = useRef<any>(null);

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
        initialViewState={viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onMoveEnd={async (e) => {
          setBounds(e.target.getBounds());
          setViewport({
            longitude: e.target.getCenter().lng,
            latitude: e.target.getCenter().lat,
            zoom: e.target.getZoom(),
          });
        }}
        onRender={(e) => {
          setBounds(e.target.getBounds());
        }}
        ref={mapRef}
      >
        <div className="z-1 absolute bottom-4 left-4">
          <GeolocateControl
            ref={geolocateControlRef}
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
            onGeolocate={(pos) => {
              setViewport({
                ...viewport,
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
              });
            }}
          />
        </div>
        <div ref={geocoderContainerRef} className="z-1 fixed top-2 right-12" />
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
