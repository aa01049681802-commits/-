import React, { useState, useRef } from 'react';
import { PromotionPost, PromoVehicleCategory, PromoRegionCategory } from '../types';
import {
  ImagePlus,
  PlusCircle,
  MapPin,
  Calendar,
  Eye,
  Heart,
  Search,
  X,
  Upload,
  Trash2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  SearchCode,
  Copy,
  Check,
  FileText,
  Tag,
  Phone,
  Globe,
} from 'lucide-react';

interface PromotionRoomProps {
  posts: PromotionPost[];
  onAddPost: (newPost: PromotionPost) => void;
  onDeletePost?: (postId: string) => void;
  onOpenBooking?: () => void;
  onOpenWebmaster?: () => void;
}

const VEHICLE_LABELS: Record<PromoVehicleCategory, { name: string; badge: string; color: string; ringColor: string }> = {
  motorcycle: {
    name: '스마트퀵화물 오토바이',
    badge: '도심 초급송',
    color: 'bg-blue-600 text-white',
    ringColor: 'ring-blue-500/20',
  },
  damas: {
    name: '스마트퀵화물 다마스',
    badge: '우천 안심밴',
    color: 'bg-emerald-600 text-white',
    ringColor: 'ring-emerald-500/20',
  },
  truck: {
    name: '스마트퀵화물 1톤~25톤 용달 화물차',
    badge: '원룸이사·중대형화물',
    color: 'bg-indigo-600 text-white',
    ringColor: 'ring-indigo-500/20',
  },
};

const REGION_LABELS: Record<PromoRegionCategory, string> = {
  seoul: '서울특별시',
  gyeonggi: '경기도',
};

const SEO_DISTRICTS_SEOUL = [
  '강남구', '서초구', '송파구', '강동구', '영등포구 (여의도)', '마포구 (상암/홍대)',
  '성동구 (성수동)', '광진구', '용산구', '중구 (동대문/명동)', '종로구', '구로구 (디지털단지)',
  '금천구 (가산)', '강서구 (마곡)', '노원구', '동대문구',
];

const SEO_DISTRICTS_GYEONGGI = [
  '성남시 (분당/판교)', '수원시 (영통/팔달)', '고양시 (일산)', '용인시 (기흥/수지)',
  '부천시', '화성시 (동탄)', '안양시 (평촌)', '평택시', '파주시', '남양주시', '의정부시', '김포시',
];

