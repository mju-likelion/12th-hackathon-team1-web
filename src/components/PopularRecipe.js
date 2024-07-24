import React from "react";
import styled from "styled-components";
import PopularRecipeBox from "./PopularRecipeBox";

const PopularRecipe = () => {
  return (
    <PopularContainer>
      <PopularRecipeBox menuName={"돼지고기김치찌개"} countHeart={10} />
      <PopularRecipeBox />
      <PopularRecipeBox />
    </PopularContainer>
  );
};

const PopularContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.green200};
  width: 900px;
  height: 198px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 80px;
  border-radius: 10px;

  @media screen and (max-width: 1200px) {
    width: 70vw;
    height: 15.4vw;
    gap: 5.5vw;
    border-radius: 0.7vw;
  }
`;

export default PopularRecipe;
