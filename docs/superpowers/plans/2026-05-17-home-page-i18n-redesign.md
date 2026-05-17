# Home Page i18n Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 메인 페이지(`/`)를 다국어 지원으로 재구성 — 텍스트·이미지를 locale별 `booking.json`으로 관리하고, 페이지 진입 시 인라인 로딩 스피너 추가.

**Architecture:** `pages/index.tsx`에 `getStaticProps` 추가로 i18n 데이터를 SSR에서 주입. `ViewHome/index.tsx`를 `useTranslation`으로 전면 재작성하여 `feature.tsx` 제거. 언어별 이미지 URL은 각 locale의 `booking.json`에 콤마 구분 문자열로 저장하고 컴포넌트에서 `.split(",").filter(Boolean)`으로 파싱.

**Tech Stack:** Next.js, next-i18next, styled-components, React

---

### Task 1: 한국어 locale 키 추가

**Files:**
- Modify: `public/locales/ko/booking.json`

- [ ] **Step 1: `public/locales/ko/booking.json` 첫 번째 줄 바로 뒤에 `home.*` 키 추가**

`"appTitle"` 키 바로 뒤에 삽입:

```json
  "home.title": "어떤 패키지를 생각중이신가요?",
  "home.subtitle": "아래 선택지 중에서 선택해주세요.",
  "home.button": "예약하기",
  "home.arrival.title": "공항도착 마사지",
  "home.arrival.description": "새벽 공항 도착 후 바로 마사지를 받을 수 있는 패키지입니다.",
  "home.arrival.images": "https://github.com/user-attachments/assets/5976d49f-d2f2-46b7-9e40-2c2e5e017934,https://github.com/user-attachments/assets/2ceb18f7-91fa-4ac5-94a1-04224b23f85c,https://github.com/user-attachments/assets/02bd48ec-81df-4831-ba6a-73c5895cd844,https://github.com/user-attachments/assets/2fe64d5a-30c2-4592-918c-295c996bd959,https://github.com/user-attachments/assets/c5b06a39-a891-44f5-8a8b-2aef5144daf3,https://github.com/user-attachments/assets/8b93e0e3-7d66-4d30-a544-ff9088c6bc38",
  "home.daytime.title": "숙소 픽드랍 패키지",
  "home.daytime.description": "막탄 내 원하는 곳에서 픽업 및 드랍이 가능한 패키지입니다.",
  "home.daytime.images": "https://github.com/user-attachments/assets/ae9d7d3d-c559-4f70-ad04-a24744565709,https://github.com/user-attachments/assets/7c08d187-7f03-4d73-a98a-b5e90c092a36,https://github.com/user-attachments/assets/1186f0e1-b5da-42d4-8287-61a40706bb2d,https://github.com/user-attachments/assets/ee079f1d-60fa-4ba3-9aa6-aca8097475ac,https://github.com/user-attachments/assets/26551489-f4e3-4843-a4d4-027c2e26ef6d",
  "home.departure.title": "마지막날 패키지",
  "home.departure.description": "마지막날 체크아웃 후 짐보관 및 공항드랍이 가능한 패키지입니다.",
  "home.departure.images": "https://github.com/user-attachments/assets/0534c23e-2eac-44ed-b510-ce4ff10468fc,https://github.com/user-attachments/assets/b9f73c29-a0a2-43ff-977c-57a3ab46d2b1,https://github.com/user-attachments/assets/3258a1ec-18c4-409d-b6eb-684a87c17dd8,https://github.com/user-attachments/assets/d85f96f8-1c96-4d80-9fe3-775e1163528b,https://github.com/user-attachments/assets/3472fbfb-6bd4-46f2-9e63-3fdce33c35bf,https://github.com/user-attachments/assets/335092a5-4212-46f3-9c39-7e19a963edc8",
```

- [ ] **Step 2: 커밋**

```bash
git add public/locales/ko/booking.json
git commit -m "feat: 메인 페이지 한국어 locale 키 추가"
```

---

### Task 2: 나머지 4개 locale 키 추가 (이미지 빈 문자열)

**Files:**
- Modify: `public/locales/en/booking.json`
- Modify: `public/locales/ja/booking.json`
- Modify: `public/locales/zh-Hans/booking.json`
- Modify: `public/locales/zh-Hant/booking.json`

- [ ] **Step 1: `public/locales/en/booking.json`에 추가** (`"appTitle"` 키 바로 뒤)

