import React from "react";
import styled from "styled-components";

const MenuBox = () => {
  return (
    <MainContainer>
      <MenuText>Menu</MenuText>
      <Grayline />
      <MenuList>내 레시피 보기</MenuList>
      <MenuList>좋아요 누른 레시피 보기</MenuList>
      <MenuList>나의 냉장고 재료로 레시피 검색</MenuList>
    </MainContainer>
  );
};

const Grayline = styled.div`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lineGray};
  margin-bottom: 10px;
`;

const MenuText = styled.p`
  font-size: ${({ theme }) => theme.fonts.menuText};
  margin: 10px 0;
`;

const MenuList = styled.p`
  font-size: ${({ theme }) => theme.fonts.default16};
  margin: 15px 0;
  cursor: pointer;
  &:hover {
    font-weight: 600;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 224px;
  width: 300px;
  padding: 23px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.lineGray};
  background-color: ${({ theme }) => theme.colors.white};
`;

export default MenuBox;
