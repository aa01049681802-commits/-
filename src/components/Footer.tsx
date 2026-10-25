import React from 'react';
import { Phone, ShieldCheck, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-400 py-16 border-t border-neutral-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-800">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-lg tracking-tight">
              <span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-xs">
                SQ
              </span>
              <span>스마트퀵화물</span>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              서울·경기 수도권 및 전국 365일 24시간 연중무휴 종합 퀵서비스 & 화물 운송 전문 기업입니다.
              전 차량 적재물 배상책임보험 100% 가입으로 언제나 안전하고 신속하게 운송합니다.
            </p>
            <div className="pt-2 flex items-center gap-2 text-blue-400 font-semibold text-xs">
              <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
              <span>적재물 배상책임보험 100% 가입 보증</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">운송 서비스</h4>
            <ul className="space-y-1.5 text-xs text-neutral-400">
              <li>오토바이 퀵서비스 (도심 긴급서류)</li>
              <li>다마스 퀵 (소형 밴 / 우천 방수)</li>
              <li>라보 퀵 (장척물 / 개방 소형화물)</li>
              <li>1톤~25톤 용달 화물차 (원룸이사 / 기업대형화물 / 전국직송)</li>
              <li>지방 화물 (전국 직송 / 혼적 합짐)</li>
              <li>기업 정기 물류 제휴 (월말 후불결제)</li>
              <li><a href="#promotions" className="text-blue-400 hover:underline">홍보실 (현장 배송 갤러리)</a></li>
            </ul>
          </div>

          {/* Customer Call Center */}
          <div className="md:col-span-4 space-y-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-2">24시간 고객센터</h4>
            <a
              href="tel:1544-9541"
              className="inline-block text-2xl sm:text-3xl font-extrabold text-white hover:text-blue-400 transition-colors tabular-nums"
            >
              1544-9541
            </a>
            <p className="text-[11px] text-neutral-400 leading-normal">
              운영시간: 365일 24시간 연중무휴 (야간·주말·공휴일 상시접수) <br />
              결제지원: 신용카드 / 전자세금계산서 / 현금영수증 / 기업 월결제
            </p>
          </div>
        </div>

        {/* Business Registration Details (Verified company details) */}
        <div className="pt-8 space-y-2 text-[11px] text-neutral-400 leading-relaxed">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span><strong className="text-neutral-300">상호:</strong> 스마트퀵화물 (스마트퀵&용달)</span>
            <span><strong className="text-neutral-300">대표자:</strong> 조일형</span>
            <span><strong className="text-neutral-300">사업자등록번호:</strong> 206-27-40140</span>
            <span><strong className="text-neutral-300">통신판매업신고:</strong> 제 2014-서울광진-0589호</span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span><strong className="text-neutral-300">대표전화:</strong> 1544-9541</span>
            <span><strong className="text-neutral-300">사업장 주소:</strong> 서울특별시 광진구 능동로</span>
            <span><strong className="text-neutral-300">개인정보보호책임자:</strong> 관리자 (admin@smartquick.kr)</span>
          </div>
          <p className="pt-2 text-neutral-400">
            Copyright © 스마트퀵화물 All Rights Reserved. 본 사이트의 모든 콘텐츠는 저작권법의 보호를 받습니다.
          </p>
        </div>
      </div>
    </footer>
  );
};
