import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.15); opacity: 0.6; }
`;

const bounce = keyframes`
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-8px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.div`
  background: #fff;
  border-radius: 24px;
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  animation: ${fadeIn} 0.25s ease;
  min-width: 280px;
`;

export const IconWrapper = styled.div`
  position: relative;
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

export const Ring = styled.div<{ $size: number; $delay: string }>`
  position: absolute;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #EFB041;
  animation: ${spin} 1.2s linear infinite;
  animation-delay: ${({ $delay }) => $delay};
  opacity: ${({ $size }) => ($size === 80 ? 1 : 0.5)};
`;

export const CalendarIcon = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${pulse} 2s ease-in-out infinite;
`;

export const Title = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  text-align: center;
`;

export const Description = styled.p`
  font-size: 14px;
  color: #888;
  margin: 0;
  text-align: center;
`;

export const DotsRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

export const Dot = styled.span<{ $delay: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #EFB041;
  display: inline-block;
  animation: ${bounce} 1s ease infinite;
  animation-delay: ${({ $delay }) => $delay};
`;

export const SpinWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

export const Wrapper = styled.div`
  visibility: hidden;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;

  &.visible {
    visibility: visible;
  }
`;
