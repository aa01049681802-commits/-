import React from 'react';

export type VehicleLogoType = 'motorcycle' | 'damas' | 'labo' | 'truck' | 'truck_lift';

interface VehicleBrandLogoProps {
  vehicle: VehicleLogoType;
  variant?: 'emblem' | 'badge' | 'compact' | 'photo-tag';
  className?: string;
  showPhone?: boolean;
}

const VEHICLE_CONFIG: Record<
  VehicleLogoType,
  {
    name: string;
    subname: string;
    icon: string;
    color: string;
    borderColor: string;
    textColor: string;
    bgSoft: string;
    accentColor: string;
  }
> = {
  motorcycle: {
    name: '오토바이',
    subname: '도심 초급송',
    icon: '🏍️',
    color: 'bg-blue-600',
    borderColor: 'border-blue-500/40',
    textColor: 'text-blue-400',
    bgSoft: 'bg-blue-950/40',
    accentColor: '#2563eb',
  },
  damas: {
    name: '다마스',
    subname: '우천 안심밴',
    icon: '🚐',
    color: 'bg-emerald-600',
    borderColor: 'border-emerald-500/40',
    textColor: 'text-emerald-400',
    bgSoft: 'bg-emerald-950/40',
    accentColor: '#059669',
  },
  labo: {
    name: '라보',
    subname: '장척물 트럭',
    icon: '🛻',
    color: 'bg-amber-600',
    borderColor: 'border-amber-500/40',
    textColor: 'text-amber-400',
    bgSoft: 'bg-amber-950/40',
    accentColor: '#d97706',
  },
  truck: {
    name: '1톤~25톤 용달 화물차',
    subname: '카고·윙바디·전국직송',
    icon: '🚚',
    color: 'bg-indigo-600',
    borderColor: 'border-indigo-500/40',
    textColor: 'text-indigo-400',
    bgSoft: 'bg-indigo-950/40',
    accentColor: '#4f46e5',
  },
  truck_lift: {
    name: '1톤~5톤 리프트·윙바디',
    subname: '특수상하차·밀폐방수',
    icon: '📦',
    color: 'bg-purple-600',
    borderColor: 'border-purple-500/40',
    textColor: 'text-purple-400',
    bgSoft: 'bg-purple-950/40',
    accentColor: '#7c3aed',
  },
};

export const VehicleBrandLogo: React.FC<VehicleBrandLogoProps> = ({
  vehicle,
  variant = 'badge',
  className = '',
  showPhone = false,
}) => {
  const config = VEHICLE_CONFIG[vehicle] || VEHICLE_CONFIG.motorcycle;

  // 1. Photo-tag: High-contrast badge designed to be placed directly on vehicle photos
  if (variant === 'photo-tag') {
    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-950/95 backdrop-blur-md text-white border border-white/25 shadow-xl ${className}`}
      >
        <span className={`w-5 h-5 rounded-md ${config.color} text-white flex items-center justify-center font-black text-[10px] tracking-tight shrink-0`}>
          SQ
        </span>
        <div className="flex items-center gap-1.5 font-black text-xs tracking-tight">
          <span className="text-white">스마트퀵화물</span>
          <span className={config.textColor}>{config.name}</span>
        </div>
        {showPhone && (
          <>
            <span className="text-neutral-500 text-[10px]">|</span>
            <span className="text-amber-400 font-extrabold text-[11px] tabular-nums">1544-9541</span>
          </>
        )}
      </div>
    );
  }

  // 2. Emblem: Prominent card logo with official "스마트퀵화물" seal
  if (variant === 'emblem') {
    return (
      <div
        className={`relative flex items-center gap-3 p-3 rounded-2xl border transition-all ${config.bgSoft} ${config.borderColor} ${className}`}
      >
        {/* Logo Emblem Icon */}
        <div className="relative shrink-0">
          <div className={`w-11 h-11 rounded-xl ${config.color} flex items-center justify-center shadow-md text-xl`}>
            <span>{config.icon}</span>
          </div>
          <span className="absolute -bottom-1 -right-1 px-1 py-0.2 bg-neutral-950 border border-white/30 text-[9px] font-black text-white rounded-md">
            SQ
          </span>
        </div>

        {/* Brand & Vehicle Typography */}
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-400 bg-neutral-900/80 px-1.5 py-0.5 rounded">
              스마트퀵화물
            </span>
            <span className="text-[10px] text-neutral-400 font-medium">공식인증</span>
          </div>
          <div className="text-sm font-black text-white tracking-tight mt-0.5 flex items-center gap-1">
            <span>{config.name}</span>
            <span className="text-neutral-400 text-xs font-normal">로고</span>
          </div>
          <div className="text-[11px] text-neutral-300 font-medium truncate">{config.subname}</div>
        </div>
      </div>
    );
  }

  // 3. Compact: Inline brand badge
  if (variant === 'compact') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${config.borderColor} ${config.bgSoft} ${className}`}
      >
        <span className="text-sm">{config.icon}</span>
        <span className="font-extrabold text-neutral-800">스마트퀵화물</span>
        <span className={`font-black ${config.textColor}`}>{config.name}</span>
      </span>
    );
  }

  // 4. Default: Standard brand badge
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border ${config.borderColor} bg-neutral-900/90 text-white shadow-sm ${className}`}
    >
      <div className={`w-5 h-5 rounded-md ${config.color} flex items-center justify-center text-[10px] font-black text-white shrink-0`}>
        SQ
      </div>
      <div className="flex items-center gap-1 text-xs font-extrabold">
        <span className="text-white">스마트퀵화물</span>
        <span className={config.textColor}>{config.name}</span>
      </div>
    </div>
  );
};

/**
 * 4 Official Vehicle Brand Logos Bar Component
 * Displays: 스마트퀵화물 오토바이, 스마트퀵화물 다마스, 스마트퀵화물 라보, 스마트퀵화물 용달
 */
export const OfficialVehicleLogosBar: React.FC<{
  onSelectVehicle?: (v: VehicleLogoType) => void;
  className?: string;
  dark?: boolean;
}> = ({ onSelectVehicle, className = '', dark = true }) => {
  const vehicles: VehicleLogoType[] = ['motorcycle', 'damas', 'labo', 'truck'];

  return (
    <div className={`w-full ${className}`}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {vehicles.map((v) => {
          const config = VEHICLE_CONFIG[v];
          return (
            <button
              key={v}
              type="button"
              onClick={() => onSelectVehicle?.(v)}
              className={`p-3.5 rounded-2xl border text-left transition-all group cursor-pointer ${
                dark
                  ? 'bg-neutral-900/80 hover:bg-neutral-850 border-neutral-700/80 hover:border-blue-500/50 shadow-md'
                  : 'bg-white hover:bg-neutral-50 border-neutral-200 hover:border-blue-400 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${config.color} text-white tracking-wider`}>
                  스마트퀵화물
                </span>
                <span className="text-lg group-hover:scale-115 transition-transform">{config.icon}</span>
              </div>
              <div className={`text-sm sm:text-base font-black tracking-tight ${dark ? 'text-white' : 'text-neutral-900'}`}>
                스마트퀵화물 {config.name}
              </div>
              <div className={`text-xs mt-1 font-medium ${dark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                {config.subname}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
