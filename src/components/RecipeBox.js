import React from "react";
import styled from "styled-components";
import Heart from "../assets/images/Heart.svg";

const RecipeBox = () => {
  return (
    <Container>
      <PhotoWrapper />
      <HeartImg src={Heart} alt="좋아요 개수" />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 270px;
  width: 248px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0.52vw;
  align-items: center;

  @media screen and (max-width: 1200px){
    height: 14vw;
    width: 12.9vw;
    border-radius: 0.52vw;
  }
`;

const PhotoWrapper = styled.div`
  height: 184px;
  width: 218px;
  background-color: ${({ theme }) => theme.colors.green200};
  border-radius: 10px;
  margin-top: 34px;

  @media screen and (max-width:1200px){
    height: 9.5vw;
    width: 11.3vw;
    border-radius: 0.52vw;
    margin-top: 1.9vw;
  }
`;

const HeartImg = styled.img`
  margin-top: 10px;

  @media screen and (max-width: 1200px){
    height: 1.5vw;
    width: 1.5vw;
    margin-top: 0.52vw;
  }
`;

export default RecipeBox;
