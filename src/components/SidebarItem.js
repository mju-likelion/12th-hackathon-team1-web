import React from "react";
import styled, { css } from "styled-components";
import Arrow from "../assets/images/next.svg";

function SidebarItem({ menu, isSelected }) {
  return (
    <ItemContainer $isSelected={isSelected}>
      {menu.name}
      {isSelected && <img src={Arrow} alt="화살표 아이콘" />}
    </ItemContainer>
  );
}

const ItemContainer = styled.p`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.fonts.default16};
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

  @media screen and (max-width: 1200px){
    font-size: 1.3vw;
    margin: 0.7vw 0;
  }
`;

export default SidebarItem;
