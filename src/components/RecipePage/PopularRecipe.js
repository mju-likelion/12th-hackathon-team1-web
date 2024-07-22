import React from "react";
import styled from "styled-components";
import PopularRecipeBox from "../PopularRecipeBox";

const PopularRecipe = () => {
  return (
    <PopularContainer>
      <PopularRecipeBox />
      <PopularRecipeBox />
      <PopularRecipeBox />
    </PopularContainer>
  );
};

const PopularContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.green200};
  width: 46.875vw;
  min-width: 630px;
  height: 198px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 1vw;
  margin-bottom: 3px;
`;

export default PopularRecipe;
