import { ViewportProps } from "@/types/ViewportProps";
import { LngLatBounds } from "mapbox-gl";
import { FeatureCollection } from "geojson";
import { MapRef } from "react-map-gl";

export interface MapProps {
  parkingLots: FeatureCollection;
  loading: boolean;
  savedBounds: LngLatBounds | undefined;
  showZoomModal: boolean;
  showInfoModal: boolean;
  setShowZoomModal: (showZoomModal: boolean) => void;
  setShowInfoModal: (showInfoModal: boolean) => void;
  setBounds: (bounds: LngLatBounds) => void;
  viewport: ViewportProps;
  setViewport: (viewport: ViewportProps) => void;
}
