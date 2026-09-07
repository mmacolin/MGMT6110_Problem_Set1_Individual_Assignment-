import React, { useState } from 'react';
import { Shipment } from './types';
import { INITIAL_SHIPMENTS, AVAILABLE_DRIVERS } from './data/logisticsData';
import { DispatchBoard } from './components/DispatchBoard';
import { ReassignScreen } from './components/ReassignScreen';

export default function App() {
  const [shipments, setShipments] = useState<Shipment[]>(INITIAL_SHIPMENTS);
  const [currentScreen, setCurrentScreen] = useState<'board' | 'reassign'>('board');
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [lastReassignedId, setLastReassignedId] = useState<string | null>(null);

  // Triggered when dispatcher clicks "Reassign" on any late shipment row/card
  const handleStartReassign = (shipment: Shipment) => {
    setSelectedShipment(shipment);
    setCurrentScreen('reassign');
  };

  // Triggered when dispatcher selects driver and presses "Confirm Reassignment"
  const handleConfirmReassignment = (
    shipmentId: string,
    newDriverName: string,
    newEta: string
  ) => {
    setShipments((prevShipments) =>
      prevShipments.map((s) => {
        if (s.id === shipmentId) {
          return {
            ...s,
            driver: newDriverName,
            eta: newEta,
            delay: 'Recovered',
            status: 'Reassigned',
          };
        }
        return s;
      })
    );

    setLastReassignedId(shipmentId);
    setSelectedShipment(null);
    setCurrentScreen('board');
  };

  // Cancel reassign flow and return to dispatch board
  const handleCancelReassign = () => {
    setSelectedShipment(null);
    setCurrentScreen('board');
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 font-sans antialiased">
      <main>
        {currentScreen === 'board' && (
          <DispatchBoard
            shipments={shipments}
            onStartReassign={handleStartReassign}
            lastReassignedId={lastReassignedId}
          />
        )}

        {currentScreen === 'reassign' && selectedShipment && (
          <ReassignScreen
            shipment={selectedShipment}
            availableDrivers={AVAILABLE_DRIVERS}
            onConfirm={handleConfirmReassignment}
            onCancel={handleCancelReassign}
          />
        )}
      </main>
    </div>
  );
}
