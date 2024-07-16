import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Layout = () => {
  return (
    <>
      <Header />
      <MainWrapper>
        <Outlet />
      </MainWrapper>
    </>
  );
};

const MainWrapper = styled.div`
  height: 16vh;
`;

export default Layout;
