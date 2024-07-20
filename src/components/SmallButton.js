import React from "react";
import styled from "styled-components";

const SmallButton = ({closeModal, text}) => {
  return <Container onClick={closeModal}>{text}</Container>;
};

const Container = styled.button`
  width: 167px;
  height: 52px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.white};
  ${({theme})=>theme.fonts.default18}

  @media screen and (max-width: 1200px){
    width: 10vw;
    height: 3.5vw;
    border-radius: 1vw;
    font-size: 1.5vw;
  }
`;

export default SmallButton;
