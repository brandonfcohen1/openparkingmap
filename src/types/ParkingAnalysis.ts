import { FeatureCollection } from "geojson";
import { LngLatBounds } from "mapbox-gl";

export interface ParkingAnalysis {
  parking: FeatureCollection;
  bounds: LngLatBounds;
}
