import FormItemDropArrival from '@components/FormItemDropArrival';
import TimePickerField from '@components/TimePickerField';
import { StyledH1, StyledInput } from '@styles/styledComponents';
import { Alert, DatePicker, Form, FormInstance } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';

interface Props {
  form: FormInstance;
  disabledDate: (current: dayjs.Dayjs) => boolean;
}

const AirportSection = ({ form, disabledDate }: Props) => {
  const { t } = useTranslation('booking');

  return (
    <>
      <StyledH1>{t('section.airport')}</StyledH1>

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

      <Alert
        message={t('alert.dateGuide.title')}
        description={<span style={{ whiteSpace: 'pre-line' }}>{t('alert.dateGuide.desc')}</span>}
        type="warning"
        showIcon
        style={{ width: '100%', marginBottom: '16px' }}
      />

      <Form.Item
        label={t('field.arrivalTime')}
        name="pickTime"
        rules={[{ required: true, message: t('error.arrivalTime') }]}
        style={{ width: '100%' }}
      >
        <TimePickerField placeholder={t('placeholder.arrivalTime')} />
      </Form.Item>

      <Form.Item
        label={t('field.flight')}
        name="pickFlight"
        rules={[{ required: true, message: t('error.flight') }]}
        style={{ width: '100%' }}
      >
        <StyledInput placeholder={t('placeholder.flight')} size="large" />
      </Form.Item>

      <Form.Item
        label={t('field.pickupLocation')}
        name="pickLocation"
        initialValue="막탄공항"
        style={{ width: '100%' }}
      >
        <StyledInput disabled size="large" />
      </Form.Item>

      <FormItemDropArrival form={form} />
    </>
  );
};

export default AirportSection;
