import { Phone, Calculator, ShieldCheck, Clock, Truck, HelpCircle, Sparkles, Send } from 'lucide-react';

interface HeroProps {
  onScrollToServices?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section className="relative overflow-hidden bg-neutral-900 text-white py-12 lg:py-16 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Tag */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-neutral-800">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold text-blue-400 tracking-wide uppercase">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
            <span>[스마트퀵화물 1544-9541]</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>오토바이 · 다마스 · 라보 · 1톤~25톤 용달 화물차 공식 배차</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-neutral-300">
            <span className="text-blue-400">365일 24시간 연중무휴</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>수도권 전역 평균 20분 픽업</span>
          </div>
        </div>

        {/* 2-Column Split: Text Left, Unobstructed 4-Vehicle Photo Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Headline, Description & Direct CTAs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="inline-block px-3 py-1 bg-blue-600/20 text-blue-400 rounded-lg text-xs font-bold border border-blue-500/30">
                24시간 전국 실시간 배차 시스템
              </span>

              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight"
                style={{ textWrap: 'balance' }}
              >
                수도권 평균 20분, <br />
                <span className="text-blue-400">오토바이·다마스·라보·1톤~25톤</span> <br />
                즉시 배차 완료
              </h1>

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-medium">
                긴급 서류 오토바이 퀵부터 비·눈 안심 다마스, 장척물 라보, 원룸이사부터 기업 대형화물 1톤~25톤 용달 화물차까지.
                출발지 인근 최단거리 전문 기사를 실시간 매칭합니다.
              </p>
            </div>

            {/* Prominent Direct Phone Call CTA */}
            <div className="space-y-3 pt-2">
              <a
                href="tel:1544-9541"
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 text-base sm:text-lg font-black text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-2xl shadow-xl shadow-blue-600/40 transition-all cursor-pointer"
              >
                <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>1544-9541 24시간 즉시 전화상담 & 배차</span>
              </a>

              <div className="flex items-center gap-2.5 pt-1">
                <a
                  href="#services"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-neutral-800/80 hover:bg-neutral-800 text-xs font-bold text-neutral-300 hover:text-white rounded-xl transition-colors border border-neutral-700/80 cursor-pointer"
                >
                  <Truck className="w-3.5 h-3.5 text-blue-400" />
                  <span>차종별 적재규격</span>
                </a>
                <a
                  href="#promotions"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-neutral-800/80 hover:bg-neutral-800 text-xs font-bold text-neutral-300 hover:text-white rounded-xl transition-colors border border-neutral-700/80 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span>홍보실 현장갤러리</span>
                </a>
                <a
                  href="#notices"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-neutral-800/80 hover:bg-neutral-800 text-xs font-bold text-neutral-300 hover:text-white rounded-xl transition-colors border border-neutral-700/80 cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
                  <span>이용안내·FAQ</span>
                </a>
              </div>
            </div>

            {/* 4 Official Vehicle Badges with [스마트퀵화물] Logo */}
            <div className="pt-2">
              <div className="text-[11px] font-bold text-neutral-400 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>스마트퀵화물 차종별 공식 로고 & 전용 배차</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                {/* 1. Motorcycle */}
                <div className="bg-neutral-800/80 hover:bg-neutral-800 p-2.5 rounded-xl border border-blue-500/30 text-center transition-all group">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-blue-600 text-white">
                      스마트퀵화물
                    </span>
                  </div>
                  <div className="font-black text-white text-xs flex items-center justify-center gap-1">
                    <span>🏍️</span>
                    <span>오토바이</span>
                  </div>
                  <div className="text-[11px] text-blue-300 font-medium mt-0.5">25kg 미만 서류</div>
                </div>

                {/* 2. Damas */}
                <div className="bg-neutral-800/80 hover:bg-neutral-800 p-2.5 rounded-xl border border-emerald-500/30 text-center transition-all group">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-emerald-600 text-white">
                      스마트퀵화물
                    </span>
                  </div>
                  <div className="font-black text-white text-xs flex items-center justify-center gap-1">
                    <span>🚐</span>
                    <span>다마스</span>
                  </div>
                  <div className="text-[11px] text-emerald-300 font-medium mt-0.5">우천 안심밴</div>
                </div>

                {/* 3. Labo */}
                <div className="bg-neutral-800/80 hover:bg-neutral-800 p-2.5 rounded-xl border border-amber-500/30 text-center transition-all group">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-amber-600 text-white">
                      스마트퀵화물
                    </span>
                  </div>
                  <div className="font-black text-white text-xs flex items-center justify-center gap-1">
                    <span>🛻</span>
                    <span>라보</span>
                  </div>
                  <div className="text-[11px] text-amber-300 font-medium mt-0.5">장척물 트럭</div>
                </div>

