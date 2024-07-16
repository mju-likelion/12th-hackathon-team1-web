import React from "react";
import styled from "styled-components";
import logo from "../assets/images/logo.svg";
import menu from "../assets/images/Menu.svg";
import search from "../assets/images/search.svg";
import Heart from "../assets/images/Heart.svg";

const Header = () => {
  return (
    <HeaderContent>
      <MainHeader>
        <LogoImg src={logo} alt="헤더 로고" />
        <AccountContainer>
          <PageText>로그인</PageText>
          <PageText>회원가입</PageText>
        </AccountContainer>
      </MainHeader>
      <FunctionHeader>
        <FunctionContainer>
          <MenuImg src={menu} alt="메뉴 버튼" />
          <PageText>냉장고 관리</PageText>
          <PageText>레시피</PageText>
        </FunctionContainer>
        <FunctionContainer>
          <SearchBox>
            <Search placeholder="레시피 검색" />
            <img src={search} alt="검색 돋보기 이미지" />
          </SearchBox>
          <HeartImg src={Heart} alt="마음에 드는 레시피 탭" />
        </FunctionContainer>
      </FunctionHeader>
    </HeaderContent>
  );
};

const HeartImg = styled.img`
  height: 3vh;
  margin-left: 3vw;
  cursor: pointer;
`;

const MenuImg = styled.img`
  height: 4vh;
  cursor: pointer;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  height: 4vh;
  border: 1px solid ${({ theme }) => theme.colors.helperText};
  border-radius: 25px;
  img {
    height: 2vh;
    margin: 10px;
  }
`;

const Search = styled.input`
  font-size: ${({ theme }) => theme.fonts.helpText14};
  width: 15vw;
  color: ${({ theme }) => theme.colors.helperText};
  margin: 10px 15px;
  border: none;
  outline: none;
`;

const FunctionContainer = styled.div`
  display: flex;
  align-items: center;
`;

const FunctionHeader = styled.div`
  display: flex;
  height: 6vh;
  justify-content: space-between;
`;

const MainHeader = styled.div`
  display: flex;
  width: 100%;
  margin-top: 1vh;
  height: 8vh;
  padding: 2vh 0;
  justify-content: space-between;
  align-items: center;
`;

const HeaderContent = styled.div`
  position: fixed;
  height: 16vh;
  width: 100%;
  padding: 0 12vw;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.helperText};
`;

const LogoImg = styled.img`
  height: 5vh;
  cursor: pointer;
`;

const PageText = styled.p`
  font-size: ${({ theme }) => theme.fonts.helpText14};
  margin-left: 20px;
  cursor: pointer;
  &:hover {
    font-weight: 600;
  }
`;

const AccountContainer = styled.div`
  display: flex;
  align-items: center;
`;

export default Header;
