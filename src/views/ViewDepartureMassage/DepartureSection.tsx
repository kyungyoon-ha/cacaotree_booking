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
