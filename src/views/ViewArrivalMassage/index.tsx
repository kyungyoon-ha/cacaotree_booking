import { Form, Spin } from 'antd';
import { useTranslation } from 'next-i18next';
import { SpinWrapper } from '@components/ModalSpin/style';
import { StyledButton, StyledForm } from '@styles/styledComponents';
import AirportSection from './AirportSection';
import ContactSection from './ContactSection';
import MassageSection from './MassageSection';
import useArrivalMassageForm from './useArrivalMassageForm';
import styled from 'styled-components';

const ViewArrivalMassage = () => {
  const { t } = useTranslation('booking');
  const { form, onFinish, onFinishFailed, loading, disabledDate } =
    useArrivalMassageForm();

  if (loading && !form.isFieldsTouched()) {
    return (
      <LoadingWrapper>
        <Spin size="large" />
      </LoadingWrapper>
    );
  }

  return (
    <StyledForm
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      requiredMark={false}
      scrollToFirstError
    >
      <Form.Item name="package" hidden initialValue="[1] Airport Pick" />
      <Form.Item name="couponList" hidden initialValue={[]} />

      <ContactSection form={form} />
      <AirportSection form={form} disabledDate={disabledDate} />
      <MassageSection form={form} />

      {loading ? (
        <SpinWrapper>
          <Spin />
        </SpinWrapper>
      ) : (
        <StyledButton type="primary" htmlType="submit">
          {t('submit')}
        </StyledButton>
      )}
    </StyledForm>
  );
};

export default ViewArrivalMassage;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
