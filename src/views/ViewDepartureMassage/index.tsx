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
