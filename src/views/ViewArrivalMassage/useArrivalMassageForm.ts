import { message, Form } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useBlockDates from 'src/libs/useBlockDates';
import useMutation from 'src/libs/useMutation';
import { EmailResponse } from 'src/pages/api/nodemailer';
import { FormArrivalMassage } from 'src/types';

export default function useArrivalMassageForm() {
  const router = useRouter();
  const { t } = useTranslation('booking');
  const [form] = Form.useForm<FormArrivalMassage>();
  const { disabledDate, isLoading } = useBlockDates('firstday');
  const [createBooking, { loading, data, error }] =
    useMutation<EmailResponse>('/api/CreateFirstdayMassage');

  const onFinish = (values: FormArrivalMassage) => {
    const phone = `${values.snsType}: ${values.snsId}`;
    const pickTime = dayjs(values.pickTime).format('HH:mm A');
    createBooking({ ...values, phone, pickTime });
  };

  const onFinishFailed = (errorInfo: any) => {
    const msg =
      errorInfo?.errorFields?.[0]?.errors?.[0] ?? t('error.retry');
    message.error(msg);
  };

  useEffect(() => {
    if (data?.ok) router.push('/cart/success');
  }, [data, router]);

  useEffect(() => {
    if (error) message.error(t('error.retry'));
  }, [error, t]);

  return {
    form,
    onFinish,
    onFinishFailed,
    loading: loading || isLoading,
    disabledDate,
  };
}
