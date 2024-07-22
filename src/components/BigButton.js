import React from "react";
import styled from "styled-components";

const BigButton = ({ disabled, onClick, children }) => {
  return (
    <Btn disabled={disabled} onClick={onClick}>
      {children}
    </Btn>
  );
};

const Btn = styled.button`
  width: 400px;
  height: 60px;
  border-radius: 10px;
  background-color: ${({ disabled, theme }) =>
    disabled ? theme.colors.dateGray : theme.colors.greenButton};
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.bigButtonText};
`;

export default BigButton;
