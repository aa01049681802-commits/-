import { VehicleOption, BookingData, VehicleId, DeliveryType, PromotionPost } from '../types';

export const VEHICLE_OPTIONS: VehicleOption[] = [
  {
    id: 'motorcycle',
    name: 'Motorcycle Quick',
    nameKo: '스마트퀵화물 오토바이',
    badge: '도심 초급송',
    maxWeight: '25kg 미만',
    dimensions: '세 변의 합 90cm 이내 (A4 서류, 소형 박스 1개)',
    bestFor: '긴급 서류, 인감·계약서, 샘플, 부품, 의류, 여권/열쇠',
    baseFare: 8000,
    baseDistanceKm: 5,
    perKmRate: 1100,
  },
  {
    id: 'damas',
    name: 'Damas Compact Van',
    nameKo: '스마트퀵화물 다마스',
    badge: '우천·안심 소형밴',
    maxWeight: '30kg ~ 400kg',
    dimensions: '적재함 1.6m x 1.1m x 1.1m (우천 완전 밀폐)',
    bestFor: '중소형 박스 15~20박스, 소형 가전, 꽃바구니, 비·눈에 젖으면 안 되는 물품',
    baseFare: 25000,
    baseDistanceKm: 10,
    perKmRate: 1400,
  },
  {
    id: 'labo',
    name: 'Labo Mini Truck',
    nameKo: '스마트퀵화물 라보',
    badge: '장척물 특화 소형트럭',
    maxWeight: '400kg ~ 1,000kg',
    dimensions: '적재함 2.2m x 1.3m (개방형 적재함)',
    bestFor: '길이가 긴 목재/파이프 자재, 부피가 큰 화물, 소형 가구',
    baseFare: 30000,
    baseDistanceKm: 10,
    perKmRate: 1500,
  },
  {
    id: 'truck1t',
    name: '1-Ton to 25-Ton Freight Truck',
    nameKo: '스마트퀵화물 1톤~25톤 용달 화물차',
    badge: '원룸이사·기업대형화물',
    maxWeight: '1톤 ~ 25톤 전 차종 지원',
    dimensions: '1톤(2.8m)부터 5톤(6.2m), 11톤, 25톤(13.6m)',
    bestFor: '원룸·사무실 이사, 기업 대형 화물, 팔레트 1~16구, 공장 기계·자재, 전국 직송',
    baseFare: 45000,
    baseDistanceKm: 15,
    perKmRate: 1700,
  },
  {
    id: 'truck1t_lift',
    name: '1-Ton to 5-Ton Lift / Wingbody',
    nameKo: '스마트퀵화물 1톤~5톤 리프트/윙바디',
    badge: '특수 상하차·밀폐방수',
    maxWeight: '1,000kg ~ 5,000kg',
    dimensions: '자동 유압 리프트 장착 / 박스형 윙바디',
    bestFor: '정밀 의료기기, 서버 랙, 무거운 방송장비, 바퀴 달린 고중량 기계',
    baseFare: 60000,
    baseDistanceKm: 15,
    perKmRate: 1800,
  },
  {
    id: 'truck5t',
    name: '5-Ton to 25-Ton Heavy Cargo',
    nameKo: '스마트퀵화물 5톤~25톤 대형 화물차',
    badge: '전국 직송·대량물류',
    maxWeight: '최대 25,000kg (25톤)',
    dimensions: '적재함 길이 6.2m ~ 13.6m (팔레트 10~16구 이상)',
    bestFor: '공장 대량 원자재, 수출입 컨테이너/물류, 전국 물류센터 간 대형 직송',
    baseFare: 160000,
    baseDistanceKm: 30,
    perKmRate: 2300,
  },
];

export interface RegionInfo {
  category: string;
  name: string;
  x: number; // approximate coordinate for distance calc
  y: number;
}