```json
  "home.title": "What package are you looking for?",
  "home.subtitle": "Please choose from the options below.",
  "home.button": "Book Now",
  "home.arrival.title": "Airport Arrival Massage",
  "home.arrival.description": "A package to enjoy a massage right after arriving at the airport.",
  "home.arrival.images": "",
  "home.daytime.title": "Hotel Pickup Package",
  "home.daytime.description": "A package with pickup and drop-off at any location in Mactan.",
  "home.daytime.images": "",
  "home.departure.title": "Last Day Package",
  "home.departure.description": "Luggage storage and airport drop-off available after checkout on your last day.",
  "home.departure.images": "",
```

- [ ] **Step 2: `public/locales/ja/booking.json`에 추가** (`"appTitle"` 키 바로 뒤)

```json
  "home.title": "どのパッケージをお考えですか？",
  "home.subtitle": "以下の選択肢からお選びください。",
  "home.button": "予約する",
  "home.arrival.title": "空港到着マッサージ",
  "home.arrival.description": "早朝に空港に到着後、すぐにマッサージを受けられるパッケージです。",
  "home.arrival.images": "",
  "home.daytime.title": "ホテル送迎パッケージ",
  "home.daytime.description": "マクタン内のご希望の場所でのお迎えと送りが可能なパッケージです。",
  "home.daytime.images": "",
  "home.departure.title": "最終日パッケージ",
  "home.departure.description": "最終日のチェックアウト後に荷物預かりと空港送りが可能なパッケージです。",
  "home.departure.images": "",
```

- [ ] **Step 3: `public/locales/zh-Hans/booking.json`에 추가** (`"appTitle"` 키 바로 뒤)

```json
  "home.title": "您在考虑哪个套餐？",
  "home.subtitle": "请从以下选项中选择。",
  "home.button": "立即预约",
  "home.arrival.title": "机场到达按摩",
  "home.arrival.description": "适合凌晨抵达机场后立即享受按摩的套餐。",
  "home.arrival.images": "",
  "home.daytime.title": "酒店接送套餐",
  "home.daytime.description": "可在麦克坦岛任意地点接送的套餐。",
  "home.daytime.images": "",
  "home.departure.title": "最后一天套餐",
  "home.departure.description": "最后一天退房后提供行李寄存和机场送达服务的套餐。",
  "home.departure.images": "",
```

- [ ] **Step 4: `public/locales/zh-Hant/booking.json`에 추가** (`"appTitle"` 키 바로 뒤)

```json
  "home.title": "您在考慮哪個套餐？",
  "home.subtitle": "請從以下選項中選擇。",
  "home.button": "立即預約",
  "home.arrival.title": "機場抵達按摩",
  "home.arrival.description": "適合凌晨抵達機場後立即享受按摩的套餐。",
  "home.arrival.images": "",
  "home.daytime.title": "飯店接送套餐",
  "home.daytime.description": "可在麥克坦島任意地點接送的套餐。",
  "home.daytime.images": "",
  "home.departure.title": "最後一天套餐",
  "home.departure.description": "最後一天退房後提供行李寄存和機場送達服務的套餐。",
  "home.departure.images": "",
```

- [ ] **Step 5: 커밋**

```bash
git add public/locales/en/booking.json public/locales/ja/booking.json public/locales/zh-Hans/booking.json public/locales/zh-Hant/booking.json
git commit -m "feat: 메인 페이지 다국어 locale 키 추가 (en/ja/zh)"
```

---

### Task 3: `pages/index.tsx`에 `getStaticProps` 추가

**Files:**
- Modify: `src/pages/index.tsx`

- [ ] **Step 1: 파일 전체를 아래 내용으로 교체**

```tsx
import LayoutBasic from "@components/LayoutBasic";
import ViewHome from "@views/ViewHome";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Main() {
  return (
    <LayoutBasic>
      <ViewHome />
    </LayoutBasic>
  );
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["booking"])),
  },
});
```

- [ ] **Step 2: 커밋**

```bash
git add src/pages/index.tsx
git commit -m "feat: 메인 페이지 getStaticProps 추가"
```

---

### Task 4: `ViewHome/index.tsx` 재작성 및 `feature.tsx` 삭제

**Files:**
- Modify: `src/views/ViewHome/index.tsx`
- Delete: `src/views/ViewHome/feature.tsx`

- [ ] **Step 1: `src/views/ViewHome/index.tsx` 전체를 아래 내용으로 교체**

