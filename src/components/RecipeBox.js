import React, { useState } from "react";
import styled from "styled-components";
import Heart from "../assets/images/Heart.svg";
import FullHeart from "../assets/images/fullHeart.svg";

const RecipeBox = ({ menuName, countHeart }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handlerHeartClick = () => {
    setIsClicked(!isClicked);
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <Container>
      <MenuName title={menuName}>{truncateText(menuName, 6)}</MenuName>
      <PhotoWrapper />
      <HeartContainer>
        <HeartImg
          onClick={handlerHeartClick}
          src={isClicked ? FullHeart : Heart}
          alt="좋아요 버튼"
        />
        <CountHeart>{countHeart}</CountHeart>
      </HeartContainer>
    </Container>
  );
};

const HeartContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CountHeart = styled.p`
  ${({ theme }) => theme.fonts.default20};
`;

const MenuName = styled.p`
  ${({ theme }) => theme.fonts.default16};
  margin: 0.8vw;
  text-align: center;
  white-space: nowrap;
  max-width: 217px;

  @media screen and (max-width: 1200px) {
    max-width: 11.3vw;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 270px;
  width: 248px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0.52vw;
  align-items: center;
  justify-content: center;
  margin: 10px;

  @media screen and (max-width: 1200px) {
    height: 14vw;
    width: 12.9vw;
    border-radius: 0.52vw;
  }
`;

const PhotoWrapper = styled.div`
  height: 183px;
  width: 217px;
  background-color: ${({ theme }) => theme.colors.green200};
  border-radius: 10px;

  @media screen and (max-width: 1200px) {
    height: 9.5vw;
    width: 11.3vw;
    border-radius: 0.52vw;
  }
`;

const HeartImg = styled.img`
  height: 26px;
  width: 26px;
  margin: 12px 11px;
  cursor: pointer;

  @media screen and (max-width: 1200px) {
    height: 2vw;
    width: 2vw;
    margin: 0.625vw;
  }
`;

export default RecipeBox;