export const REGIONS: RegionInfo[] = [
  // Seoul districts
  { category: '서울 강남권', name: '강남구', x: 37.4979, y: 127.0276 },
  { category: '서울 강남권', name: '서초구', x: 37.4837, y: 127.0324 },
  { category: '서울 강남권', name: '송파구', x: 37.5145, y: 127.1058 },
  { category: '서울 강남권', name: '강동구', x: 37.5301, y: 127.1238 },
  { category: '서울 도심권', name: '중구 (명동·동대문)', x: 37.5636, y: 126.9975 },
  { category: '서울 도심권', name: '종로구', x: 37.5730, y: 126.9794 },
  { category: '서울 도심권', name: '용산구', x: 37.5326, y: 126.9900 },
  { category: '서울 서부권', name: '영등포구 (여의도)', x: 37.5264, y: 126.8962 },
  { category: '서울 서부권', name: '마포구 (홍대·상암)', x: 37.5508, y: 126.9087 },
  { category: '서울 서부권', name: '구로구 (디지털단지)', x: 37.4954, y: 126.8874 },
  { category: '서울 서부권', name: '금천구 (가산디지털)', x: 37.4568, y: 126.8954 },
  { category: '서울 서부권', name: '강서구 (마곡·김포공항)', x: 37.5509, y: 126.8495 },
  { category: '서울 동북권', name: '광진구 (본사·건대)', x: 37.5385, y: 127.0822 },
  { category: '서울 동북권', name: '성동구 (성수동)', x: 37.5633, y: 127.0371 },
  { category: '서울 동북권', name: '동대문구', x: 37.5744, y: 127.0397 },
  { category: '서울 동북권', name: '노원구', x: 37.6542, y: 127.0568 },
  { category: '서울 동북권', name: '성북구', x: 37.5891, y: 127.0182 },
  // Gyeonggi
  { category: '경기 남부', name: '성남시 (분당·판교)', x: 37.3827, y: 127.1189 },
  { category: '경기 남부', name: '수원시 (영통·팔달)', x: 37.2636, y: 127.0286 },
  { category: '경기 남부', name: '용인시 (기흥·수지)', x: 37.2411, y: 127.1776 },
  { category: '경기 남부', name: '안양시 (평촌)', x: 37.3943, y: 126.9568 },
  { category: '경기 남부', name: '화성시 (동탄)', x: 37.1995, y: 126.8315 },
  { category: '경기 남부', name: '평택시', x: 36.9921, y: 127.1129 },
  { category: '경기 서부/인천', name: '부천시', x: 37.5034, y: 126.7660 },
  { category: '경기 서부/인천', name: '인천광역시 (송도·부평·남동)', x: 37.4563, y: 126.7052 },
  { category: '경기 북부', name: '고양시 (일산)', x: 37.6584, y: 126.8320 },
  { category: '경기 북부', name: '파주시', x: 37.7600, y: 126.7799 },
  { category: '경기 북부', name: '남양주시', x: 37.6360, y: 127.2165 },
  { category: '경기 북부', name: '의정부시', x: 37.7381, y: 127.0337 },
  // Nationwide Cities
  { category: '충청권', name: '대전광역시', x: 36.3504, y: 127.3845 },
  { category: '충청권', name: '천안·아산시', x: 36.8151, y: 127.1139 },
  { category: '충청권', name: '청주시', x: 36.6424, y: 127.4890 },
  { category: '영남권', name: '대구광역시', x: 35.8714, y: 128.6014 },
  { category: '영남권', name: '부산광역시', x: 35.1796, y: 129.0756 },
  { category: '영남권', name: '울산광역시', x: 35.5384, y: 129.3114 },
  { category: '호남권', name: '광주광역시', x: 35.1595, y: 126.8526 },
  { category: '강원권', name: '원주시 / 춘천시', x: 37.3422, y: 127.9202 },
];

