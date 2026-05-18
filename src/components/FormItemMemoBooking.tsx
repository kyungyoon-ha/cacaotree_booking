import { StyledH1 } from '@styles/styledComponents';
import { Alert, Form, Input } from 'antd';
import { useTranslation } from 'next-i18next';

const FormItemMemoBooking = () => {
  const { t } = useTranslation('booking');

  return (
    <>
      <StyledH1 style={{ textAlign: 'center' }}>{t('memo.title')}</StyledH1>
      <Form.Item
        label={t('memo.label')}
        name="memo"
        rules={[{ required: true, message: t('memo.error') }]}
        style={{ width: '100%' }}
      >
        <Input.TextArea
          rows={4}
          placeholder={t('memo.placeholder')}
          style={{ borderRadius: '10px', padding: '15px' }}
        />
      </Form.Item>
      <Alert
        message={t('memo.alert.title')}
        description={t('memo.alert.desc')}
        type="warning"
        showIcon
        style={{ width: '100%' }}
      />
    </>
  );
};

export default FormItemMemoBooking;
