import FormItemPickDrop from '@components/FormItemPickDrop';
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

      <FormItemPickDrop
        form={form}
        keyLocation="dropLocation"
        keyTime="dropTime"
        titleLocation="드랍장소"
        titleTime="드랍시간"
        options={{
          mactan: {
            title: '막탄지역',
            disabledLoc: false,
            disabledTime: true,
            fixedValueLoc: '',
            fixedValueTime: '11:00 am',
            helpLoc: (
              <Alert
                message="드랍 불가"
                description="솔레아, 공항근처, 세부시티"
                type="warning"
                showIcon
                style={{ width: '100%', margin: '20px 0' }}
              />
            ),
          },
          cebu: {
            title: '세부시티',
            disabledLoc: true,
            disabledTime: true,
            fixedValueLoc: '개별 이동하겠습니다.',
            fixedValueTime: '',
            placeholderLoc: '',
            placeholderTime: '개별 이동하겠습니다.',
          },
          port: {
            title: '항구드랍',
            disabledLoc: true,
            disabledTime: false,
            fixedValueLoc: '항구드랍 (1인 200페소 추가)',
            fixedValueTime: '',
            helpTime: (
              <Alert
                message="항구 드랍 시간을 적어주세요."
                description={
                  <div>
                    티켓시간 보다 2시간 전에 출발입니다.
                    <br />
                    예) 8시 20분 티켓 → 6시 20분
                  </div>
                }
                type="warning"
                showIcon
                style={{ width: '100%', margin: '20px 0' }}
              />
            ),
            couponKey: 'dropPort',
          },
          noNeed: {
            title: '필요 없습니다.',
            disabledLoc: false,
            disabledTime: true,
            fixedValueLoc: '',
            fixedValueTime: '',
            placeholderLoc: '개별이동 이유를 적어주세요.',
            placeholderTime: '필요 없습니다.',
            helpLoc: (
              <Alert
                message="개별 이동 사유를 적어주세요."
                description="투어픽업은 투어종류를 적어주세요."
                type="warning"
                showIcon
                style={{ width: '100%', margin: '20px 0' }}
              />
            ),
          },
        }}
      />
    </>
  );
};

export default AirportSection;
