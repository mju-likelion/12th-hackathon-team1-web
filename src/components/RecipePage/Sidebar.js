import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SidebarItem from "./SidebarItem";

function Sidebar() {
  const menus = [
    { name: "내 레시피 보기", path: "/" },
    { name: "좋아요 누른 레시피 보기", path: "/" },
    { name: "내 냉장고 재료로 레시피 검색", path: "/" },
  ];

  return (
    <SidebarContainer>
      <MenuText>Menu</MenuText>
      <Grayline />
      {menus.map((menu, index) => {
        return (
          <Link to={menu.path} key={index}>
            <SidebarItem menu={menu} />
          </Link>
        );
      })}
    </SidebarContainer>
  );
}

const MenuText = styled.p`
  font-size: ${({ theme }) => theme.fonts.menuText};
  margin: 10px 0;
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
`;

export default Sidebar;