                {/* 4. Yongdal */}
                <div className="bg-neutral-800/80 hover:bg-neutral-800 p-2.5 rounded-xl border border-indigo-500/30 text-center transition-all group">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-indigo-600 text-white">
                      스마트퀵화물
                    </span>
                  </div>
                  <div className="font-black text-white text-xs flex items-center justify-center gap-1">
                    <span>🚚</span>
                    <span>1톤~25톤 용달</span>
                  </div>
                  <div className="text-[11px] text-indigo-300 font-medium mt-0.5">화물차·전국직송</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 100% Unobstructed, Bright 4-Vehicle Lineup Photo */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden border-2 border-neutral-700 shadow-2xl bg-neutral-950 group">
              {/* The Photo: Full Brightness, Zero Dark Scrim Over Vehicles */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-neutral-900">
                <img
                  src="/src/assets/images/smart_quick_fleet_all_1792884451309.jpg"
                  alt="스마트퀵화물 1544-9541 오토바이, 다마스, 라보, 용달 4종 전용 차량 라인업"
                  className="w-full h-full object-cover object-center brightness-105 contrast-105 group-hover:scale-102 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />

                {/* Top-Left Company & Phone Badge On Photo: [스마트퀵화물 1544-9541] */}
                <div className="absolute top-3.5 left-3.5 z-10 inline-flex items-center gap-2 px-3.5 py-2 bg-neutral-950/92 backdrop-blur-md text-white rounded-xl border border-white/25 shadow-xl">
                  <span className="w-5 h-5 rounded-md bg-blue-600 text-white flex items-center justify-center font-black text-[11px]">
                    SQ
                  </span>
                  <span className="text-xs sm:text-sm font-black tracking-tight text-white">
                    [스마트퀵화물 1544-9541]
                  </span>
                </div>

                {/* Top-Right Official Badge */}
                <div className="absolute top-3.5 right-3.5 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-[11px] font-black rounded-xl shadow-lg">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>적재물보험 100%</span>
                </div>

                {/* 4 Vehicle Callout Indicators with Official [스마트퀵화물] Logo Placed Cleanly at the Bottom */}
                <div className="absolute bottom-3 inset-x-3 z-10 grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
                  <div className="bg-neutral-950/92 backdrop-blur-md p-2 rounded-xl border border-blue-500/40 text-center shadow-lg">
                    <div className="text-[9px] font-black text-blue-400 bg-blue-950/60 rounded px-1 py-0.2 inline-block">
                      스마트퀵화물
                    </div>
                    <span className="block text-xs font-black text-white mt-0.5">🏍️ 오토바이</span>
                    <span className="hidden sm:block text-[10px] text-neutral-300 font-medium">도심 초급송</span>
                  </div>
                  <div className="bg-neutral-950/92 backdrop-blur-md p-2 rounded-xl border border-emerald-500/40 text-center shadow-lg">
                    <div className="text-[9px] font-black text-emerald-400 bg-emerald-950/60 rounded px-1 py-0.2 inline-block">
                      스마트퀵화물
                    </div>
                    <span className="block text-xs font-black text-white mt-0.5">🚐 다마스</span>
                    <span className="hidden sm:block text-[10px] text-neutral-300 font-medium">우천 안심밴</span>
                  </div>
                  <div className="bg-neutral-950/92 backdrop-blur-md p-2 rounded-xl border border-amber-500/40 text-center shadow-lg">
                    <div className="text-[9px] font-black text-amber-400 bg-amber-950/60 rounded px-1 py-0.2 inline-block">
                      스마트퀵화물
                    </div>
                    <span className="block text-xs font-black text-white mt-0.5">🛻 라보</span>
                    <span className="hidden sm:block text-[10px] text-neutral-300 font-medium">장척물 트럭</span>
                  </div>
                  <div className="bg-neutral-950/92 backdrop-blur-md p-2 rounded-xl border border-indigo-500/40 text-center shadow-lg">
                    <div className="text-[9px] font-black text-indigo-400 bg-indigo-950/60 rounded px-1 py-0.2 inline-block">
                      스마트퀵화물
                    </div>
                    <span className="block text-xs font-black text-white mt-0.5">🚚 1톤~25톤 용달</span>
                    <span className="hidden sm:block text-[10px] text-neutral-300 font-medium">화물차·전국직송</span>
                  </div>
                </div>
              </div>

              {/* Bottom Strip of the Frame */}
              <div className="p-3 bg-neutral-950 flex items-center justify-between text-xs text-neutral-300 border-t border-neutral-800 px-4">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                  <span>스마트퀵화물 24시 접수: 1544-9541</span>
                </span>
                <span className="text-[11px] text-neutral-400 font-medium">
                  수도권 ↔ 전국 당일 직송 배송망 완비
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Key Quantitative Metrics Full-Width Strip Below */}
        <div className="mt-12 pt-8 border-t border-neutral-800 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="bg-neutral-800/40 p-4 rounded-2xl border border-neutral-800">
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight tabular-nums">
              20<span className="text-sm font-normal text-neutral-400 ml-1">분 내</span>
            </div>
            <p className="mt-1 text-xs text-neutral-400 font-medium">수도권 평균 픽업 배차</p>
          </div>

          <div className="bg-neutral-800/40 p-4 rounded-2xl border border-neutral-800">
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight tabular-nums">
              100<span className="text-sm font-normal text-neutral-400 ml-1">%</span>
            </div>
            <p className="mt-1 text-xs text-neutral-400 font-medium">적재물 배상책임보험</p>
          </div>

          <div className="bg-neutral-800/40 p-4 rounded-2xl border border-neutral-800">
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight tabular-nums">
              365<span className="text-sm font-normal text-neutral-400 ml-1">일 24시</span>
            </div>
            <p className="mt-1 text-xs text-neutral-400 font-medium">심야·주말 상시 접수</p>
          </div>

          <div className="bg-neutral-800/40 p-4 rounded-2xl border border-neutral-800">
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight tabular-nums">
              10,000<span className="text-sm font-normal text-neutral-400 ml-1">+ 대</span>
            </div>
            <p className="mt-1 text-xs text-neutral-400 font-medium">전국 통합 배차망</p>
          </div>
        </div>
      </div>
    </section>
  );
};