export const PromotionRoom: React.FC<PromotionRoomProps> = ({
  posts,
  onAddPost,
  onDeletePost,
  onOpenBooking,
  onOpenWebmaster,
}) => {
  // Filters
  const [selectedVehicle, setSelectedVehicle] = useState<'all' | PromoVehicleCategory>('all');
  const [selectedRegion, setSelectedRegion] = useState<'all' | PromoRegionCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [isSeoToolOpen, setIsSeoToolOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PromotionPost | null>(null);

  // Form states for Admin Write
  const [title, setTitle] = useState('');
  const [vehicleCategory, setVehicleCategory] = useState<PromoVehicleCategory>('motorcycle');
  const [regionCategory, setRegionCategory] = useState<PromoRegionCategory>('seoul');
  const [regionDetail, setRegionDetail] = useState('서울 강남구');
  const [content, setContent] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [author, setAuthor] = useState('스마트관리자');
  const [tagsInput, setTagsInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // SEO Tool states
  const [seoVehicle, setSeoVehicle] = useState<PromoVehicleCategory>('motorcycle');
  const [seoRegion, setSeoRegion] = useState<PromoRegionCategory>('seoul');
  const [seoDistrict, setSeoDistrict] = useState('강남구');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filtered posts
  const filteredPosts = posts.filter((post) => {
    if (selectedVehicle !== 'all' && post.vehicleCategory !== selectedVehicle) return false;
    if (selectedRegion !== 'all' && post.regionCategory !== selectedRegion) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = post.title.toLowerCase().includes(q);
      const matchRegion = post.regionDetail.toLowerCase().includes(q);
      const matchContent = post.content.toLowerCase().includes(q);
      return matchTitle || matchRegion || matchContent;
    }
    return true;
  });

  // Handle image file upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('이미지 파일(jpg, png, webp 등)만 업로드할 수 있습니다.');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setImagePreview(result);
      setIsUploading(false);
    };
    reader.onerror = () => {
      alert('이미지를 읽는 중 오류가 발생했습니다.');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleUsePreset = (presetPath: string) => {
    setImagePreview(presetPath);
  };

  const handleOpenWrite = () => {
    setTitle('');
    setContent('');
    setImagePreview('/src/assets/images/smart_quick_moto_courier_1792884479574.jpg');
    setRegionDetail(regionCategory === 'seoul' ? '서울 강남구 역삼동' : '경기도 성남시 분당구');
    setTagsInput('실시간배송, 스마트퀵');
    setIsWriteModalOpen(true);
  };

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해 주세요.');
      return;
    }

    const now = new Date();
    const dateFormatted = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now
      .getDate()
      .toString()
      .padStart(2, '0')}`;

    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    const newPost: PromotionPost = {
      id: `promo-${Date.now()}`,
      title: title.trim(),
      vehicleCategory,
      regionCategory,
      regionDetail: regionDetail.trim(),
      content: content.trim(),
      imageUrl: imagePreview || '/src/assets/images/hero_logistics_fleet_1792882241524.jpg',
      author: author.trim() || '스마트관리자',
      createdAt: dateFormatted,
      views: 1,
      likes: 0,
      tags: parsedTags.length > 0 ? parsedTags : [VEHICLE_LABELS[vehicleCategory].name, REGION_LABELS[regionCategory]],
    };

    onAddPost(newPost);
    setIsWriteModalOpen(false);
    alert('새 홍보 배송글이 성공적으로 등록되었습니다.');
  };

  // SEO Tool Calculations
  const seoVehicleName = VEHICLE_LABELS[seoVehicle].name;
  const seoRegionName = REGION_LABELS[seoRegion];
  
  const generatedSeoTitle = `[${seoRegionName} ${seoDistrict}] ${seoVehicleName} 24시 신속 배차 및 전화상담 | 스마트퀵 1544-9541`;
  const generatedSeoDesc = `${seoRegionName} ${seoDistrict} 전역 20분 내 픽업! ${seoVehicleName}부터 다마스·1톤~25톤 용달 화물차까지 365일 24시간 연중무휴 실시간 배차. 카드결제 및 전자세금계산서 100% 발행. 대표번호 1544-9541`;
  const generatedSeoKeywords = [
    `${seoDistrict}퀵서비스`,
    `${seoDistrict}${seoVehicleName.replace(/\s+/g, '')}`,
    `${seoRegionName}퀵`,
    '24시퀵서비스',
    '수도권당일특송',
    '다마스화물',
    '1톤용달',
    '5톤화물차',
    '25톤대형화물',
    '1톤25톤화물차',
    '스마트퀵화물',
    '1544-9541',
    `${seoDistrict}화물`,
  ];
  const generatedSeoBody = `${seoRegionName} ${seoDistrict} 고객님 안녕하십니까! 365일 24시간 실시간 전국 배차 스마트퀵화물(1544-9541)입니다.

금일은 ${seoRegionName} ${seoDistrict} 지역에서 긴급 요청해 주신 ${seoVehicleName} 배송 건을 최단거리 배차하여 약속 시간 내 안전하게 전달 완료하였습니다.

■ ${seoRegionName} ${seoDistrict} 운송 특징:
- 픽업 시간: 접수 후 평균 20분 내 신속 방문
- 배송 수단: ${seoVehicleName} (안전 적재 및 방수 보호)
- 결제 수단: 신용카드 현장 결제, 전자세금계산서, 현금영수증 발행 가능
- 안심 보장: 전 차량 적재물 배상책임보험 100% 가입

