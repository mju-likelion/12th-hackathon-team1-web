import React from "react";
import styled from "styled-components";
import WholeRecipe from "./WholeRecipe";
import PopularRecipe from "./PopularRecipe";

const RecipeMain = () => {
  return (
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
            <TabText>최신순</TabText>
            <TabText>인기순</TabText>
          </TabContainer>
        </TextContainer>
        <WholeRecipe />
      </div>
    </RecipeContainer>
  );
};

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

  @media screen and (max-width: 1200px) {
    width: 46.875vw;
  }
`;

const RecipeContainer = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

const BoxTitle = styled.p`
  font-size: ${({ theme }) => theme.fonts.default18};
  margin: 10px 0;
`;

export default RecipeMain;
