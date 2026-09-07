import { Shipment, AvailableDriver } from '../types';

export const INITIAL_SHIPMENTS: Shipment[] = [
  {
    id: 'RR-8041',
    destination: 'North River Depot, Bay 12',
    driver: 'Marcus Vance',
    eta: '10:45 AM',
    delay: '+45 min',
    status: 'Late',
  },
  {
    id: 'RR-3192',
    destination: 'Silverwood Cargo Center',
    driver: 'Elena Rostova',
    eta: '11:10 AM',
    delay: 'None',
    status: 'On time',
  },
  {
    id: 'RR-6420',
    destination: 'East Meadow Logistics Terminal',
    driver: 'Chloe Henderson',
    eta: '11:35 AM',
    delay: '+30 min',
    status: 'Late',
  },
  {
    id: 'RR-1954',
    destination: 'Pine Crest Distribution Point',
    driver: 'Tariq Al-Mansoor',
    eta: '11:50 AM',
    delay: 'None',
    status: 'On time',
  },
  {
    id: 'RR-7713',
    destination: 'Harbor Gate Pier 7 Warehouse',
    driver: 'Samuel O\'Connor',
    eta: '12:15 PM',
    delay: '+55 min',
    status: 'Late',
  },
  {
    id: 'RR-4289',
    destination: 'Oakridge Airfreight Vault',
    driver: 'Nadia Chen',
    eta: '12:30 PM',
    delay: 'None',
    status: 'On time',
  },
  {
    id: 'RR-9055',
    destination: 'Mesa Verde Industrial Park',
    driver: 'Gabriel Santos',
    eta: '01:05 PM',
    delay: 'None',
    status: 'On time',
  },
  {
    id: 'RR-2831',
    destination: 'Highline Rail Yard, Track 4',
    driver: 'Kiran Patel',
    eta: '01:20 PM',
    delay: '+40 min',
    status: 'Late',
  },
  {
    id: 'RR-5164',
    destination: 'Beacon Valley Transfer Hub',
    driver: 'Hannah Lindqvist',
    eta: '01:45 PM',
    delay: 'None',
    status: 'On time',
  },
  {
    id: 'RR-6927',
    destination: 'Lakeview Cold Storage Dock 3',
    driver: 'Devon Brooks',
    eta: '02:10 PM',
    delay: '+60 min',
    status: 'Late',
  },
  {
    id: 'RR-8340',
    destination: 'Cedar Ridge Parcel Annex',
    driver: 'Zachary King',
    eta: '02:30 PM',
    delay: 'None',
    status: 'On time',
  },
  {
    id: 'RR-1498',
    destination: 'Summit Point Regional Depot',
    driver: 'Amira Benali',
    eta: '03:00 PM',
    delay: 'None',
    status: 'On time',
  },
];

export const AVAILABLE_DRIVERS: AvailableDriver[] = [
  {
    id: 'DRV-101',
    name: 'Liam Sterling',
    vehicleNumber: 'VAN-108',
    workload: '0 active deliveries (Idle)',
    arrivalOffsetMinutes: 15,
  },
  {
    id: 'DRV-102',
    name: 'Maya Lin',
    vehicleNumber: 'TRK-412',
    workload: '1 active delivery (Low)',
    arrivalOffsetMinutes: 20,
  },
  {
    id: 'DRV-103',
    name: 'Carlos Mendez',
    vehicleNumber: 'SPR-204',
    workload: '2 active deliveries (Moderate)',
    arrivalOffsetMinutes: 25,
  },
  {
    id: 'DRV-104',
    name: 'Priya Anand',
    vehicleNumber: 'VAN-319',
    workload: '1 active delivery (Low)',
    arrivalOffsetMinutes: 18,
  },
  {
    id: 'DRV-105',
    name: 'Jackson Miller',
    vehicleNumber: 'TRK-580',
    workload: '2 active deliveries (Moderate)',
    arrivalOffsetMinutes: 30,
  },
];

/**
 * Calculates a new arrival time when reassigning to an available driver.
 * Given a base time string (e.g. '10:45 AM') and an arrival offset or recovery,
 * it returns a realistic recovery arrival time earlier than the delayed time.
 */
export function calculateNewArrivalTime(currentEta: string, arrivalOffsetMinutes: number): string {
  // Parse current ETA string (e.g. "10:45 AM" or "01:20 PM")
  const match = currentEta.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return '11:30 AM';

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3].toUpperCase();

  if (period === 'PM' && hours < 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;

  // New driver is positioned closer and recovers ~20-30 minutes off delay
  // We calculate a realistic new arrival time:
  // Base time minus 20 minutes + arrival offset
  let totalMinutes = hours * 60 + minutes - 25 + arrivalOffsetMinutes;
  if (totalMinutes < 0) totalMinutes += 24 * 60;

  const newTotalMinutes = totalMinutes % (24 * 60);
  let newHours = Math.floor(newTotalMinutes / 60);
  const newMinutes = newTotalMinutes % 60;

  const newPeriod = newHours >= 12 ? 'PM' : 'AM';
  if (newHours > 12) newHours -= 12;
  if (newHours === 0) newHours = 12;

  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  return `${pad(newHours)}:${pad(newMinutes)} ${newPeriod}`;
}
