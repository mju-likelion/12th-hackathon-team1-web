import React from "react";
import styled from "styled-components";
import PopularRecipeBox from "./PopularRecipeBox";

const PopularRecipe = () => {
  // 임시 레시피 데이터
  const recipeData = [
    { menuName: "삼겹살", countHeart: 10 },
    { menuName: "피자", countHeart: 10 },
    { menuName: "삼계탕", countHeart: 9 },
  ];
  return (
    <PopularContainer>
      {recipeData.map((recipe, index) => (
        <PopularRecipeBox
          key={index}
          menuName={recipe.menuName}
          countHeart={recipe.countHeart}
        />
      ))}
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
