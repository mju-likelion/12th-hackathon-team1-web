import React from "react";
import styled from "styled-components";
import { Theme } from "../styles/Theme";

const MainBigBox = () => {
  return <BigBox />;
};

const BigBox = styled.div`
  width: 1284px;
  height: 458px;
  background-color: ${Theme.colors.green200};
  border-radius: 10px;
`;

export default MainBigBox;
