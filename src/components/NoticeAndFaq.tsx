import React, { useState } from 'react';
import { FAQS } from '../data/logisticsData';
import { HelpCircle, ChevronDown, MessageSquare, AlertTriangle, Send } from 'lucide-react';

export const NoticeAndFaq: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [inquiryType, setInquiryType] = useState<'consult' | 'complaint'>('consult');
  const [author, setAuthor] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !contact || !message) {
      alert('성함, 연락처 및 문의 내용을 입력해 주세요.');
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setAuthor('');
      setContact('');
      setMessage('');
      setSubmitted(false);
      alert('고객님의 의견이 관제 운영팀에 접수되었습니다. 신속히 확인 후 답변드리겠습니다.');
    }, 1000);
  };

  const NOTICES = [
    {
      title: '365일 24시간 연중무휴 정상 배차 안내',
      date: '2026-10-24',
      badge: '중요공지',
    },
    {
      title: '우천 및 폭설 시 방수 다마스/탑차 우선 배차 정책 시행',
      date: '2026-10-18',
      badge: '운영안내',
    },
    {
      title: '신용카드 무이자 할부 및 간편결제 시스템 개편 완료',
      date: '2026-10-10',
      badge: '서비스',
    },
    {
      title: '적재물 배상책임보험 갱신 및 보상한도 강화 안내',
      date: '2026-09-28',
      badge: '보험공지',
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: FAQ & Notices */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 tracking-wide uppercase mb-2">
                <span>자주 묻는 질문</span>
                <span aria-hidden="true">·</span>
                <span>이용 가이드</span>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 tracking-tight mb-6">
                고객님께서 자주 문의하시는 질문
              </h3>

              <div className="space-y-3">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-neutral-200 rounded-2xl overflow-hidden transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        className="w-full p-4 text-left flex items-center justify-between gap-4 font-semibold text-sm text-neutral-900 hover:bg-neutral-50 cursor-pointer"
                      >
                        <span className="flex items-center gap-2.5">
                          <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                          <span>{faq.q}</span>
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-neutral-400 transition-transform duration-200 shrink-0 ${
                            isOpen ? 'rotate-180 text-blue-600' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4 pt-1 text-xs text-neutral-600 leading-relaxed bg-neutral-50/50 border-t border-neutral-100">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Notices */}
            <div>
              <h4 className="text-base font-bold text-neutral-900 mb-4">공지사항</h4>
              <div className="divide-y divide-neutral-200 border-y border-neutral-200 text-xs">
                {NOTICES.map((n, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded shrink-0">
                        {n.badge}
                      </span>
                      <span className="font-medium text-neutral-800 truncate">{n.title}</span>
                    </div>
                    <span className="font-mono text-neutral-400 tabular-nums shrink-0">{n.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Customer Voice Form */}
          <div className="lg:col-span-5 bg-neutral-50/80 border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-neutral-900">고객상담 및 불편신고실</h3>
            </div>
            <p className="text-xs text-neutral-500 mb-5 leading-relaxed">
              서비스 이용 중 문의사항이나 기사님 배송 관련 불편사항, 칭찬의 글을 남겨주시면 즉시 검토 후 반영하겠습니다.
            </p>

            <div className="flex gap-2 p-1 bg-neutral-200/80 rounded-xl mb-4 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setInquiryType('consult')}
                className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                  inquiryType === 'consult' ? 'bg-white text-blue-700 shadow-sm' : 'text-neutral-600'
                }`}
              >
                일반 상담 문의
              </button>
              <button
                type="button"
                onClick={() => setInquiryType('complaint')}
                className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                  inquiryType === 'complaint' ? 'bg-white text-amber-700 shadow-sm' : 'text-neutral-600'
                }`}
              >
                불편/개선 신고
              </button>
            </div>

            <form onSubmit={handleInquirySubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-medium text-neutral-700 mb-1">성함 / 상호</label>
                <input
                  type="text"
                  required
                  placeholder="작성자 성함"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-medium text-neutral-700 mb-1">연락처</label>
                <input
                  type="tel"
                  required
                  placeholder="010-0000-0000"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-medium text-neutral-700 mb-1">내용</label>
                <textarea
                  rows={4}
                  required
                  placeholder={
                    inquiryType === 'consult'
                      ? '견적 문의, 배송 일정 조율 등 상담 내용을 작성해주세요.'
                      : '운송장번호와 불편하셨던 세부 사항을 남겨주시면 신속히 보상 및 시정 조치하겠습니다.'
                  }
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>{submitted ? '접수 처리 중...' : '상담/신고 내용 제출'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
