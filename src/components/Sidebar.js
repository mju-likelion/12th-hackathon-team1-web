import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import Arrow from "../assets/images/next.svg";

function Sidebar() {
  const location = useLocation();

  return (
    <SidebarContainer>
      <MenuText>Menu</MenuText>
      <Grayline />
      <Text>
        <>
          <Link to="/recipes/my_recipes">
            <ItemContainer
              $isSelected={location.pathname === "/recipes/my_recipes"}
            >
              내 레시피 보기
              {location.pathname === "/recipes/my_recipes" && (
                <ArrowImg src={Arrow} alt="화살표 아이콘" />
              )}
            </ItemContainer>
          </Link>
          <Link to="/auth/likes">
            <ItemContainer $isSelected={location.pathname === "/auth/likes"}>
              좋아요 누른 레시피 보기
              {location.pathname === "/auth/likes" && (
                <ArrowImg src={Arrow} alt="화살표 아이콘" />
              )}
            </ItemContainer>
          </Link>
          <Link to="/recipes/recommendations">
            <ItemContainer
              $isSelected={location.pathname === "/recipes/recommendations"}
            >
              내 냉장고 재료로 레시피 보기
              {location.pathname === "/recipes/recommendations" && (
                <ArrowImg src={Arrow} alt="화살표 아이콘" />
              )}
            </ItemContainer>
          </Link>
        </>
      </Text>
    </SidebarContainer>
  );
}

const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 200px;
`;

const MenuText = styled.p`
  font-size: ${({ theme }) => theme.fonts.menuText};
  margin: 10px 0;

  @media screen and (max-width: 1200px) {
    margin: 0.7vw 0;
    font-size: 1.3vw;
  }
`;

const Grayline = styled.div`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lineGray};
  margin-bottom: 10px;
`;

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 224px;
  width: 300px;
  padding: 23px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.lineGray};
  background-color: ${({ theme }) => theme.colors.white};

  @media screen and (max-width: 1200px) {
    width: 22vw;
    height: 17vw;
    padding: 1.6vw;
    border-radius: 0.7vw;
  }
`;

const ArrowImg = styled.img`
  height: 16px;
  width: 16px;
`;

const ItemContainer = styled.p`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.fonts.default16};
  text-decoration: none;
  color: black;
  margin: 10px 0;
  cursor: pointer;

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      font-weight: 600;
    `}

  &:hover {
    font-weight: 600;
  }

  @media screen and (max-width: 1200px) {
    font-size: 1.3vw;
    margin: 0.7vw 0;
  }
`;

export default Sidebar;
