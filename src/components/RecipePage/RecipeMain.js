import React from "react";
import styled from "styled-components";
import WholeRecipe from "./WholeRecipe";
import PopularRecipe from "./PopularRecipe";

const RecipeMain = () => {
  return (
    <RecipeContainer>
      <div>
        <BoxTitle>인기 레시피</BoxTitle>
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
  width: 46.875vw;
  min-width: 630px;
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
  margin: 7px;
`;

export default RecipeMain;
