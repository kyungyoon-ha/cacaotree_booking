import Logo from "@components/Logo";
import productMap from "@configs/productMap";
import { Badge, Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useUIContext } from "src/contexts";
import styled from "styled-components";

const LOCALES = [
  { code: "ko", label: "한" },
  { code: "en", label: "EN" },
  { code: "ja", label: "日" },
  { code: "zh-Hans", label: "简" },
  { code: "zh-Hant", label: "繁" },
];

const Header = () => {
  const router = useRouter();
  const {
    carts: {
      summary: { totalItemCnt },
    },
    getCartsAll,
    dispatch,
  } = useUIContext();

  let pageKey = router.pathname.split("/")[2];

  const changeLocale = (locale: string) => {
    router.push({ pathname: router.pathname, query: router.query }, router.asPath, { locale });
  };

  useEffect(() => {
    getCartsAll({}, dispatch);
  }, [getCartsAll, dispatch]);

  return (
    <Wrapper>
      <Logo width="50" height="50" href="/" />

      <Title>
        <Link href="/">
          {pageKey && productMap[pageKey]?.alt
            ? productMap[pageKey]?.alt
            : "마사지 예약하기"}
        </Link>
      </Title>

      <RightSection>
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
        <StyledLink
          href="https://pf.kakao.com/_mRQxbT"
          target="_blank"
          style={{ marginRight: "10px" }}
        >
          <Tooltip title="문의하기">
            <Image
              src="/message.svg"
              alt="shopping icon"
              width="25"
              height="25"
            />
          </Tooltip>
        </StyledLink>
        <StyledLink href="/cart">
          <Tooltip title="장바구니">
            <Badge count={totalItemCnt} size="small">
              <Image
                src="/shopping-cart.svg"
                alt="shopping icon"
                width="25"
                height="25"
              />
            </Badge>
          </Tooltip>
        </StyledLink>
      </RightSection>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  height: 70px;
  background: #fff;
  border-bottom: 3px solid #eceff3;
  min-width: 354px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10 !important;
`;

const Title = styled.p`
  font-family: "Noto Serif KR", serif;
  text-align: center;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const LocaleRow = styled.div`
  display: flex;
  gap: 3px;
  margin-right: 8px;
`;

const LocaleButton = styled.button<{ $active: boolean }>`
  padding: 3px 7px;
  border-radius: 12px;
  border: 1px solid ${({ $active }) => ($active ? "#EFB041" : "#ddd")};
  background: ${({ $active }) => ($active ? "#EFB041" : "transparent")};
  color: ${({ $active }) => ($active ? "#fff" : "#aaa")};
  font-size: 11px;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  cursor: pointer;
  line-height: 1;
  transition: all 0.15s;

  &:hover {
    border-color: #EFB041;
    color: ${({ $active }) => ($active ? "#fff" : "#EFB041")};
  }
`;

const StyledLink = styled(Link)`
  margin-left: 6px;
  img:hover {
    transform: scale(1.1);
    transition: 0.4s;
  }
`;
