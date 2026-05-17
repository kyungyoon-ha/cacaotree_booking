import { Form } from 'antd';
import { useTranslation } from 'next-i18next';
import ModalSpin from '@components/ModalSpin';
import { StyledButton, StyledForm } from '@styles/styledComponents';
import ContactSection from '@views/ViewArrivalMassage/ContactSection';
import DepartureSection from './DepartureSection';
import MassageSection from './MassageSection';
import useDepartureMassageForm from './useDepartureMassageForm';
import styled, { keyframes } from 'styled-components';

const ViewDepartureMassage = () => {
  const { t } = useTranslation('booking');
  const { form, onFinish, onFinishFailed, disabledDate, isSubmitting, isInitialLoading } =
    useDepartureMassageForm();

  if (isInitialLoading) {
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
        <PageLoadingText>{t('loading.desc')}</PageLoadingText>
        <DotsRow>
          <Dot $delay="0s" />
          <Dot $delay="0.2s" />
          <Dot $delay="0.4s" />
        </DotsRow>
      </PageLoadingWrapper>
    );
  }

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
