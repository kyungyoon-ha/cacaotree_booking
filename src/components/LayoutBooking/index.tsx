import Logo from '@components/Logo';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const LOCALES = [
  { code: 'ko', label: '한' },
  { code: 'en', label: 'EN' },
  { code: 'ja', label: '日' },
  { code: 'zh-Hans', label: '简' },
  { code: 'zh-Hant', label: '繁' },
];

const BookingHeader = () => {
  const router = useRouter();

  const switchLocale = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale });
  };

  return (
    <Header>
      <Logo width="50" height="50" href="/" />
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
`;

const LocaleButtons = styled.div`
  display: flex;
  gap: 4px;
`;

const LocaleButton = styled.button<{ $active: boolean }>`
  padding: 3px 7px;
  border-radius: 12px;
  border: 1px solid ${({ $active }) => ($active ? '#EFB041' : '#ddd')};
  background: ${({ $active }) => ($active ? '#EFB041' : 'transparent')};
  color: ${({ $active }) => ($active ? '#fff' : '#aaa')};
  font-size: 11px;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  cursor: pointer;
  line-height: 1;
  transition: all 0.15s;

  &:hover {
    border-color: #EFB041;
    color: ${({ $active }) => ($active ? '#fff' : '#EFB041')};
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: 100px;
`;
