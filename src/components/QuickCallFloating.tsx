import React from 'react';
import { Phone } from 'lucide-react';

export const QuickCallFloating: React.FC = () => {
  return (
    <aside
      aria-label="빠른 전화 접수"
      className="fixed bottom-0 left-0 right-0 z-40 bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800 py-2.5 px-4 sm:hidden shadow-2xl"
    >
      <div className="max-w-md mx-auto">
        <a
          href="tel:1544-9541"
          className="flex items-center justify-center gap-2.5 py-3.5 bg-blue-600 active:bg-blue-700 text-white font-black text-sm rounded-xl shadow-lg shadow-blue-600/40 transition-all"
        >
          <Phone className="w-4 h-4 animate-pulse" />
          <span>스마트퀵화물 1544-9541 즉시 통화 연결</span>
        </a>
      </div>
    </aside>
  );
};
