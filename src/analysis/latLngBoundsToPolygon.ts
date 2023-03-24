import { LngLatBounds } from "mapbox-gl";
import { Polygon } from "geojson";

export function lngLatBoundsToPolygon(lngLatBounds: LngLatBounds): Polygon {
  const sw = lngLatBounds.getSouthWest();
  const ne = lngLatBounds.getNorthEast();

  const coordinates: number[][] = [
    [sw.lng, sw.lat],
    [sw.lng, ne.lat],
    [ne.lng, ne.lat],
    [ne.lng, sw.lat],
    [sw.lng, sw.lat],
  ];

  const polygon: Polygon = {
    type: "Polygon",
    coordinates: [coordinates],
  };

  return polygon;
}
