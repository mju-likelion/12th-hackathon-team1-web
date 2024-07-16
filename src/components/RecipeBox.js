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

const PhotoWrapper = styled.div`
  height: 9.5vw;
  width: 11.3vw;
  background-color: ${({ theme }) => theme.colors.green200};
  border-radius: 0.52vw;
  margin-top: 1.9vw;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 14vw;
  width: 12.9vw;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0.52vw;
  align-items: center;
`;

const HeartImg = styled.img`
  height: 1.5vw;
  width: 1.5vw;
  margin: 0.52vw;
  margin-right: 1.04vw;
`;

export default RecipeBox;
