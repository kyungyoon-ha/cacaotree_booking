# Departure Massage Booking Page — Design Spec

**Date:** 2026-05-17  
**Route:** `/booking/departure-massage`  
**Reference:** `/booking/arrival-massage`, `src/pages/lastday/lastday-massage-direct.tsx`

---

## 1. Overview

마지막날 공항드랍 마사지 예약 페이지. 기존 `ViewLastdayMassageDirect`(한국어 전용)를 i18n 버전으로 재구성한다.

**고객 흐름:** 호텔 픽업 → 스파 마사지 → 막탄 공항 드랍

---

## 2. Architecture

### 파일 구조

```
src/pages/booking/departure-massage.tsx       ← 신규 페이지
src/views/ViewDepartureMassage/
  index.tsx                                   ← 메인 뷰 (로딩, 폼 조합)
  DepartureSection.tsx                        ← 출발 정보 섹션
  MassageSection.tsx                          ← 마사지 선택 섹션
  useDepartureMassageForm.ts                  ← 폼 로직 훅
```

### 재사용 (변경 없음)

| 대상 | 설명 |
|------|------|
| `ViewArrivalMassage/ContactSection` | 이름·이메일·SNS 섹션 동일 재사용 |
| `@components/FormItemMassageBooking` | 마사지 선택 컴포넌트 |
| `@components/FormItemMemoBooking` | 메모 컴포넌트 |
| `@components/ModalSpin` | 제출 로딩 오버레이 |
| `@components/TimePickerField` | 시간 선택 필드 |
| `/api/CreateLastdayMassage` | 이메일·시트·카카오 전송 API (수정 없음) |

### 신규 타입 (`src/types/index.tsx`)

```typescript
export interface FormDepartureMassage {
  package: string;
  name: string;
  email: string;
  snsType: SnsType;
  snsId: string;
  date: Date;
  pax: number;
  pickTime: Date;      // 호텔 픽업 시간
  pickLocation: string; // 호텔/숙소명
  massageTime: Date;   // 마사지 시작 시간
  dropTime: Date;      // 공항 출발 시간
  dropLocation: string; // 고정값: "막탄공항"
  massageList: Massage[];
  couponList: string[];
  memo: string;
}
```

---

## 3. 폼 레이아웃

### 섹션 1: 연락처 정보 (`ContactSection`)

arrival-massage와 동일한 컴포넌트 재사용.

| 필드 | 타입 | 비고 |
|------|------|------|
| 예약자 이름 (`name`) | text | 필수 |
| 이메일 (`email`) | email | 필수, 형식 검증 |
| SNS 연락처 (`snsType`) | radio | kakao·messenger·whatsapp·line·wechat |
| SNS ID (`snsId`) | text | snsType 선택 후 표시 |

### 섹션 2: 출발 정보 (`DepartureSection`)

| 필드 | 타입 | 비고 |
|------|------|------|
| 이용날짜 (`date`) | DatePicker | 오늘 포함 과거 비활성 |
| 픽업 시간 (`pickTime`) | TimePicker | 호텔에서 픽업할 시간 |
| 픽업 장소 (`pickLocation`) | text | 호텔·숙소명 직접 입력 |
| ⚠️ 픽업 불가 안내 | Alert (warning) | "플랜테이션베이, 솔레아, 공항근처, 세부시티" |
| 마사지 시간 (`massageTime`) | TimePicker | 스파 방문 시간 |
| 공항 출발 시간 (`dropTime`) | TimePicker | 공항 도착 희망 시간 |
| 드랍 장소 (`dropLocation`) | text (disabled) | 고정: "막탄 공항" |
| ⚠️ 공항드랍 안내 | Alert (info) | "오전 및 오후 9시 이전 공항드랍은 어렵습니다." |

**Hidden 필드:**
- `package`: `"[4] Airport Drop"`
- `couponList`: `[]`

### 섹션 3: 마사지 선택 (`MassageSection`)

`FormItemMassageBooking`에 `massageLastday` 옵션 전달. arrival의 MassageSection과 동일 패턴.

### 섹션 4: 메모

`FormItemMemoBooking` 그대로 사용.

---

## 4. 훅: `useDepartureMassageForm`

```
useArrivalMassageForm과 동일한 구조:
- Form.useForm<FormDepartureMassage>()
- useMutation('/api/CreateLastdayMassage')
- disabledDate: 오늘 포함 이전 날짜 비활성 (lastday block dates 별도 없음)
- onFinish: snsType + snsId → phone 조합 후 API 호출
- 성공 시 /cart/success 리다이렉트
- 에러 시 message.error
```

---

## 5. i18n

5개 locale(ko, en, ja, zh-Hans, zh-Hant) `booking.json`에 `departure.*` 키 추가.

**추가 키 목록:**

```
departure.section.title
departure.field.pickupTime
departure.field.pickupLocation
departure.field.massageTime
departure.field.dropTime
departure.field.dropLocation
departure.field.dropLocationValue
departure.placeholder.pickupTime
departure.placeholder.pickupLocation
departure.placeholder.massageTime
departure.placeholder.dropTime
departure.error.pickupTime
departure.error.pickupLocation
departure.error.massageTime
departure.error.dropTime
departure.alert.pickup.title
departure.alert.pickup.desc
departure.alert.drop.title
departure.alert.drop.desc
```

---

## 6. 페이지 (`departure-massage.tsx`)

`arrival-massage.tsx`와 동일한 패턴:

```tsx
import LayoutBooking from '@components/LayoutBooking';
import ViewDepartureMassage from '@views/ViewDepartureMassage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const DepartureMassagePage = () => (
  <LayoutBooking>
    <ViewDepartureMassage />
  </LayoutBooking>
);

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: { ...(await serverSideTranslations(locale, ['booking'])) },
});
```

---

## 7. 제약 사항

- `CreateLastdayMassage` API는 수정하지 않는다. API가 `dropLocation`을 항상 `"Airport"`로 덮어쓰므로 폼의 `dropLocation` 값은 표시용이다.
- `useBlockDates`에 lastday 타입이 없으므로 단순 과거날짜 비활성 로직을 직접 구현한다.
- `ContactSection`은 `@views/ViewArrivalMassage/ContactSection`에서 직접 import한다 (현 시점 공통 컴포넌트 이동은 범위 외).
