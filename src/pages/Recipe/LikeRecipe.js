import React, { useEffect, useState } from "react";
import styled from "styled-components";
import RecipeBox from "../../components/RecipeBox";
import Sidebar from "../../components/Sidebar";
import { Axios } from "../../api/Axios";

const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

const LikeRecipe = () => {
  const [likeRecipes, setLikeRecipes] = useState([]);

  useEffect(() => {
    const fetchLikeRecipes = async () => {
      try {
        const response = await Axios.get("/auth/likes");
        if (response.data.data.recipeList) {
          setLikeRecipes(response.data.data.recipeList);
        } else {
          throw new Error("응답 데이터 형식이 올바르지 않습니다.");
        }
      } catch (error) {
        console.error("좋아요 레시피를 가져오는 데 실패했습니다.", error);
      }
    };

    fetchLikeRecipes();
  }, []);

  const groupedLikes = chunkArray(likeRecipes, 3);

  return (
    <>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Container>
        <TitleEditContainer>
          <BoxTitle>좋아요 누른 레시피</BoxTitle>
        </TitleEditContainer>
        <MyRecipeContainer>
          <Wrapper>
            {groupedLikes.map((group, index) => (
              <Line key={index}>
                {group.map((box) => (
                  <RecipeBox
                    key={box.recipeId}
                    recipeId={box.recipeId}
                    menuName={box.name}
                    countHeart={box.likeCount}
                    isClicked={true}
                  />
                ))}
              </Line>
            ))}
          </Wrapper>
        </MyRecipeContainer>
      </Container>
    </>
  );
};

const SidebarContainer = styled.div`
  position: absolute;
  display: flex;
  position: fixed;
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
  width: 830px;
  justify-content: space-between;

  @media screen and (max-width: 1200px) {
    width: 64vw;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MyRecipeContainer = styled.div`
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

export default LikeRecipe;
