import React, { useState } from "react";
import styled from "styled-components";
import logo from "../assets/images/logo.svg";
import menu from "../assets/images/Menu.svg";
import search from "../assets/images/search.svg";
import Heart from "../assets/images/Heart.svg";
import { Link, useNavigate } from "react-router-dom";
import { Axios } from "../api/Axios";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("userToken");
      await Axios.post(
        "/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userToken");
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error("로그아웃 실패", error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("회원 탈퇴 하시겠습니까?")) {
      try {
        const token = localStorage.getItem("userToken");
        await Axios.delete(
          "/auth/leave",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userToken");
        setIsLoggedIn(false);
        navigate("/");
      } catch (error) {
        console.error("회원 탈퇴 실패", error);
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearch = () => {
    if (searchKeyword.trim() !== "") {
      navigate(`/recipes?keyword=${searchKeyword}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <HeaderContent>
      <MainHeader>
        <Link to="/main">
          <LogoImg src={logo} alt="헤더 로고" />
        </Link>
        <AccountContainer>
          {isLoggedIn ? (
            <>
              <PageText onClick={handleLogout}>로그아웃</PageText>
              <PageText onClick={handleDeleteAccount}>회원 탈퇴</PageText>
            </>
          ) : (
            <>
              <Link to="/auth/login">
                <PageText>로그인</PageText>
              </Link>
              <Link to="/auth/signin">
                <PageText>회원가입</PageText>
              </Link>
            </>
          )}
        </AccountContainer>
      </MainHeader>
      <FunctionHeader>
        <FunctionContainer>
          <MenuImg src={menu} alt="메뉴 버튼" />
          {isLoggedIn ? (
            <Link to="/fridge">
              <PageText>냉장고 관리</PageText>
            </Link>
          ) : (
            <PageText
              onClick={() => {
                alert("로그인 후 이용가능한 기능입니다.");
              }}
            >
              냉장고 관리
            </PageText>
          )}
          <Link to="/recipes">
            <PageText>레시피</PageText>
          </Link>
        </FunctionContainer>
        <FunctionContainer>
          <SearchBox>
            <Search
              placeholder="레시피 검색"
              value={searchKeyword}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
            />
            <img src={search} alt="돋보기 검색 버튼" onClick={handleSearch} />
          </SearchBox>
          {isLoggedIn ? (
            <Link to="/auth/likes">
              <HeartImg src={Heart} alt="마음에 드는 레시피 탭" />
            </Link>
          ) : (
            <HeartImg
              onClick={() => alert("로그인 후 이용가능한 기능입니다. ")}
              src={Heart}
              alt="마음에 드는 레시피 탭"
            />
          )}
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
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  height: 4vh;
  border: 1px solid ${({ theme }) => theme.colors.headerLine};
  border-radius: 25px;
  img {
    height: 2vh;
    margin: 10px;
  }
`;

const Search = styled.input`
  font-size: ${({ theme }) => theme.fonts.helpText14};
  width: 15vw;
  margin: 10px 15px;
  border: none;
  outline: none;
  @media screen and (max-width: 1200px) {
    font-size: 1.3vw;
  }

  @media screen and (max-width: 480px) {
    font-size: 2.5vw;
  }
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
  border: 1px solid ${({ theme }) => theme.colors.headerLine};
  z-index: 1100;

  @media screen and (max-width: 480px) {
    padding: 0 6vw;
  }
`;

const LogoImg = styled.img`
  height: 5vh;
  cursor: pointer;
`;

const PageText = styled.p`
  font-size: ${({ theme }) => theme.fonts.helpText14};
  margin-left: 20px;
  color: black;
  cursor: pointer;
  &:hover {
    font-weight: 600;
  }
  @media screen and (max-width: 1200px) {
    font-size: 1.3vw;
  }

  @media screen and (max-width: 480px) {
    font-size: 2.5vw;
  }
`;

const AccountContainer = styled.div`
  display: flex;
  align-items: center;
`;

export default Header;
