import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  width: 100%;
  height: 60px;
  font-size: 32px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
`;

const Header: React.FC = () => {
  return <HeaderWrapper>不動産価格推移アプリ</HeaderWrapper>;
};

export default Header;
