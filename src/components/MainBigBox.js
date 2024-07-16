import React from "react";
import styled from "styled-components";

const MainBigBox = () => {
  return <BigBox />;
};

const BigBox = styled.div`
  width: 1150px;
  height: 514px;
  background-color: ${({ theme }) => theme.colors.green200};
  border-radius: 10px;
`;

export default MainBigBox;
