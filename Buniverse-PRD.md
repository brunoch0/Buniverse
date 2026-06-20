# 뷰니버스(Buniverse) — 제품 기획 문서 (PRD)

> ManyFast 등 기획 도구로 이어서 작업하기 위한 현재 사이트 스냅샷 + 로드맵.
> 작성: 2026-06 · 상태: MVP 배포 완료 (https://buniverse.vercel.app)

---

## 1. 제품 개요 (Overview)

**뷰니버스(BUNIVERSE)** 는 한국 투자자를 위한 **두바이 프리미엄 부동산 + 비즈니스 설립**
원스톱 플랫폼이다. "두바이, 당신의 주소가 되다" — 부동산 매입부터 법인 설립·자산관리·
프리미엄 자산(요트·번호판·전용기)까지 단일 파트너가 처리한다.

- **한 줄 정의**: 두바이 부동산·비즈니스를 잇는 부티크 파트너 (Real Estate + Business)
- **운영사**: Snowcube Co. Ltd.
- **대표**: 채현민
- **언어**: 한국어(메인) / 영어 — 사이트 전역 토글
- **현재 도메인**: buniverse.vercel.app (정식: buniverse.ae 연결 예정)

### 누가 왜 돈을 내는가 (Revenue First)
| 고객 | 지불 이유 | 수익 모델 |
|------|-----------|-----------|
| 한국 부동산 투자자 | 검증된 두바이 매물·계약·소유권 이전 대행 | 중개 수수료 |
| 법인 설립 희망 사업자 | 메인랜드/프리존 설립·비자·은행 원스톱 | 설립 대행 수수료 |
| 고액 자산가 | 요트·번호판·전용기 등 프리미엄 자산 중개 | 중개 수수료 |
| 투어 참가자 | 4박6일 현지 투자 탐방 프로그램 | 투어 참가비 |
| 멤버십 가입자 | 우선 매물·할인·VIP 혜택 | 멤버십 회비 |

---

## 2. 타깃 (Target)

- **1차**: 두바이 부동산에 관심 있는 **한국 개인/법인 투자자** (해외 부동산 초보 ~ 초고액 자산가)
- **2차**: 두바이 **법인 설립·세무 거주**가 필요한 사업자
- **3차**: 요트·번호판·전용기 등 **프리미엄 자산** 수요 고액자산가
- 글로벌/현지(영어권) 고객 — 영어 토글로 대응

---

## 3. 핵심 가치 (Core Value)

1. **신뢰** — 검증된 디벨로퍼·공식 파트너만 연결 (EMAAR, DAMAC, Nakheel 등)
2. **투명** — 실제 시세 기반 데이터
3. **편의** — 매물·렌트·관리·계약을 원스톱
4. **확장성** — 부동산을 넘어 비즈니스·프리미엄 자산으로 확장

브랜드 시그니처: 골드 "speech pill"(부동산 / 비즈니스) 두 기둥. 네이비+골드 팔레트,
두바이 3D claymation 비주얼. (디자인 시스템 토큰 구축 완료)

---

## 4. 정보 구조 (IA) / 페이지 맵

| 경로 | 페이지 | 핵심 내용 | 상태 |
|------|--------|-----------|------|
| `/` | 홈 | 히어로 → 채현민 대표 영상 → 2-pillar 서비스 → 추천매물 → CTA | ✅ |
| `/about` | 뷰니버스 소개 | 통합 플랫폼 소개, 핵심가치 4, 주요서비스 4 | ✅ |
| `/membership` | 멤버십 | SILVER / GOLD / BLACK 3등급 | ✅ |
| `/tour` | 투자투어 | 프로그램 목표, 차별점, 4박6일 실제 일정 | ✅ |
| `/investment` | 부동산투자 | VIP 부동산 서비스, 거래 프로세스 3단계 | ✅ |
| `/premium` | 프리미엄투자 | 요트 / 번호판 / 전용기 3개 서비스 | ✅ |
| `/partner` | 파트너 | 두바이 주요 건설사 7개 네트워크 | ✅ |
| `/community` | 커뮤니티 | 게시판 UI (정보/렌트/후기) | ⚠️ UI만 (DB 미연동) |
| (모달) | 온라인 문의 | 전역 EnquiryModal — 모든 "문의" CTA | ⚠️ 폼 미작동 |

---

## 5. 기능 인벤토리 (Features) — 현재/계획

### ✅ 구현 완료
- F-01 한/영 이중언어 토글 (localStorage 저장, 전역)
- F-02 반응형 헤더(풀 네비 + 모바일 햄버거 메뉴) / 푸터(실 연락처)
- F-03 홈 히어로 (두바이 선셋 + 브랜드 카피 + CTA)
- F-04 채현민 대표 YouTube 영상 섹션 (실제 영상 3개 + 채널 링크)
- F-05 2-pillar 서비스(부동산/비즈니스) 소개
- F-06 추천 매물 카드 그리드 (쇼케이스 — 더미 데이터)
- F-07 멤버십 3등급 비교 카드
- F-08 투자투어 4박6일 일정 타임라인
- F-09 VIP 부동산 서비스 + 거래 프로세스
- F-10 프리미엄(요트/번호판/전용기) 서비스 블록
- F-11 파트너 건설사 네트워크 그리드
- F-12 커뮤니티 게시판 UI 셸
- F-13 전역 문의 모달 (채현민 대표 어드바이저)

### ⚠️ 부분 구현 (백엔드 필요)
- F-14 온라인 문의 폼 → **Supabase 저장** (현재 가짜 성공)
- F-15 커뮤니티 게시판 → **Supabase 테이블 + 글쓰기/조회/RLS**

### 🔜 계획 (Backlog)
- F-16 투어신청 전용 폼 (원본 15필드: 이름·연락처·예산·개발사·지역·투어월·참가인원 등) → Supabase
- F-17 매물 관리 — 실제 매물 DB(매물 테이블) + 지역별/디벨로퍼별 필터
- F-18 매물 상세 페이지
- F-19 부동산 거래/렌트 실시간 게시판 (홈 연동)
- F-20 회원/로그인 (미니홈피 개인 공간 — 원본 비전)
- F-21 관리자(어드민) — 문의/투어신청/매물/게시글 관리
- F-22 채현민 대표 실사진 + 소개 페이지 프로필 섹션
- F-23 GA4 / 픽셀 등 분석·전환 추적
- F-24 SEO 메타·OG 이미지·sitemap
- F-25 buniverse.ae 도메인 연결 + SSL

---

## 6. 주요 사용자 흐름 (User Flows)

1. **투자 문의 전환**: 홈 진입 → 영상/서비스 탐색 → "투어 신청"/"문의" 클릭 →
   문의 모달 작성 → 제출 → (예정) Supabase 저장 + 어드바이저 회신
2. **투어 신청**: /tour → 일정·혜택 확인 → 신청 폼(F-16) → 제출
3. **멤버십 가입**: /membership → 등급 비교 → "가입 문의" → 모달
4. **매물 탐색(예정)**: /investment → 지역/디벨로퍼 필터 → 매물 목록 → 상세 → 문의
5. **커뮤니티(예정)**: /community → 카테고리/검색 → 글 보기/작성(로그인)

---

## 7. 데이터 모델 스케치 (Supabase 예정)

```
enquiries        문의: id, name, phone, email, message, source_page, created_at, status
tour_requests    투어신청: id, name, phone, email, tour_year, tour_month, tour_week,
                 participants, budget[], developers[], region, property_type,
                 tour_style, tour_info[], message, created_at, status
properties       매물: id, title, location, developer, price_aed, beds, baths,
                 area_sqft, type(ready/offplan), badges[], images[], featured, status
board_posts      게시글: id, category, title, body, author, password_hash,
                 views, created_at
members          회원: id, email, name, phone, tier(silver/gold/black), created_at
```

> 인증/권한: Supabase Auth + RLS. 어드민 자동 승격 패턴 참고(spa199).

---

## 8. 성공 지표 (Success Metrics)

- **1차 전환**: 문의/투어신청 폼 제출 수 (월간)
- **참여**: 영상 클릭률, 페이지별 체류, 멤버십 문의 수
- **품질**: 문의→상담→계약 퍼널 전환율
- **콘텐츠**: 커뮤니티 글 수·조회수, 재방문율
- **운영**: 평균 응답 시간(목표: ~10분), 투어 참가 전환

---

## 9. 기술 스택 (Tech)

- **Frontend**: Vite + React 18 + TypeScript + Tailwind v4
- **라우팅**: react-router-dom v7 (SPA, vercel.json rewrite 폴백)
- **i18n**: 자체 LanguageContext (`t({ko,en})`), 기본 한국어
- **아이콘**: lucide-react (브랜드 가이드 substitution)
- **디자인 시스템**: claude.ai/design 핸드오프 토큰(컬러·타이포·스페이싱) + 컴포넌트
- **백엔드(예정)**: Supabase (project `tovxutyvbkljcxuifxgj`) — Postgres + Auth + RLS + Edge Functions
- **배포**: Vercel (`buniverse`, GitHub 연동 자동 배포) · Repo: brunoch0/Buniverse
- **연락처**: 한국 +82-10-6770-7979 / 두바이 +971-56-492-3403 / buniversekorea@gmail.com

---

## 10. 다음 마일스톤 제안 (우선순위)

| 순위 | 작업 | 이유 |
|------|------|------|
| P0 | F-25 buniverse.ae 도메인 연결 | 정식 주소 + 기존 SSL 만료 사이트 교체 |
| P0 | F-14 문의 폼 Supabase 저장 | 핵심 전환(리드 수집)이 실제 작동해야 함 |
| P1 | F-16 투어신청 전용 폼 | 주요 수익(투어) 신청 경로 |
| P1 | F-22 채현민 대표 실사진/프로필 | 신뢰·브랜드 완성 |
| P2 | F-17~F-19 매물 DB + 상세 + 실시간 게시판 | 콘텐츠 깊이·재방문 |
| P2 | F-15 커뮤니티 DB 연동 | 커뮤니티 활성화 |
| P3 | F-20 회원/미니홈피 | 원본 장기 비전 |
| P3 | F-23/F-24 분석·SEO | 유입·전환 측정 |

---

_원본 사이트(PHP) 전체 미러는 로컬 `site/`에 백업되어 있어 콘텐츠 참조·복구 가능._
