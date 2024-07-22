import React, { useState } from "react";
import styled from "styled-components";
import Heart from "../assets/images/Heart.svg";
import FullHeart from "../assets/images/fullHeart.svg";

const PopularRecipeBox = ({ menuName, countHeart }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handlerHeartClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <PopularContainer>
      <MenuName>{menuName}</MenuName>
      <HeartContainer>
        <HeartImg
          onClick={handlerHeartClick}
          src={isClicked ? FullHeart : Heart}
          alt="좋아요 버튼"
        />
        <CountHeart>{countHeart}</CountHeart>
      </HeartContainer>
    </PopularContainer>
  );
};

const CountHeart = styled.p`
  ${({ theme }) => theme.fonts.default20};
  margin: 5px;
`;

const HeartImg = styled.img`
  height: 26px;
  width: 26px;
  cursor: pointer;

  @media screen and (max-width: 1200px) {
    height: 2vw;
    width: 2vw;
  }
`;

const MenuName = styled.p`
  ${({ theme }) => theme.fonts.default16};
  max-width: 3.125vw;
  margin: 10px 0 20px;
  text-align: center;

  @media screen and (max-width: 1200px) {
    max-width: 7vw;
  }
`;

const HeartContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PopularContainer = styled.div`
  display: flex;
  width: 140px;
  height: 170px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 1200px) {
    width: 10.5vw;
    height: 13.8vw;
    border-radius: 1vw;
  }
`;

export default PopularRecipeBox;
