import Logo from '@components/Logo';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { SCREENS } from '@configs/screens';

const LOCALES = [
  { code: 'ko', label: '한국어' },
  { code: 'en', label: 'EN' },
  { code: 'ja', label: '日本語' },
  { code: 'zh-Hans', label: '简体' },
  { code: 'zh-Hant', label: '繁體' },
];

const BookingHeader = () => {
  const router = useRouter();

  const switchLocale = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale });
  };

  return (
    <Header>
      <Logo width="40" height="40" href="/" />
      <LocaleButtons>
        {LOCALES.map(({ code, label }) => (
          <LocaleButton
            key={code}
            $active={router.locale === code}
            onClick={() => switchLocale(code)}
          >
            {label}
          </LocaleButton>
        ))}
      </LocaleButtons>
    </Header>
  );
};

interface Props {
  children: React.ReactNode;
}

const LayoutBooking = ({ children }: Props) => (
  <Wrapper>
    <BookingHeader />
    <Content>{children}</Content>
  </Wrapper>
);

export default LayoutBooking;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: #f4f4f4;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  height: 70px;
  background: #fff;
  border-bottom: 3px solid #eceff3;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 10;

  @media (max-width: ${SCREENS.sm}) {
    padding: 0 16px;
  }
`;

const LocaleButtons = styled.div`
  display: flex;
  gap: 4px;
`;

const LocaleButton = styled.button<{ $active: boolean }>`
  padding: 4px 10px;
  border: 1px solid ${({ $active }) => ($active ? '#EFB041' : '#d9d9d9')};
  border-radius: 6px;
  background: ${({ $active }) => ($active ? '#EFB041' : 'transparent')};
  color: ${({ $active }) => ($active ? '#fff' : '#555')};
  font-size: 12px;
  cursor: pointer;
  font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};

  &:hover {
    border-color: #EFB041;
    color: #EFB041;
  }

  @media (max-width: ${SCREENS.sm}) {
    padding: 4px 6px;
    font-size: 11px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: 100px;
`;
