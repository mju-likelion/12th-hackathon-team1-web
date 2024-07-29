import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Axios } from "../api/Axios";
import Heart from "../assets/images/Heart.svg";
import SmallButton from "./SmallButton";

const RecipeModal = ({ recipeId, closeRecipeModal }) => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!recipeId) {
      setLoading(false);
      setError("유효하지 않은 레시피 ID입니다.");
      return;
    }
    const fetchRecipe = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await Axios.get(`/recipes/${recipeId}`);
        if (response.data && response.data.data) {
          setRecipe(response.data.data);
        } else {
          throw new Error("응답 데이터 형식이 올바르지 않습니다.");
        }
      } catch (error) {
        console.error("레시피를 불러오는 데 실패했습니다.", error);
        setError("레시피를 불러오는 데 실패했습니다.");
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  if (loading) return <LoadingMessage>로딩 중...</LoadingMessage>;

  if (error) {
    return (
      <ErrorContainer>
        <ErrorMessage>{error}</ErrorMessage>
        <SmallButton text="닫기" onClick={closeRecipeModal} />
      </ErrorContainer>
    );
  }

  if (!recipe) {
    return (
      <ErrorContainer>
        <ErrorMessage>레시피 정보를 불러올 수 없습니다.</ErrorMessage>
        <SmallButton text="닫기" onClick={closeRecipeModal} />
      </ErrorContainer>
    );
  }

  const imageUrl = recipe?.image?.url || "";

  const cookingSteps = recipe?.cookingStep
    ? recipe.cookingStep.split(".").filter((step) => step.trim() !== "")
    : ["조리 방법 정보 없음"];

  return (
    <RecipeModalContainer>
      <ModalBackground>
        <TitleBox>
          <MainTitle>{recipe.name}</MainTitle>
        </TitleBox>
        <ModalContentBox>
          <TopContainer>
            <LeftContainer>
              <ContentContainer>
                <Title>좋아요 수</Title>
                <HeartContainer>
                  <HeartImg src={Heart} alt="좋아요 아이콘" />
                  <CountHeart>{recipe.likeCount || 0}개</CountHeart>
                </HeartContainer>
              </ContentContainer>
              <ContentContainer>
                <Title>재료</Title>
                <IngredientContainer>
                  {recipe.ingredientRecipes &&
                  recipe.ingredientRecipes.length > 0 ? (
                    recipe.ingredientRecipes.map((item) => (
                      <IngredientBox key={item.id}>
                        {item.ingredient.name}
                      </IngredientBox>
                    ))
                  ) : (
                    <IngredientBox>재료 정보 없음</IngredientBox>
                  )}
                </IngredientContainer>
              </ContentContainer>
            </LeftContainer>
            <MenuImg style={{ backgroundImage: `url(${imageUrl})` }} />
          </TopContainer>
          <ContentContainer>
            <Title>조리 방법</Title>
            <MethodContainer>
              {cookingSteps.map((step, index) => (
                <MethodItem key={index}>{step.trim()}.</MethodItem>
              ))}
            </MethodContainer>
          </ContentContainer>
        </ModalContentBox>
        <ButtonContainer>
          <SmallButton text="닫기" onClick={closeRecipeModal} />
        </ButtonContainer>
      </ModalBackground>
    </RecipeModalContainer>
  );
};

const LoadingMessage = styled.p`
  text-align: center;
  margin-top: 20px;
`;

const MethodContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MethodItem = styled.p`
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

  @media screen and (max-width: 1200px) {
    width: 35vw;
    height: 2.56vw;
    font-size: 1.1vw;
    margin: 0.35vw;
    padding: 0 0.7vw;
    border-radius: 0.7vw;
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const ErrorMessage = styled.p`
  ${({ theme }) => theme.fonts.default18};
  color: red;
  margin-bottom: 20px;
`;

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

  @media screen and (max-width: 1200px) {
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

  @media screen and (max-width: 1200px) {
    height: 17.36vw;
  }
`;

const CountHeart = styled.p`
  ${({ theme }) => theme.fonts.default16};
  margin: 7px;

  @media screen and (max-width: 1200px) {
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

  @media screen and (max-width: 1200px) {
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

  @media screen and (max-width: 1200px) {
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
