import React from "react";
import styled from "styled-components";

const SmallButton = () => {
  return <Container></Container>;
};

const Container = styled.button`
  height: 56px;
  width: 180px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export default SmallButton;
