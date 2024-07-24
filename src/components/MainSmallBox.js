import React from "react";
import styled from "styled-components";
import arrow from '../assets/images/next.svg';
import PopularRecipeBox from './PopularRecipeBox';

const MainSmallBox = () => {
  return (
    <>
      <SmallBox>
        <BigBox>
          <RecipeBoxWrapper>
            <PopularRecipeBox />
            <PopularRecipeBox />
            <PopularRecipeBox />
          </RecipeBoxWrapper>
        </BigBox>
          <Img src={arrow} alt="화살표"/>
      </SmallBox>
    </>
  );
  
};

const SmallBox = styled.div`
  width: 555px;
  height: 220px;
  background-color: ${({ theme }) => theme.colors.green200};
  border-radius: 10px;
  display: flex;
  align-items: center;

  @media screen and (max-width: 1200px){
    width: 38.5vw;
    height: 16vw;
    border-radius: 1vw;
  }
`;

const BigBox = styled.div`
  width: 100%;
  height: 220px;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 1200px){
    height: 15.3vw;
  }
`;

const RecipeBoxWrapper = styled.div`
  width: 500px;
  height: 220px;
  display: flex;
  gap: 35px;
  align-items: center;

  @media screen and (max-width: 1200px){
    width: 34.7vw;
    height: 15.3vw;
    gap: 2.43vw;
  }

`;

const Img = styled.img`
  width: 30px;
  height: 30px;
  position: absolute;
  margin-left: 523px;

  @media screen and (max-width: 1200px){
    margin-left: 36.3vw;
    width: 2.08vw;
    height: 2.08vw;
  }
`;

export default MainSmallBox;
