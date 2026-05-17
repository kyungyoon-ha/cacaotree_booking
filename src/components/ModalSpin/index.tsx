import React, { useEffect, useState } from 'react';
import * as S from './style';

interface Props {
  loading: boolean;
  title?: string;
  description?: string;
}

const ModalSpin = ({ loading, title = '예약을 처리 중입니다.', description = '잠시만 기다려 주세요.' }: Props) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(loading);
  }, [loading]);

  if (!visible) return null;

  return (
    <S.Overlay>
      <S.Card>
        <S.IconWrapper>
          <S.Ring $size={80} $delay="0s" />
          <S.Ring $size={60} $delay="0.3s" />
          <S.CalendarIcon>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="#EFB041" strokeWidth="2" />
              <path d="M3 9h18" stroke="#EFB041" strokeWidth="2" />
              <path d="M8 2v4M16 2v4" stroke="#EFB041" strokeWidth="2" strokeLinecap="round" />
              <path d="M7 13l3 3 5-5" stroke="#EFB041" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </S.CalendarIcon>
        </S.IconWrapper>

        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>

        <S.DotsRow>
          <S.Dot $delay="0s" />
          <S.Dot $delay="0.2s" />
          <S.Dot $delay="0.4s" />
        </S.DotsRow>
      </S.Card>
    </S.Overlay>
  );
};

export default ModalSpin;
