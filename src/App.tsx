/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesShowcase } from './components/ServicesShowcase';
import { PromotionRoom } from './components/PromotionRoom';
import { NoticeAndFaq } from './components/NoticeAndFaq';
import { QuickCallFloating } from './components/QuickCallFloating';
import { Footer } from './components/Footer';
import { INITIAL_PROMOTION_POSTS } from './data/logisticsData';
import { PromotionPost } from './types';

const PROMO_STORAGE_KEY = 'smart_quick_promotions_v2';

export default function App() {
  const [promotions, setPromotions] = useState<PromotionPost[]>(() => {
    try {
      const saved = localStorage.getItem(PROMO_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return INITIAL_PROMOTION_POSTS;
  });

  // Sync promotions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify(promotions));
    } catch {
      // ignore
    }
  }, [promotions]);

  const handleAddPromotionPost = (newPost: PromotionPost) => {
    setPromotions((prev) => [newPost, ...prev]);
  };

  const handleDeletePromotionPost = (postId: string) => {
    setPromotions((prev) => prev.filter((p) => p.id !== postId));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 pb-16 sm:pb-0">
      {/* 3-zone Top Bar Contract */}
      <Navbar onSelectTab={scrollToSection} />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Hero Section with Photographic 4-Vehicle Carrier and Direct 1544-9541 Call CTA */}
        <Hero onScrollToServices={() => scrollToSection('services')} />

        {/* Vehicle Fleet & Services Showcase: 오토바이, 다마스&라보, 1톤~25톤 용달 화물차 */}
        <ServicesShowcase />

        {/* 홍보실: 오토바이, 다마스, 1톤~25톤 용달 화물차 3가지 분리 & 서울/경기도 관리자 글쓰기/사진올리기 */}
        <PromotionRoom
          posts={promotions}
          onAddPost={handleAddPromotionPost}
          onDeletePost={handleDeletePromotionPost}
        />

        {/* FAQ, Notices & Customer Voice */}
        <NoticeAndFaq />
      </main>

      {/* Verified Business Footer */}
      <Footer />

      {/* Mobile-Capped Floating Direct Call Bar (1544-9541) */}
      <QuickCallFloating />
    </div>
  );
}
