import React, { useState, useEffect } from "react";
import styled, {keyframes} from "styled-components";
import MainBigBox from "../components/MainBigBox";
import MainSmallBox from "../components/MainSmallBox";

const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedInStatus);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 300));
        setIsLoading(false);
    };

    fetchData();
}, []);

if (isLoading) {
    return (
        <LoadingWrapper>
            <LoadingSpinner />
        </LoadingWrapper>
    );
}

  return (
    <Wrapper>
      <BoxWrapper>
        <Title>
          {isLoggedIn
            ? "나의 냉장고"
            : "나만의 냉장고를 만들어보세요! (로그인 후 이용 가능합니다.)"}
        </Title>
        <MainBigBox location="main" />
        <SmallBoxWrapper>
          <SmallTextBox>
            <Text>인기 레시피</Text>
            <MainSmallBox isLoggedIn={true} type="popular" />
          </SmallTextBox>
          <SmallTextBox>
            <Text>나의 냉장고 레시피</Text>
            <MainSmallBox isLoggedIn={isLoggedIn} type="my-refrigerator" />
          </SmallTextBox>
        </SmallBoxWrapper>
      </BoxWrapper>
    </Wrapper>
  );
};

const LoadingWrapper = styled.div`
    height: 70vh;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 1200px) {
        height: 50vh;
    }
`;

const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const LoadingSpinner = styled.div`
    border: 16px solid #f3f3f3;
    border-top: 16px solid ${({theme})=>theme.colors.green200};
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: ${rotate} 2s linear infinite;
`;

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

  @media screen and (max-width: 480px){
    width: 90vw;
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

  @media screen and (max-width: 480px){
    height: 8vw;
    font-size: 3vw;
  }
`;

const SmallBoxWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 480px){
    flex-direction: column;
  }
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

  @media screen and (max-width: 480px) {
    height: 7vw;
    font-size: 3vw;
  }
`;

export default Main;
