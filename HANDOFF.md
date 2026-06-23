# 뷰니버스(Buniverse) — 개발 인수인계 문서

> 두바이 부동산·비즈니스 원스톱 플랫폼. 현재까지 개발된 상태를 원 개발사가 인수·연속 개발할 수 있도록 정리한 기술 문서입니다.
> 최종 업데이트: 2026-06-20

---

## 1. 개요

| 항목 | 값 |
|------|-----|
| **라이브 URL** | https://buniverse.vercel.app (정식 도메인 buniverse.ae 연결 예정) |
| **GitHub** | https://github.com/brunoch0/Buniverse (main 브랜치) |
| **호스팅** | Vercel (프로젝트명 `buniverse`, GitHub 연동 자동 배포) |
| **백엔드** | Supabase (project ref `tovxutyvbkljcxuifxgj`, region eu-north-1) |
| **운영사** | Snowcube Co. Ltd. |
| **언어** | 한국어/영어 (사이트 내 토글) |

**요약**: 기존 PHP/MySQL 사이트(buniverse.ae)를 **React SPA + Supabase**로 리빌드. 신뢰 기반 홈, 매물찾기(CMS), 시장데이터/AI센터(현재 샘플), 멤버십, 커뮤니티, 어드민(리드·매물 관리)까지 구현. 문의·투어신청 리드가 실제 DB에 저장되고 어드민에서 관리됨.

---

## 2. 기술 스택

- **Frontend**: Vite 6 + React 18 + TypeScript 5 + Tailwind v4(`@tailwindcss/vite`)
- **라우팅**: react-router-dom v7 (클라이언트 SPA, `vercel.json` rewrite로 폴백)
- **아이콘**: lucide-react
- **i18n**: 자체 구현 (`src/i18n/LanguageContext.tsx`, `t({ ko, en })` 패턴 — 외부 라이브러리 없음)
- **디자인 시스템**: claude.ai/design 핸드오프 토큰 기반. **CSS 변수 + 인라인 스타일** 중심(`src/design-system/tokens/*.css`). Tailwind는 설정돼 있으나 대부분 컴포넌트는 CSS 변수 토큰 사용
- **백엔드**: Supabase (PostgreSQL 17 + Auth + RLS + Edge Functions + pg_net)
- **배포**: Vercel

> ⚠️ 디자인 토큰은 `src/index.css`에서 직접 `@import` (중첩 `@import url()`은 Tailwind와 순서 충돌로 드롭됨). 폰트(Sora/Manrope/JetBrains Mono)는 `index.html`의 Google Fonts `<link>`로 로드.

---

## 3. 로컬 개발 셋업

```bash
git clone https://github.com/brunoch0/Buniverse.git
cd Buniverse
npm install

# 환경변수 (.env.local 생성)
cp .env.example .env.local   # 값 채우기 (아래 5번 참고)

npm run dev          # http://localhost:5173
npm run build        # tsc -b && vite build
npm run typecheck    # 타입체크
```

> `.env.local`이 없으면 Supabase 클라이언트가 `null`이 되어 폼/어드민은 비활성, 정적 페이지만 렌더됩니다.

---

## 4. 프로젝트 구조

```
src/
  main.tsx, App.tsx            # 진입점, 라우터
  index.css                    # Tailwind + 디자인토큰 import + 전역 + 반응형 미디어쿼리
  i18n/LanguageContext.tsx     # 한/영 컨텍스트
  config/site.ts               # 네비게이션, 연락처, CTA 라벨
  design-system/               # 디자인 토큰 (colors/typography/spacing CSS)
  lib/
    supabaseClient.ts          # Supabase 클라이언트 (env 없으면 null)
    auth.ts                    # 로그인/OTP/역할(is_admin·is_owner)/비번변경
    leads.ts                   # 문의·투어 저장 + 리드 조회/상태변경
    properties.ts              # 매물 fetch/CRUD + 타입
  components/
    ui/                        # Button, Badge, Input, Avatar, SpeechPill
    layout/                    # SiteHeader, SiteFooter, Layout, enquiry(전역 문의 컨텍스트)
    sections/                  # PageHero, Section, FeatureGrid, ProcessSteps, CtaBand, DataDisclosure
    property/                  # PropertyCard, StatBlock
    admin/PropertyManager.tsx  # 어드민 매물 CRUD
  sections/                    # 홈/페이지용 섹션 (HeroV2, Founder, Partners, Process, Results,
                               #   ServiceNav, Media, EnquiryModal 등)
  pages/                       # 라우트별 페이지 (아래 5번)
public/brand/                  # 브랜드 이미지 (heroes/avatars/logo/property)
```

