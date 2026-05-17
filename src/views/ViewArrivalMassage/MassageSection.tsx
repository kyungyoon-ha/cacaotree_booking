import FormItemMassageBooking from '@components/FormItemMassageBooking';
import FormItemMemoBooking from '@components/FormItemMemoBooking';
import massageFirstday from '@configs/massage-firstday';
import { FormInstance } from 'antd';

interface Props {
  form: FormInstance;
}

const MassageSection = ({ form }: Props) => {
  return (
    <>
      <FormItemMassageBooking form={form} selectOption={massageFirstday} />
      <FormItemMemoBooking />
    </>
  );
};

export default MassageSection;
