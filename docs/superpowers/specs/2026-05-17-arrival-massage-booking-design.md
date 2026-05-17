# Arrival Massage Booking Page Design

**Date:** 2026-05-17  
**Scope:** `/booking/arrival-massage` 신규 페이지 (기존 `/firstday/firstday-massage-direct` 대응)

---

## 1. 목표

기존 `firstday-massage-direct` 페이지를 기반으로, 다국어 지원과 SNS 연락처 입력, 더 나은 UX를 갖춘 새로운 예약 페이지를 만든다. 기존 페이지는 건드리지 않는다.

---

## 2. 라우팅 & i18n

### URL
```
/booking/arrival-massage          ← 한국어 (기본)
/en/booking/arrival-massage       ← English
/ja/booking/arrival-massage       ← 日本語
/zh-Hans/booking/arrival-massage  ← 中文 (简体)
/zh-Hant/booking/arrival-massage  ← 中文 (繁體)
```

### 패키지
- `next-i18next` + `react-i18next`

### 번역 파일 위치
```
public/locales/
  ko/booking.json
  en/booking.json
  ja/booking.json
  zh-Hans/booking.json
  zh-Hant/booking.json
```

### 번역 키 목록
```json
{
  "title": "대표 예약자 정보를 입력해주세요.",
  "section.contact": "예약자 정보",
  "section.airport": "공항 픽업 정보",
  "section.massage": "마사지 선택",
  "field.name": "예약자 성함",
  "field.email": "이메일",
  "field.sns": "SNS 연락처",
  "field.snsId": "아이디 / 번호",
  "field.date": "이용 날짜",
  "field.arrivalTime": "도착 시간",
  "field.flight": "항공기 편명",
  "field.pickupLocation": "픽업 장소",
  "field.dropLocation": "드랍 장소",
  "field.memo": "메모",
  "sns.kakao": "KakaoTalk",
  "sns.line": "LINE",
  "sns.whatsapp": "WhatsApp",
  "sns.wechat": "WeChat",
  "sns.messenger": "Messenger",
  "placeholder.snsId.kakao": "카카오톡 아이디를 입력해주세요.",
  "placeholder.snsId.line": "LINE 아이디를 입력해주세요.",
  "placeholder.snsId.whatsapp": "WhatsApp 번호를 입력해주세요.",
  "placeholder.snsId.wechat": "WeChat 아이디를 입력해주세요.",
  "placeholder.snsId.messenger": "Messenger 아이디를 입력해주세요.",
  "error.name": "예약자 성함을 입력해주세요.",
  "error.email": "이메일을 입력해주세요.",
  "error.emailFormat": "이메일 형식으로 입력해주세요.",
  "error.sns": "SNS를 선택해주세요.",
  "error.snsId": "SNS 아이디/번호를 입력해주세요.",
  "error.date": "이용날짜를 선택해주세요.",
  "error.arrivalTime": "도착시간을 선택해주세요.",
  "error.flight": "항공기 편명을 입력해주세요.",
  "error.retry": "잠시 후 다시 시도해주세요.",
  "submit": "예약 완료",
  "alert.dateGuide.title": "예약 날짜 참고",
  "alert.dateGuide.desc": "전날도착: 20일 저녁 11:30분 도착 → 21일\n당일도착: 21일 00시 10분 → 21일"
}
```

### 언어 선택 UI
- 기존 `Header`/`LayoutBasic` 변경 없음
- `/booking/*` 전용 `LayoutBooking` 레이아웃 신규 생성
- `LayoutBooking`은 `BookingHeader`를 포함하며, 우측에 언어 전환 버튼 표시
  ```
  [로고]  Cacaotree Spa  [한 | EN | 日 | 简 | 繁]
  ```
- 언어 버튼 클릭 시 `router.push({ pathname, locale })` 로 전환
- 현재 선택된 언어는 강조 표시

---

## 3. 폼 필드

### 예약자 정보 섹션
| 필드 | 타입 | 필수 | 비고 |
|------|------|------|------|
| `name` | text input | ✓ | |
| `email` | email input | ✓ | |
| `snsType` | radio group | ✓ | kakao / line / whatsapp / wechat / messenger |
| `snsId` | text input | ✓ | placeholder는 snsType에 따라 동적 변경 |

### 공항 픽업 정보 섹션
| 필드 | 타입 | 필수 | 비고 |
|------|------|------|------|
| `date` | DatePicker | ✓ | blockDatesFirstday 기준으로 비활성화 |
| `pickTime` | TimePicker | ✓ | HH:mm, 10분 단위, 스크롤 휠 |
| `pickFlight` | text input | ✓ | |
| `pickLocation` | text input | - | 고정값 "막탄공항", disabled |
| `dropLocation` | select | ✓ | FormItemPickDrop 재사용 |
| `dropTime` | TimePicker | 조건부 | 항구드랍 선택 시 필수 |