${seoRegionName} ${seoDistrict}에서 신속하고 안전한 퀵·화물이 필요하실 땐 언제든 대표번호 1544-9541로 문의해 주시기 바랍니다.`;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const applySeoToWriter = () => {
    setVehicleCategory(seoVehicle);
    setRegionCategory(seoRegion);
    setRegionDetail(`${seoRegionName} ${seoDistrict}`);
    setTitle(generatedSeoTitle);
    setContent(generatedSeoBody);
    setTagsInput(generatedSeoKeywords.join(', '));
    if (seoVehicle === 'motorcycle') {
      setImagePreview('/src/assets/images/quick_motorcycle_delivery_1792882242003.jpg');
    } else if (seoVehicle === 'damas') {
      setImagePreview('/src/assets/images/damas_freight_cargo_1792882242576.jpg');
    } else {
      setImagePreview('/src/assets/images/freight_truck_transport_1792882242681.jpg');
    }
    setIsSeoToolOpen(false);
    setIsWriteModalOpen(true);
  };

  return (
    <section id="promotions" className="py-20 bg-neutral-100/80 border-b border-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-neutral-300">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 tracking-wide uppercase mb-2">
              <span>스마트퀵화물 홍보실</span>
              <span aria-hidden="true">·</span>
              <span>현장 배송 갤러리</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
              서울·경기도 실시간 배송 현장 & 홍보실
            </h2>
            <p className="mt-2 text-sm text-neutral-600 max-w-2xl font-medium">
              오토바이, 다마스, 1톤~25톤 용달 화물차 3가지 맞춤 차량의 실제 수도권 배송 스토리와 현장 사진을 생생하게 확인하세요.
            </p>
          </div>

          {/* Action Buttons: 웹마스터도구 & SEO 키워드도구 & 관리자 글쓰기 */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={onOpenWebmaster}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-950 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap"
              title="네이버·다음·구글 3대 검색엔진 웹마스터도구 소유확인 및 사이트맵 자동등록"
            >
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>웹마스터도구 자동등록</span>
            </button>

            <button
              type="button"
              onClick={() => setIsSeoToolOpen(true)}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2.5 bg-white hover:bg-neutral-50 active:bg-neutral-100 text-neutral-800 font-bold text-xs sm:text-sm rounded-xl border border-neutral-300 shadow-xs transition-all cursor-pointer whitespace-nowrap"
            >
              <SearchCode className="w-4 h-4 text-blue-600" />
              <span>SEO 키워드 도구</span>
            </button>

            <button
              type="button"
              onClick={handleOpenWrite}
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm transition-all cursor-pointer whitespace-nowrap"
            >
              <PlusCircle className="w-4 h-4" />
              <span>관리자 글쓰기 & 사진올리기</span>
            </button>
          </div>
        </div>

        {/* Filters Bar: 차종(오토바이, 다마스, 용달) & 지역(서울, 경기도) */}
        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Vehicle Category Tabs: 오토바이, 다마스, 용달 밝고 선명한 3가지 분리 */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
              <span className="text-xs font-bold text-neutral-500 whitespace-nowrap mr-1">차종별:</span>
              <button
                type="button"
                onClick={() => setSelectedVehicle('all')}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap border ${
                  selectedVehicle === 'all'
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                    : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                }`}
              >
                전체 차종
              </button>
              <button
                type="button"
                onClick={() => setSelectedVehicle('motorcycle')}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap border ${
                  selectedVehicle === 'motorcycle'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs ring-2 ring-blue-500/20'
                    : 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100'
                }`}
              >
                🏍️ 오토바이 퀵
              </button>
              <button
                type="button"
                onClick={() => setSelectedVehicle('damas')}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap border ${
                  selectedVehicle === 'damas'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs ring-2 ring-emerald-500/20'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                🚐 다마스 퀵
              </button>
              <button
                type="button"
                onClick={() => setSelectedVehicle('truck')}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap border ${
                  selectedVehicle === 'truck'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs ring-2 ring-indigo-500/20'
                    : 'bg-indigo-50 text-indigo-800 border-indigo-200 hover:bg-indigo-100'
                }`}
              >
                🚚 1톤~25톤 용달 화물차
              </button>
            </div>

            {/* Region Filter: 서울특별시, 경기도 */}
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-xs font-bold text-neutral-500 whitespace-nowrap mr-1">지역별:</span>
              <button
                type="button"
                onClick={() => setSelectedRegion('all')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap border ${
                  selectedRegion === 'all'
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                    : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                }`}
              >
                전체 지역
              </button>
              <button
                type="button"
                onClick={() => setSelectedRegion('seoul')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap border ${
                  selectedRegion === 'seoul'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
                }`}
              >
                서울특별시
              </button>
              <button
                type="button"
                onClick={() => setSelectedRegion('gyeonggi')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap border ${
                  selectedRegion === 'gyeonggi'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
                }`}
              >
                경기도
              </button>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative pt-1 border-t border-neutral-100">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="지역구, 동명 또는 키워드 검색 (예: 강남구, 판교, 마포, 이사, 서류 등)"
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-neutral-900 focus:bg-white"
            />
          </div>
        </div>

        {/* Gallery / Post Cards Grid: Bright, Vivid Photos & Clear Text Separation */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPosts.map((post) => {
              const vehicleMeta = VEHICLE_LABELS[post.vehicleCategory];
              const regionMeta = REGION_LABELS[post.regionCategory];

              return (
                <article
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col cursor-pointer"
                >
                  {/* Photo Container: Bright, Clear and Vivid */}
                  <div className="relative aspect-[16/10] bg-neutral-100 overflow-hidden border-b-2 border-neutral-200">
                    {post.imageUrl ? (
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-400 text-xs">
                        사진 없음
                      </div>
                    )}
                    
                    {/* Clear Floating Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className={`text-[11px] font-black px-2.5 py-1 rounded-lg shadow-md ${vehicleMeta.color}`}>
                        {vehicleMeta.name}
                      </span>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-neutral-950/85 text-white backdrop-blur-xs shadow-md">
                        {regionMeta}
                      </span>
                    </div>

                    {/* Official Company Name & Contact On Photo: 스마트퀵화물 1544-9541 */}
                    <div className="absolute bottom-2.5 right-2.5 z-10 inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-950/90 text-white text-[11px] font-black rounded-lg border border-white/20 shadow-md backdrop-blur-xs">
                      <Phone className="w-3 h-3 text-blue-400" />
                      <span>스마트퀵화물 1544-9541</span>
                    </div>
                  </div>

                  {/* Body Content Container: Distinctly Separated from Photo */}
                  <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                    <div>
                      {/* Unboxed Metadata Line with typographic separators */}
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-neutral-500 mb-2">
                        <span className="text-blue-700 font-bold">{post.regionDetail}</span>
                        <span aria-hidden="true" className="text-neutral-300">·</span>
                        <span className="font-mono tabular-nums">{post.createdAt}</span>
                        <span aria-hidden="true" className="text-neutral-300">·</span>
                        <span>{post.author}</span>
                      </div>

                      {/* Main Title - Crisp, Bold and Clearly Separated */}
                      <h3 className="font-extrabold text-base sm:text-lg text-neutral-950 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h3>

                      {/* Content Snippet */}
                      <p className="mt-2.5 text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                        {post.content}
                      </p>
                    </div>

                    {/* Bottom Metadata & Button */}
                    <div className="mt-5 pt-3.5 border-t border-neutral-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3 text-neutral-400">
                        <span className="flex items-center gap-1 font-mono text-[11px] tabular-nums font-semibold">
                          <Eye className="w-3.5 h-3.5 text-neutral-400" />
                          <span>{post.views}</span>
                        </span>
                        <span className="flex items-center gap-1 font-mono text-[11px] tabular-nums text-rose-600 font-semibold">
                          <Heart className="w-3.5 h-3.5 fill-rose-600" />
                          <span>{post.likes}</span>
                        </span>
                      </div>

                      <span className="text-blue-600 font-bold text-xs inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>상세보기</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="py-16 text-center bg-white rounded-2xl border border-neutral-200 p-8 shadow-xs">
            <p className="text-sm font-medium text-neutral-500">선택하신 조건에 해당하는 배송 홍보글이 없습니다.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedVehicle('all');
                setSelectedRegion('all');
                setSearchQuery('');
              }}
              className="mt-3 px-4 py-2 text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 cursor-pointer"
            >
              전체 필터 초기화
            </button>
          </div>
        )}
      </div>

      {/* SEO Generator Tool Modal */}
      {isSeoToolOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-neutral-200">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200 mb-6">
              <div>
                <h3 className="text-lg font-black text-neutral-950 flex items-center gap-2">
                  <SearchCode className="w-5 h-5 text-blue-600" />
                  <span>스마트 SEO 도구 (네이버 & 구글 검색 최적화)</span>
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  차종과 지역구를 선택하면 상위 노출에 최적화된 메타태그, 검색 제목, 키워드 및 본문 템플릿을 실시간 자동 생성합니다.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsSeoToolOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5 text-xs">
              {/* 1. Vehicle Selection */}
              <div>
                <label className="block font-bold text-neutral-800 mb-1.5">01. 대상 차종 선택</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['motorcycle', 'damas', 'truck'] as PromoVehicleCategory[]).map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setSeoVehicle(v)}
                      className={`py-2 px-3 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                        seoVehicle === v
                          ? `${VEHICLE_LABELS[v].color} shadow-xs ring-2 ${VEHICLE_LABELS[v].ringColor}`
                          : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                      }`}
                    >
                      {VEHICLE_LABELS[v].name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Region & District Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-800 mb-1.5">02. 광역 지역 구분</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSeoRegion('seoul');
                        setSeoDistrict(SEO_DISTRICTS_SEOUL[0]);
                      }}
                      className={`py-2 px-3 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                        seoRegion === 'seoul'
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                      }`}
                    >
                      서울특별시
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSeoRegion('gyeonggi');
                        setSeoDistrict(SEO_DISTRICTS_GYEONGGI[0]);
                      }}
                      className={`py-2 px-3 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                        seoRegion === 'gyeonggi'
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                      }`}
                    >
                      경기도
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-neutral-800 mb-1.5">03. 타겟 시·구 선택</label>
                  <select
                    value={seoDistrict}
                    onChange={(e) => setSeoDistrict(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
                  >
                    {(seoRegion === 'seoul' ? SEO_DISTRICTS_SEOUL : SEO_DISTRICTS_GYEONGGI).map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Generated SEO Results */}
              <div className="space-y-4 pt-3 border-t border-neutral-200">
                {/* Result 1: Title */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-neutral-800 flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5 text-blue-600" />
                      <span>검색엔진 최적화 제목 (SEO Title)</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(generatedSeoTitle, 'title')}
                      className="text-blue-600 hover:text-blue-800 font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === 'title' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'title' ? '복사됨' : '복사'}</span>
                    </button>
                  </div>
                  <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl font-bold text-neutral-900 text-xs">
                    {generatedSeoTitle}
                  </div>
                </div>

                {/* Result 2: Description */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-neutral-800 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-blue-600" />
                      <span>메타 설명문 (Meta Description - 140자 규격)</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(generatedSeoDesc, 'desc')}
                      className="text-blue-600 hover:text-blue-800 font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === 'desc' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'desc' ? '복사됨' : '복사'}</span>
                    </button>
                  </div>
                  <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-700 text-xs leading-relaxed">
                    {generatedSeoDesc}
                  </div>
                </div>

                {/* Result 3: Recommended Keywords */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-neutral-800">
                      네이버 플레이스 & 블로그 상위노출 키워드 10종
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(generatedSeoKeywords.map((k) => '#' + k).join(' '), 'tags')}
                      className="text-blue-600 hover:text-blue-800 font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === 'tags' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'tags' ? '복사됨' : '복사'}</span>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 p-3 bg-neutral-50 border border-neutral-200 rounded-xl">
                    {generatedSeoKeywords.map((tag, i) => (
                      <span key={i} className="text-xs font-semibold text-blue-700 bg-white border border-blue-200 px-2 py-0.5 rounded-md">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-neutral-200 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setIsSeoToolOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 hover:bg-neutral-50 font-bold cursor-pointer"
                >
                  닫기
                </button>

                <button
                  type="button"
                  onClick={applySeoToWriter}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>이 SEO 키워드로 홍보글 즉시 작성하기</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-neutral-200">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-black px-2.5 py-1 rounded-lg ${VEHICLE_LABELS[selectedPost.vehicleCategory].color}`}>
                    {VEHICLE_LABELS[selectedPost.vehicleCategory].name}
                  </span>
                  <span className="text-xs font-bold text-neutral-700 bg-neutral-100 px-2.5 py-1 rounded-lg border border-neutral-200">
                    {REGION_LABELS[selectedPost.regionCategory]}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-neutral-950 leading-snug">
                  {selectedPost.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-neutral-500 mt-2 font-medium">
                  <span>작성자: {selectedPost.author}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{selectedPost.createdAt}</span>
                  <span aria-hidden="true">·</span>
                  <span>조회수 {selectedPost.views}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photo: High Quality & Vivid */}
            {selectedPost.imageUrl && (
              <div className="relative rounded-2xl overflow-hidden mb-5 bg-neutral-100 max-h-80 flex items-center justify-center border border-neutral-200 shadow-sm">
                <img
                  src={selectedPost.imageUrl}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover brightness-105"
                  referrerPolicy="no-referrer"
                />
                {/* Official Company Name & Phone Badge On Photo */}
                <div className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-950/90 text-white text-xs font-black rounded-xl border border-white/20 shadow-lg backdrop-blur-xs">
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                  <span>스마트퀵화물 1544-9541</span>
                </div>
              </div>
            )}

            {/* Route & Detail Info */}
            <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 mb-5 text-xs text-neutral-800 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-neutral-950">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                <span>운송 구간: {selectedPost.regionDetail}</span>
              </div>
            </div>

            {/* Full Content */}
            <div className="text-sm text-neutral-800 leading-relaxed whitespace-pre-line mb-6 font-medium">
              {selectedPost.content}
            </div>

            {/* Tags */}
            {selectedPost.tags && selectedPost.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-6 pt-3 border-t border-neutral-100">
                {selectedPost.tags.map((tag, idx) => (
                  <span key={idx} className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-neutral-200">
              {onDeletePost && (
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('이 글을 삭제하시겠습니까?')) {
                      onDeletePost(selectedPost.id);
                      setSelectedPost(null);
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>글 삭제</span>
                </button>
              )}

              <div className="flex items-center gap-2 ml-auto">
                <a
                  href="tel:1544-9541"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>1544-9541 즉시 배차 전화연결</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin Write & Photo Upload Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-neutral-200">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200 mb-6">
              <div>
                <h3 className="text-lg font-bold text-neutral-950 flex items-center gap-2">
                  <ImagePlus className="w-5 h-5 text-blue-600" />
                  <span>관리자 홍보글 작성 및 사진 등록</span>
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  오토바이, 다마스, 용달 3가지 차종과 서울/경기도 지역을 지정하여 배송 현장 글과 사진을 간편하게 업로드합니다.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsWriteModalOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitPost} className="space-y-5 text-xs">
              {/* 1. Vehicle Selection (오토바이 / 다마스 / 용달 3가지 분리) */}
              <div>
                <label className="block font-bold text-neutral-900 mb-2">
                  차종 분류 (3가지 분리) <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setVehicleCategory('motorcycle')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      vehicleCategory === 'motorcycle'
                        ? 'bg-blue-50 border-blue-600 text-blue-900 font-extrabold ring-2 ring-blue-600/20'
                        : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <div className="text-sm font-extrabold text-blue-700">🏍️ 오토바이 퀵</div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">도심 초급송·서류</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVehicleCategory('damas')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      vehicleCategory === 'damas'
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-900 font-extrabold ring-2 ring-emerald-600/20'
                        : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <div className="text-sm font-extrabold text-emerald-700">🚐 다마스 퀵</div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">소형 밴·우천안심</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVehicleCategory('truck')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      vehicleCategory === 'truck'
                        ? 'bg-indigo-50 border-indigo-600 text-indigo-900 font-extrabold ring-2 ring-indigo-600/20'
                        : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <div className="text-sm font-extrabold text-indigo-700">🚚 1톤~25톤 용달</div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">화물차·원룸이사·대형직송</div>
                  </button>
                </div>
              </div>

              {/* 2. Region Selection (서울 / 경기도) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-neutral-900 mb-2">
                    지역 구분 (서울 / 경기도) <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setRegionCategory('seoul');
                        if (!regionDetail.includes('서울')) setRegionDetail('서울 강남구 역삼동');
                      }}
                      className={`py-2 px-3 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                        regionCategory === 'seoul'
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                      }`}
                    >
                      서울특별시
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setRegionCategory('gyeonggi');
                        if (!regionDetail.includes('경기')) setRegionDetail('경기도 성남시 분당구');
                      }}
                      className={`py-2 px-3 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                        regionCategory === 'gyeonggi'
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                      }`}
                    >
                      경기도
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-neutral-900 mb-2">
                    상세 구간 / 동명 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="예: 서울 강남구 테헤란로 ➔ 여의도"
                    value={regionDetail}
                    onChange={(e) => setRegionDetail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
                  />
                </div>
              </div>

              {/* 3. Title */}
              <div>
                <label className="block font-bold text-neutral-900 mb-1">
                  홍보글 제목 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: [서울 강남구] 긴급 법인 계약서 테헤란로 20분 초급송 배송 완료"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
                />
              </div>

              {/* 4. Photo Upload System */}
              <div>
                <label className="block font-bold text-neutral-900 mb-1">
                  현장 사진 올리기 (PC/모바일 사진 첨부)
                </label>
                
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-neutral-300 hover:border-blue-500 bg-neutral-50/60 hover:bg-blue-50/20 rounded-2xl p-4 text-center cursor-pointer transition-all"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <Upload className="w-6 h-6 text-neutral-400 mx-auto mb-1.5" />
                  <p className="font-bold text-neutral-800 text-xs">
                    클릭하여 사진 파일 첨부 (또는 드래그 앤 드롭)
                  </p>
                  <p className="text-[11px] text-neutral-500 mt-0.5">JPG, PNG, WebP 사진 지원</p>
                </div>

                {imagePreview && (
                  <div className="mt-3 relative rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 h-44 flex items-center justify-center">
                    <img
                      src={imagePreview}
                      alt="업로드 사진 미리보기"
                      className="w-full h-full object-cover brightness-105"
                    />
                    <button
                      type="button"
                      onClick={() => setImagePreview('')}
                      className="absolute top-2 right-2 p-1 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors cursor-pointer"
                      title="사진 제거"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <span className="absolute bottom-2 left-2 bg-neutral-950/80 text-white text-[11px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                      선택된 사진
                    </span>
                  </div>
                )}

                {/* Quick Preset Selector */}
                <div className="mt-2.5 flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] text-neutral-500 font-bold">스마트퀵화물 사진 프리셋:</span>
                  <button
                    type="button"
                    onClick={() => handleUsePreset('/src/assets/images/smart_quick_moto_courier_1792884479574.jpg')}
                    className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer"
                  >
                    오토바이 급송
                  </button>
                  <span className="text-neutral-300">·</span>
                  <button
                    type="button"
                    onClick={() => handleUsePreset('/src/assets/images/smart_quick_damas_labo_1792884465629.jpg')}
                    className="text-[11px] font-bold text-emerald-600 hover:underline cursor-pointer"
                  >
                    다마스&라보
                  </button>
                  <span className="text-neutral-300">·</span>
                  <button
                    type="button"
                    onClick={() => handleUsePreset('/src/assets/images/smart_quick_truck_cargo_1792884434554.jpg')}
                    className="text-[11px] font-bold text-indigo-600 hover:underline cursor-pointer"
                  >
                    1톤~25톤 용달 화물차
                  </button>
                  <span className="text-neutral-300">·</span>
                  <button
                    type="button"
                    onClick={() => handleUsePreset('/src/assets/images/smart_quick_fleet_all_1792884451309.jpg')}
                    className="text-[11px] font-bold text-purple-600 hover:underline cursor-pointer"
                  >
                    4대 전차종 라인업
                  </button>
                </div>
              </div>

              {/* 5. Content */}
              <div>
                <label className="block font-bold text-neutral-900 mb-1">
                  배송 내용 및 스토리 <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="배송 화물 종류, 배송 소요시간, 고객 요청사항, 안전 포장 및 완료 상태 등을 상세히 작성해 주세요."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>

              {/* 6. Author and Tags */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-900 mb-1">작성자명</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-900 mb-1">태그 (쉼표로 구분)</label>
                  <input
                    type="text"
                    placeholder="오토바이퀵, 서울퀵, 서류급송"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsWriteModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 hover:bg-neutral-50 font-bold cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-xl shadow-sm transition-all cursor-pointer"
                >
                  {isUploading ? '사진 처리 중...' : '홍보실에 즉시 등록하기'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