> 참고: 구 PHP 사이트 미러(`site/`), 브랜드 원본(`Design/`, `Brand System/`)은 `.gitignore` 처리되어 레포에 없음(로컬 참조용). 사용 중인 이미지는 `public/brand/`에 커밋됨.

---

## 5. 라우트 / 페이지

| 경로 | 페이지 | 데이터 소스 |
|------|--------|------------|
| `/` | 홈 (신뢰형) | 정적 |
| `/properties` | 매물찾기 | **Supabase `properties`** |
| `/properties/:slug` | 매물 상세 | **Supabase `properties`** |
| `/projects` | 신규 런칭 프로젝트 | 정적(샘플) |
| `/market-data` | 시장데이터 | **Supabase `market_area_summary`** (DLD 집계 스냅샷 + 지도) |
| `/ai-center` | AI 데이터센터(예측+진단) | 정적(규칙 기반 mock) |
| `/membership` | 멤버십 | 정적 |
| `/content` | 콘텐츠센터 | 정적(샘플) |
| `/community` | 커뮤니티 | 정적(샘플) — 추후 `reviews` 연동 |
| `/admin` | 어드민 콘솔 | **Supabase (인증 필요)** |
| `/tour/apply` | 투어 신청(15필드) | **Supabase `tour_requests`** |
| `/about` `/tour` `/investment` `/premium` `/partner` | 보조 페이지 | 정적 |

전역 **문의 모달**(`EnquiryModal`) — 모든 "문의/상담" CTA가 열며 → `enquiries` 저장.

---

## 6. Supabase 백엔드

**Project ref**: `tovxutyvbkljcxuifxgj` · 대시보드: https://supabase.com/dashboard/project/tovxutyvbkljcxuifxgj

### 테이블 (public 스키마)

**`enquiries`** — 일반 문의/상담 리드
```
id uuid pk, created_at, name, phone, email, message, source_page, lang, status
status: new | progress | done
```

**`tour_requests`** — 투어 신청(15필드)
```
id uuid pk, created_at, name, phone, email, lang, residence_country,
budget_min numeric, budget_max numeric, regions text[], developers text[],
asset_types text[], purpose, tour_month, participants int, contact_channel,
message, status (new|progress|done)
```

**`properties`** — 매물 (어드민 CMS)
```
id uuid pk, created_at, updated_at, status (draft|published|archived),
listing_type (sale|rent|offplan|investment), property_type, slug (unique),
title, location, community, developer, price_label, price_note,
beds int, baths int, area, badges text[], summary_ko, summary_en,
highlights_ko text[], highlights_en text[], cover_image_url, image_urls text[], sort_order int
```

**`admin_allowlist`** — 관리자 허용목록 `email, role (owner|admin), created_at`
**`app_config`** — 키밸류 설정 (현재 `lead_webhook_url` = notify-lead 함수 URL)

**`market_area_summary`** — 지역별 DLD 집계 시세 스냅샷
```
month, area_name, transaction_count, median_value_aed, price_per_sqm,
ready_count, offplan_count, liquidity, premium, affordable,
period_start, period_end, as_of, source, source_url, synced_at
RLS: 공개 SELECT (집계 데이터, 개인정보 없음)
```

