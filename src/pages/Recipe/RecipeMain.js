import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import PopularRecipe from "../../components/PopularRecipe";
import WholeRecipe from "../../components/WholeRecipe";
import Sidebar from "../../components/Sidebar";

const RecipeMain = ({isLoggedIn}) => {
  const [type, setType] = useState("newest");
  const [isLoading, setIsLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 300));
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
    <>
      <SidebarContainer>
        <Sidebar 
        isLoggedIn={isLoggedIn}
        text="로그인 후 이용가능한 기능입니다. "/>
      </SidebarContainer>
      <Wrapper>
        <RecipeContainer>
          {windowWidth > 480 && (
            <div>
              <TextContainer>
                <BoxTitle>인기 레시피</BoxTitle>
              </TextContainer>
              <PopularRecipe />
            </div>
          )}
          <div>
            <TextContainer>
              {windowWidth > 480 && <BoxTitle>전체 레시피</BoxTitle>}
              <TabContainer>
                <TabText
                  isActive={type === "newest"}
                  onClick={() => setType("newest")}
                >
                  최신순
                </TabText>
                <TabText
                  isActive={type === "popularity"}
                  onClick={() => setType("popularity")}
                >
                  인기순
                </TabText>
              </TabContainer>
            </TextContainer>
            <WholeRecipe type={type} />
          </div>
        </RecipeContainer>
      </Wrapper>
    </>
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
  border-top: 16px solid ${({ theme }) => theme.colors.green200};
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: ${rotate} 2s linear infinite;
`;

const SidebarContainer = styled.div`
  position: absolute;
  display: flex;
  position: fixed;

  @media screen and (max-width: 480px) {
    position: static;
    margin-top: 3vw;
    margin-bottom: 1vw;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 900px;

  @media screen and (max-width: 1200px) {
    width: 70vw;
    margin-top: 2vw;
  }

  @media screen and (max-width: 480px) {
    width: 90vw;
  }
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;

  @media screen and (max-width: 1200px) {
    gap: 0.7vw;
  }
`;

const TabText = styled.p.attrs((props) => ({}))`
  display: flex;
  font-size: ${({ theme }) => theme.fonts.default16};
  cursor: pointer;
  font-weight: ${(props) => (props.isActive ? "600" : "400")};

  &:hover {
    font-weight: 600;
  }

  @media screen and (max-width: 1200px) {
    font-size: 1.3vw;
  }

  @media screen and (max-width: 480px) {
    font-size: 2.5vw;
    margin-bottom: 1.5vw;
  }
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;

  @media screen and (max-width: 1200px) {
    height: 3vw;
  }
`;

const BoxTitle = styled.p`
  font-size: ${({ theme }) => theme.fonts.default18};
  @media screen and (max-width: 1200px) {
    font-size: 1.3vw;
  }
`;

export default RecipeMain;
