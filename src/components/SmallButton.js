import React from "react";
import styled from "styled-components";

const SmallButton = ({onClick, text, disabled}) => {
  return(
    <> 
    <Container onClick={onClick} disabled={disabled}>{text}</Container>
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

  @media screen and (max-width: 480px){
    width: 15vw;
    height: 7.2vw;
    border-radius: 1.5vw;
    font-size: 3vw;
  }
`;

export default SmallButton;
