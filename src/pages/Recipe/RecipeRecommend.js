import React, { useEffect, useState } from "react";
import styled from "styled-components";
import RecipeBox from "../../components/RecipeBox";
import Sidebar from "../../components/Sidebar";
import { Axios } from "../../api/Axios";
import { LikeAtom } from "../../Recoil/Atom";
import { useRecoilValue } from "recoil";

const RecipeRecommend = () => {
  const likeRecipes = useRecoilValue(LikeAtom);
  const [recipes, setRecipes] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await Axios.get("/recipes/recommendations", {
          params: {
            page: 0,
            size: 10,
            type: "newest",
            match: 2,
          },
        });

        if (response.data.data.recipeList) {
          setRecipes(response.data.data.recipeList);
        } else {
          throw new Error("응답 데이터 형식이 올바르지 않습니다.");
        }
      } catch (error) {
        console.error("추천 레시피를 가져오는 데 실패했습니다.", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Container>
        <TitleEditContainer>
          {windowWidth > 480 && <BoxTitle>나의 냉장고 레시피</BoxTitle>}
        </TitleEditContainer>
        <RecommendContainer>
          <Wrapper>
            {recipes.map((recipe) => (
              <RecipeBox
                key={recipe.recipeId}
                recipeId={recipe.recipeId}
                menuName={recipe.name}
                countHeart={recipe.likeCount}
                recipeLikeId={likeRecipes}
              />
            ))}
          </Wrapper>
        </RecommendContainer>
      </Container>
    </>
  );
};

const SidebarContainer = styled.div`
  position: absolute;
  display: flex;
  position: fixed;
  width: 20vw;
  height: 15vw;
  justify-content: end;
  align-items: end;

  @media screen and (max-width: 1200px) {
    width: 14vw;
    height: 20vw;
  }

  @media screen and (max-width: 480px) {
    width: 90vw;
    height: 13vw;
    position: static;
    margin-top: 3vw;
    margin-bottom: 1vw;
  }
`;

const TitleEditContainer = styled.div`
  display: flex;
  width: 900px;
  justify-content: space-between;
  align-items: center;
  padding: 0 3px;

  @media screen and (max-width: 1200px) {
    width: 70vw;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
  gap: 50px;
  width: 820px;
  margin-bottom: 10px;
`;

const RecommendContainer = styled.div`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  background-color: ${({ theme }) => theme.colors.green200};
  width: 900px;
  height: 850px;
  padding: 20px;
  justify-content: center;
  overflow-y: scroll;
  align-items: start;
  border-radius: 1vw;
  gap: 45px;
  &::-webkit-scrollbar-button {
    display: none;
  }
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #ccc;
  }

  @media screen and (max-width: 1200px) {
    width: 70vw;
    min-height: 70vw;
  }

  @media screen and (max-width: 480px) {
    width: 90vw;
    height: 145.8vw;
    border-radius: 2vw;
  }
`;

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

const BoxTitle = styled.p`
  ${({ theme }) => theme.fonts.default18};
  display: flex;
  align-items: center;
  height: 50px;

  @media screen and (max-width: 1200px) {
    font-size: 1.5vw;
    height: 5vw;
  }
`;

export default RecipeRecommend;
