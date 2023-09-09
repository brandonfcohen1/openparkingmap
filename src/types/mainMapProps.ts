import { Viewport } from "@/types/viewport";
import { LngLatBounds } from "mapbox-gl";
import { FeatureCollection } from "geojson";

export interface MainMapProps {
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
  mapRef: React.RefObject<any>;
}
