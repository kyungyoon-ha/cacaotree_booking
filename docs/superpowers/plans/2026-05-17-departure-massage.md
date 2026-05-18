# Departure Massage Booking Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `/booking/departure-massage` 페이지 구현 — 호텔 픽업 → 스파 마사지 → 막탄 공항 드랍 예약 폼 (i18n 5개 언어)

**Architecture:** `ViewArrivalMassage`와 동일한 폴더 구조. `ContactSection`은 `ViewArrivalMassage`에서 직접 import. `CreateLastdayMassage` API 재사용. `useBlockDates` 없이 단순 과거날짜 비활성.

**Tech Stack:** Next.js, Ant Design 5, styled-components, next-i18next, dayjs

---

## 파일 목록

| 작업 | 경로 |
|------|------|
| 수정 | `src/types/index.tsx` |
| 수정 | `public/locales/ko/booking.json` |
| 수정 | `public/locales/en/booking.json` |
| 수정 | `public/locales/ja/booking.json` |
| 수정 | `public/locales/zh-Hans/booking.json` |
| 수정 | `public/locales/zh-Hant/booking.json` |
| 생성 | `src/views/ViewDepartureMassage/useDepartureMassageForm.ts` |
| 생성 | `src/views/ViewDepartureMassage/DepartureSection.tsx` |
| 생성 | `src/views/ViewDepartureMassage/MassageSection.tsx` |
| 생성 | `src/views/ViewDepartureMassage/index.tsx` |
| 생성 | `src/pages/booking/departure-massage.tsx` |

---

## Task 1: `FormDepartureMassage` 타입 추가

**Files:**
- Modify: `src/types/index.tsx` (line 76 이후, `FormArrivalMassage` 블록 바로 뒤)

- [ ] **Step 1: 타입 추가**

`src/types/index.tsx`의 `FormArrivalMassage` 블록(line 71–76) 바로 뒤에 삽입:

```typescript
export interface FormDepartureMassage {
  package: string;
  name: string;
  email: string;
  snsType: SnsType;
  snsId: string;
  date: Date;
  pax: number;
  pickTime: Date;       // 호텔 픽업 시간
  pickLocation: string; // 호텔/숙소명
  massageTime: Date;    // 마사지 시작 시간
  dropTime: Date;       // 공항 출발 시간
  dropLocation: string; // 고정값: "막탄공항"
  massageList: Massage[];
  couponList: string[];
  memo: string;
}
```

- [ ] **Step 2: 커밋**

```bash
git add src/types/index.tsx
git commit -m "feat: FormDepartureMassage 타입 추가"
```

---

## Task 2: i18n 키 추가 (5개 locale)

**Files:**
- Modify: `public/locales/ko/booking.json`
- Modify: `public/locales/en/booking.json`
- Modify: `public/locales/ja/booking.json`
- Modify: `public/locales/zh-Hans/booking.json`
- Modify: `public/locales/zh-Hant/booking.json`

각 파일의 마지막 `}` 직전에 아래 키를 추가한다.

- [ ] **Step 1: ko/booking.json에 추가**

```json
  "departure.section.title": "출발 정보를 입력해주세요.",
  "departure.field.pickupTime": "픽업 시간",
  "departure.field.pickupLocation": "픽업 장소",
  "departure.field.massageTime": "마사지 시간",
  "departure.field.dropTime": "공항 출발 시간",
  "departure.field.dropLocation": "드랍 장소",
  "departure.field.dropLocationValue": "막탄 공항",
  "departure.placeholder.pickupTime": "픽업 시간을 선택해주세요.",
  "departure.placeholder.pickupLocation": "호텔/숙소명을 입력해주세요.",
  "departure.placeholder.massageTime": "마사지 시간을 선택해주세요.",
  "departure.placeholder.dropTime": "공항 출발 시간을 선택해주세요.",
  "departure.error.pickupTime": "픽업 시간을 입력해주세요.",
  "departure.error.pickupLocation": "픽업 장소를 입력해주세요.",
  "departure.error.massageTime": "마사지 시간을 입력해주세요.",
  "departure.error.dropTime": "공항 출발 시간을 입력해주세요.",
  "departure.alert.pickup.title": "픽업 불가 지역",
  "departure.alert.pickup.desc": "플랜테이션베이, 솔레아, 공항근처, 세부시티",
  "departure.alert.drop.title": "공항드랍 안내",
  "departure.alert.drop.desc": "오전 및 오후 9시 이전 공항드랍은 어렵습니다."
```

