import React from "react";
import styled from "styled-components";
import RecipeBox from "../RecipeBox";

const WholeRecipe = () => {
  return (
    <WholeContainer>
      <Line>
        <RecipeBox
          menuName={"삐쓰까또레부르쥬미첼라햄페스츄리치즈나쵸스트링스파게티"}
          countHeart={5}
        />
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
  width: 900px;
  min-width: 630px;
  height: 580px;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 1vw;
  margin-bottom: 3px;
  padding: 0 30px;

  @media screen and (max-width: 1200px) {
    width: 46.875vw;
  }
`;

export default WholeRecipe;
