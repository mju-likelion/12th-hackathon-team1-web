import React from "react";
import styled from "styled-components";
import Heart from "../../assets/images/Heart.svg";
import SmallButton from "../SmallButton";

const RecipeModal = ({ closeModal }) => {
  return (
    <RecipeModalContainer>
      <ModalBackground>
        <TitleBox>
          <MainTitle>돼지고기 김치찌개</MainTitle>
        </TitleBox>
        <ModalContentBox>
          <TopContainer>
            <LeftContainer>
              <ContentContainer>
                <Title>좋아요 수</Title>
                <HeartContainer>
                  <HeartImg src={Heart} alt="좋아요 아이콘" />
                  <CountHeart>5개</CountHeart>
                </HeartContainer>
              </ContentContainer>
              <ContentContainer>
                <Title>재료</Title>
                <IngredientBox></IngredientBox>
              </ContentContainer>
            </LeftContainer>
            <MenuImg />
          </TopContainer>
          <ContentContainer>
            <Title>조리 방법</Title>
            <MethodBox></MethodBox>
          </ContentContainer>
        </ModalContentBox>
        <ButtonContainer>
          <SmallButton text="닫기" onClick={closeModal} />
        </ButtonContainer>
      </ModalBackground>
    </RecipeModalContainer>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const MenuImg = styled.div`
  width: 332px;
  height: 219px;
  margin: 20px;
  background-color: aquamarine;
`;

const LeftContainer = styled.div`
  width: 50%;
`;

const TopContainer = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  justify-content: space-between;
`;

const MethodBox = styled.p`
  ${({ theme }) => theme.fonts.default16}
  background-color: ${({ theme }) => theme.colors.white};
  width: 416px;
  height: 37px;
  border-radius: 10px;
`;

const CountHeart = styled.p`
  ${({ theme }) => theme.fonts.default16};
  margin: 7px;
`;

const HeartContainer = styled.div`
  display: flex;
  align-items: center;
`;

const IngredientBox = styled.p`
  ${({ theme }) => theme.fonts.default16}
  background-color: ${({ theme }) => theme.colors.white};
  width: 80px;
  height: 37px;
  border-radius: 10px;
`;

const Title = styled.p`
  ${({ theme }) => theme.fonts.default18};
  margin: 0 0 10px;

  @media screen and (max-width: 1200px) {
    font-size: 1.5vw;
  }
`;

const HeartImg = styled.img`
  width: 26px;
  height: 26px;
  padding: 2px;
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;

  @media screen and (max-width: 1200px) {
    height: 42vw;
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
    border-radius: 0.52vw;
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

  @media screen and (max-width: 1200px) {
    height: 54.5vw;
  }
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
