import FormItemSnsContact from '@components/FormItemSnsContact';
import { StyledH1, StyledInput } from '@styles/styledComponents';
import { Form, FormInstance } from 'antd';
import { useTranslation } from 'next-i18next';

interface Props {
  form: FormInstance;
}

const ContactSection = ({ form }: Props) => {
  const { t } = useTranslation('booking');

  return (
    <>
      <StyledH1>{t('title')}</StyledH1>

      <Form.Item
        label={t('field.name')}
        name="name"
        rules={[{ required: true, message: t('error.name') }]}
        style={{ width: '100%' }}
      >
        <StyledInput placeholder={t('placeholder.name')} size="large" />
      </Form.Item>

      <Form.Item
        name="email"
        label={t('field.email')}
        style={{ width: '100%' }}
        rules={[
          { type: 'email', message: t('error.emailFormat') },
          { required: true, message: t('error.email') },
        ]}
      >
        <StyledInput placeholder={t('placeholder.email')} size="large" />
      </Form.Item>

      <FormItemSnsContact form={form} />
    </>
  );
};

export default ContactSection;
