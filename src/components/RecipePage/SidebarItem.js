import React from "react";
import styled from "styled-components";
import Arrow from "../../assets/images/next.svg";

function SidebarItem({ menu, isSelected }) {
  return (
    <ItemContainer isSelected={isSelected}>
      {menu.name}
      {isSelected && <Icon src={Arrow} alt="화살표 아이콘" />}
    </ItemContainer>
  );
}

const ItemContainer = styled.p`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.fonts.default16};
  margin: 10px 0;
  font-weight: ${(props) => (props.isSelected ? 600 : 400)};
  cursor: pointer;
  &:hover {
    font-weight: 600;
  }
`;

const Icon = styled.img``;

export default SidebarItem;
