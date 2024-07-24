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
    <Container onClick={handleClickOutside}>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <MyContainer>
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
      </MyContainer>
    </Container>
  );
};

const MyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const SidebarContainer = styled.div`
  position: absolute;
  display: flex;

  @media screen and (max-width: 1200px) {
  }
`;

const AddWrapper = styled.div`
  display: flex;
  align-items: end;
`;

const PlusButton = styled.img`
  width: 18px;
  height: 18px;
  margin: 5px;
`;

const EditButton = styled.button`
  display: flex;
  background-color: ${({ theme }) => theme.colors.green200};
  width: 45px;
  height: 30px;
  border-radius: 5px;
  ${({ theme }) => theme.fonts.default16};
  justify-content: center;
  align-items: center;
  &:hover {
    font-weight: 600;
  }
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
  flex-direction: column;
`;

const BoxTitle = styled.p`
  ${({ theme }) => theme.fonts.default18};
  margin: 10px 0;
`;

export default MyRecipe;