> ### ⚠️ 시장데이터 데이터 경계 (반드시 숙지)
> 시장데이터는 외부 데이터 상품(**data.dubaitoday.org**, 두바이 부동산 집계)에서 온 것이지만,
> **이 사이트(및 코드/자격증명)는 원본 데이터에 절대 접근할 수 없도록(역접근 차단) 설계되었습니다.**
> - 이 레포·프론트엔드에는 원본 백엔드의 URL/키/연결이 **전혀 없습니다.** Buniverse Supabase 한 곳만 연결합니다.
> - `market_area_summary`는 원본에서 **집계 요약만 단방향으로 복사한 스냅샷**입니다(원시 거래·개인정보 없음, 역추적 불가).
> - 갱신은 **원본 측(데이터 제공자)이 Buniverse로 push**하는 방식으로만 구성하세요. **절대 Buniverse에 원본 자격증명을 저장하거나 원본으로 pull하지 마세요.** (그러면 역접근 경로가 생깁니다.)
> - 출처 표기(`출처/기준일/면책`)는 `DataDisclosure` 컴포넌트로 모든 데이터 모듈에 유지합니다.

### RLS 정책 (요약)

- **enquiries / tour_requests**: anon = **INSERT만**(공개 폼), 공개 SELECT 없음. 관리자(`is_admin()`) = SELECT/UPDATE
- **properties**: public = `status='published'`만 SELECT. 관리자 = 전체 SELECT + INSERT/UPDATE/DELETE
- **admin_allowlist / app_config**: RLS 잠금(공개 접근 없음, security definer 함수만 조회)

### 권한 함수 (security definer)
- `public.is_admin()` → 로그인 사용자 이메일이 allowlist에 있으면 true (owner+admin)
- `public.is_owner()` → role='owner'인 경우 true (소유자 전용 기능용, 현재 미사용)

### Auth / 역할
- Supabase Auth (이메일+비밀번호 / 이메일 OTP)
- **owner**: `buniversekorea@gmail.com` (서비스 소유자/클라이언트)
- **admin**: `chohj0228@gmail.com` (개발/운영)
- 계정 생성은 Supabase 대시보드 Authentication → Add user (Auto Confirm). 첫 로그인 시 역할은 allowlist 기준 자동 부여
- 어드민 콘솔에서 인앱 비밀번호 변경 가능(`auth.updateUser`)

### Edge Function: `notify-lead` (리드 이메일 알림)
- `verify_jwt = false`, DB 트리거(`notify_new_lead`)가 `pg_net`으로 호출
- 새 `enquiries`/`tour_requests` INSERT → 함수 → **Resend API**로 이메일 발송
- 시크릿(대시보드 Edge Functions Secrets): `RESEND_API_KEY`(필수), `NOTIFY_TO`(쉼표 다중 수신), `NOTIFY_FROM`(인증 도메인 주소)
- ⚠️ Resend는 **도메인 인증** 전엔 가입 이메일로만 발송됨 → buniverse.ae 인증 후 `NOTIFY_FROM=noreply@buniverse.ae`로 다중 수신 가능

---

## 7. 환경변수

**프론트엔드 (`.env.local` / Vercel Production)**
```
VITE_SUPABASE_URL=https://tovxutyvbkljcxuifxgj.supabase.co
VITE_SUPABASE_ANON_KEY=<Supabase publishable key>   # 대시보드 Settings → API Keys
```
> 두 값 모두 Vercel **Production** 환경변수에 등록됨. Preview 환경엔 미등록(필요시 추가).

**Edge Function 시크릿 (Supabase 대시보드)**: `RESEND_API_KEY`, `NOTIFY_TO`, `NOTIFY_FROM`

---

## 8. 배포 (Vercel)

- GitHub `main` push 시 자동 배포(Git 연동). 수동: `vercel deploy --prod --yes --scope chohj0228-8690s-projects`
- 빌드: `tsc -b && vite build` (Vite 자동 감지), 출력 `dist/`
- `vercel.json`: SPA rewrite (`/((?!assets/|brand/).*)` → `/index.html`)
- 빌드 시 `VITE_*` 환경변수가 번들에 주입됨 → **환경변수 변경 시 재배포 필요**

---

