import React from "react";
import styled from "styled-components";

const MainSmallBox = () => {
  return <SmallBox />;
};

const SmallBox = styled.div`
  width: 555px;
  height: 220px;
  background-color: ${({ theme }) => theme.colors.green200};
  border-radius: 10px;
`;

export default MainSmallBox;
