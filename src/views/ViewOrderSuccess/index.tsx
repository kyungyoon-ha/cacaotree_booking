import { SCREENS } from "@configs/screens";
import { useTranslation } from "next-i18next";
import styled from "styled-components";
import { useState } from "react";

const SNS_CHANNELS = [
  {
    key: "kakao",
    href: "https://pf.kakao.com/_mRQxbT/chat",
    icon: "https://github.com/user-attachments/assets/44ff52db-2689-4d4e-bee1-522e2a6f0be3",
    label: "KakaoTalk",
  },
  {
    key: "messenger",
    href: "http://m.me/2215216212050102",
    icon: "https://github.com/user-attachments/assets/97ef58ff-784b-4cb6-a343-ea6890f1012f",
    label: "Messenger",
  },
  {
    key: "whatsapp",
    href: "https://wa.me/message/4ANH6TENQLMID1?src=qr",
    icon: "https://github.com/user-attachments/assets/b2e0ecbe-166d-4972-bcef-52a00dc79da6",
    label: "WhatsApp",
  },
  {
    key: "line",
    href: "https://lin.ee/qxN20Y2",
    icon: "https://github.com/user-attachments/assets/941cef96-71f7-4520-82c8-bb936fc61680",
    label: "LINE",
  },
  {
    key: "wechat",
    href: null,
    icon: "https://i.ibb.co/DgHfJh3c/wechat-icon.png",
    label: "WeChat",
  },
];

const WECHAT_QR = "https://i.postimg.cc/7YLKWhNF/wechat-qr.png";

const ViewOrderSuccess = () => {
  const { t } = useTranslation("booking");
  const [wechatOpen, setWechatOpen] = useState(false);

  return (
    <Wrapper>
      <Card>
        <CheckCircle>
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <circle cx="28" cy="28" r="27" stroke="#b69e65" strokeWidth="2" />
            <path
              d="M16 28L24 36L40 20"
              stroke="#b69e65"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </CheckCircle>

        <Title>{t("success.title")}</Title>
        <Body>{t("success.body")}</Body>

        <Divider />

        <ContactSection>
          <ContactLabel>{t("success.contact.label")}</ContactLabel>
          <ContactDesc>{t("success.contact.desc")}</ContactDesc>
          <ChannelRow>
            {SNS_CHANNELS.map((ch) =>
              ch.href ? (
                <ChannelLink
                  key={ch.key}
                  href={ch.href}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <img src={ch.icon} alt={ch.label} width={52} height={52} />
                  <ChannelLabel>{ch.label}</ChannelLabel>
                </ChannelLink>
              ) : (
                <ChannelButton key={ch.key} onClick={() => setWechatOpen(true)}>
                  <img src={ch.icon} alt={ch.label} width={52} height={52} />
                  <ChannelLabel>{ch.label}</ChannelLabel>
                </ChannelButton>
              )
            )}
          </ChannelRow>
        </ContactSection>
      </Card>

      {wechatOpen && (
        <Overlay onClick={() => setWechatOpen(false)}>
          <QrCard onClick={(e) => e.stopPropagation()}>
            <QrClose onClick={() => setWechatOpen(false)}>×</QrClose>
            <QrTitle>{t("success.wechat.modalTitle")}</QrTitle>
            <img
              src={WECHAT_QR}
              alt="WeChat QR"
              style={{ maxWidth: 220, height: "auto" }}
            />
            <QrDesc>{t("success.wechat.modalDesc")}</QrDesc>
          </QrCard>
        </Overlay>
      )}
    </Wrapper>
  );
};

export default ViewOrderSuccess;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  padding: 40px 15px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 520px;
  background: #fff;
  border-radius: 16px;
  padding: 48px 40px 40px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.06);

  @media (max-width: ${SCREENS.sm}) {
    padding: 36px 20px 32px;
  }
`;

const CheckCircle = styled.div`
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  text-align: center;
  margin-bottom: 12px;
`;

const Body = styled.p`
  font-size: 14px;
  color: #666;
  text-align: center;
  line-height: 1.7;
`;

const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid #f0f0f0;
  margin: 28px 0;
`;

const ContactSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ContactLabel = styled.p`
  font-size: 12px;
  font-weight: 700;
  color: #b69e65;
  margin-bottom: 6px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const ContactDesc = styled.p`
  font-size: 13px;
  color: #888;
  margin-bottom: 24px;
  text-align: center;
`;

const ChannelRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
`;

const ChannelLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.15s;

  &:hover {
    transform: translateY(-3px);
  }

  img {
    border-radius: 12px;
  }
`;

const ChannelButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: transform 0.15s;

  &:hover {
    transform: translateY(-3px);
  }

  img {
    border-radius: 12px;
  }
`;

const ChannelLabel = styled.span`
  font-size: 11px;
  color: #888;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const QrCard = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 28px 24px 24px;
  text-align: center;
  position: relative;
  max-width: 300px;
  width: 90%;
`;

const QrClose = styled.button`
  position: absolute;
  top: 10px;
  right: 14px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
  line-height: 1;
`;

const QrTitle = styled.p`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 16px;
`;

const QrDesc = styled.p`
  font-size: 12px;
  color: #888;
  margin-top: 12px;
`;
