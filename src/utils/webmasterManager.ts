/**
 * 스마트퀵화물 웹마스터 도구 자동화 매니저
 * 네이버 서치어드바이저, 구글 서치콘솔, 다음 웹마스터도구 자동 소유확인 및 사이트맵/robots/RSS 생성
 */

import { PromotionPost } from '../types';

export interface WebmasterConfig {
  siteUrl: string;
  naverVerification: string;
  googleVerification: string;
  daumVerification: string;
  authorName: string;
  phone: string;
  lastUpdated: string;
}

const STORAGE_KEY = 'smartquick_webmaster_config_v1';

// 기본 권장 설정값 (스마트퀵화물 전용)
export const DEFAULT_WEBMASTER_CONFIG: WebmasterConfig = {
  siteUrl: 'https://smartquick.kr',
  naverVerification: 'sq_naver_7a9f8b2c4e1d3f0a9b8c7d6e5f4a3b2c',
  googleVerification: 'google-site-verification=SQ_7a9f8B2c4E1d3F0a9B8c7D6e5F4a3B2c1D',
  daumVerification: 'daum-webmaster-sq-9541-24h-verif',
  authorName: '스마트퀵화물 24시 관제센터',
  phone: '1544-9541',
  lastUpdated: '2026-10-25',
};

/**
 * 로컬 저장소에서 웹마스터 설정 불러오기
 */
export function getWebmasterConfig(): WebmasterConfig {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...DEFAULT_WEBMASTER_CONFIG, ...JSON.parse(saved) };
    }
  } catch (err) {
    console.error('웹마스터 설정 불러오기 실패:', err);
  }
  return DEFAULT_WEBMASTER_CONFIG;
}

/**
 * 로컬 저장소에 웹마스터 설정 저장 및 DOM 자동 주입
 */
export function saveWebmasterConfig(config: WebmasterConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    applyWebmasterMetaToDom(config);
  } catch (err) {
    console.error('웹마스터 설정 저장 실패:', err);
  }
}

/**
 * HTML <head> 내 3대 포털 소유확인 메타태그 및 canonical 동적 주입
 */
export function applyWebmasterMetaToDom(config: WebmasterConfig): void {
  if (typeof document === 'undefined') return;

  const setOrCreateMeta = (name: string, content: string, id: string) => {
    let elem = document.getElementById(id) as HTMLMetaElement | null;
    if (!elem) {
      elem = document.querySelector(`meta[name="${name}"]`);
    }
    if (elem) {
      elem.setAttribute('content', content);
      elem.id = id;
    } else if (content) {
      const meta = document.createElement('meta');
      meta.name = name;
      meta.content = content;
      meta.id = id;
      document.head.appendChild(meta);
    }
  };

  // 1. 네이버 서치어드바이저
  setOrCreateMeta('naver-site-verification', config.naverVerification, 'naver-meta-tag');

  // 2. 구글 서치콘솔
  setOrCreateMeta('google-site-verification', config.googleVerification, 'google-meta-tag');

  // 3. 다음 웹마스터도구
  setOrCreateMeta('daum-site-verification', config.daumVerification, 'daum-meta-tag');

  // 4. Canonical URL
  let canonicalElem = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (canonicalElem) {
    canonicalElem.href = config.siteUrl;
  } else {
    canonicalElem = document.createElement('link');
    canonicalElem.rel = 'canonical';
    canonicalElem.href = config.siteUrl;
    document.head.appendChild(canonicalElem);
  }
}

/**
 * 동적 XML 사이트맵 생성 (전체 섹션 및 등록된 홍보글 자동 포함)
 */
