export interface ParkingSearchProps {
  handleParkingSearch: (restrictTags: { key: string; tag: string }[]) => void;
  loading: boolean;
  parkingArea: number;
  windowBoundArea: number;
  setShowInfoModal: (show: boolean) => void;
  error: boolean;
  downloadData: () => void;
}