- [ ] **Step 2: en/booking.json에 추가**

```json
  "departure.section.title": "Please enter your departure information.",
  "departure.field.pickupTime": "Pickup Time",
  "departure.field.pickupLocation": "Pickup Location",
  "departure.field.massageTime": "Massage Time",
  "departure.field.dropTime": "Airport Departure Time",
  "departure.field.dropLocation": "Drop-off Location",
  "departure.field.dropLocationValue": "Mactan Airport",
  "departure.placeholder.pickupTime": "Select pickup time.",
  "departure.placeholder.pickupLocation": "Enter hotel / accommodation name.",
  "departure.placeholder.massageTime": "Select massage time.",
  "departure.placeholder.dropTime": "Select airport departure time.",
  "departure.error.pickupTime": "Please enter pickup time.",
  "departure.error.pickupLocation": "Please enter pickup location.",
  "departure.error.massageTime": "Please enter massage time.",
  "departure.error.dropTime": "Please enter airport departure time.",
  "departure.alert.pickup.title": "Pickup unavailable areas",
  "departure.alert.pickup.desc": "Plantation Bay, Solea, Near Airport, Cebu City",
  "departure.alert.drop.title": "Airport drop-off notice",
  "departure.alert.drop.desc": "Drop-off before 9:00 PM is not available."
```

- [ ] **Step 3: ja/booking.json에 추가**

```json
  "departure.section.title": "出発情報を入力してください。",
  "departure.field.pickupTime": "ピックアップ時間",
  "departure.field.pickupLocation": "ピックアップ場所",
  "departure.field.massageTime": "マッサージ時間",
  "departure.field.dropTime": "空港出発時間",
  "departure.field.dropLocation": "送迎場所",
  "departure.field.dropLocationValue": "マクタン空港",
  "departure.placeholder.pickupTime": "ピックアップ時間を選択してください。",
  "departure.placeholder.pickupLocation": "ホテル/宿泊施設名を入力してください。",
  "departure.placeholder.massageTime": "マッサージ時間を選択してください。",
  "departure.placeholder.dropTime": "空港出発時間を選択してください。",
  "departure.error.pickupTime": "ピックアップ時間を入力してください。",
  "departure.error.pickupLocation": "ピックアップ場所を入力してください。",
  "departure.error.massageTime": "マッサージ時間を入力してください。",
  "departure.error.dropTime": "空港出発時間を入力してください。",
  "departure.alert.pickup.title": "ピックアップ不可エリア",
  "departure.alert.pickup.desc": "プランテーションベイ、ソレア、空港付近、セブシティ",
  "departure.alert.drop.title": "空港送迎のご案内",
  "departure.alert.drop.desc": "午前および午後9時以前の空港送迎はお受けできません。"
```

- [ ] **Step 4: zh-Hans/booking.json에 추가**