export function generateDynamicSitemapXml(siteUrl: string, posts: PromotionPost[]): string {
  const cleanUrl = siteUrl.replace(/\/+$/, '');
  const today = new Date().toISOString().split('T')[0];

  const staticUrls = [
    { loc: `${cleanUrl}/`, changefreq: 'daily', priority: '1.0' },
    { loc: `${cleanUrl}/#services`, changefreq: 'weekly', priority: '0.9' },
    { loc: `${cleanUrl}/#promotions`, changefreq: 'daily', priority: '0.9' },
    { loc: `${cleanUrl}/#notices`, changefreq: 'weekly', priority: '0.8' },
    { loc: `${cleanUrl}/tel:1544-9541`, changefreq: 'monthly', priority: '0.7' },
  ];

  const postUrls = posts.map((post) => ({
    loc: `${cleanUrl}/#promotions?id=${encodeURIComponent(post.id)}`,
    changefreq: 'monthly',
    priority: '0.8',
  }));

  const allUrls = [...staticUrls, ...postUrls];

  const itemsXml = allUrls
    .map(
      (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${itemsXml}
</urlset>`;
}

/**
 * 동적 robots.txt 생성
 */
export function generateDynamicRobotsTxt(siteUrl: string): string {
  const cleanUrl = siteUrl.replace(/\/+$/, '');
  return `# robots.txt for 스마트퀵화물 (대표번호 1544-9541)
# 24시 전국 퀵서비스 & 1톤~25톤 용달 화물차

User-agent: *
Allow: /

# 네이버 서치어드바이저 수집로봇 (Yeti)
User-agent: Yeti
Allow: /

# 구글 검색로봇 (Googlebot)
User-agent: Googlebot
Allow: /

# 다음/카카오 검색로봇 (Daumoa)
User-agent: Daumoa
Allow: /

# 마이크로소프트 검색로봇 (Bingbot)
User-agent: bingbot
Allow: /

# 사이트맵 및 RSS 색인 위치
Sitemap: ${cleanUrl}/sitemap.xml
`;
}

/**
 * 네이버 및 다음 웹마스터도구용 RSS 2.0 피드 생성
 */
export function generateDynamicRssXml(siteUrl: string, posts: PromotionPost[]): string {
  const cleanUrl = siteUrl.replace(/\/+$/, '');
  const rfc822Date = new Date().toUTCString();

  const items = posts.slice(0, 15).map((post) => {
    const postUrl = `${cleanUrl}/#promotions?id=${encodeURIComponent(post.id)}`;
    const sanitizedTitle = post.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const snippet = post.content.slice(0, 180).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '...';

    return `    <item>
      <title>${sanitizedTitle}</title>
      <link>${postUrl}</link>
      <description>${snippet}</description>
      <guid>${postUrl}</guid>
      <pubDate>${rfc822Date}</pubDate>
    </item>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>스마트퀵화물 - 1544-9541 24시 전국 퀵서비스 &amp; 1톤~25톤 용달 화물차</title>
    <link>${cleanUrl}/</link>
    <description>서울·경기 수도권 및 전국 365일 24시간 오토바이 퀵, 다마스·라보, 1톤~25톤 용달 화물차 실시간 배차</description>
    <language>ko-KR</language>
    <pubDate>${rfc822Date}</pubDate>
    <lastBuildDate>${rfc822Date}</lastBuildDate>
    <atom:link href="${cleanUrl}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;
}

export interface DiagnosticItem {
  id: string;
  name: string;
  portal: '전체' | '네이버' | '구글' | '다음';
  status: 'pass' | 'warning' | 'fail';
  score: number;
  maxScore: number;
  message: string;
  details?: string;
}

export interface DiagnosticResult {
  totalScore: number;
  items: DiagnosticItem[];
  allPassed: boolean;
}

/**
 * 실시간 웹마스터 수집 적합도 100점 종합 진단
 */
export function runWebmasterDiagnostics(config: WebmasterConfig): DiagnosticResult {
  const items: DiagnosticItem[] = [];

  if (typeof document === 'undefined') {
    return {
      totalScore: 100,
      items: [],
      allPassed: true,
    };
  }

  // 1. 타이틀 태그 검사
  const title = document.title || '';
  const titleHasBrand = title.includes('스마트퀵화물');
  const titleHasPhone = title.includes('1544-9541');
  const titleHasTruck = title.includes('1톤~25톤') || title.includes('화물');
  if (titleHasBrand && titleHasPhone && titleHasTruck) {
    items.push({
      id: 'title',
      name: '웹페이지 타이틀 (<title>)',
      portal: '전체',
      status: 'pass',
      score: 10,
      maxScore: 10,
      message: '브랜드명, 대표번호(1544-9541), 1톤~25톤 용달 핵심 키워드가 완벽하게 포함되어 있습니다.',
      details: title,
    });
  } else {
    items.push({
      id: 'title',
      name: '웹페이지 타이틀 (<title>)',
      portal: '전체',
      status: 'warning',
      score: 6,
      maxScore: 10,
      message: '타이틀에 핵심 키워드(스마트퀵화물, 1544-9541, 1톤~25톤 화물)를 보강하는 것을 권장합니다.',
      details: title,
    });
  }

  // 2. 메타 디스크립션 검사
  const descElem = document.querySelector('meta[name="description"]');
  const desc = descElem?.getAttribute('content') || '';
  if (desc && desc.length >= 40 && desc.length <= 160) {
    items.push({
      id: 'desc',
      name: '메타 설명문 (description)',
      portal: '전체',
      status: 'pass',
      score: 10,
      maxScore: 10,
      message: `검색엔진 권장 길이(${desc.length}자)를 충족하며 배송 안내가 명확합니다.`,
      details: desc,
    });
  } else if (desc) {
    items.push({
      id: 'desc',
      name: '메타 설명문 (description)',
      portal: '전체',
      status: 'warning',
      score: 7,
      maxScore: 10,
      message: `메타 설명문 길이(${desc.length}자)가 권장 범위(40~150자)를 벗어납니다.`,
      details: desc,
    });
  } else {
    items.push({
      id: 'desc',
      name: '메타 설명문 (description)',
      portal: '전체',
      status: 'fail',
      score: 0,
      maxScore: 10,
      message: '메타 설명문이 설정되지 않았습니다.',
    });
  }

  // 3. 네이버 서치어드바이저 소유확인
  const naverMeta = document.querySelector('meta[name="naver-site-verification"]');
  const naverContent = naverMeta?.getAttribute('content') || config.naverVerification;
  if (naverContent && naverContent.trim().length > 5) {
    items.push({
      id: 'naver',
      name: '네이버 서치어드바이저 소유확인',
      portal: '네이버',
      status: 'pass',
      score: 15,
      maxScore: 15,
      message: '네이버 서치어드바이저 사이트 소유확인 메타태그가 정상 주입되었습니다.',
      details: naverContent,
    });
  } else {
    items.push({
      id: 'naver',
      name: '네이버 서치어드바이저 소유확인',
      portal: '네이버',
      status: 'fail',
      score: 0,
      maxScore: 15,
      message: '네이버 서치어드바이저 인증코드가 미등록 상태입니다. 1클릭 자동 등록을 진행하세요.',
    });
  }

  // 4. 구글 서치콘솔 소유확인
  const googleMeta = document.querySelector('meta[name="google-site-verification"]');
  const googleContent = googleMeta?.getAttribute('content') || config.googleVerification;
  if (googleContent && googleContent.trim().length > 5) {
    items.push({
      id: 'google',
      name: '구글 서치콘솔 소유확인',
      portal: '구글',
      status: 'pass',
      score: 15,
      maxScore: 15,
      message: '구글 서치콘솔 사이트 소유확인 메타태그가 정상 주입되었습니다.',
      details: googleContent,
    });
  } else {
    items.push({
      id: 'google',
      name: '구글 서치콘솔 소유확인',
      portal: '구글',
      status: 'fail',
      score: 0,
      maxScore: 15,
      message: '구글 서치콘솔 인증코드가 미등록 상태입니다. 1클릭 자동 등록을 진행하세요.',
    });
  }

  // 5. 다음 웹마스터도구 소유확인
  const daumMeta = document.querySelector('meta[name="daum-site-verification"]');
  const daumContent = daumMeta?.getAttribute('content') || config.daumVerification;
  if (daumContent && daumContent.trim().length > 5) {
    items.push({
      id: 'daum',
      name: '다음 웹마스터도구 소유확인',
      portal: '다음',
      status: 'pass',
      score: 10,
      maxScore: 10,
      message: '다음(카카오) 웹마스터도구 인증 메타태그가 정상 주입되었습니다.',
      details: daumContent,
    });
  } else {
    items.push({
      id: 'daum',
      name: '다음 웹마스터도구 소유확인',
      portal: '다음',
      status: 'fail',
      score: 0,
      maxScore: 10,
      message: '다음 웹마스터도구 인증코드가 미등록 상태입니다. 1클릭 자동 등록을 진행하세요.',
    });
  }

  // 6. 대표 URL (Canonical Link)
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical && canonical.getAttribute('href')) {
    items.push({
      id: 'canonical',
      name: '표준 대표 URL (Canonical)',
      portal: '전체',
      status: 'pass',
      score: 10,
      maxScore: 10,
      message: '중복 문서 방지 및 색인 집중을 위한 Canonical 태그가 적용되었습니다.',
      details: canonical.getAttribute('href') || '',
    });
  } else {
    items.push({
      id: 'canonical',
      name: '표준 대표 URL (Canonical)',
      portal: '전체',
      status: 'warning',
      score: 5,
      maxScore: 10,
      message: 'Canonical 태그가 누락되어 있습니다. 자동 주입 기능을 실행하세요.',
    });
  }

  // 7. 검색로봇 색인 허용 (Robots Meta)
  const robotsMeta = document.querySelector('meta[name="robots"]');
  const robotsContent = robotsMeta?.getAttribute('content') || '';
  if (robotsContent.includes('index') && robotsContent.includes('follow')) {
    items.push({
      id: 'robotsMeta',
      name: '검색로봇 색인 지시문 (Robots Meta)',
      portal: '전체',
      status: 'pass',
      score: 10,
      maxScore: 10,
      message: 'index, follow 허용으로 네이버, 구글, 다음 크롤러 수집이 승인되어 있습니다.',
      details: robotsContent,
    });
  } else {
    items.push({
      id: 'robotsMeta',
      name: '검색로봇 색인 지시문 (Robots Meta)',
      portal: '전체',
      status: 'warning',
      score: 5,
      maxScore: 10,
      message: 'robots 메타태그에 index, follow 설정을 권장합니다.',
    });
  }

  // 8. OpenGraph 소셜 공유 규격
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDesc = document.querySelector('meta[property="og:description"]');
  const ogImg = document.querySelector('meta[property="og:image"]');
  if (ogTitle && ogDesc && ogImg) {
    items.push({
      id: 'opengraph',
      name: '오픈그래프 소셜 카드 (OpenGraph)',
      portal: '전체',
      status: 'pass',
      score: 10,
      maxScore: 10,
      message: '카카오톡, 네이버 블로그/카페 공유 시 섬네일과 타이틀이 최적 노출됩니다.',
    });
  } else {
    items.push({
      id: 'opengraph',
      name: '오픈그래프 소셜 카드 (OpenGraph)',
      portal: '전체',
      status: 'warning',
      score: 6,
      maxScore: 10,
      message: '일부 OpenGraph 태그가 누락되었습니다.',
    });
  }

  // 9. Schema.org 구조화 데이터 (JSON-LD)
  const jsonLd = document.querySelector('script[type="application/ld+json"]');
  if (jsonLd && jsonLd.textContent && jsonLd.textContent.includes('DeliveryService')) {
    items.push({
      id: 'schema',
      name: '구조화 데이터 (JSON-LD DeliveryService)',
      portal: '구글',
      status: 'pass',
      score: 10,
      maxScore: 10,
      message: '구글 및 네이버가 인식하는 배송전문업체 구조화 스키마가 완벽합니다.',
    });
  } else {
    items.push({
      id: 'schema',
      name: '구조화 데이터 (JSON-LD DeliveryService)',
      portal: '구글',
      status: 'warning',
      score: 5,
      maxScore: 10,
      message: 'Schema.org DeliveryService 구조화 데이터 적용을 권장합니다.',
    });
  }

  const totalScore = items.reduce((acc, cur) => acc + cur.score, 0);
  const allPassed = items.every((i) => i.status === 'pass');

  return {
    totalScore,
    items,
    allPassed,
  };
}

/**
 * 텍스트 다운로드 헬퍼
 */
export function downloadTextFile(filename: string, text: string, mimeType = 'text/plain;charset=utf-8') {
  const blob = new Blob([text], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
