import React from "react";
import styled from "styled-components";
import PopularRecipeBox from "../PopularRecipeBox";
import Heart from "../../assets/images/Heart.svg";

const PopularRecipe = () => {
  return (
    <PopularContainer>
      <PopularRecipeBox>
        <MenuName>돼지고기김치찌개</MenuName>
        <HeartImg src={Heart} alt="좋아요 버튼" />
        <CountHeart></CountHeart>
      </PopularRecipeBox>
      <PopularRecipeBox />
      <PopularRecipeBox />
    </PopularContainer>
  );
};

const HeartImg = styled.img`
  width: 21.43vw;
`;

const MenuName = styled.p`
  font-size: ${({ theme }) => theme.fonts.default16};
`;

const CountHeart = styled.p``;

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
