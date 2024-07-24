import React from "react";
import styled from "styled-components";

function Dropdown({ position, onOptionSelect }) {
  return (
    <DropdownContainer style={{ top: position.y, left: position.x }}>
      <DropdownItem onClick={() => onOptionSelect("edit")}>수정</DropdownItem>
      <DropdownItem onClick={() => onOptionSelect("delete")}>삭제</DropdownItem>
    </DropdownContainer>
  );
}

const DropdownContainer = styled.div`
  position: absolute;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 1002;
  padding: 8px;
`;

const DropdownItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.green200};
  }
`;

export default Dropdown;
