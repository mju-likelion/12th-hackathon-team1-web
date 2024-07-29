import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MainBigBox from "../components/MainBigBox";
import MainSmallBox from "../components/MainSmallBox";

const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedInStatus);
  }, []);
  return (
    <Wrapper>
      <BoxWrapper>
        <Title>
          {isLoggedIn
            ? "나의 냉장고"
            : "나만의 냉장고를 만들어보세요! (로그인 후 이용 가능합니다.)"}
        </Title>
        <MainBigBox location="main"/>
        <SmallBoxWrapper>
          <SmallTextBox>
            <Text>인기 레시피</Text>
            <MainSmallBox isLoggedIn={true} />
          </SmallTextBox>
          <SmallTextBox>
            <Text>나의 냉장고 레시피</Text>
            <MainSmallBox isLoggedIn={isLoggedIn} />
          </SmallTextBox>
        </SmallBoxWrapper>
      </BoxWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;

  @media screen and (max-width: 1200px) {
    margin-top: 5vw;
  }
`;

const BoxWrapper = styled.div`
  width: 1150px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1200px) {
    width: 80vw;
  }
`;

const Title = styled.p`
  ${({ theme }) => theme.fonts.default16};
  height: 50px;
  display: flex;
  align-items: center;

  @media screen and (max-width: 1200px) {
    height: 3vw;
    font-size: 1.3vw;
  }
`;

const SmallBoxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SmallTextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const Text = styled.p`
  ${({ theme }) => theme.fonts.default18}
  height: 50px;
  display: flex;
  align-items: center;

  @media screen and (max-width: 1200px) {
    height: 3vw;
    font-size: 1.3vw;
  }
`;

export default Main;
