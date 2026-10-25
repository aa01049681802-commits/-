import React from 'react';
import { ArrowRight, Check, ShieldCheck, Zap, Box, Truck, Phone, Sparkles } from 'lucide-react';
import { VehicleId } from '../types';
import { OfficialVehicleLogosBar } from './VehicleBrandLogo';

interface ServicesShowcaseProps {
  onSelectVehicle?: (vId: VehicleId) => void;
}

export const ServicesShowcase: React.FC<ServicesShowcaseProps> = ({ onSelectVehicle }) => {
  return (
    <section id="services" className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 tracking-wide uppercase mb-2">
            <span>스마트 배차 라인업</span>
            <span aria-hidden="true">·</span>
            <span>최적 차량 맞춤 운송</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
            화물 크기와 상황에 딱 맞는 차량을 24시간 실시간 배차합니다
          </h2>
          <p className="mt-3 text-base text-neutral-600">
            소형 급송 서류부터 비·눈 완벽 방수 다마스, 장척물 라보, 1톤~25톤 용달 화물차, 전국 대형 직송 화물까지 완벽한 차량 포트폴리오를 제공합니다.
          </p>
        </div>

        {/* Official 스마트퀵화물 Vehicle Logos Bar (오토바이 / 다마스 / 라보 / 용달) */}
        <div className="mb-14 p-6 bg-neutral-50 rounded-3xl border border-neutral-200">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <h3 className="text-sm font-black text-neutral-900 tracking-tight">
                스마트퀵화물 차종별 공식 로고 & 배차 마크
              </h3>
            </div>
            <span className="text-xs text-neutral-500 font-medium">클릭 시 1544-9541 즉시 통화 연결</span>
          </div>
          <OfficialVehicleLogosBar
            dark={false}
            onSelectVehicle={(v) => {
              if (onSelectVehicle) {
                if (v === 'truck') onSelectVehicle('truck1t');
                else onSelectVehicle(v as VehicleId);
              } else {
                window.location.href = 'tel:1544-9541';
              }
            }}
          />
        </div>

        {/* 3 Dominant Service Cards with Real Generated Photography & Company Badges */}
        <div className="space-y-12">
          {/* Service 1: Motorcycle Quick */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-neutral-50/70 border border-neutral-200 rounded-3xl p-6 sm:p-10 shadow-sm">
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[4/3] bg-neutral-200 shadow-sm">
              <img
                src="/src/assets/images/smart_quick_moto_courier_1792884479574.jpg"
                alt="스마트퀵화물 1544-9541 오토바이 퀵서비스"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Official Branding On Photo: [스마트퀵화물] 오토바이 로고 */}
              <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-950/92 text-white rounded-xl border border-white/20 shadow-lg text-xs font-black backdrop-blur-xs">
                <span className="w-5 h-5 rounded-md bg-blue-600 text-white flex items-center justify-center font-black text-[10px]">SQ</span>
                <span>스마트퀵화물 오토바이</span>
                <span className="text-neutral-500 text-[10px]">|</span>
                <span className="text-amber-400 font-extrabold text-[11px]">1544-9541</span>
              </div>
              <div className="absolute bottom-3 right-3 z-10 px-2.5 py-1 bg-blue-600 text-white text-[11px] font-extrabold rounded-lg shadow-md">
                스마트퀵화물 오토바이
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  01. 도심 초고속 급송
                </span>
                <span aria-hidden="true" className="text-neutral-300">·</span>
                <span className="text-xs font-medium text-neutral-500">평균 20분 픽업</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900">
                스마트퀵화물 오토바이 퀵서비스
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                출퇴근 시간대 정체 구간도 신속하게 통과하여 가장 빠른 시간에 수취인에게 전달합니다.
                중요 계약서, 인감증명서, 긴급 부품, 의류 샘플, 여권 및 분실물 배송에 최적화되어 있습니다.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs text-neutral-700">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>적재 기준: 25kg 미만 / 세 변의 합 90cm 이내</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>보온·보냉 전용 탑박스 장착</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>서울 전역 평균 20분 내 픽업 배차</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>수취인 실명 확인 및 전달 완료 알림</span>
                </div>
              </div>
              <div className="pt-4 flex items-center gap-3">
                <a
                  href="tel:1544-9541"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>오토바이 퀵 1544-9541 즉시 전화 배차</span>
                </a>
              </div>
            </div>
          </div>

          {/* Service 2: Damas & Labo Compact Freight */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-neutral-50/70 border border-neutral-200 rounded-3xl p-6 sm:p-10 shadow-sm">
            <div className="lg:col-span-5 lg:order-2 relative rounded-2xl overflow-hidden aspect-[4/3] bg-neutral-200 shadow-sm">
              <img
                src="/src/assets/images/smart_quick_damas_labo_1792884465629.jpg"
                alt="스마트퀵화물 1544-9541 다마스 및 라보 소형 화물 배송"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Official Branding On Photo: [스마트퀵화물] 다마스 & 라보 로고 */}
              <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-950/92 text-white rounded-xl border border-white/20 shadow-lg text-xs font-black backdrop-blur-xs">
                <span className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center font-black text-[10px]">SQ</span>
                <span>스마트퀵화물 다마스 & 라보</span>
                <span className="text-neutral-500 text-[10px]">|</span>
                <span className="text-amber-400 font-extrabold text-[11px]">1544-9541</span>
              </div>
              <div className="absolute bottom-3 right-3 z-10 px-2.5 py-1 bg-emerald-600 text-white text-[11px] font-extrabold rounded-lg shadow-md">
                스마트퀵화물 다마스 & 라보
              </div>
            </div>

            <div className="lg:col-span-7 lg:order-1 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  02. 우천 안심 & 장척물 특화
                </span>
                <span aria-hidden="true" className="text-neutral-300">·</span>
                <span className="text-xs font-medium text-neutral-500">소형 밴 / 미니 트럭</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900">
                스마트퀵화물 다마스 & 라보 화물 퀵
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                오토바이에는 실을 수 없는 여러 개의 상자나 부피가 큰 짐, 비와 눈으로부터 보호해야 하는 화물은
                완전 밀폐형 다마스 밴과 개방형 적재함을 갖춘 라보 트럭으로 안전하게 운송합니다.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs text-neutral-700">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>다마스: 30kg~400kg (라면박스 15~20개 적재)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>라보: 400kg~1,000kg (길이 긴 건축자재/파이프)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>우천 시 방수 방풍 완전 밀폐 보호</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>꽃바구니, 제과/케이크, IT 장비 흔들림 방지</span>
                </div>
              </div>
              <div className="pt-4 flex items-center gap-3">
                <a
                  href="tel:1544-9541"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>다마스/라보 1544-9541 즉시 전화 배차</span>
                </a>
              </div>
            </div>
          </div>

          {/* Service 3: 1-Ton to 25-Ton Truck & Regional Nationwide Freight */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-neutral-50/70 border border-neutral-200 rounded-3xl p-6 sm:p-10 shadow-sm">
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[4/3] bg-neutral-200 shadow-sm">
              <img
                src="/src/assets/images/smart_quick_truck_cargo_1792884434554.jpg"
                alt="스마트퀵화물 1544-9541 1톤~25톤 용달 화물차 및 전국 직송"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Official Branding On Photo: [스마트퀵화물] 1톤~25톤 용달 화물차 로고 */}
              <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-950/92 text-white rounded-xl border border-white/20 shadow-lg text-xs font-black backdrop-blur-xs">
                <span className="w-5 h-5 rounded-md bg-indigo-600 text-white flex items-center justify-center font-black text-[10px]">SQ</span>
                <span>스마트퀵화물 1톤~25톤 화물차</span>
                <span className="text-neutral-500 text-[10px]">|</span>
                <span className="text-amber-400 font-extrabold text-[11px]">1544-9541</span>
              </div>
              <div className="absolute bottom-3 right-3 z-10 px-2.5 py-1 bg-indigo-600 text-white text-[11px] font-extrabold rounded-lg shadow-md">
                1톤~25톤 용달 화물차
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  03. 원룸·사무실이사 & 전국 간선 대형화물
                </span>
                <span aria-hidden="true" className="text-neutral-300">·</span>
                <span className="text-xs font-medium text-neutral-500">1톤 ~ 25톤 전 차종 배차</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900">
                스마트퀵화물 1톤~25톤 용달 화물차 & 전국 직송
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                원룸·학생 이사, 가구·가전부터 기업 정기 물류, 공장 설비/원자재, 파레트 대량 화물까지!
                1톤 소형 용달부터 2.5톤, 5톤, 11톤, 25톤 대형 트럭까지 카고, 탑차, 윙바디, 리프트 맞춤 배차합니다.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs text-neutral-700">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>1톤~25톤 카고 / 윙바디 / 탑차 / 리프트 전차종</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>파레트 1개 소형부터 최대 16개 이상 대량 운송</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>수도권 전역 및 전국 각 도시간 당일/야간 직송</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>전 차량 적재물 배상책임보험 100% 가입</span>
                </div>
              </div>
              <div className="pt-4 flex items-center gap-3">
                <a
                  href="tel:1544-9541"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>1톤~25톤 화물차 1544-9541 24시 즉시 전화 배차</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