```json
  "departure.section.title": "请输入出发信息。",
  "departure.field.pickupTime": "接车时间",
  "departure.field.pickupLocation": "接车地点",
  "departure.field.massageTime": "按摩时间",
  "departure.field.dropTime": "机场出发时间",
  "departure.field.dropLocation": "送车地点",
  "departure.field.dropLocationValue": "麦克坦机场",
  "departure.placeholder.pickupTime": "请选择接车时间。",
  "departure.placeholder.pickupLocation": "请输入酒店/住宿名称。",
  "departure.placeholder.massageTime": "请选择按摩时间。",
  "departure.placeholder.dropTime": "请选择机场出发时间。",
  "departure.error.pickupTime": "请输入接车时间。",
  "departure.error.pickupLocation": "请输入接车地点。",
  "departure.error.massageTime": "请输入按摩时间。",
  "departure.error.dropTime": "请输入机场出发时间。",
  "departure.alert.pickup.title": "不提供接车的区域",
  "departure.alert.pickup.desc": "Plantation Bay、Solea、机场附近、宿务市",
  "departure.alert.drop.title": "机场送车说明",
  "departure.alert.drop.desc": "上午及晚上9时前无法提供机场送车服务。"
```

- [ ] **Step 5: zh-Hant/booking.json에 추가**

```json
  "departure.section.title": "請輸入出發資訊。",
  "departure.field.pickupTime": "接車時間",
  "departure.field.pickupLocation": "接車地點",
  "departure.field.massageTime": "按摩時間",
  "departure.field.dropTime": "機場出發時間",
  "departure.field.dropLocation": "送車地點",
  "departure.field.dropLocationValue": "麥克坦機場",
  "departure.placeholder.pickupTime": "請選擇接車時間。",
  "departure.placeholder.pickupLocation": "請輸入飯店/住宿名稱。",
  "departure.placeholder.massageTime": "請選擇按摩時間。",
  "departure.placeholder.dropTime": "請選擇機場出發時間。",
  "departure.error.pickupTime": "請輸入接車時間。",
  "departure.error.pickupLocation": "請輸入接車地點。",
  "departure.error.massageTime": "請輸入按摩時間。",
  "departure.error.dropTime": "請輸入機場出發時間。",
  "departure.alert.pickup.title": "不提供接車的區域",
  "departure.alert.pickup.desc": "Plantation Bay、Solea、機場附近、宿霧市",
  "departure.alert.drop.title": "機場送車說明",
  "departure.alert.drop.desc": "上午及晚上9時前無法提供機場送車服務。"
```

- [ ] **Step 6: 커밋**

```bash
git add public/locales/
git commit -m "feat: departure-massage i18n 키 추가 (5개 locale)"
```

---

## Task 3: `useDepartureMassageForm` 훅 생성

**Files:**
- Create: `src/views/ViewDepartureMassage/useDepartureMassageForm.ts`

- [ ] **Step 1: 파일 생성**

```typescript
import { Form, message } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import useMutation from 'src/libs/useMutation';
import { EmailResponse } from 'src/pages/api/CreateLastdayMassage';
import { FormDepartureMassage } from 'src/types';

export default function useDepartureMassageForm() {
  const router = useRouter();
  const { t } = useTranslation('booking');
  const [form] = Form.useForm<FormDepartureMassage>();
  const [createBooking, { loading, data, error }] =
    useMutation<EmailResponse>('/api/CreateLastdayMassage');

  const disabledDate = useCallback((current: dayjs.Dayjs): boolean => {
    return dayjs().add(1, 'days') >= current;
  }, []);

  const onFinish = (values: FormDepartureMassage) => {
    const phone = `${values.snsType}: ${values.snsId}`;
    const pickTime = (values.pickTime as unknown as dayjs.Dayjs).format('HH:mm A');
    const massageTime = (values.massageTime as unknown as dayjs.Dayjs).format('HH:mm A');
    const dropTime = (values.dropTime as unknown as dayjs.Dayjs).format('HH:mm A');
    createBooking({ ...values, phone, pickTime, massageTime, dropTime });
  };

  const onFinishFailed = (errorInfo: any) => {
    const msg = errorInfo?.errorFields?.[0]?.errors?.[0] ?? t('error.retry');
    message.error(msg);
  };

  useEffect(() => {
    if (data?.ok) router.push('/cart/success');
  }, [data, router]);

  useEffect(() => {
    if (error) message.error(t('error.retry'));
  }, [error, t]);

  return {
    form,
    onFinish,
    onFinishFailed,
    disabledDate,
    isSubmitting: loading,
  };
}
```

