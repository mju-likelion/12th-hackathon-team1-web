import React, { useEffect, useState } from "react";
import styled from "styled-components";
import RecipeBox from "../../components/RecipeBox";
import Sidebar from "../../components/Sidebar";
import { Axios } from "../../api/Axios";
import { LikeAtom } from "../../Recoil/Atom";
import { useRecoilValue } from "recoil";

const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

const RecipeRecommend = () => {
  const likeRecipes = useRecoilValue(LikeAtom)
  const [recipes, setRecipes] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
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

  const groupedRecipes = chunkArray(recipes, 3);

  return (
    <>
      <SidebarContainer>
        <Sidebar/>
      </SidebarContainer>
      <Container>
        <TitleEditContainer>
          {windowWidth > 480 &&<BoxTitle>나의 냉장고 레시피</BoxTitle>}
        </TitleEditContainer>
        <RecommendContainer>
          <Wrapper>
            {groupedRecipes.map((group, index) => (
              <Line key={index}>
                {group.map((recipe) => (
                  <RecipeBox
                    key={recipe.recipeId}
                    recipeId={recipe.recipeId}
                    menuName={recipe.name}
                    countHeart={recipe.likeCount}
                    recipeLikeId={likeRecipes}
                  />
                ))}
              </Line>
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

  @media screen and (max-width: 480px){
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

const Line = styled.div`
  display: flex;
  width: 810px;
  justify-content: start;
  gap: 45px;
  margin: 20px 0;

  @media screen and (max-width: 1200px) {
    width: 62.4vw;
    gap: 4.5vw;
    margin: 1.4vw 0;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RecommendContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.green200};
  width: 900px;
  min-height: 900px;
  height: auto;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 1vw;

  @media screen and (max-width: 1200px) {
    width: 70vw;
    min-height: 70vw;
  }

  @media screen and (max-width: 480px) {
    width: 90vw;
    height: 145.8vw;
    border-radius: 2vw;
    margin-top: 5vw;
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
