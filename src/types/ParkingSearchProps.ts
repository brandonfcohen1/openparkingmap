export interface ParkingSearchProps {
  handleParkingSearch: () => void;
  loading: boolean;
  parkingArea: number;
  windowBoundArea: number;
  setShowInfoModal: (show: boolean) => void;
  error: boolean;
  downloadData: () => void;
}