```tsx
import React, { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { QuestionSelectWithSvg } from "@components/QuestionSelect";
import { SVGFlightArrival, SVGFlightDeparture, SVGVan } from "@components/Svg";
import LayoutQuestion from "@components/LayoutQuestion";
import styled, { keyframes } from "styled-components";

const ViewHome = () => {
  const { t } = useTranslation("booking");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return (
      <PageLoadingWrapper>
        <RingBox>
          <SpinRing $size={72} $delay="0s" />
          <SpinRing $size={52} $delay="0.35s" />
          <CalIcon>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="#EFB041" strokeWidth="2" />
              <path d="M3 9h18" stroke="#EFB041" strokeWidth="2" />
              <path d="M8 2v4M16 2v4" stroke="#EFB041" strokeWidth="2" strokeLinecap="round" />
              <path d="M7 13l3 3 5-5" stroke="#EFB041" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </CalIcon>
        </RingBox>
        <PageLoadingText>{t("loading.desc")}</PageLoadingText>
        <DotsRow>
          <Dot $delay="0s" />
          <Dot $delay="0.2s" />
          <Dot $delay="0.4s" />
        </DotsRow>
      </PageLoadingWrapper>
    );
  }

  const itemList = [
    {
      id: "arrival",
      svg: <SVGFlightArrival />,
      alt: "arrival",
      title: t("home.arrival.title"),
      description: t("home.arrival.description"),
      href: "/booking/arrival-massage",
      imageList: t("home.arrival.images").split(",").filter(Boolean),
    },
    {
      id: "daytime",
      svg: <SVGVan />,
      alt: "daytime",
      title: t("home.daytime.title"),
      description: t("home.daytime.description"),
      href: "/booking/daytime-massage",
      imageList: t("home.daytime.images").split(",").filter(Boolean),
    },
    {
      id: "departure",
      svg: <SVGFlightDeparture />,
      alt: "departure",
      title: t("home.departure.title"),
      description: t("home.departure.description"),
      href: "/booking/departure-massage",
      imageList: t("home.departure.images").split(",").filter(Boolean),
    },
  ];

  return (
    <LayoutQuestion>
      <QuestionSelectWithSvg
        buttonName={t("home.button")}
        itemList={itemList}
        title={t("home.title")}
      />
    </LayoutQuestion>
  );
};

export default ViewHome;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const bounce = keyframes`
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-7px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.12); }
`;

const PageLoadingWrapper = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background: #fff;
  z-index: 100;
`;

const RingBox = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SpinRing = styled.div<{ $size: number; $delay: string }>`
  position: absolute;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #efb041;
  animation: ${spin} 1.2s linear infinite;
  animation-delay: ${({ $delay }) => $delay};
  opacity: ${({ $size }) => ($size >= 72 ? 1 : 0.5)};
`;

const CalIcon = styled.div`
  position: relative;
  z-index: 1;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const PageLoadingText = styled.p`
  font-size: 15px;
  color: #888;
  margin: 0;
`;

const DotsRow = styled.div`
  display: flex;
  gap: 8px;
`;

const Dot = styled.span<{ $delay: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #efb041;
  display: inline-block;
  animation: ${bounce} 1s ease infinite;
  animation-delay: ${({ $delay }) => $delay};
`;
```

- [ ] **Step 2: `src/views/ViewHome/feature.tsx` 삭제**

```bash
rm src/views/ViewHome/feature.tsx
```

- [ ] **Step 3: 커밋**

```bash
git add src/views/ViewHome/index.tsx
git rm src/views/ViewHome/feature.tsx
git commit -m "feat: ViewHome i18n 적용 및 feature.tsx 제거"
```

---

### Task 5: 수동 검증

- [ ] **Step 1: dev 서버 실행**

```bash
npm run dev
```

- [ ] **Step 2: 브라우저에서 확인**

`http://localhost:3000` 접속 후 확인:
1. 페이지 진입 시 스피너가 잠깐 표시되는지
2. 카드 3개(공항도착 / 숙소 픽드랍 / 마지막날)가 올바르게 표시되는지
3. 카드 클릭 시 하단 이미지가 교체되는지
4. "예약하기" 버튼 클릭 시 각각 `/booking/arrival-massage`, `/booking/daytime-massage`, `/booking/departure-massage`로 이동하는지

- [ ] **Step 3: URL에 `?lng=en` 또는 Next.js locale prefix로 영어 확인**

`http://localhost:3000/en` 접속 후:
- 카드 제목이 영어로 표시되는지 (`Airport Arrival Massage` 등)
- 이미지가 빈 문자열 처리로 인해 이미지 섹션이 없이 깔끔하게 표시되는지

- [ ] **Step 4: TypeScript 타입 에러 없는지 확인**

```bash
npx tsc --noEmit
```

Expected: 에러 없음

- [ ] **Step 5: 최종 커밋 (필요시)**

검증 중 수정사항 있을 경우 추가 커밋.
