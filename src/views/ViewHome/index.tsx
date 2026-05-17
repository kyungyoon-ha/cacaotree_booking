import React, { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { QuestionSelectWithSvg } from "@components/QuestionSelect";
import { SVGFlightArrival, SVGFlightDeparture, SVGVan } from "@components/Svg";
import LayoutQuestion from "@components/LayoutQuestion";
import styled, { keyframes } from "styled-components";

const LOCALES = [
  { code: "ko", label: "한국어" },
  { code: "en", label: "EN" },
  { code: "ja", label: "日本語" },
  { code: "zh-Hans", label: "简中" },
  { code: "zh-Hant", label: "繁中" },
];

const ViewHome = () => {
  const { t } = useTranslation("booking");
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  const changeLocale = (locale: string) => {
    router.push({ pathname: router.pathname, query: router.query }, router.asPath, { locale });
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return (
      <PageLoadingWrapper>
        <RingBox>
          <SpinRing $size={72} $delay="0s" />
          <SpinRing $size={52} $delay="0.35s" />
          <CalIcon>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="#EFB041" strokeWidth="2" />
              <path d="M3 9h18" stroke="#EFB041" strokeWidth="2" />
              <path d="M8 2v4M16 2v4" stroke="#EFB041" strokeWidth="2" strokeLinecap="round" />
              <path d="M7 13l3 3 5-5" stroke="#EFB041" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </CalIcon>
        </RingBox>
        <PageLoadingText>{t("loading.desc")}</PageLoadingText>
        <DotsRow>
          <Dot $delay="0s" />
          <Dot $delay="0.2s" />
          <Dot $delay="0.4s" />
        </DotsRow>
      </PageLoadingWrapper>
    );
  }

  const itemList = [
    {
      id: "arrival",
      svg: <SVGFlightArrival />,
      alt: "arrival",
      title: t("home.arrival.title"),
      description: t("home.arrival.description"),
      href: "/booking/arrival-massage",
      imageList: t("home.arrival.images").split(",").filter(Boolean),
    },
    {
      id: "daytime",
      svg: <SVGVan />,
      alt: "daytime",
      title: t("home.daytime.title"),
      description: t("home.daytime.description"),
      href: "/booking/daytime-massage",
      imageList: t("home.daytime.images").split(",").filter(Boolean),
    },
    {
      id: "departure",
      svg: <SVGFlightDeparture />,
      alt: "departure",
      title: t("home.departure.title"),
      description: t("home.departure.description"),
      href: "/booking/departure-massage",
      imageList: t("home.departure.images").split(",").filter(Boolean),
    },
  ];

  return (
    <LayoutQuestion>
      <LocaleRow>
        {LOCALES.map(({ code, label }) => (
          <LocaleButton
            key={code}
            $active={router.locale === code}
            onClick={() => changeLocale(code)}
          >
            {label}
          </LocaleButton>
        ))}
      </LocaleRow>
      <QuestionSelectWithSvg
        buttonName={t("home.button")}
        itemList={itemList}
        title={t("home.title")}
      />
    </LayoutQuestion>
  );
};

export default ViewHome;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const bounce = keyframes`
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-7px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.12); }
`;

const PageLoadingWrapper = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background: #fff;
  z-index: 100;
`;

const RingBox = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SpinRing = styled.div<{ $size: number; $delay: string }>`
  position: absolute;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #efb041;
  animation: ${spin} 1.2s linear infinite;
  animation-delay: ${({ $delay }) => $delay};
  opacity: ${({ $size }) => ($size >= 72 ? 1 : 0.5)};
`;

const CalIcon = styled.div`
  position: relative;
  z-index: 1;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const PageLoadingText = styled.p`
  font-size: 15px;
  color: #888;
  margin: 0;
`;

const DotsRow = styled.div`
  display: flex;
  gap: 8px;
`;

const Dot = styled.span<{ $delay: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #efb041;
  display: inline-block;
  animation: ${bounce} 1s ease infinite;
  animation-delay: ${({ $delay }) => $delay};
`;

const LocaleRow = styled.div`
  display: flex;
  gap: 6px;
  justify-content: center;
  padding: 12px 0 4px;
`;

const LocaleButton = styled.button<{ $active: boolean }>`
  padding: 4px 12px;
  border-radius: 20px;
  border: 1px solid ${({ $active }) => ($active ? "#EFB041" : "#ddd")};
  background: ${({ $active }) => ($active ? "#EFB041" : "#fff")};
  color: ${({ $active }) => ($active ? "#fff" : "#888")};
  font-size: 12px;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: #EFB041;
    color: ${({ $active }) => ($active ? "#fff" : "#EFB041")};
  }
`;
