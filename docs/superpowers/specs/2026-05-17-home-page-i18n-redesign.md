# Home Page i18n Redesign

**Date:** 2026-05-17  
**Status:** Approved

## Overview

메인 페이지(`/`)를 다국어 지원으로 재구성. 카드 선택 레이아웃은 유지하되, 텍스트·이미지를 locale별로 분리하고, 페이지 진입 시 인라인 로딩 스피너 추가.

---

## Decisions

| 항목 | 결정 |
|------|------|
| 레이아웃 | 기존 A 방식 유지 — 카드 선택 → 이미지 → 예약하기 버튼 |
| 이미지 저장 위치 | 각 locale의 `booking.json`에 콤마 구분 URL 문자열로 저장 |
| 초기 이미지 데이터 | 한국어(ko) URL만 채움. 나머지 locale(en/ja/zh-Hans/zh-Hant)은 빈 문자열 |
| 라우팅 | `/booking/arrival-massage`, `/booking/daytime-massage`, `/booking/departure-massage` |
| 로딩 | `useState(false)` + `useEffect` → `setIsLoaded(true)`, 다른 예약 페이지와 동일한 인라인 스피너 스타일 |

---

## Files Changed

### Deleted
- `src/views/ViewHome/feature.tsx` — locale JSON으로 대체되어 불필요

### Modified
- `src/pages/index.tsx` — `getStaticProps` + `serverSideTranslations` 추가
- `src/views/ViewHome/index.tsx` — 전면 재작성
- `public/locales/ko/booking.json` — `home.*` 키 추가 (이미지 URL 포함)
- `public/locales/en/booking.json` — `home.*` 키 추가 (이미지 빈 문자열)
- `public/locales/ja/booking.json` — `home.*` 키 추가 (이미지 빈 문자열)
- `public/locales/zh-Hans/booking.json` — `home.*` 키 추가 (이미지 빈 문자열)
- `public/locales/zh-Hant/booking.json` — `home.*` 키 추가 (이미지 빈 문자열)

---

## Locale Keys

모든 locale에 추가할 키 목록. 텍스트는 각 언어로 번역, 이미지는 ko만 채움.

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
"home.departure.images": "https://github.com/user-attachments/assets/0534c23e-2eac-44ed-b510-ce4ff10468fc,https://github.com/user-attachments/assets/b9f73c29-a0a2-43ff-977c-57a3ab46d2b1,https://github.com/user-attachments/assets/3258a1ec-18c4-409d-b6eb-684a87c17dd8,https://github.com/user-attachments/assets/d85f96f8-1c96-4d80-9fe3-775e1163528b,https://github.com/user-attachments/assets/3472fbfb-6bd4-46f2-9e63-3fdce33c35bf,https://github.com/user-attachments/assets/335092a5-4212-46f3-9c39-7e19a963edc8"
```

이미지 URL은 콤마(`,`)로 구분. 빈 locale은 `""` — 컴포넌트에서 `.split(",").filter(Boolean)`으로 빈 값 제거.

---

## Component Design

### `pages/index.tsx`

```tsx
export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['booking'])),
  },
});
```

### `views/ViewHome/index.tsx`

```tsx
const ViewHome = () => {
  const { t } = useTranslation('booking');
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return <PageLoadingWrapper>...</PageLoadingWrapper>;  // 기존 페이지와 동일 스타일

  const itemList = [
    {
      id: 'arrival',
      svg: <SVGFlightArrival />,
      alt: 'arrival',
      title: t('home.arrival.title'),
      description: t('home.arrival.description'),
      href: '/booking/arrival-massage',
      imageList: t('home.arrival.images').split(',').filter(Boolean),
    },
    {
      id: 'daytime',
      svg: <SVGVan />,
      alt: 'daytime',
      title: t('home.daytime.title'),
      description: t('home.daytime.description'),
      href: '/booking/daytime-massage',
      imageList: t('home.daytime.images').split(',').filter(Boolean),
    },
    {
      id: 'departure',
      svg: <SVGFlightDeparture />,
      alt: 'departure',
      title: t('home.departure.title'),
      description: t('home.departure.description'),
      href: '/booking/departure-massage',
      imageList: t('home.departure.images').split(',').filter(Boolean),
    },
  ];

  return (
    <LayoutQuestion>
      <QuestionSelectWithSvg
        buttonName={t('home.button')}
        itemList={itemList}
        title={t('home.title')}
      />
    </LayoutQuestion>
  );
};
```

---

## Loading UI

다른 예약 페이지(ViewArrivalMassage, ViewDepartureMassage)와 동일한 인라인 스피너 패턴 사용. `ModalSpin` 컴포넌트 미사용.

```tsx
if (!isLoaded) {
  return (
    <PageLoadingWrapper>
      <RingBox>
        <SpinRing $size={72} $delay="0s" />
        <SpinRing $size={52} $delay="0.35s" />
        <CalIcon>...</CalIcon>
      </RingBox>
      <PageLoadingText>{t('loading.desc')}</PageLoadingText>
      <DotsRow>...</DotsRow>
    </PageLoadingWrapper>
  );
}
```

기존 `loading.desc` 키 재사용 (`"잠시만 기다려 주세요."`).

---

## Image URLs (ko)

`feature.tsx`에 있던 기존 이미지 URL을 그대로 이전.

- **arrival**: 6개 GitHub CDN URL
- **daytime**: 5개 GitHub CDN URL
- **departure**: 6개 GitHub CDN URL
