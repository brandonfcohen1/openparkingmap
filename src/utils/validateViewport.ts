export const validateViewport = (latitude: any, longitude: any, zoom: any) => {
  const numLatitude = Number(latitude);
  const numLongitude = Number(longitude);
  const numZoom = Number(zoom);

  if (isNaN(numLatitude) || numLatitude < -90 || numLatitude > 90) {
    return false;
  }

  if (isNaN(numLongitude) || numLongitude < -180 || numLongitude > 180) {
    return false;
  }

  if (isNaN(numZoom) || numZoom < 0 || numZoom > 22) {
    return false;
  }

  return true;
};
