import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import SidebarItem from "./SidebarItem";

function Sidebar() {
  const location = useLocation();

  const menus = [
    { name: "내 레시피 보기", path: "/recipes/my_recipes" },
    { name: "좋아요 누른 레시피 보기", path: "/auth/likes" },
    { name: "내 냉장고 재료로 레시피 보기", path: "/recipes/recommendations" },
  ];

  return (
    <SidebarContainer>
      <MenuText>Menu</MenuText>
      <Grayline />
      <Text>
        {menus.map((menu, index) => {
          const isSelected = location.pathname === menu.path;
          return (
            <Link to={menu.path} key={index}>
              <SidebarItem menu={menu} isSelected={isSelected} />
            </Link>
          );
        })}
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

export default Sidebar;
