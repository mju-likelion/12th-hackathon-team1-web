import React from "react";
import styled from "styled-components";

function SidebarItem({ menu }) {
  return <ItemContainer>{menu.name}</ItemContainer>;
}

const ItemContainer = styled.p`
  font-size: ${({ theme }) => theme.fonts.default16};
  margin: 15px 0;
  cursor: pointer;
  &:hover {
    font-weight: 600;
  }
`;

export default SidebarItem;
