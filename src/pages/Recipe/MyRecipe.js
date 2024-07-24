import React, { useState } from "react";
import styled from "styled-components";
import RecipeBox from "../../components/RecipeBox";
import Plus from "../../assets/images/plus.svg";
import Sidebar from "../../components/Sidebar";

const MyRecipe = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

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
        <BoxTitle>내 레시피</BoxTitle>
        <EditButton type="submit" onClick={handleEditClick}>
          {isEditing ? "저장" : "편집"}
        </EditButton>
      </TitleEditContainer>
      <AddWrapper>
        <MyRecipeContainer>
          <Line>
            <RecipeBox
              menuName={
                "삐쓰까또레부르쥬미첼라햄페스츄리치즈나쵸스트링스파게티"
              }
              countHeart={5}
              isEditing={isEditing}
              showMenu={showMenu}
              menuPosition={menuPosition}
              handleContextMenu={handleContextMenu}
            />
            <RecipeBox
              isEditing={isEditing}
              showMenu={showMenu}
              menuPosition={menuPosition}
              handleContextMenu={handleContextMenu}
            />
            <RecipeBox
              isEditing={isEditing}
              showMenu={showMenu}
              menuPosition={menuPosition}
              handleContextMenu={handleContextMenu}
            />
          </Line>
          <Line>
            <RecipeBox
              isEditing={isEditing}
              showMenu={showMenu}
              menuPosition={menuPosition}
              handleContextMenu={handleContextMenu}
            />
            <RecipeBox
              isEditing={isEditing}
              showMenu={showMenu}
              menuPosition={menuPosition}
              handleContextMenu={handleContextMenu}
            />
            <RecipeBox
              isEditing={isEditing}
              showMenu={showMenu}
              menuPosition={menuPosition}
              handleContextMenu={handleContextMenu}
            />
          </Line>
        </MyRecipeContainer>
        {isEditing && <PlusButton src={Plus} alt="레시피 추가 버튼" />}
      </AddWrapper>
    </Container>
    </>
  );
};

const SidebarContainer = styled.div`
  position: absolute;
  display: flex;
  position: fixed;
`;

const AddWrapper = styled.div`
  display: flex;
  align-items: end;
`;

const PlusButton = styled.img`
  position: absolute;
  width: 20px;
  height: 20px;
  margin-left: 920px;
  margin-bottom: 5px;

  @media screen and (max-width: 1200px){
    margin-left: 71vw;
  }
`;

const EditButton = styled.button`
  display: flex;
  background-color: ${({ theme }) => theme.colors.green200};
  width: 55px;
  height: 35px;
  border-radius: 5px;
  ${({ theme }) => theme.fonts.default16};
  justify-content: center;
  align-items: center;
  &:hover {
    font-weight: 600;
  }

  @media screen and (max-width: 1200px){
    width: 5vw;
    height: 3vw;
    border-radius: 0.35vw;
    font-size: 1.3vw;
  }
`;

const TitleEditContainer = styled.div`
  display: flex;
  width: 900px;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  padding: 0 3px;

  @media screen and (max-width: 1200px) {
    width: 70vw;
    height: 5vw;
    padding: 0 0.21vw;
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
  border-radius: 1vw;
  padding: 0 30px;

  @media screen and (max-width: 1200px) {
    width: 70vw;
    height: 60vw;
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

  @media screen and (max-width: 1200px){
    font-size: 1.5vw;
  }
`;

export default MyRecipe;
