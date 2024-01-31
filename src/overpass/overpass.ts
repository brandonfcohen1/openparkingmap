import { LngLatBounds } from "mapbox-gl";
import { FeatureCollection, Position, Feature, Geometry } from "geojson";

export const overpassQuery = async (bounds: LngLatBounds) => {
  const bbox = `${bounds.getSouth()},${bounds.getWest()},${bounds.getNorth()},${bounds.getEast()}`;

  const restrictTags = ["underground"];

  const body = `
  [out:json][bbox:${bbox}];
  (
    way[amenity=parking]${restrictTags
      .map((tag) => `[parking!~"${tag}"]`)
      .join("")};
    relation[amenity=parking]${restrictTags
      .map((tag) => `[parking!~"${tag}"]`)
      .join("")};    
  )->.x1;
  nwr.x1->.result;
  (.result; - .done;)->.result;
  .result out meta geom qt;
`;

  const convertToGeoJSON = async (body: string): Promise<FeatureCollection> => {
    const response = await fetch("https://overpass-api.de/api/interpreter", {
      body,
      method: "POST",
    });
    const data = await response.json();

    const geojson: FeatureCollection = {
      type: "FeatureCollection",
      features: data.elements.map((element: any): Feature => {
        let geometry: Geometry;

        if (element.type === "way") {
          // Single polygon
          geometry = {
            type: "Polygon",
            coordinates: [
              element.geometry.map(
                (latLngObj: any) => [latLngObj.lon, latLngObj.lat] as Position
              ),
            ],
          };
        } else if (
          element.type === "relation" &&
          element.tags.type === "multipolygon"
        ) {
          // Multipolygon
          const coordinates: Position[][][] = [];
          const outerRings: Position[][] = [];
          const innerRings: Position[][] = [];

          element.members.forEach((member: any) => {
            const ring = member.geometry.map(
              (latLngObj: any) => [latLngObj.lon, latLngObj.lat] as Position
            );
            if (member.role === "outer") {
              outerRings.push(ring);
            } else if (member.role === "inner") {
              innerRings.push(ring);
            }
          });

          // Assuming each multipolygon only has one outer ring for simplicity
          // More complex handling may be needed for multiple outer rings
          if (outerRings.length > 0) {
            coordinates.push([outerRings[0], ...innerRings]);
          }

          geometry = {
            type: "MultiPolygon",
            coordinates: coordinates,
          };
        } else {
          // Default or other geometry types
          geometry = {
            type: "GeometryCollection",
            geometries: [],
          };
        }

        return {
          type: "Feature",
          geometry: geometry,
          properties: element.tags,
        };
      }),
    };

    return geojson;
  };

  const geojson = await convertToGeoJSON(body);
  return geojson;
};
