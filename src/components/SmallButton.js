import React from "react";
import styled from "styled-components";

const SmallButton = () => {
  return <Container></Container>;
};

const Container = styled.button`
  width: 167px;
  height: 52px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.white};

  @media screen and (max-width: 1200px){
    width: 10vw;
    height: 3.5vw;
    border-radius: 1vw;
  }
`;

export default SmallButton;
