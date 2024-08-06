import React, { useEffect, useState } from "react";
import styled from "styled-components";
import RecipeBox from "../../components/RecipeBox";
import Sidebar from "../../components/Sidebar";
import { LikeAtom } from "../../Recoil/Atom";
import { useRecoilValue } from "recoil";

const LikeRecipe = () => {
  const likeRecipes = useRecoilValue(LikeAtom);
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

  return (
    <>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Container>
        <TitleEditContainer>
          {windowWidth > 480 && <BoxTitle>좋아요 누른 레시피</BoxTitle>}
        </TitleEditContainer>
        <MyRecipeContainer>
          <Wrapper>
            {likeRecipes.map((box) => (
              <RecipeBox
                key={box.recipeId}
                recipeLikeId={box.recipeId}
                recipeId={box.recipeId}
                menuName={box.name}
                countHeart={box.likeCount}
                location="좋아요"
              />
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

  @media screen and (max-width: 480px) {
    gap: 10px;
    width: 90vw;
  }
`;

const MyRecipeContainer = styled.div`
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
    padding: 2vw 4.1vw;
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

export default LikeRecipe;