export function calculateDistanceKm(originName: string, destName: string): number {
  if (originName === destName) return 3.5;
  const o = REGIONS.find(r => r.name === originName);
  const d = REGIONS.find(r => r.name === destName);
  if (!o || !d) return 12.0;

  // Haversine formula
  const R = 6371; // km
  const dLat = (d.x - o.x) * Math.PI / 180;
  const dLon = (d.y - o.y) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(o.x * Math.PI / 180) * Math.cos(d.x * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const straightKm = R * c;

  // Road circuitous factor (~1.3x for Seoul metro roads, 1.25x for highways)
  const roadKm = Math.max(3.0, Math.round(straightKm * 1.35 * 10) / 10);
  return roadKm;
}

export function calculateEstimateFare({
  vehicleId,
  distanceKm,
  deliveryType,
  needHelper,
  isNight,
}: {
  vehicleId: VehicleId;
  distanceKm: number;
  deliveryType: DeliveryType;
  needHelper: boolean;
  isNight: boolean;
}) {
  const vehicle = VEHICLE_OPTIONS.find(v => v.id === vehicleId) || VEHICLE_OPTIONS[0];

  let fare = vehicle.baseFare;
  if (distanceKm > vehicle.baseDistanceKm) {
    const extraKm = distanceKm - vehicle.baseDistanceKm;
    fare += extraKm * vehicle.perKmRate;
  }

  // Round to nearest 1,000 KRW
  fare = Math.ceil(fare / 1000) * 1000;

  // Express surcharge
  const expressSurcharge = deliveryType === 'express' ? (vehicleId === 'motorcycle' ? 4000 : 8000) : 0;

  // Helper surcharge
  let helperSurcharge = 0;
  if (needHelper) {
    if (vehicleId === 'motorcycle') helperSurcharge = 0;
    else if (vehicleId === 'damas' || vehicleId === 'labo') helperSurcharge = 15000;
    else helperSurcharge = 30000;
  }

  // Night surcharge (20%)
  const nightSurcharge = isNight ? Math.round((fare * 0.2) / 1000) * 1000 : 0;

  const totalFare = fare + expressSurcharge + helperSurcharge + nightSurcharge;

  // Estimated minutes: city traffic ~ 25km/h + 15 min pickup/drop
  const estMins = Math.max(20, Math.round((distanceKm / 28) * 60 + 15));

  return {
    baseFare: fare,
    expressSurcharge,
    helperSurcharge,
    nightSurcharge,
    totalFare,
    estimatedMinutes: estMins,
  };
}

// Sample preloaded bookings
export const INITIAL_BOOKINGS: BookingData[] = [
  {
    id: 'demo-1',
    trackingCode: 'SQ-20261024-8841',
    createdAt: '2026-10-24 15:10',
    vehicleId: 'motorcycle',
    deliveryType: 'express',
    needHelper: false,
    isNight: false,
    sender: {
      name: '김서연',
      phone: '010-8291-3942',
      region: '강남구',
      address: '서울특별시 강남구 테헤란로 152',
      detail: '강남파이낸스센터 18층 (주)네오솔루션',
    },
    receiver: {
      name: '박준호',
      phone: '010-4712-9901',
      region: '영등포구 (여의도)',
      address: '서울특별시 영등포구 여의대로 108',
      detail: '파크원 타워1 22층 법무팀',
    },
    item: {
      type: '긴급 계약서 및 인감증명서 원본 1부',
      weightKg: 0.5,
      boxCount: 1,
      notes: '출발 전 발신인에게 전화 부탁드립니다.',
    },
    estimatedDistanceKm: 14.8,
    estimatedMinutes: 38,
    totalFare: 21000,
    paymentMethod: 'prepaid',
    status: 'in_transit',
    driver: {
      name: '이철호 기사님',
      phone: '010-9182-3841',
      vehiclePlate: '서울 강남 바 4821 (혼다 PCX)',
      rating: 4.95,
    },
    timeline: [
      { status: 'received', label: '접수 완료', time: '15:10', detail: '스마트퀵 관제센터 정상 접수' },
      { status: 'assigned', label: '기사 배정', time: '15:14', detail: '강남권 이철호 기사님 배정 (5분 내 도착)' },
      { status: 'picked_up', label: '물품 픽업 완료', time: '15:26', detail: '강남파이낸스센터 18층에서 수령' },
      { status: 'in_transit', label: '안전 배송중', time: '15:35', detail: '올림픽대로 경유 여의도로 신속 이동 중' },
    ],
  },
  {
    id: 'demo-2',
    trackingCode: 'SQ-20261024-3190',
    createdAt: '2026-10-24 13:40',
    vehicleId: 'damas',
    deliveryType: 'standard',
    needHelper: true,
    isNight: false,
    sender: {
      name: '최원영 과장',
      phone: '010-3321-4491',
      region: '광진구 (본사·건대)',
      address: '서울특별시 광진구 능동로 209',
      detail: '세종대학교 산학협력관 3층',
    },
    receiver: {
      name: '정민수 팀장',
      phone: '010-5561-2290',
      region: '성남시 (분당·판교)',
      address: '경기도 성남시 분당구 판교역로 166',
      detail: '카카오 판교아지트 5층 R&D센터',
    },
    item: {
      type: '세미나 전시용 홍보 배너 및 브로슈어 8박스',
      weightKg: 65,
      boxCount: 8,
      notes: '지하 주차장 하역장으로 진입해주세요.',
    },
    estimatedDistanceKm: 21.4,
    estimatedMinutes: 48,
    totalFare: 55000,
    paymentMethod: 'tax_invoice',
    status: 'delivered',
    driver: {
      name: '강태석 기사님',
      phone: '010-6641-7712',
      vehiclePlate: '경기 83바 7291 (다마스 밴)',
      rating: 4.98,
    },
    timeline: [
      { status: 'received', label: '접수 완료', time: '13:40', detail: '온라인 세금계산서 기업 접수' },
      { status: 'assigned', label: '기사 배정', time: '13:45', detail: '광진·성동 전담 강태석 기사님 배정' },
      { status: 'picked_up', label: '물품 픽업 완료', time: '14:05', detail: '산학협력관 3층 상차 지원 완료' },
      { status: 'in_transit', label: '안전 배송중', time: '14:22', detail: '분당수서간고속화도로 이동' },
      { status: 'delivered', label: '배송 전달 완료', time: '14:52', detail: '정민수 팀장님 직접 대면 서명 수령 완료' },
    ],
  },
];

export const STANDARD_TERMS = [
  {
    title: '제 1 조 (목적 및 정의)',
    content:
      "본 약관은 스마트퀵화물(이하 '사업자')과 배송을 의뢰하는 고객(이하 '고객') 간의 공정한 화물 운송 계약 조건 및 권리의무 관계를 정함을 목적으로 합니다. '배송'이란 소형 및 중대형 화물을 고객의 지정 장소에서 인수하여 수취인에게 안전하게 인도하는 일체의 과정을 뜻합니다.",
  },
  {
    title: '제 2 조 (운임 청구 및 지불)',
    content:
      '운임은 배송 거리, 선택 차량 종류, 화물 중량 및 부피, 야간·기상 할증, 수작업 상하차 지원 유무에 따라 사전 고지된 표준 요율표에 의거하여 책정됩니다. 운임은 선불(출발지 결제) 또는 착불(수취인 결제)이 가능하며, 기업 고객은 사전 승인 하에 월말 전자세금계산서 후불 정산이 가능합니다.',
  },
  {
    title: '제 3 조 (적재물 배상책임보험 및 손해보상)',
    content:
      '스마트퀵화물의 모든 등록 배차 차량은 적재물 배상책임보험에 100% 가입되어 있습니다. 운송 중 사업자 또는 운송원의 귀책사유로 인한 화물의 멸실, 훼손, 분실 발생 시 물품 가액 증빙 자료(세금계산서, 구매영수증 등)에 의거하여 보험사 사정 및 표준 상법 규정에 따라 신속하게 손해배상을 집행합니다. (귀금속, 고가 미술품 등 50만원 초과 고가 화물은 접수 시 사전 고지 의무가 있습니다.)',
  },
  {
    title: '제 4 조 (배송물의 포장 및 인수 거절 기준)',
    content:
      '고객은 화물의 성질과 중량에 맞게 내용물이 파손되지 않도록 적합하게 포장할 의무가 있습니다. 폭발물, 인화성 물질, 마약류, 시신, 현금 및 유가증권, 부패하기 쉬운 미포장 생물, 법률상 유통이 금지된 물품은 인수가 엄격히 거절됩니다.',
  },
];

export const FAQS = [
  {
    q: '비가 오거나 눈이 많이 내리는 날에도 배송이 가능한가요?',
    a: '네, 365일 24시간 정상 운행합니다. 우천이나 강설 시에는 비에 젖지 않도록 완전 밀폐형 적재함을 갖춘 다마스 밴, 1톤 탑차 또는 방수 방풍 커버가 완비된 특화 차량을 집중 배차합니다.',
  },
  {
    q: '세금계산서 및 현금영수증 발행은 어떻게 처리되나요?',
    a: '접수 시 결제수단에서 "세금계산서" 또는 "현금영수증"을 선택해 주시면 배송 완료 즉시 국세청 홈택스로 전자세금계산서 또는 지출증빙 현금영수증이 자동 발행됩니다. 기업 회원은 월 단위 합산 발행도 지원합니다.',
  },
  {
    q: '기사님이 짐을 엘리베이터나 계단으로 같이 옮겨주시나요?',
    a: '차량 단독 운송(차량 대기 후 단순 이동) 외에 기사님의 상하차 수작업 도움이 필요하신 경우 요금 계산기에서 "기사님 수작업 도움" 옵션을 체크해주시면 기사님께서 짐 운반을 함께 적극 도와드립니다.',
  },
  {
    q: '신용카드 결제나 후불 결제도 지원하나요?',
    a: '네, 기사님 무선 카드 단말기 현장 결제, 고객센터(1544-9541) 전화 수기 결제, 모바일 카드 결제 링크 전송이 모두 가능하며 법인 고객은 신용 평가 후 월 결제(익월 10일 정산)를 제공합니다.',
  },
];

export const INITIAL_PROMOTION_POSTS: PromotionPost[] = [
  {
    id: 'promo-1',
    title: '[서울 강남구] 역삼동 IT 벤처기업 긴급 투자계약서 원본 20분 초급송 배송',
    vehicleCategory: 'motorcycle',
    regionCategory: 'seoul',
    regionDetail: '서울 강남구 테헤란로 ➔ 영등포구 여의도',
    content: '법무법인 날인이 시급한 원본 계약서 서류 1건을 접수 12분 만에 신속 픽업하여 올림픽대로 정체에도 불구하고 25분 만에 여의도 파크원 빌딩에 안전 전달 완료하였습니다. 방수 지퍼백 이중 포장으로 안전하게 배송 완료되었습니다.',
    imageUrl: '/src/assets/images/smart_quick_moto_courier_1792884479574.jpg',
    author: '스마트관리자',
    createdAt: '2026-10-24',
    views: 184,
    likes: 12,
    tags: ['오토바이퀵', '서울퀵서비스', '강남퀵', '서류급송'],
  },
  {
    id: 'promo-2',
    title: '[경기 성남시] 판교 테크노밸리 반도체 R&D 장비 부품 다마스 15박스 안전운송',
    vehicleCategory: 'damas',
    regionCategory: 'gyeonggi',
    regionDetail: '경기도 성남시 분당구 판교역로 ➔ 수원시 영통구',
    content: '충격에 민감한 반도체 테스팅 소켓 및 계측기기 15박스를 밀폐형 다마스 차량으로 안전하게 운송하였습니다. 에어캡 완충재 보강 및 적재함 내 흔들림 방지 고정 작업을 마친 뒤 수원 연구소 하역장에 손상 없이 정밀 전달되었습니다.',
    imageUrl: '/src/assets/images/smart_quick_damas_labo_1792884465629.jpg',
    author: '스마트관리자',
    createdAt: '2026-10-23',
    views: 152,
    likes: 9,
    tags: ['다마스퀵', '판교퀵', '분당화물', '장비운송'],
  },
  {
    id: 'promo-3',
    title: '[서울 마포구] 상암동 방송국 스튜디오 무대 세트 및 방송 장비 1톤 용달 배차',
    vehicleCategory: 'truck',
    regionCategory: 'seoul',
    regionDetail: '서울 마포구 상암산로 ➔ 강남구 논현동 스튜디오',
    content: '생방송 촬영용 조명 키트, 삼각대, 모니터 랙 등 부피가 큰 촬영 장비 일체를 1톤 카고 차량으로 배차하여 상하차 기사님 도움과 함께 신속하게 이전하였습니다. 기업 세금계산서 발행 완료 건입니다.',
    imageUrl: '/src/assets/images/smart_quick_truck_cargo_1792884434554.jpg',
    author: '스마트관리자',
    createdAt: '2026-10-22',
    views: 209,
    likes: 15,
    tags: ['1톤용달', '마포용달', '방송장비운반', '기업화물'],
  },
  {
    id: 'promo-4',
    title: '[경기 수원시] 권선구 공구유통단지 긴급 절삭공구 오토바이 당일 퀵서비스',
    vehicleCategory: 'motorcycle',
    regionCategory: 'gyeonggi',
    regionDetail: '경기도 수원시 권선구 ➔ 화성시 동탄 산단',
    content: '제조 공장 가동 중단 위기로 급히 요청하신 CNC 절삭 인서트 공구 3세트를 접수 15분 만에 픽업하여 30분 만에 동탄 반도체 협력업체 생산 라인에 직송 배송하였습니다.',
    imageUrl: '/src/assets/images/smart_quick_moto_courier_1792884479574.jpg',
    author: '스마트관리자',
    createdAt: '2026-10-20',
    views: 128,
    likes: 7,
    tags: ['오토바이퀵', '수원퀵', '동탄퀵', '긴급자재'],
  },
  {
    id: 'promo-5',
    title: '[서울 성동구] 성수동 디자인 쇼룸 신제품 패션의류 20박스 다마스 밴 배송',
    vehicleCategory: 'damas',
    regionCategory: 'seoul',
    regionDetail: '서울 성동구 연무장길 ➔ 중구 동대문 DDP 패션몰',
    content: '비가 오는 날씨였으나 밀폐형 다마스 밴으로 우천 침수 위험 없이 옷걸이 박스 20개를 완벽 방수 상태로 안전 배송하였습니다. 현장 카드 결제로 영수증 발급 완료.',
    imageUrl: '/src/assets/images/smart_quick_damas_labo_1792884465629.jpg',
    author: '스마트관리자',
    createdAt: '2026-10-18',
    views: 177,
    likes: 11,
    tags: ['다마스퀵', '성수동퀵', '동대문의류배송', '방수배송'],
  },
  {
    id: 'promo-6',
    title: '[경기 고양시] 일산 킨텍스 전시 박람회 부스 자재 및 기업 물류 1톤~25톤 화물차 직송 배송',
    vehicleCategory: 'truck',
    regionCategory: 'gyeonggi',
    regionDetail: '경기도 고양시 일산서구 킨텍스 ➔ 파주시 물류단지',
    content: '전시회 철거 및 기업 이전 일정에 맞추어 전시 판넬, 홍보 배너대, 가구 집기 및 파레트 자재 일체를 1톤~25톤 윙바디·카고 화물차로 신속 배차하여 물류창고로 안전하게 이동 조치하였습니다.',
    imageUrl: '/src/assets/images/smart_quick_truck_cargo_1792884434554.jpg',
    author: '스마트관리자',
    createdAt: '2026-10-16',
    views: 143,
    likes: 8,
    tags: ['1톤25톤화물', '화물차배차', '킨텍스화물', '파주화물', '기업물류'],
  },
];