## 9. 완료 / 남은 / 개선

### ✅ 완료
- 브랜드 디자인 시스템 + 한/영 이중언어 전 페이지
- 홈(신뢰형) + 매물찾기/상세 + 런칭프로젝트 + 시장데이터 + AI센터 + 멤버십 + 콘텐츠센터 + 커뮤니티 + 보조페이지
- 문의·투어신청 폼 → Supabase 저장 / 15필드 투어 전용 폼
- 어드민: 로그인·역할(owner/admin)·리드 대시보드·상태관리·비번변경
- 매물 CMS (어드민 CRUD ↔ 공개 사이트 실시간)
- 리드 이메일 알림 파이프라인(트리거→Edge Function→Resend)
- 모바일 반응형 / Vercel 배포

### ⏳ 남은 것
- Resend **도메인 인증**(buniverse.ae) 후 알림 메일 활성
- **GA4** 설치(클라이언트 권한 → 측정 ID) + 전환 이벤트
- **buniverse.ae 도메인** Vercel 연결
- **커뮤니티 게시판** 실작동(`reviews` 테이블 + 비번 글쓰기)
- **콘텐츠센터** 관리(콘텐츠/세미나 테이블 + 어드민)
- **시장데이터/AI센터** 실데이터 연동(DLD/dubaitoday 데이터)
- 실 콘텐츠(채현민 대표 사진, 실제 매물) — 현재 샘플
- 회원(멤버십) 가입/로그인 시스템 — 현재 어드민 인증만

### 💡 개선 권장
- 매물 이미지 **Supabase Storage 업로드**(현재 URL 입력 방식)
- 어드민 **OTP 메일 안정화**: 기본 Supabase 메일이 매직링크+localhost 리다이렉트로 깨짐 → Site URL을 `https://buniverse.vercel.app`로 설정 + 이메일 템플릿 `{{ .Token }}`(코드) 방식, 또는 커스텀 SMTP. 현재는 **비밀번호 계정**으로 우회 중
- 번들 코드 스플리팅(라우트 lazy load), 이미지 webp/lazy, SEO(메타·OG·sitemap·robots), 폼 스팸 방지

---

## 10. 인수인계 주의사항 (Gotchas)

1. **SQL로 `auth.users` 직접 시드 금지에 가까움** — 토큰 컬럼(`confirmation_token`, `recovery_token`, `email_change*` 등)을 빈 문자열 `''`로 채우지 않으면 로그인이 깨짐(GoTrue가 NULL 스캔 실패). **계정은 대시보드 Add User 권장**.
2. **OTP 이메일**: 기본 설정이 6자리 코드가 아닌 **매직링크**를 보내고, Site URL이 기본(localhost)이라 링크가 깨짐. 코드 UI를 쓰려면 이메일 템플릿/Site URL 설정 필요. → 현재는 비밀번호 로그인 사용.
3. **RLS**: 리드 테이블은 anon INSERT만 허용(공개 읽기 없음). 관리자 조회/수정은 `is_admin()` 기반. 신규 어드민은 `admin_allowlist`에 이메일 추가 후 계정 생성.
4. **디자인 시스템**: Tailwind 유틸 클래스보다 **CSS 변수 토큰 + 인라인 스타일** 위주. 색/타이포/간격은 `src/design-system/tokens/*.css` 수정.
5. **i18n**: 모든 사용자 텍스트는 `t({ ko, en })` 형태. 새 텍스트 추가 시 두 언어 모두 작성.
6. **이미지**: `public/brand/` 경로 사용. 매물 이미지 URL은 `/brand/...png`(내장) 또는 외부 `https://...` 둘 다 가능.
7. **Edge Function** 코드는 GitHub 레포에 없음(Supabase MCP/CLI로 배포됨). 소스 재확보가 필요하면 Supabase 대시보드 Edge Functions에서 확인 또는 본 문서 6번의 사양대로 재작성.

---

*문의: 본 문서 + 레포(README/코드 주석) 참고. 추가 설명이 필요하면 개발 담당에게 요청하세요.*
