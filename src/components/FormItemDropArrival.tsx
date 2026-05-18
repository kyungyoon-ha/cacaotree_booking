import TimePickerField from '@components/TimePickerField';
import { StyledInput, StyledRadioButton, StyledRadioGroup } from '@styles/styledComponents';
import { Alert, Form, FormInstance } from 'antd';
import { useTranslation } from 'next-i18next';
import { useEffect, useMemo, useState } from 'react';

type DropKey = 'mactan' | 'cebu' | 'port' | 'noNeed';

interface Props {
  form: FormInstance;
}

const FormItemDropArrival = ({ form }: Props) => {
  const { t } = useTranslation('booking');
  const [selectKey, setSelectKey] = useState<DropKey>('mactan');

  const DROP_FIXED_VALUES: Record<DropKey, { loc: string; time: string }> = useMemo(() => ({
    mactan: { loc: '', time: '11:00 am' },
    cebu: { loc: t('drop.fixed.cebu.loc'), time: '' },
    port: { loc: t('drop.fixed.port.loc'), time: '' },
    noNeed: { loc: '', time: '' },
  }), [t]);

  const couponList = Form.useWatch('couponList', form);
  const initSelectKey = Form.useWatch('dropLocation_hidden', form);

  const TABS: { key: DropKey; label: string }[] = useMemo(() => [
    { key: 'mactan', label: t('drop.tab.mactan') },
    { key: 'cebu', label: t('drop.tab.cebu') },
    { key: 'port', label: t('drop.tab.port') },
    { key: 'noNeed', label: t('drop.tab.noNeed') },
  ], [t]);

  const IS_DISABLED: Record<DropKey, { loc: boolean; time: boolean }> = {
    mactan: { loc: false, time: true },
    cebu: { loc: true, time: true },
    port: { loc: true, time: false },
    noNeed: { loc: false, time: true },
  };

  const onChangeCoupon = (newCouponKey?: string) => {
    const init = (couponList || []).filter((item: string) => item !== 'dropPort');
    form.setFieldValue('couponList', newCouponKey ? [...init, newCouponKey] : init);
  };

  const onChangeRadio = (e: any) => {
    const newKey = e.target.value as DropKey;
    setSelectKey(newKey);
    form.setFieldValue('dropLocation_hidden', newKey);
    form.setFieldValue('dropLocation', DROP_FIXED_VALUES[newKey].loc);
    form.setFieldValue('dropTime', DROP_FIXED_VALUES[newKey].time);
    onChangeCoupon(newKey === 'port' ? 'dropPort' : undefined);
  };

  useEffect(() => {
    if (initSelectKey) setSelectKey(initSelectKey as DropKey);
  }, [initSelectKey]);

  const disabledLoc = IS_DISABLED[selectKey].loc;
  const disabledTime = IS_DISABLED[selectKey].time;

  const locHelp = selectKey === 'mactan' ? (
    <Alert
      message={t('drop.alert.mactan.title')}
      description={t('drop.alert.mactan.desc')}
      type="warning"
      showIcon
      style={{ width: '100%', margin: '20px 0' }}
    />
  ) : selectKey === 'noNeed' ? (
    <Alert
      message={t('drop.alert.noNeed.title')}
      description={t('drop.alert.noNeed.desc')}
      type="warning"
      showIcon
      style={{ width: '100%', margin: '20px 0' }}
    />
  ) : undefined;

  const timeHelp = selectKey === 'port' ? (
    <Alert
      message={t('drop.alert.port.title')}
      description={<span style={{ whiteSpace: 'pre-line' }}>{t('drop.alert.port.desc')}</span>}
      type="warning"
      showIcon
      style={{ width: '100%', margin: '20px 0' }}
    />
  ) : undefined;

  const locPlaceholder = selectKey === 'noNeed'
    ? t('drop.placeholder.noNeed.loc')
    : t('drop.placeholder.location');

  return (
    <>
      <Form.Item style={{ width: '100%', marginBottom: 0 }}>
        <StyledRadioGroup
          defaultValue="mactan"
          size="large"
          onChange={onChangeRadio}
          value={selectKey}
        >
          {TABS.map(({ key, label }) => (
            <StyledRadioButton key={key} value={key}>
              {label}
            </StyledRadioButton>
          ))}
        </StyledRadioGroup>
      </Form.Item>

      <Form.Item name="dropLocation_hidden" initialValue="mactan" hidden>
        <StyledInput />
      </Form.Item>

      <Form.Item
        label={t('drop.location.label')}
        name="dropLocation"
        rules={[{ required: !disabledLoc, message: t('drop.error.location') }]}
        help={locHelp}
      >
        <StyledInput
          size="large"
          placeholder={locPlaceholder}
          disabled={disabledLoc}
          onChange={(e) => form.setFieldValue('dropLocation', e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name="dropTime"
        label={t('drop.time.label')}
        rules={[{ required: !disabledTime, message: t('drop.error.time') }]}
        initialValue={DROP_FIXED_VALUES[selectKey].time}
        help={timeHelp}
      >
        {disabledTime ? (
          <StyledInput
            size="large"
            placeholder={t('drop.placeholder.time')}
            disabled
          />
        ) : (
          <TimePickerField placeholder={t('drop.placeholder.time')} />
        )}
      </Form.Item>
    </>
  );
};

export default FormItemDropArrival;
