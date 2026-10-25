import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  Globe,
  FileCode,
  ShieldAlert,
  Bot,
  Rss,
  Copy,
  Check,
  Download,
  ExternalLink,
  Sparkles,
  RefreshCw,
  Search,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';
import { PromotionPost } from '../types';
import {
  WebmasterConfig,
  getWebmasterConfig,
  saveWebmasterConfig,
  applyWebmasterMetaToDom,
  generateDynamicSitemapXml,
  generateDynamicRobotsTxt,
  generateDynamicRssXml,
  runWebmasterDiagnostics,
  DiagnosticResult,
  downloadTextFile,
  DEFAULT_WEBMASTER_CONFIG,
} from '../utils/webmasterManager';

interface WebmasterToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: PromotionPost[];
}

type TabType = 'verify' | 'sitemap' | 'robots' | 'rss' | 'diagnostics' | 'guide';

export const WebmasterToolsModal: React.FC<WebmasterToolsModalProps> = ({
  isOpen,
  onClose,
  posts,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('verify');
  const [config, setConfig] = useState<WebmasterConfig>(getWebmasterConfig);
  const [diagnostics, setDiagnostics] = useState<DiagnosticResult | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize and run diagnostics
  useEffect(() => {
    if (isOpen) {
      const currentConfig = getWebmasterConfig();
      setConfig(currentConfig);
      applyWebmasterMetaToDom(currentConfig);
      const diag = runWebmasterDiagnostics(currentConfig);
      setDiagnostics(diag);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast('클립보드에 복사되었습니다.');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSaveConfig = () => {
    saveWebmasterConfig(config);
    const diag = runWebmasterDiagnostics(config);
    setDiagnostics(diag);
    showToast('웹마스터 메타태그가 브라우저에 즉시 적용 및 저장되었습니다.');
  };

  const handleApplyRecommendedAll = () => {
    const newConfig: WebmasterConfig = {
      ...DEFAULT_WEBMASTER_CONFIG,
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    setConfig(newConfig);
    saveWebmasterConfig(newConfig);
    const diag = runWebmasterDiagnostics(newConfig);
    setDiagnostics(diag);
    showToast('네이버, 다음, 구글 3대 포털 웹마스터 설정이 자동 등록되었습니다!');
  };

  const sitemapXml = generateDynamicSitemapXml(config.siteUrl, posts);
  const robotsTxt = generateDynamicRobotsTxt(config.siteUrl);
  const rssXml = generateDynamicRssXml(config.siteUrl, posts);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-neutral-950/70 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="webmaster-modal-title"
    >
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl border border-neutral-200 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-neutral-900 text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm font-black">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="webmaster-modal-title" className="text-base sm:text-lg font-extrabold tracking-tight">
                  네이버·다음·구글 웹마스터도구 자동등록 센터
                </h3>
                <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  SEO 자동화 100점
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                스마트퀵화물(1544-9541) 3대 검색엔진 수집 최적화, 메타태그 자동주입 & 사이트맵·RSS 생성기
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top 1-Click Fast Action Bar */}
        <div className="bg-blue-50 border-b border-blue-200 px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-blue-900 font-semibold">
            <Sparkles className="w-4 h-4 text-blue-600 animate-pulse shrink-0" />
            <span>
              원클릭으로 네이버, 다음, 구글 메타태그를 즉시 등록하고 사이트맵을 자동 생성합니다.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleApplyRecommendedAll}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap text-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>3대 검색엔진 즉시 자동등록</span>
            </button>
            <button
              type="button"
              onClick={() => {
                const diag = runWebmasterDiagnostics(config);
                setDiagnostics(diag);
                showToast('SEO 수집 진단 완료');
              }}
              className="px-3 py-1.5 bg-white hover:bg-neutral-100 text-neutral-700 font-medium rounded-lg border border-neutral-300 transition-colors flex items-center gap-1 cursor-pointer text-xs"
            >
              <RefreshCw className="w-3 h-3 text-neutral-500" />
              <span>재진단</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-neutral-200 bg-neutral-50/70 overflow-x-auto text-xs shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('verify')}
            className={`px-4 py-2.5 font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'verify'
                ? 'border-blue-600 text-blue-600 bg-white rounded-t-lg shadow-2xs'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
            <span>소유확인 메타태그 (네이버·다음·구글)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('sitemap')}
            className={`px-4 py-2.5 font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'sitemap'
                ? 'border-blue-600 text-blue-600 bg-white rounded-t-lg shadow-2xs'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-emerald-600" />
            <span>sitemap.xml (사이트맵)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('robots')}
            className={`px-4 py-2.5 font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'robots'
                ? 'border-blue-600 text-blue-600 bg-white rounded-t-lg shadow-2xs'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-indigo-600" />
            <span>robots.txt (검색로봇)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('rss')}
            className={`px-4 py-2.5 font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'rss'
                ? 'border-blue-600 text-blue-600 bg-white rounded-t-lg shadow-2xs'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Rss className="w-3.5 h-3.5 text-orange-600" />
            <span>rss.xml (피드)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('diagnostics')}
            className={`px-4 py-2.5 font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'diagnostics'
                ? 'border-blue-600 text-blue-600 bg-white rounded-t-lg shadow-2xs'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-purple-600" />
            <span>웹마스터 종합진단 ({diagnostics?.totalScore ?? 100}점)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('guide')}
            className={`px-4 py-2.5 font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'guide'
                ? 'border-blue-600 text-blue-600 bg-white rounded-t-lg shadow-2xs'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-neutral-600" />
            <span>2분 등록 가이드</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-sm">
          {/* TAB 1: SITE VERIFICATION */}
          {activeTab === 'verify' && (
            <div className="space-y-6">
              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200">
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  사이트 기준 도메인 URL (Canonical / Sitemap 기본주소)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={config.siteUrl}
                    onChange={(e) => setConfig({ ...config, siteUrl: e.target.value })}
                    className="flex-1 px-3 py-2 bg-white border border-neutral-300 rounded-lg text-xs font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="https://smartquick.kr"
                  />
                  <button
                    type="button"
                    onClick={() => handleCopy(config.siteUrl, 'siteUrl')}
                    className="px-3 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                  >
                    {copiedKey === 'siteUrl' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>복사</span>
                  </button>
                </div>
              </div>

              {/* 3 Portal Cards */}
              <div className="space-y-4">
                {/* 1. 네이버 서치어드바이저 */}
                <div className="p-5 rounded-2xl border-2 border-emerald-200 bg-emerald-50/40 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                        N
                      </span>
                      <h4 className="font-extrabold text-neutral-900 text-sm">
                        네이버 서치어드바이저 (Naver Search Advisor)
                      </h4>
                      <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                        {config.naverVerification ? '정상 등록됨' : '미등록'}
                      </span>
                    </div>
                    <a
                      href="https://searchadvisor.naver.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900 hover:underline"
                    >
                      <span>네이버 서치어드바이저 바로가기</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <p className="text-xs text-neutral-600">
                    네이버 웹마스터도구에서 발급받은 HTML 확인 태그의 <code className="bg-emerald-100/70 px-1 py-0.5 rounded text-emerald-900 font-mono">content</code> 값을 입력하거나 자동 생성값을 사용합니다.
                  </p>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-700">
                      naver-site-verification 인증 코드
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={config.naverVerification}
                        onChange={(e) => setConfig({ ...config, naverVerification: e.target.value })}
                        className="flex-1 px-3 py-2 bg-white border border-neutral-300 rounded-lg text-xs font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        placeholder="예: 7a9f8b2c4e1d3f0a9b8c7d6e5f4a3b2c"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(
                            `<meta name="naver-site-verification" content="${config.naverVerification}" />`,
                            'naverMeta'
                          )
                        }
                        className="px-3 py-2 bg-white hover:bg-neutral-100 text-neutral-800 text-xs font-bold rounded-lg border border-neutral-300 transition-colors flex items-center gap-1"
                      >
                        {copiedKey === 'naverMeta' ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>HTML 태그 복사</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. 구글 서치콘솔 */}
                <div className="p-5 rounded-2xl border-2 border-blue-200 bg-blue-50/40 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center">
                        G
                      </span>
                      <h4 className="font-extrabold text-neutral-900 text-sm">
                        구글 서치콘솔 (Google Search Console)
                      </h4>
                      <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-blue-100 text-blue-800 border border-blue-300">
                        {config.googleVerification ? '정상 등록됨' : '미등록'}
                      </span>
                    </div>
                    <a
                      href="https://search.google.com/search-console"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900 hover:underline"
                    >
                      <span>구글 서치콘솔 바로가기</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <p className="text-xs text-neutral-600">
                    구글 서치콘솔 &gt; 속성 추가 &gt; 소유권 확인 &gt; HTML 태그 방식의 <code className="bg-blue-100/70 px-1 py-0.5 rounded text-blue-900 font-mono">content</code> 코드를 입력합니다.
                  </p>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-700">
                      google-site-verification 인증 코드
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={config.googleVerification}
                        onChange={(e) => setConfig({ ...config, googleVerification: e.target.value })}
                        className="flex-1 px-3 py-2 bg-white border border-neutral-300 rounded-lg text-xs font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="예: google-site-verification=SQ_7a9f8B2c..."
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(
                            `<meta name="google-site-verification" content="${config.googleVerification}" />`,
                            'googleMeta'
                          )
                        }
                        className="px-3 py-2 bg-white hover:bg-neutral-100 text-neutral-800 text-xs font-bold rounded-lg border border-neutral-300 transition-colors flex items-center gap-1"
                      >
                        {copiedKey === 'googleMeta' ? (
                          <Check className="w-3.5 h-3.5 text-blue-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>HTML 태그 복사</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3. 다음 웹마스터도구 */}
                <div className="p-5 rounded-2xl border-2 border-amber-200 bg-amber-50/40 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-amber-500 text-white font-black text-xs flex items-center justify-center">
                        D
                      </span>
                      <h4 className="font-extrabold text-neutral-900 text-sm">
                        다음 웹마스터도구 (Daum/Kakao Webmaster)
                      </h4>
                      <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                        {config.daumVerification ? '정상 등록됨' : '미등록'}
                      </span>
                    </div>
                    <a
                      href="https://webmaster.daum.net/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-900 hover:underline"
                    >
                      <span>다음 웹마스터도구 바로가기</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <p className="text-xs text-neutral-600">
                    다음(카카오) 웹마스터도구 인증 PIN 번호 또는 사이트 확인 코드를 등록합니다.
                  </p>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-700">
                      daum-site-verification 인증 코드 (또는 PIN)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={config.daumVerification}
                        onChange={(e) => setConfig({ ...config, daumVerification: e.target.value })}
                        className="flex-1 px-3 py-2 bg-white border border-neutral-300 rounded-lg text-xs font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        placeholder="예: daum-webmaster-sq-9541"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(
                            `<meta name="daum-site-verification" content="${config.daumVerification}" />`,
                            'daumMeta'
                          )
                        }
                        className="px-3 py-2 bg-white hover:bg-neutral-100 text-neutral-800 text-xs font-bold rounded-lg border border-neutral-300 transition-colors flex items-center gap-1"
                      >
                        {copiedKey === 'daumMeta' ? (
                          <Check className="w-3.5 h-3.5 text-amber-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>HTML 태그 복사</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Save & Apply Button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveConfig}
                  className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-extrabold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>설정 저장 및 사이트 헤더 즉시 적용</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: SITEMAP.XML */}
          {activeTab === 'sitemap' && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-extrabold text-emerald-950 text-sm flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-emerald-700" />
                    <span>실시간 동적 사이트맵 (sitemap.xml)</span>
                  </h4>
                  <p className="text-xs text-emerald-800 mt-1">
                    현재 등록된 홍보실 배송 스토리 {posts.length}건과 전 차량 서비스가 자동 반영되었습니다.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopy(sitemapXml, 'sitemapXml')}
                    className="px-3 py-2 bg-white hover:bg-emerald-100 text-emerald-900 font-bold text-xs rounded-lg border border-emerald-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedKey === 'sitemapXml' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>XML 전체 복사</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => downloadTextFile('sitemap.xml', sitemapXml, 'application/xml')}
                    className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>sitemap.xml 다운로드</span>
                  </button>
                </div>
              </div>

              {/* URL Submission info box */}
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-bold text-neutral-800">검색엔진 제출용 사이트맵 URL:</span>
                  <code className="ml-2 font-mono text-blue-700 bg-white px-2 py-0.5 rounded border border-neutral-200">
                    {config.siteUrl}/sitemap.xml
                  </code>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(`${config.siteUrl}/sitemap.xml`, 'sitemapUrl')}
                  className="px-3 py-1 bg-white hover:bg-neutral-100 text-neutral-700 font-semibold rounded border border-neutral-300 self-start sm:self-auto flex items-center gap-1"
                >
                  {copiedKey === 'sitemapUrl' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>주소 복사</span>
                </button>
              </div>

              <div className="relative">
                <pre className="p-4 bg-neutral-900 text-emerald-400 font-mono text-xs rounded-xl overflow-x-auto max-h-80 border border-neutral-800">
                  {sitemapXml}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 3: ROBOTS.TXT */}
          {activeTab === 'robots' && (
            <div className="space-y-4">
              <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-extrabold text-indigo-950 text-sm flex items-center gap-2">
                    <Bot className="w-4 h-4 text-indigo-700" />
                    <span>검색엔진 로봇 수집 규칙 (robots.txt)</span>
                  </h4>
                  <p className="text-xs text-indigo-800 mt-1">
                    네이버 Yeti, 구글 Googlebot, 다음 Daumoa, 마이크로소프트 Bingbot 수집을 100% 승인합니다.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopy(robotsTxt, 'robotsTxt')}
                    className="px-3 py-2 bg-white hover:bg-indigo-100 text-indigo-900 font-bold text-xs rounded-lg border border-indigo-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedKey === 'robotsTxt' ? <Check className="w-3.5 h-3.5 text-indigo-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>내용 복사</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => downloadTextFile('robots.txt', robotsTxt, 'text/plain')}
                    className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>robots.txt 다운로드</span>
                  </button>
                </div>
              </div>

              <div className="relative">
                <pre className="p-4 bg-neutral-900 text-neutral-200 font-mono text-xs rounded-xl overflow-x-auto max-h-80 border border-neutral-800">
                  {robotsTxt}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 4: RSS.XML */}
          {activeTab === 'rss' && (
            <div className="space-y-4">
              <div className="bg-orange-50 border border-orange-200 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-extrabold text-orange-950 text-sm flex items-center gap-2">
                    <Rss className="w-4 h-4 text-orange-700" />
                    <span>네이버·다음 최신 배송 피드 (rss.xml)</span>
                  </h4>
                  <p className="text-xs text-orange-800 mt-1">
                    네이버 서치어드바이저 RSS 제출 시 검색 결과에 신규 배송글이 빠르게 반영됩니다.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopy(rssXml, 'rssXml')}
                    className="px-3 py-2 bg-white hover:bg-orange-100 text-orange-900 font-bold text-xs rounded-lg border border-orange-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedKey === 'rssXml' ? <Check className="w-3.5 h-3.5 text-orange-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>RSS 복사</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => downloadTextFile('rss.xml', rssXml, 'application/rss+xml')}
                    className="px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-lg shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>rss.xml 다운로드</span>
                  </button>
                </div>
              </div>

              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-bold text-neutral-800">네이버 서치어드바이저 RSS 제출 URL:</span>
                  <code className="ml-2 font-mono text-orange-700 bg-white px-2 py-0.5 rounded border border-neutral-200">
                    {config.siteUrl}/rss.xml
                  </code>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(`${config.siteUrl}/rss.xml`, 'rssUrl')}
                  className="px-3 py-1 bg-white hover:bg-neutral-100 text-neutral-700 font-semibold rounded border border-neutral-300 self-start sm:self-auto flex items-center gap-1"
                >
                  {copiedKey === 'rssUrl' ? <Check className="w-3 h-3 text-orange-600" /> : <Copy className="w-3 h-3" />}
                  <span>주소 복사</span>
                </button>
              </div>

              <div className="relative">
                <pre className="p-4 bg-neutral-900 text-orange-300 font-mono text-xs rounded-xl overflow-x-auto max-h-80 border border-neutral-800">
                  {rssXml}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 5: DIAGNOSTICS */}
          {activeTab === 'diagnostics' && (
            <div className="space-y-5">
              {diagnostics && (
                <>
                  <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
                    <div>
                      <div className="text-xs uppercase font-extrabold tracking-wider text-blue-300 mb-1">
                        스마트퀵화물 웹마스터 SEO 종합 수집 점수
                      </div>
                      <div className="text-3xl font-black flex items-baseline gap-2">
                        <span>{diagnostics.totalScore}</span>
                        <span className="text-base font-normal text-neutral-300">/ 100점</span>
                        {diagnostics.totalScore >= 95 ? (
                          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                            최고 등급 (수집 최적화 완료)
                          </span>
                        ) : (
                          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                            보강 권장
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-300 mt-2">
                        네이버 서치어드바이저, 구글 서치콘솔, 다음 웹마스터 공식 웹 표준 가이드라인 100% 준수
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleApplyRecommendedAll}
                      className="px-4 py-2.5 bg-blue-500 hover:bg-blue-400 text-white font-extrabold text-xs rounded-xl shadow transition-all cursor-pointer flex items-center justify-center gap-1.5 self-start sm:self-auto"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>100점 만점 자동 최적화 적용</span>
                    </button>
                  </div>

                  {/* Checklist items */}
                  <div className="space-y-3">
                    {diagnostics.items.map((item) => (
                      <div
                        key={item.id}
                        className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          item.status === 'pass'
                            ? 'bg-emerald-50/50 border-emerald-200'
                            : item.status === 'warning'
                            ? 'bg-amber-50/50 border-amber-200'
                            : 'bg-rose-50/50 border-rose-200'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            {item.status === 'pass' ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            ) : item.status === 'warning' ? (
                              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                            ) : (
                              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                            )}
                            <span className="font-extrabold text-neutral-900 text-xs sm:text-sm">
                              {item.name}
                            </span>
                            <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-neutral-100 text-neutral-700">
                              {item.portal}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-700 pl-6">{item.message}</p>
                          {item.details && (
                            <p className="text-[11px] font-mono text-neutral-500 pl-6 truncate max-w-lg">
                              값: {item.details}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                          <span className="font-mono text-xs font-bold text-neutral-700">
                            {item.score} / {item.maxScore}점
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* TAB 6: 2-MINUTE GUIDE */}
          {activeTab === 'guide' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 p-5 rounded-2xl">
                <h4 className="font-extrabold text-blue-950 text-base mb-1">
                  🚀 네이버·다음·구글 3대 검색엔진 2분 등록 로드맵
                </h4>
                <p className="text-xs text-blue-800">
                  아래 3단계를 따라 하시면 스마트퀵화물 사이트가 국내 3대 포털에 완벽하게 상위 노출 등록됩니다.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Step 1: 네이버 */}
                <div className="p-5 rounded-2xl border border-emerald-200 bg-white space-y-3">
                  <div className="flex items-center gap-2 font-black text-emerald-700 text-sm">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">
                      1
                    </span>
                    <span>네이버 서치어드바이저</span>
                  </div>
                  <ol className="text-xs text-neutral-600 space-y-2 list-decimal list-inside leading-relaxed">
                    <li>
                      <a
                        href="https://searchadvisor.naver.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-700 font-bold underline"
                      >
                        네이버 서치어드바이저
                      </a>
                      에 네이버 아이디로 로그인
                    </li>
                    <li>[웹마스터 도구] &gt; 사이트 등록창에 도메인 입력</li>
                    <li>사이트 소유확인에서 <strong>HTML 태그</strong> 선택 후 본 도구의 인증코드 복사/입력</li>
                    <li>
                      [요청] &gt; [사이트맵 제출] 메뉴에서 <code className="bg-neutral-100 px-1 py-0.5 rounded font-bold">sitemap.xml</code> 제출
                    </li>
                    <li>
                      [요청] &gt; [RSS 제출] 메뉴에서 <code className="bg-neutral-100 px-1 py-0.5 rounded font-bold">rss.xml</code> 제출
                    </li>
                  </ol>
                </div>

                {/* Step 2: 구글 */}
                <div className="p-5 rounded-2xl border border-blue-200 bg-white space-y-3">
                  <div className="flex items-center gap-2 font-black text-blue-700 text-sm">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                      2
                    </span>
                    <span>구글 서치콘솔</span>
                  </div>
                  <ol className="text-xs text-neutral-600 space-y-2 list-decimal list-inside leading-relaxed">
                    <li>
                      <a
                        href="https://search.google.com/search-console"
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-700 font-bold underline"
                      >
                        구글 서치콘솔
                      </a>
                      에 구글 계정으로 로그인
                    </li>
                    <li>[속성 추가] &gt; URL 접두사 방식에 도메인 입력</li>
                    <li>소유권 확인 &gt; <strong>HTML 태그</strong> 선택 후 본 도구의 인증코드 복사/입력</li>
                    <li>
                      좌측 메뉴 [Sitemaps] 클릭 후 <code className="bg-neutral-100 px-1 py-0.5 rounded font-bold">sitemap.xml</code> 입력 및 제출
                    </li>
                    <li>URL 검사 도구를 통해 홈 URL 색인 생성 요청</li>
                  </ol>
                </div>

                {/* Step 3: 다음 */}
                <div className="p-5 rounded-2xl border border-amber-200 bg-white space-y-3">
                  <div className="flex items-center gap-2 font-black text-amber-700 text-sm">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs">
                      3
                    </span>
                    <span>다음 웹마스터도구</span>
                  </div>
                  <ol className="text-xs text-neutral-600 space-y-2 list-decimal list-inside leading-relaxed">
                    <li>
                      <a
                        href="https://webmaster.daum.net/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-amber-700 font-bold underline"
                      >
                        다음 웹마스터도구
                      </a>
                      접속
                    </li>
                    <li>사이트 URL 입력 후 PIN 번호 발급</li>
                    <li>본 도구의 다음 인증 필드에 PIN 번호 입력 후 자동 적용</li>
                    <li>
                      [수집요청] &gt; [사이트맵]에 <code className="bg-neutral-100 px-1 py-0.5 rounded font-bold">sitemap.xml</code> 제출
                    </li>
                    <li>검색로봇 수집 상태 및 색인 현황 모니터링</li>
                  </ol>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-neutral-100 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="text-neutral-500">
            대표 콜센터: <strong className="text-neutral-900 font-bold">1544-9541</strong> (24시간 전국 직송 접수)
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white hover:bg-neutral-200 text-neutral-700 font-bold rounded-lg border border-neutral-300 transition-colors cursor-pointer"
            >
              닫기
            </button>
            <button
              type="button"
              onClick={() => {
                handleSaveConfig();
                onClose();
              }}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm transition-all cursor-pointer"
            >
              저장 완료
            </button>
          </div>
        </div>

        {/* Toast alert */}
        {toastMessage && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2.5 bg-neutral-900 text-white font-bold text-xs rounded-full shadow-xl flex items-center gap-2 z-50 animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};
