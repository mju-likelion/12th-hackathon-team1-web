import React from "react";
import styled from "styled-components";

const SmallButton = ({Click, text, isClose, canSave}) => {
  return(
    <> 
    <Container onClick={Click} disabled={canSave}>{text}</Container>
    {isClose && <Container onClick={isClose}>{text}</Container>}
    </>
  );
};

const Container = styled.button`
  width: 167px;
  height: 52px;
  border-radius: 20px;
  background-color: ${({ theme, disabled }) => disabled ? theme.colors.green100 : theme.colors.white};
  ${({theme})=>theme.fonts.default18}

  @media screen and (max-width: 1200px){
    width: 10vw;
    height: 3.5vw;
    border-radius: 1vw;
    font-size: 1.5vw;
  }
`;

export default SmallButton;
