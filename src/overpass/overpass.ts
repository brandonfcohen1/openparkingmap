import { LngLatBounds } from "mapbox-gl";
import { FeatureCollection, Position, Feature } from "geojson";

export const overpassQuery = async (bounds: LngLatBounds) => {
  const bbox = `${bounds.getSouth()},${bounds.getWest()},${bounds.getNorth()},${bounds.getEast()}`;

  const restrictTags = [
    "underground",
    "multi-storey",
    "sheds",
    "garage_boxes",
    "carport",
  ];

  const body = `
  [out:json][bbox:${bbox}];
  (way[amenity=parking]${restrictTags
    .map((tag: string) => `[amenity!~"${tag}"]`)
    .join("")};)->.x1;nwr.x1->.result;
  (.result; - .done;)->.result;
  .result out meta geom qt;
  `;

  const response = await fetch("https://overpass-api.de/api/interpreter", {
    body,
    method: "POST",
  });
  const data = await response.json();
  const geojson = {
    type: "FeatureCollection",
    features: data.elements.map(
      (element: any) =>
        ({
          type: "Feature",
          geometry: {
            coordinates: [
              element.geometry.map(
                (latLngObj: any) => [latLngObj.lon, latLngObj.lat] as Position
              ),
            ],
            type: "Polygon",
          },
          properties: element.tags,
        } as Feature)
    ),
  } as FeatureCollection;
  return geojson;
};