- [ ] **Step 2: 커밋**

```bash
git add src/views/ViewDepartureMassage/useDepartureMassageForm.ts
git commit -m "feat: useDepartureMassageForm 훅 추가"
```

---

## Task 4: `DepartureSection` 컴포넌트 생성

**Files:**
- Create: `src/views/ViewDepartureMassage/DepartureSection.tsx`

- [ ] **Step 1: 파일 생성**

```tsx
import TimePickerField from '@components/TimePickerField';
import { StyledH1, StyledInput } from '@styles/styledComponents';
import { Alert, DatePicker, Form, FormInstance } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';

interface Props {
  form: FormInstance;
  disabledDate: (current: dayjs.Dayjs) => boolean;
}

const DepartureSection = ({ form, disabledDate }: Props) => {
  const { t } = useTranslation('booking');

  useEffect(() => {
    form.setFieldValue('dropLocation', t('departure.field.dropLocationValue'));
  }, [form, t]);

  return (
    <>
      <StyledH1>{t('departure.section.title')}</StyledH1>

      <Form.Item
        label={t('field.date')}
        name="date"
        rules={[{ required: true, message: t('error.date') }]}
        style={{ width: '100%' }}
      >
        <DatePicker
          format="YYYY-MM-DD"
          placeholder={t('field.date')}
          className="ant-input"
          style={{ width: '100%', height: '60px', borderRadius: '10px' }}
          disabledDate={disabledDate}
        />
      </Form.Item>

      <Form.Item
        label={t('departure.field.pickupTime')}
        name="pickTime"
        rules={[{ required: true, message: t('departure.error.pickupTime') }]}
        style={{ width: '100%' }}
      >
        <TimePickerField placeholder={t('departure.placeholder.pickupTime')} />
      </Form.Item>

      <Form.Item
        label={t('departure.field.pickupLocation')}
        name="pickLocation"
        rules={[{ required: true, message: t('departure.error.pickupLocation') }]}
        style={{ width: '100%' }}
      >
        <StyledInput
          placeholder={t('departure.placeholder.pickupLocation')}
          size="large"
        />
      </Form.Item>

      <Alert
        message={t('departure.alert.pickup.title')}
        description={t('departure.alert.pickup.desc')}
        type="warning"
        showIcon
        style={{ width: '100%', marginBottom: '16px' }}
      />

      <Form.Item
        label={t('departure.field.massageTime')}
        name="massageTime"
        rules={[{ required: true, message: t('departure.error.massageTime') }]}
        style={{ width: '100%' }}
      >
        <TimePickerField placeholder={t('departure.placeholder.massageTime')} />
      </Form.Item>

      <Form.Item
        label={t('departure.field.dropTime')}
        name="dropTime"
        rules={[{ required: true, message: t('departure.error.dropTime') }]}
        style={{ width: '100%' }}
      >
        <TimePickerField placeholder={t('departure.placeholder.dropTime')} />
      </Form.Item>

      <Form.Item
        label={t('departure.field.dropLocation')}
        name="dropLocation"
        initialValue={t('departure.field.dropLocationValue')}
        style={{ width: '100%' }}
      >
        <StyledInput disabled size="large" />
      </Form.Item>

      <Alert
        message={t('departure.alert.drop.title')}
        description={t('departure.alert.drop.desc')}
        type="info"
        showIcon
        style={{ width: '100%', marginBottom: '16px' }}
      />
    </>
  );
};

export default DepartureSection;
```

- [ ] **Step 2: 커밋**

```bash
git add src/views/ViewDepartureMassage/DepartureSection.tsx
git commit -m "feat: DepartureSection 컴포넌트 추가"
```

---

