import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import styled from 'styled-components';

interface Props {
  value?: dayjs.Dayjs;
  onChange?: (value: dayjs.Dayjs) => void;
  placeholder?: string;
  disabled?: boolean;
}

const TimePickerField = ({ value, onChange, placeholder, disabled }: Props) => {
  const { t } = useTranslation('booking');
  const [open, setOpen] = useState(false);
  const lastValidRef = useRef<dayjs.Dayjs | null>(value ?? null);

  useEffect(() => {
    lastValidRef.current = value ?? null;
  }, [value]);

  return (
    <StyledTimePicker
      open={open}
      onOpenChange={setOpen}
      value={value}
      onSelect={(val) => {
        lastValidRef.current = val;
        onChange?.(val);
      }}
      onChange={(val) => {
        if (val !== null) {
          lastValidRef.current = val;
          onChange?.(val);
        } else if (lastValidRef.current !== null) {
          onChange?.(lastValidRef.current);
        }
      }}
      format="HH:mm"
      minuteStep={10}
      placeholder={placeholder}
      size="large"
      disabled={disabled}
      showNow={false}
      allowClear={false}
      inputReadOnly
      renderExtraFooter={() => (
        <ConfirmBtn onClick={() => setOpen(false)}>
          {t('timepicker.confirm')}
        </ConfirmBtn>
      )}
    />
  );
};

export default TimePickerField;

const StyledTimePicker = styled(TimePicker)`
  width: 100%;
  height: 60px;
  border-radius: 10px !important;
`;

const ConfirmBtn = styled.button`
  width: 100%;
  padding: 8px 0;
  background: #efb041;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin: 4px 0;

  &:hover {
    background: #d99b2c;
  }
`;
