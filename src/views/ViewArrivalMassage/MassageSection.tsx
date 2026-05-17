import FormItemMassage from '@components/FormItemMassage';
import FormItemMemo from '@components/FormItemMemo';
import massageFirstday from '@configs/massage-firstday';
import { FormInstance } from 'antd';

interface Props {
  form: FormInstance;
}

const MassageSection = ({ form }: Props) => {
  return (
    <>
      <FormItemMassage form={form} selectOption={massageFirstday} />
      <FormItemMemo />
    </>
  );
};

export default MassageSection;
