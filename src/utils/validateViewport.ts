export const validateViewport = (latitude: any, longitude: any, zoom: any) => {
  if (typeof latitude !== "number" || latitude < -90 || latitude > 90) {
    return false;
  }

  if (typeof longitude !== "number" || longitude < -180 || longitude > 180) {
    return false;
  }

  if (typeof zoom !== "number" || zoom < 0 || zoom > 22) {
    return false;
  }

  return true;
};
