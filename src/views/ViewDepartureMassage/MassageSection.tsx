import FormItemMassageBooking from '@components/FormItemMassageBooking';
import FormItemMemoBooking from '@components/FormItemMemoBooking';
import massageLastday from '@configs/massage-lastday';
import { FormInstance } from 'antd';

interface Props {
  form: FormInstance;
}

const MassageSection = ({ form }: Props) => {
  return (
    <>
      <FormItemMassageBooking form={form} selectOption={massageLastday} />
      <FormItemMemoBooking />
    </>
  );
};

export default MassageSection;
