import React from "react";
import styled from "styled-components";
import WholeRecipe from "../../components/WholeRecipe";
import PopularRecipe from "../../components/PopularRecipe";
import Sidebar from "../../components/Sidebar";

const RecipeMain = () => {
  return (
    <RecipeContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <MainContainer>
        <>
          <TextContainer>
            <BoxTitle>인기 레시피</BoxTitle>
          </TextContainer>
          <PopularRecipe />
        </>
        <>
          <TextContainer>
            <BoxTitle>전체 레시피</BoxTitle>
            <TabContainer>
              <TabText>최신순</TabText>
              <TabText>인기순</TabText>
            </TabContainer>
          </TextContainer>
          <WholeRecipe />
        </>
      </MainContainer>
    </RecipeContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const SidebarContainer = styled.div`
  position: absolute;
  display: flex;

  @media screen and (max-width: 1200px) {
  }
`;

const TabText = styled.p`
  display: flex;
  font-size: ${({ theme }) => theme.fonts.default16};
  align-items: center;
  cursor: pointer;
  &:hover {
    font-weight: 600;
  }
`;

const TabContainer = styled.div`
  display: flex;
  width: 100px;
  justify-content: space-between;
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 900px;
  min-width: 630px;
  padding: 0 3px;
  margin-top: 10px;

  @media screen and (max-width: 1200px) {
    width: 46.875vw;
  }
`;

const RecipeContainer = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  flex-direction: column;
`;

const BoxTitle = styled.p`
  font-size: ${({ theme }) => theme.fonts.default18};
  margin: 10px 0;
`;

export default RecipeMain;
