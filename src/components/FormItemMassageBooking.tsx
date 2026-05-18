import { StyledH1, StyledSelect } from '@styles/styledComponents';
import theme from '@styles/theme';
import { Card, Form, FormInstance, Radio, Select } from 'antd';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';
import { SelectOption } from 'src/types';

interface Props {
  form: FormInstance;
  selectOption: SelectOption;
}

const FormItemMassageBooking = ({ form, selectOption }: Props) => {
  const { t } = useTranslation('booking');
  const fieldPax = Number(Form.useWatch('pax', form)) || 1;
  const fieldMsgList = Form.useWatch('massageList', form) || [];

  const translatedOption = selectOption.map((group) => ({
    ...group,
    label: t(group.label as string),
    options: group.options?.map((opt) => ({
      ...opt,
      label: t(opt.label as string),
    })),
  }));

  useEffect(() => {
    if (fieldPax === fieldMsgList.length) return;
    const initial = { sex: 'f', massage: '' };
    const newList =
      fieldPax < fieldMsgList.length
        ? fieldMsgList.slice(0, fieldPax)
        : [...new Array(fieldPax).keys()].map((_, idx) =>
            fieldMsgList[idx] ? fieldMsgList[idx] : initial
          );
    form.setFieldValue('massageList', newList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, fieldPax]);

  return (
    <>
      <StyledH1>{t('massage.pax.title')}</StyledH1>

      <Form.Item
        label={t('massage.pax.label')}
        name="pax"
        rules={[{ required: true, message: t('massage.pax.error') }]}
        initialValue={1}
        style={{ width: '100%' }}
      >
        <StyledSelect
          options={[...new Array(30).fill(null).map((_, idx) => ({
            label: `${idx + 1}${t('massage.pax.unit')}`,
            value: `${idx + 1}`,
          }))]}
          size="large"
          style={{ height: '60px' }}
        />
      </Form.Item>

      <StyledH1>{t('massage.title')}</StyledH1>

      <Form.List name="massageList">
        {(fields) => (
          <>
            {fields.map((field) => (
              <Card
                key={field.key}
                type="inner"
                title={`${t('massage.guest')} ${field.key + 1}`}
                style={{
                  background: theme.gray,
                  width: '100%',
                  marginBottom: '15px',
                  marginTop: '15px',
                }}
              >
                <Form.Item required style={{ marginBottom: '5px' }}>
                  <Form.Item
                    {...field}
                    key={`${field.key}-1`}
                    name={[field.name, 'massage']}
                    initialValue=""
                    rules={[{ required: true, message: t('massage.select.error') }]}
                  >
                    <Select
                      options={translatedOption}
                      size="large"
                      placeholder={t('massage.select.placeholder')}
                    />
                  </Form.Item>
                  <Form.Item
                    key={`${field.key}-2`}
                    name={[field.name, 'sex']}
                    noStyle
                    initialValue="f"
                  >
                    <Radio.Group>
                      <Radio.Button value="f">{t('massage.sex.female')}</Radio.Button>
                      <Radio.Button value="m">{t('massage.sex.male')}</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Form.Item>
              </Card>
            ))}
          </>
        )}
      </Form.List>
    </>
  );
};

export default FormItemMassageBooking;
