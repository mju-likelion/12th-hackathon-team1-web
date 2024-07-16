import React from "react";
import styled from "styled-components";

const SmallButton = () => {
  return <Container></Container>;
};

const Container = styled.button`
  height: 56px;
  width: 9.375vw;
  border-radius: 1.1vw;
  background-color: ${({ theme }) => theme.colors.white};
`;

export default SmallButton;
