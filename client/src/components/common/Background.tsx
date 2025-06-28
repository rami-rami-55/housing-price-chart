import React from 'react';
import styled from 'styled-components';

const BackgroundWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding-top: 48px;
  padding-bottom: 48px;
`;

interface BackgroundProps {
  children: React.ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ children }) => {
  return <BackgroundWrapper>{children}</BackgroundWrapper>;
};

export default Background;
