import React from "react";
import styled from "styled-components";
import Heart from "../assets/images/Heart.svg";

const RecipeBox = ({ menuName, countHeart }) => {
  return (
    <Container>
      <MenuName>{menuName}</MenuName>
      <PhotoWrapper />
      <HeartContainer>
        <HeartImg src={Heart} alt="좋아요 버튼" />
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
  font-size: ${({ theme }) => theme.fonts.default20};
  margin: 1px;
`;

const MenuName = styled.p`
  font-size: ${({ theme }) => theme.fonts.default16};
  margin: 0.5vw;
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
    margin-top: 1.9vw;
  }
`;

const HeartImg = styled.img`
  height: 26px;
  width: 26px;
  margin: 12px 11px;

  @media screen and (max-width: 1200px) {
    height: 1.5vw;
    width: 1.5vw;
    margin-top: 0.52vw;
  }
`;

export default RecipeBox;
