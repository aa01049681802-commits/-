import React, { useState } from 'react';
import { Phone, Menu, X, ArrowUpRight, Globe } from 'lucide-react';

interface NavbarProps {
  onSelectTab?: (sectionId: string) => void;
  onOpenWebmaster?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSelectTab, onOpenWebmaster }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    if (onSelectTab) onSelectTab(id);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Brand Wordmark (Single clean element) */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-neutral-900 whitespace-nowrap shrink-0 hover:text-blue-700 transition-colors"
          >
            <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-sm tracking-tighter shadow-sm">
              SQ
            </span>
            <span>스마트퀵화물</span>
          </a>

          {/* Zone 2: Concise navigation links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-neutral-600">
            <button
              onClick={() => scrollTo('services')}
              className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              차량·서비스
            </button>
            <button
              onClick={() => scrollTo('promotions')}
              className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer font-semibold text-blue-700"
            >
              홍보실
            </button>
            <button
              onClick={() => scrollTo('notices')}
              className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              이용안내·FAQ
            </button>
            <button
              type="button"
              onClick={onOpenWebmaster}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 hover:text-blue-700 rounded-lg border border-neutral-300 transition-colors cursor-pointer whitespace-nowrap shadow-2xs"
              title="네이버·다음·구글 웹마스터도구 자동등록 및 사이트맵 관리"
            >
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>웹마스터도구</span>
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action (Direct Click-to-Call 1544-9541) */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href="tel:1544-9541"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
              title="24시간 고객센터 즉시 통화 연결"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>전화접수 1544-9541</span>
            </a>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="tel:1544-9541"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg whitespace-nowrap shrink-0"
            >
              <Phone className="w-3 h-3" />
              <span>1544-9541</span>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200 bg-white px-4 pt-2 pb-4 space-y-2">
          <button
            onClick={() => scrollTo('services')}
            className="w-full text-left px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-md"
          >
            차량·서비스 안내
          </button>
          <button
            onClick={() => scrollTo('promotions')}
            className="w-full text-left px-3 py-2 text-sm font-semibold text-blue-600 hover:bg-neutral-50 rounded-md"
          >
            홍보실 (현장 갤러리)
          </button>
          <button
            onClick={() => scrollTo('notices')}
            className="w-full text-left px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-md"
          >
            이용안내 및 FAQ
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenWebmaster?.();
            }}
            className="w-full text-left px-3 py-2 text-sm font-bold text-neutral-800 hover:bg-neutral-50 rounded-md flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600" />
              <span>웹마스터도구 자동등록</span>
            </span>
            <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-1.5 py-0.5 rounded">
              네이버·다음·구글
            </span>
          </button>
          <div className="pt-2 border-t border-neutral-100">
            <a
              href="tel:1544-9541"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600 text-white font-medium text-sm rounded-lg"
            >
              <Phone className="w-4 h-4" />
              <span>24시간 고객센터 1544-9541 통화</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
