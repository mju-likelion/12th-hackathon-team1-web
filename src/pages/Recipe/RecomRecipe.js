import React, { useState } from "react";
import styled from "styled-components";
import RecipeBox from "../../components/RecipeBox";

const RecomRecipe = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (e) => {
    e.preventDefault();
    setMenuPosition({ x: e.clientX, y: e.clientY });
    setShowMenu(true);
  };

  const handleClickOutside = () => {
    setShowMenu(false);
  };

  return (
    <Container onClick={handleClickOutside}>
      <TitleEditContainer>
        <BoxTitle>나의 냉장고 레시피</BoxTitle>
      </TitleEditContainer>
      <AddWrapper>
        <MyRecipeContainer>
          <Line>
            <RecipeBox
              menuName={
                "냉장고"
              }
              countHeart={5}
              showMenu={showMenu}
              menuPosition={menuPosition}
              handleContextMenu={handleContextMenu}
            />
            <RecipeBox
              showMenu={showMenu}
              menuPosition={menuPosition}
              handleContextMenu={handleContextMenu}
            />
            <RecipeBox
              showMenu={showMenu}
              menuPosition={menuPosition}
              handleContextMenu={handleContextMenu}
            />
          </Line>
          <Line>
            <RecipeBox
              showMenu={showMenu}
              menuPosition={menuPosition}
              handleContextMenu={handleContextMenu}
            />
            <RecipeBox
              showMenu={showMenu}
              menuPosition={menuPosition}
              handleContextMenu={handleContextMenu}
            />
            <RecipeBox
              showMenu={showMenu}
              menuPosition={menuPosition}
              handleContextMenu={handleContextMenu}
            />
          </Line>
        </MyRecipeContainer>
      </AddWrapper>
    </Container>
  );
};

const AddWrapper = styled.div`
  display: flex;
  align-items: end;
`;

const TitleEditContainer = styled.div`
  display: flex;
  width: 900px;
  min-width: 630px;
  justify-content: space-between;
  align-items: center;
  padding: 0 3px;
  margin-top: 10px;

  @media screen and (max-width: 1200px) {
    width: 46.875vw;
  }
`;

const Line = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MyRecipeContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.green200};
  width: 900px;
  min-width: 630px;
  height: 814px;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 1vw;
  margin-bottom: 3px;
  padding: 0 30px;

  @media screen and (max-width: 1200px) {
    width: 46.875vw;
  }
`;

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const BoxTitle = styled.p`
  ${({ theme }) => theme.fonts.default18};
  margin: 10px 0;
`;

export default RecomRecipe;
