import React, { useState, useEffect } from "react";
import styled, {keyframes} from "styled-components";
import PopularRecipe from "../../components/PopularRecipe";
import WholeRecipe from "../../components/WholeRecipe";
import Sidebar from "../../components/Sidebar";

const RecipeMain = () => {
  const [type, setType] = useState("newest");
  const [isLoading, setIsLoading] = useState(true);

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
        <Sidebar />
      </SidebarContainer>
      <Wrapper>
        <RecipeContainer>
          <div>
            <TextContainer>
              <BoxTitle>인기 레시피</BoxTitle>
            </TextContainer>
            <PopularRecipe />
          </div>
          <div>
            <TextContainer>
              <BoxTitle>전체 레시피</BoxTitle>
              <TabContainer>
                <TabText
                  $isActive={type === "newest"}
                  onClick={() => setType("newest")}
                >
                  최신순
                </TabText>
                <TabText
                  $isActive={type === "popularity"}
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
    border-top: 16px solid ${({theme})=>theme.colors.green200};
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: ${rotate} 2s linear infinite;
`;

const SidebarContainer = styled.div`
  position: absolute;
  display: flex;
  position: fixed;
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
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;

  @media screen and (max-width: 1200px) {
    gap: 0.7vw;
  }
`;

const TabText = styled.p.attrs((props) => ({
  isActive: props.isActive,
}))`
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
