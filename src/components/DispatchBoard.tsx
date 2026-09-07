import React from 'react';
import { Shipment } from '../types';
import { Truck, Clock, AlertCircle, CheckCircle2, RefreshCw, MapPin, User } from 'lucide-react';

interface DispatchBoardProps {
  shipments: Shipment[];
  onStartReassign: (shipment: Shipment) => void;
  lastReassignedId?: string | null;
}

export const DispatchBoard: React.FC<DispatchBoardProps> = ({
  shipments,
  onStartReassign,
  lastReassignedId,
}) => {
  const lateCount = shipments.filter((s) => s.status === 'Late').length;
  const reassignedCount = shipments.filter((s) => s.status === 'Reassigned').length;
  const onTimeCount = shipments.filter((s) => s.status === 'On time').length;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-slate-900 text-white rounded-lg">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                RouteRelay
              </h1>
              <p className="text-sm sm:text-base text-slate-600">
                Internal Logistics Dispatch Board
              </p>
            </div>
          </div>
        </div>

        {/* Status Metrics */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
            <span>Late: {lateCount}</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-sm font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span>Reassigned: {reassignedCount}</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            <span>On Time: {onTimeCount}</span>
          </div>
        </div>
      </div>

      {/* Confirmation feedback banner if an item was just reassigned */}
      {lastReassignedId && (
        <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 flex items-center justify-between shadow-sm animate-fade-in">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5 text-amber-600 shrink-0" />
            <p className="text-sm sm:text-base font-medium">
              Shipment <span className="font-bold">{lastReassignedId}</span> has been reassigned. The row status is now <span className="font-bold text-amber-800">Reassigned (Amber)</span>.
            </p>
          </div>
        </div>
      )}

      {/* Legend & Instructions */}
      <div className="mt-6 mb-4 flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm text-slate-600 gap-2">
        <p>
          Showing <span className="font-bold text-slate-800">{shipments.length}</span> active shipments in dispatch queue.
        </p>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Green = On time
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500"></span> Red = Late (actionable)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Amber = Reassigned
          </span>
        </div>
      </div>

      {/* Desktop View: Full Table */}
      <div className="hidden md:block bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/80 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                <th className="py-3.5 px-4">Shipment ID</th>
                <th className="py-3.5 px-4">Destination</th>
                <th className="py-3.5 px-4">Driver</th>
                <th className="py-3.5 px-4">ETA</th>
                <th className="py-3.5 px-4">Delay</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {shipments.map((shipment) => {
                const isLate = shipment.status === 'Late';
                const isReassigned = shipment.status === 'Reassigned';
                const isOnTime = shipment.status === 'On time';

                // Row background and accent styling based on status
                let rowBgClass = 'bg-white hover:bg-slate-50/80';
                if (isLate) {
                  rowBgClass = 'bg-red-50/80 hover:bg-red-100/60 border-l-4 border-l-red-600';
                } else if (isReassigned) {
                  rowBgClass = 'bg-amber-50/70 hover:bg-amber-100/50 border-l-4 border-l-amber-500';
                } else {
                  rowBgClass = 'bg-white hover:bg-emerald-50/20 border-l-4 border-l-emerald-500';
                }

                return (
                  <tr
                    key={shipment.id}
                    id={`shipment-row-${shipment.id}`}
                    className={`transition-colors ${rowBgClass}`}
                  >
                    {/* Shipment ID */}
                    <td className="py-4 px-4 font-mono font-bold text-slate-900 text-sm whitespace-nowrap">
                      {shipment.id}
                    </td>

                    {/* Destination */}
                    <td className="py-4 px-4 text-sm font-medium text-slate-800">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                        <span>{shipment.destination}</span>
                      </div>
                    </td>

                    {/* Driver */}
                    <td className="py-4 px-4 text-sm text-slate-800">
                      <div className="flex items-center gap-1.5">
                        <User className="w-4 h-4 text-slate-400 shrink-0" />
                        <span className="font-medium">{shipment.driver}</span>
                      </div>
                    </td>

                    {/* ETA */}
                    <td className="py-4 px-4 text-sm font-mono font-semibold text-slate-900 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                        <span>{shipment.eta}</span>
                      </div>
                    </td>

                    {/* Delay */}
                    <td className="py-4 px-4 text-sm whitespace-nowrap">
                      {isLate ? (
                        <span className="font-semibold text-red-700 bg-red-100/80 px-2 py-0.5 rounded text-xs">
                          {shipment.delay}
                        </span>
                      ) : (
                        <span className="text-slate-500 text-xs">
                          {shipment.delay}
                        </span>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      {isOnTime && (
                        <span
                          id={`status-badge-${shipment.id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          On time
                        </span>
                      )}
                      {isLate && (
                        <span
                          id={`status-badge-${shipment.id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-300 animate-pulse"
                        >
                          <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                          Late
                        </span>
                      )}
                      {isReassigned && (
                        <span
                          id={`status-badge-${shipment.id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300"
                        >
                          <RefreshCw className="w-3.5 h-3.5 text-amber-700" />
                          Reassigned
                        </span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      {isLate ? (
                        <button
                          id={`btn-reassign-${shipment.id}`}
                          onClick={() => onStartReassign(shipment)}
                          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-sm font-semibold rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 cursor-pointer"
                        >
                          <span>Reassign</span>
                        </button>
                      ) : isReassigned ? (
                        <span className="text-xs font-medium text-amber-800 bg-amber-100/70 px-2.5 py-1 rounded border border-amber-200 inline-block">
                          Updated
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400 font-mono">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile View: Cards */}
      <div className="block md:hidden space-y-4">
        {shipments.map((shipment) => {
          const isLate = shipment.status === 'Late';
          const isReassigned = shipment.status === 'Reassigned';
          const isOnTime = shipment.status === 'On time';

          let cardBorderClass = 'border-slate-200 bg-white';
          if (isLate) {
            cardBorderClass = 'border-l-4 border-l-red-600 border-red-200 bg-red-50/60';
          } else if (isReassigned) {
            cardBorderClass = 'border-l-4 border-l-amber-500 border-amber-200 bg-amber-50/60';
          } else {
            cardBorderClass = 'border-l-4 border-l-emerald-500 border-slate-200 bg-white';
          }

          return (
            <div
              key={shipment.id}
              id={`shipment-card-${shipment.id}`}
              className={`p-4 rounded-xl border shadow-xs transition-colors ${cardBorderClass}`}
            >
              {/* Top Row: ID & Status */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
                <span className="font-mono font-bold text-base text-slate-900">
                  {shipment.id}
                </span>

                {isOnTime && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    On time
                  </span>
                )}
                {isLate && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-300">
                    <AlertCircle className="w-3 h-3 text-red-600" />
                    Late
                  </span>
                )}
                {isReassigned && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                    <RefreshCw className="w-3 h-3 text-amber-700" />
                    Reassigned
                  </span>
                )}
              </div>

              {/* Destination */}
              <div className="mt-3">
                <div className="text-xs text-slate-500 font-medium">Destination</div>
                <div className="text-sm font-semibold text-slate-800 flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{shipment.destination}</span>
                </div>
              </div>

              {/* Driver & ETA grid */}
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm bg-white/70 p-2.5 rounded-lg border border-slate-200/60">
                <div>
                  <div className="text-xs text-slate-500">Driver</div>
                  <div className="font-medium text-slate-900 mt-0.5 truncate">
                    {shipment.driver}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">ETA / Delay</div>
                  <div className="font-mono font-semibold text-slate-900 mt-0.5">
                    {shipment.eta}{' '}
                    {isLate && (
                      <span className="text-xs text-red-700 font-bold ml-1">
                        ({shipment.delay})
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button for mobile */}
              {isLate && (
                <div className="mt-4 pt-3 border-t border-red-200/60">
                  <button
                    id={`btn-mobile-reassign-${shipment.id}`}
                    onClick={() => onStartReassign(shipment)}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-lg shadow-xs transition-colors cursor-pointer text-sm"
                  >
                    <span>Reassign Late Shipment</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