### 마사지 섹션
- `massageList`, `couponList` — `FormItemMassage` 재사용

### 숨김 필드
- `package`: 고정값 `"[1] Airport Pick"`

---

## 4. SNS → phone 필드 매핑

API 전송 시 `snsType` + `snsId`를 합쳐 `phone` 필드로 변환:

```ts
// 예: snsType="kakao", snsId="abc123" → phone="kakao: abc123"
const phone = `${values.snsType}: ${values.snsId}`;
```

`FormBookingFirstdayMassage` → `FormFirstdayMassageDirect` 변환 후 `/api/CreateFirstdayMassage`에 전송.

---

## 5. 새 타입

```ts
// src/types/index.tsx 에 추가
export interface FormArrivalMassage extends FormFirstdayMassage {
  name: string;
  email: string;
  snsType: 'kakao' | 'line' | 'whatsapp' | 'wechat' | 'messenger';
  snsId: string;
}
```

---

## 6. 훅 구조

### `src/libs/useBlockDates.ts` (신규 공통 훅)
```ts
useBlockDates(type: 'firstday' | 'lastday' | 'daytime')
// 반환: { disabledDate, loading }
// - /api/GetBlockDate 직접 호출
// - Context 없이 독립 동작
```

### `src/views/ViewArrivalMassage/useArrivalMassageForm.ts` (뷰 전용 훅)
```ts
useArrivalMassageForm()
// 반환: { form, onFinish, onFinishFailed, loading, disabledDate }
// - Form 인스턴스, 제출 핸들러, useMutation, useBlockDates 통합
```

---

## 7. 컴포넌트 신규 생성

### 파일 명명 규칙
- `index.tsx` 없이 파일명 직접 사용: `TimePickerField.tsx`, `FormItemSnsContact.tsx`
- styled-components는 별도 파일 없이 해당 컴포넌트 파일 하단에 정의
- 각 컴포넌트 파일은 한눈에 읽힐 수 있도록 짧게 유지

### `src/components/TimePickerField.tsx`
- Ant Design `TimePicker` 래퍼
- `format="HH:mm"`, `minuteStep={10}`, 스크롤 휠 방식
- Ant Design Form 호환 (`value`, `onChange` props)

### `src/components/FormItemSnsContact.tsx`
- SNS Radio 선택 + 아이디 입력 통합 (두 Form.Item)
- snsType Watch → placeholder 동적 변경
- i18n 텍스트 지원

### `src/components/LayoutBooking/index.tsx`
- `/booking/*` 전용 레이아웃
- `BookingHeader` (로고 + 언어 전환 버튼) 포함
- 기존 `LayoutBasic` 영향 없음

### ViewArrivalMassage 컴포넌트 분리
뷰를 섹션 단위로 쪼개서 각 파일이 짧고 명확하게 유지:

```
src/views/ViewArrivalMassage/
  index.tsx              ← 섹션 조합 + 폼 wrapper만
  ContactSection.tsx     ← name, email, SNS 연락처
  AirportSection.tsx     ← 날짜, 도착시간, 항공편, 픽업/드랍
  MassageSection.tsx     ← 마사지 선택
  useArrivalMassageForm.ts
```

styled-components는 각 파일 하단에 포함 (별도 styled.tsx 없음)

---

## 8. 파일 목록

```
신규 생성:
  src/pages/booking/arrival-massage.tsx
  src/views/ViewArrivalMassage/index.tsx
  src/views/ViewArrivalMassage/ContactSection.tsx
  src/views/ViewArrivalMassage/AirportSection.tsx
  src/views/ViewArrivalMassage/MassageSection.tsx
  src/views/ViewArrivalMassage/useArrivalMassageForm.ts
  src/components/TimePickerField.tsx
  src/components/FormItemSnsContact.tsx
  src/components/LayoutBooking/index.tsx        ← BookingHeader 포함
  src/libs/useBlockDates.ts
  public/locales/ko/booking.json
  public/locales/en/booking.json
  public/locales/ja/booking.json
  public/locales/zh-Hans/booking.json
  public/locales/zh-Hant/booking.json

수정:
  next.config.js            ← i18n 설정 추가
  src/types/index.tsx       ← FormArrivalMassage 타입 추가
  package.json              ← next-i18next 의존성 추가
```

---

## 9. 기존 코드 영향 없음

- 기존 `/firstday/firstday-massage-direct` 페이지 및 `ViewFirstdayMassageDirect` 변경 없음
- `UIContext` 변경 없음
- API 엔드포인트 변경 없음