## Task 5: `MassageSection` 컴포넌트 생성

**Files:**
- Create: `src/views/ViewDepartureMassage/MassageSection.tsx`

- [ ] **Step 1: 파일 생성**

```tsx
import FormItemMassageBooking from '@components/FormItemMassageBooking';
import FormItemMemoBooking from '@components/FormItemMemoBooking';
import massageLastday from '@configs/massage-lastday';
import { FormInstance } from 'antd';

interface Props {
  form: FormInstance;
}

const MassageSection = ({ form }: Props) => {
  return (
    <>
      <FormItemMassageBooking form={form} selectOption={massageLastday} />
      <FormItemMemoBooking />
    </>
  );
};

export default MassageSection;
```

- [ ] **Step 2: 커밋**

```bash
git add src/views/ViewDepartureMassage/MassageSection.tsx
git commit -m "feat: ViewDepartureMassage MassageSection 추가"
```

---

## Task 6: `ViewDepartureMassage/index.tsx` 생성

**Files:**
- Create: `src/views/ViewDepartureMassage/index.tsx`

- [ ] **Step 1: 파일 생성**

```tsx
import { Form } from 'antd';
import { useTranslation } from 'next-i18next';
import ModalSpin from '@components/ModalSpin';
import { StyledButton, StyledForm } from '@styles/styledComponents';
import ContactSection from '@views/ViewArrivalMassage/ContactSection';
import DepartureSection from './DepartureSection';
import MassageSection from './MassageSection';
import useDepartureMassageForm from './useDepartureMassageForm';

const ViewDepartureMassage = () => {
  const { t } = useTranslation('booking');
  const { form, onFinish, onFinishFailed, disabledDate, isSubmitting } =
    useDepartureMassageForm();

  return (
    <>
      <ModalSpin
        loading={isSubmitting}
        title={t('loading.title')}
        description={t('loading.desc')}
      />

      <StyledForm
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        requiredMark={false}
        scrollToFirstError
      >
        <Form.Item name="package" hidden initialValue="[4] Airport Drop" />
        <Form.Item name="couponList" hidden initialValue={[]} />

        <ContactSection form={form} />
        <DepartureSection form={form} disabledDate={disabledDate} />
        <MassageSection form={form} />

        <StyledButton type="primary" htmlType="submit" disabled={isSubmitting}>
          {t('submit')}
        </StyledButton>
      </StyledForm>
    </>
  );
};

export default ViewDepartureMassage;
```

- [ ] **Step 2: 커밋**

```bash
git add src/views/ViewDepartureMassage/index.tsx
git commit -m "feat: ViewDepartureMassage 메인 뷰 추가"
```

---

## Task 7: 페이지 파일 생성

**Files:**
- Create: `src/pages/booking/departure-massage.tsx`

- [ ] **Step 1: 파일 생성**

```tsx
import LayoutBooking from '@components/LayoutBooking';
import ViewDepartureMassage from '@views/ViewDepartureMassage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const DepartureMassagePage = () => (
  <LayoutBooking>
    <ViewDepartureMassage />
  </LayoutBooking>
);

export default DepartureMassagePage;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['booking'])),
  },
});
```

- [ ] **Step 2: 브라우저 확인**

`http://localhost:3000/ko/booking/departure-massage` 접속.

체크리스트:
- 언어 전환 (EN / 日本語 / 简体 / 繁體) 정상 동작
- 필수 필드 미입력 시 에러 메시지 표시
- 과거 날짜 비활성화 확인
- 픽업시간 / 마사지시간 / 공항출발시간 TimePicker 정상 동작
- 드랍 장소 disabled (막탄 공항 고정) 확인
- 제출 시 ModalSpin 표시 후 `/cart/success` 리다이렉트

- [ ] **Step 3: 최종 커밋**

```bash
git add src/pages/booking/departure-massage.tsx
git commit -m "feat: /booking/departure-massage 페이지 추가"
```
