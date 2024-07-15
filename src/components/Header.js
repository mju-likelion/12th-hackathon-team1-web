import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.svg";

const Header = () => {
  const navigate = useNavigate();

  const goToMainPage = () => {
    navigate("/");
  };

  return (
    <HeaderContent>
      <MainHeader>
        <LogoImg src={logo} alt="헤더 로고" onClick={goToMainPage} />
      </MainHeader>
    </HeaderContent>
  );
};

const MainHeader = styled.div`
  display: flex;
  width: 100%;
  margin-top: 2vh;
  height: 8vh;
  padding: 2vh 0;
  justify-content: space-between;
  align-items: center;
`;

const HeaderContent = styled.div`
  height: 16vh;
  width: 100%;
  padding: 0 17vw;
  background-color: white;
  border: 1px solid #c3c3c3;
`;

const LogoImg = styled.img`
  height: 5vh;
  cursor: pointer;
`;

export default Header;
