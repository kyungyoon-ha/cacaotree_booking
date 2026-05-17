import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import styled from 'styled-components';

interface Props {
  value?: dayjs.Dayjs;
  onChange?: (value: dayjs.Dayjs) => void;
  placeholder?: string;
  disabled?: boolean;
}

const TimePickerField = ({ value, onChange, placeholder, disabled }: Props) => (
  <StyledTimePicker
    value={value}
    onChange={onChange}
    format="HH:mm"
    minuteStep={10}
    placeholder={placeholder}
    size="large"
    disabled={disabled}
    showNow={false}
    inputReadOnly
  />
);

export default TimePickerField;

const StyledTimePicker = styled(TimePicker)`
  width: 100%;
  height: 60px;
  border-radius: 10px !important;
`;
