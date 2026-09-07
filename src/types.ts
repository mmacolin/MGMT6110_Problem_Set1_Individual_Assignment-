export type ShipmentStatus = 'On time' | 'Late' | 'Reassigned';

export interface Shipment {
  id: string;
  destination: string;
  driver: string;
  eta: string;
  delay: string;
  status: ShipmentStatus;
}

export interface AvailableDriver {
  id: string;
  name: string;
  vehicleNumber: string;
  workload: string;
  arrivalOffsetMinutes: number; // minutes from current time to arrive
}
