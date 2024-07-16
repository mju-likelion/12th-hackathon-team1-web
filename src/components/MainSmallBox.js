import React from "react";
import styled from "styled-components";
import { Theme } from "../styles/Theme";

const MainSmallBox = () => {
  return <SmallBox />;
};

const SmallBox = styled.div`
  width: 618px;
  height: 220px;
  background-color: ${Theme.colors.green200};
  border-radius: 10px;
`;

export default MainSmallBox;
