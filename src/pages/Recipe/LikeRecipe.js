import React, {useEffect, useState} from "react";
import styled from "styled-components";
import RecipeBox from "../../components/RecipeBox";
import Sidebar from "../../components/Sidebar";
import { LikeAtom } from "../../Recoil/Atom";
import { useRecoilValue } from "recoil";

const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};


const LikeRecipe = () => {
  const likeRecipes = useRecoilValue(LikeAtom);
  const groupedLikes = chunkArray(likeRecipes, 3);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);


console.log("dafad: ", likeRecipes);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

  return (
    <>
      <SidebarContainer>
        <Sidebar/>
      </SidebarContainer>
      <Container>
        <TitleEditContainer>
          {windowWidth > 480 &&<BoxTitle>좋아요 누른 레시피</BoxTitle>}
        </TitleEditContainer>
        <MyRecipeContainer>
          <Wrapper>
            {groupedLikes.map((group, index) => (
              <Line key={index}>
                {group.map((box) => (
                  <RecipeBox
                    key={box.recipeId}
                    recipeLikeId={box.recipeId}
                    recipeId={box.recipeId}
                    menuName={box.name}
                    countHeart={box.likeCount}
                    location="좋아요"
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
  width: auto;
  gap: 45px;
  justify-content: start;
  margin: 20px 0;
  width: 810px;

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

export default LikeRecipe;
