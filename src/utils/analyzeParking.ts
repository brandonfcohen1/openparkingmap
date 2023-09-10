import { area } from "@turf/turf";
import { lngLatBoundsToPolygon } from "./latLngBoundsToPolygon";
import { ParkingAnalysis } from "@/types/ParkingAnalysis";

const m2ToAcres = (m2: number) => {
  return m2 * 0.000247105;
};

export const analyzeParking = ({ parking, bounds }: ParkingAnalysis) => {
  // Get total area of parking
  let totalParkingArea = 0;
  parking.features.forEach((feature) => {
    totalParkingArea += area(feature);
  });
  totalParkingArea = m2ToAcres(totalParkingArea);

  const boundPolygon = lngLatBoundsToPolygon(bounds);
  const boundArea = m2ToAcres(area(boundPolygon));

  return { totalParkingArea, boundArea };
};
