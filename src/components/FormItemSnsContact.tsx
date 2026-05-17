import { Form, FormInstance } from 'antd';
import { useTranslation } from 'next-i18next';
import {
  StyledInput,
  StyledRadioButton,
  StyledRadioGroup,
} from '@styles/styledComponents';
import { SnsType } from 'src/types';

const SNS_OPTIONS: SnsType[] = ['kakao', 'line', 'whatsapp', 'wechat', 'messenger'];

interface Props {
  form: FormInstance;
}

const FormItemSnsContact = ({ form }: Props) => {
  const { t } = useTranslation('booking');
  const snsType = Form.useWatch('snsType', form) as SnsType | undefined;

  return (
    <>
      <Form.Item
        label={t('field.sns')}
        name="snsType"
        rules={[{ required: true, message: t('error.sns') }]}
        style={{ width: '100%' }}
      >
        <StyledRadioGroup>
          {SNS_OPTIONS.map((sns) => (
            <StyledRadioButton key={sns} value={sns}>
              {t(`sns.${sns}`)}
            </StyledRadioButton>
          ))}
        </StyledRadioGroup>
      </Form.Item>

      <Form.Item
        label={t('field.snsId')}
        name="snsId"
        rules={[{ required: true, message: t('error.snsId') }]}
        style={{ width: '100%' }}
      >
        <StyledInput
          placeholder={snsType ? t(`placeholder.snsId.${snsType}`) : ''}
          size="large"
        />
      </Form.Item>
    </>
  );
};

export default FormItemSnsContact;
