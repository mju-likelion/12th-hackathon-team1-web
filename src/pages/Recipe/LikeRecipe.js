import React, { useState } from "react";
import styled from "styled-components";
import RecipeBox from "../../components/RecipeBox";
import Sidebar from "../../components/Sidebar";

const LikeRecipe = () => {
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
    <>
    <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Container onClick={handleClickOutside}>
      <TitleEditContainer>
        <BoxTitle>좋아요 누른 레시피</BoxTitle>
      </TitleEditContainer>
        <MyRecipeContainer>
          <Line>
            <RecipeBox
              menuName={"좋아요 레시피"}
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
  justify-content: space-between;
`;

const MyRecipeContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.green200};
  width: 900px;
  height: 814px;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 10px;
  padding: 0 30px;

  @media screen and (max-width: 1200px) {
    width: 70vw;
    height: 60vw;
    border-radius: 0.7vw;
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

  @media screen and (max-width: 1200px){
    font-size: 1.5vw;
    height: 5vw;
  }
`;

export default LikeRecipe;
