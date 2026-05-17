import { Form, message } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import useMutation from 'src/libs/useMutation';
import { EmailResponse } from 'src/pages/api/CreateLastdayMassage';
import { FormDepartureMassage } from 'src/types';

export default function useDepartureMassageForm() {
  const router = useRouter();
  const { t } = useTranslation('booking');
  const [form] = Form.useForm<FormDepartureMassage>();
  const [createBooking, { loading, data, error }] =
    useMutation<EmailResponse>('/api/CreateLastdayMassage');

  const disabledDate = useCallback((current: dayjs.Dayjs): boolean => {
    return dayjs().add(1, 'days') >= current;
  }, []);

  const onFinish = (values: FormDepartureMassage) => {
    const phone = `${values.snsType}: ${values.snsId}`;
    const pickTime = (values.pickTime as unknown as dayjs.Dayjs).format('HH:mm A');
    const massageTime = (values.massageTime as unknown as dayjs.Dayjs).format('HH:mm A');
    const dropTime = (values.dropTime as unknown as dayjs.Dayjs).format('HH:mm A');
    createBooking({ ...values, phone, pickTime, massageTime, dropTime });
  };

  const onFinishFailed = (errorInfo: any) => {
    const msg = errorInfo?.errorFields?.[0]?.errors?.[0] ?? t('error.retry');
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
    disabledDate,
    isSubmitting: loading,
  };
}
