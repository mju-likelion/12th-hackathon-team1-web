import React from "react";
import styled from "styled-components";
import RecipeBox from "../RecipeBox";

const WholeRecipe = () => {
  return (
    <WholeContainer>
      <Line>
        <RecipeBox menuName={"마파 두부"} countHeart={5} />
        <RecipeBox />
        <RecipeBox />
      </Line>
      <Line>
        <RecipeBox />
        <RecipeBox />
        <RecipeBox />
      </Line>
    </WholeContainer>
  );
};

const Line = styled.div`
  display: flex;
  justify-content: space-between;
`;

const WholeContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.green200};
  width: 46.875vw;
  min-width: 630px;
  height: 580px;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 1vw;
  margin-bottom: 3px;
  padding: 0 30px;
`;

export default WholeRecipe;
