import React from "react";
import styled from "styled-components";
import Heart from "../assets/images/Heart.svg";
import SmallButton from "./SmallButton";
import { recipeData } from "../data/MockData";

const RecipeModal = ({ closeRecipeModal }) => {
  // 임시 로직
  const selectedRecipe = recipeData[0];

  return (
    <RecipeModalContainer>
      <ModalBackground>
        <TitleBox>
          <MainTitle>{selectedRecipe.menuName}</MainTitle>
        </TitleBox>
        <ModalContentBox>
          <TopContainer>
            <LeftContainer>
              <ContentContainer>
                <Title>좋아요 수</Title>
                <HeartContainer>
                  <HeartImg src={Heart} alt="좋아요 아이콘" />
                  <CountHeart>{selectedRecipe.countHeart}개</CountHeart>
                </HeartContainer>
              </ContentContainer>
              <ContentContainer>
                <Title>재료</Title>
                <IngredientContainer>
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <IngredientBox key={index}>{ingredient}</IngredientBox>
                  ))}
                </IngredientContainer>
              </ContentContainer>
            </LeftContainer>
            <MenuImg />
          </TopContainer>
          <ContentContainer>
            <Title>조리 방법</Title>
            {selectedRecipe.methods.map((method, index) => (
              <MethodBox key={index}>{method}</MethodBox>
            ))}
          </ContentContainer>
        </ModalContentBox>
        <ButtonContainer>
          <SmallButton text="닫기" onClick={closeRecipeModal} />
        </ButtonContainer>
      </ModalBackground>
    </RecipeModalContainer>
  );
};

const IngredientContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const MenuImg = styled.div`
  width: 332px;
  height: 219px;
  margin: 20px;
  background-color: ${({ theme }) => theme.colors.white};

  @media screen and (max-width: 1200px){
    width: 23vw;
    height: 15.2vw;
    margin: 1.4vw;
  }
`;

const LeftContainer = styled.div`
  width: 60%;
`;

const TopContainer = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 1200px){
    height: 17.36vw;
  }
`;

const MethodBox = styled.p`
  display: flex;
  ${({ theme }) => theme.fonts.default16}
  background-color: ${({ theme }) => theme.colors.white};
  width: 500px;
  height: 37px;
  border-radius: 10px;
  border: none;
  align-items: center;
  margin: 5px;
  padding: 0 10px;

  @media screen and (max-width: 1200px){
    width: 35vw;
    height: 2.56vw;
    font-size: 1.1vw;
    margin: 0.35vw;
    padding: 0 0.7vw;
    border-radius: 0.7vw;
  }
`;

const CountHeart = styled.p`
  ${({ theme }) => theme.fonts.default16};
  margin: 7px;

  @media screen and (max-width: 1200px){
    margin: 0.5vw;
    font-size: 1.3vw;
  }
`;

const HeartContainer = styled.div`
  display: flex;
  align-items: center;
`;

const IngredientBox = styled.p`
  display: flex;
  ${({ theme }) => theme.fonts.default16}
  background-color: ${({ theme }) => theme.colors.white};
  width: 100px;
  height: 37px;
  border-radius: 10px;
  align-items: center;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 1200px){
    width: 7vw;
    height: 2.56vw;
    border-radius: 0.7vw;
    margin: 0.35vw;
    padding-top: 0 0.7vw;
    font-size: 1vw;
  }
`;

const Title = styled.p`
  ${({ theme }) => theme.fonts.default18};
  margin: 0 0 10px;

  @media screen and (max-width: 1200px) {
    font-size: 1.3vw;
    margin: 0 0 0.7vw;
  }
`;

const HeartImg = styled.img`
  width: 26px;
  height: 26px;
  padding: 2px;

  @media screen and (max-width: 1200px){
    width: 1.8vw;
    height: 1.8vw;
    padding: 0.14vw;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;

  @media screen and (max-width: 1200px) {
    padding: 1.4vw;
  }
`;

const ModalContentBox = styled.div`
  background-color: ${({ theme }) => theme.colors.green100};
  width: 725px;
  height: 630px;
  border-radius: 10px;
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  justify-content: start;

  @media screen and (max-width: 1200px) {
    width: 50vw;
    height: 45vw;
    border-radius: 0.7vw;
    margin-bottom: 1.5vw;
  }
`;

const TitleBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  margin-bottom: 25px;

  @media screen and (max-width: 1200px) {
    margin-bottom: 1.5vw;
  }
`;

const MainTitle = styled.p`
  ${({ theme }) => theme.fonts.title40}

  @media screen and (max-width: 1200px) {
    font-size: 3vw;
  }
`;

const ModalBackground = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-between;
`;

const RecipeModalContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.green200};
  width: 800px;
  height: 850px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  z-index: 1001;

  @media screen and (max-width: 1200px) {
    width: 57.3vw;
    height: 60vw;
    border-radius: 1vw;
  }
`;

export default RecipeModal;
