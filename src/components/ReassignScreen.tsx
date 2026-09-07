import React, { useState } from 'react';
import { Shipment, AvailableDriver } from '../types';
import { calculateNewArrivalTime } from '../data/logisticsData';
import { ArrowLeft, User, Truck, Clock, AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ReassignScreenProps {
  shipment: Shipment;
  availableDrivers: AvailableDriver[];
  onConfirm: (shipmentId: string, newDriverName: string, newEta: string) => void;
  onCancel: () => void;
}

export const ReassignScreen: React.FC<ReassignScreenProps> = ({
  shipment,
  availableDrivers,
  onConfirm,
  onCancel,
}) => {
  // Currently selected replacement driver
  const [selectedDriverId, setSelectedDriverId] = useState<string>(
    availableDrivers[0]?.id || ''
  );

  const selectedDriver = availableDrivers.find((d) => d.id === selectedDriverId);
  const calculatedNewEta = selectedDriver
    ? calculateNewArrivalTime(shipment.eta, selectedDriver.arrivalOffsetMinutes)
    : '';

  const handleConfirm = () => {
    if (!selectedDriver) return;
    onConfirm(shipment.id, selectedDriver.name, calculatedNewEta);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Navigation / Back header */}
      <div className="mb-6">
        <button
          id="btn-back-to-board"
          onClick={onCancel}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-950 transition-colors py-2 px-3 rounded-lg hover:bg-slate-200/60 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dispatch Board</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-red-500/20 text-red-300 border border-red-500/30">
                Action Required: Late Shipment
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold mt-1 text-white">
              Reassign Shipment {shipment.id}
            </h1>
            <p className="text-slate-300 text-sm mt-0.5">
              Select an available driver to take over this route and calculate a recovered arrival time.
            </p>
          </div>
        </div>

        {/* Selected Shipment Current Status Card */}
        <div className="p-6 bg-slate-50/80 border-b border-slate-200">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Current Shipment Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Shipment ID & Destination */}
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 font-medium">Selected Shipment</span>
              <p className="font-mono font-bold text-slate-900 mt-1">{shipment.id}</p>
              <p className="text-xs text-slate-600 mt-0.5 truncate">{shipment.destination}</p>
            </div>

            {/* Current Driver */}
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 font-medium">Current Driver</span>
              <div className="flex items-center gap-1.5 mt-1">
                <User className="w-4 h-4 text-slate-400" />
                <p className="font-semibold text-slate-900 text-sm">{shipment.driver}</p>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Assigned driver</p>
            </div>

            {/* Current ETA */}
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 font-medium">Current ETA</span>
              <div className="flex items-center gap-1.5 mt-1">
                <Clock className="w-4 h-4 text-slate-400" />
                <p className="font-mono font-bold text-slate-900 text-sm">{shipment.eta}</p>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Projected arrival</p>
            </div>

            {/* Delay */}
            <div className="bg-red-50/80 p-4 rounded-xl border border-red-200">
              <span className="text-xs text-red-700 font-medium">Delay</span>
              <div className="flex items-center gap-1.5 mt-1">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <p className="font-bold text-red-800 text-sm">{shipment.delay}</p>
              </div>
              <p className="text-xs text-red-600 mt-0.5">Schedule slip</p>
            </div>
          </div>
        </div>

        {/* Available Drivers List */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Available Drivers for Reassignment
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Select one driver from the queue to receive this route dispatch.
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              {availableDrivers.length} Drivers On Standby
            </span>
          </div>

          <div className="space-y-3">
            {availableDrivers.map((driver) => {
              const isSelected = driver.id === selectedDriverId;
              const newEta = calculateNewArrivalTime(shipment.eta, driver.arrivalOffsetMinutes);

              return (
                <div
                  key={driver.id}
                  id={`driver-option-${driver.id}`}
                  onClick={() => setSelectedDriverId(driver.id)}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50/50 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  {/* Left: Radio + Driver info */}
                  <div className="flex items-start sm:items-center gap-3.5">
                    {/* Custom Radio check */}
                    <div
                      className={`w-5 h-5 mt-0.5 sm:mt-0 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'border-amber-600 bg-amber-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-base">
                          {driver.name}
                        </span>
                        <span className="inline-flex items-center gap-1 font-mono text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                          <Truck className="w-3 h-3 text-slate-500" />
                          {driver.vehicleNumber}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 mt-1">
                        Workload: <span className="font-semibold text-slate-800">{driver.workload}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: New Estimated Arrival Time */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 pl-8 sm:pl-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/80">
                    <div className="text-left sm:text-right">
                      <div className="text-xs text-slate-500">New Estimated Arrival</div>
                      <div className="font-mono font-bold text-base text-emerald-800 flex items-center gap-1.5 sm:justify-end">
                        <Clock className="w-4 h-4 text-emerald-600" />
                        <span>{newEta}</span>
                      </div>
                    </div>

                    {isSelected && (
                      <span className="hidden sm:inline-flex px-2 py-1 bg-amber-100 text-amber-900 rounded text-xs font-semibold items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
                        Selected
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Confirmation Banner */}
          {selectedDriver && (
            <div className="mt-6 p-4 rounded-xl bg-slate-100 border border-slate-300 text-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-slate-700 shrink-0" />
                <div className="text-sm">
                  <span className="font-semibold text-slate-900">Summary:</span> Assign{' '}
                  <span className="font-bold">{shipment.id}</span> to{' '}
                  <span className="font-bold text-slate-900">{selectedDriver.name}</span> ({selectedDriver.vehicleNumber}). New ETA:{' '}
                  <span className="font-mono font-bold text-emerald-800">{calculatedNewEta}</span>.
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 pt-6 border-t border-slate-200 flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
            <button
              id="btn-cancel-reassign"
              onClick={onCancel}
              className="w-full sm:w-auto px-6 py-3 rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 font-semibold text-sm transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              id="btn-confirm-reassignment"
              disabled={!selectedDriver}
              onClick={handleConfirm}
              className="w-full sm:w-auto px-8 py-3 rounded-lg text-white bg-amber-600 hover:bg-amber-700 active:bg-amber-800 disabled:opacity-50 font-bold text-sm tracking-wide shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 cursor-pointer"
            >
              Confirm Reassignment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
