import React, { useState } from "react";
import styled from "styled-components";
import RecipeBox from "../../components/RecipeBox";
import Plus from "../../assets/images/plus.svg";
import Sidebar from "../../components/Sidebar";
import RecipeModal from "../../components/RecipeModal";
import EditModal from "../../components/EditModal";

const MyRecipe = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const openRecipeModal = () => {
    if (isEditing) {
      setShowEditModal(true);
    } else {
      setShowRecipeModal(true);
    }
  };

  const closeRecipeModal = () => {
    setShowRecipeModal(false);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const recipeData = [
    { menuName: "스파게티", countHeart: 5 },
    { menuName: "짜장면", countHeart: 3 },
    { menuName: "김치찌개", countHeart: 8 },
    { menuName: "된장찌개", countHeart: 4 },
    { menuName: "불고기", countHeart: 7 },
    { menuName: "갈비찜", countHeart: 6 },
    { menuName: "비빔밥", countHeart: 9 },
    { menuName: "삼겹살", countHeart: 10 },
    { menuName: "순두부찌개", countHeart: 2 },
    { menuName: "잡채", countHeart: 6 },
    { menuName: "해물파전", countHeart: 7 },
    { menuName: "떡볶이", countHeart: 8 },
    { menuName: "라면", countHeart: 5 },
    { menuName: "김밥", countHeart: 4 },
    { menuName: "오징어볶음", countHeart: 5 },
    { menuName: "부대찌개", countHeart: 7 },
    { menuName: "갈비탕", countHeart: 6 },
    { menuName: "된장국", countHeart: 4 },
    { menuName: "양념치킨", countHeart: 9 },
    { menuName: "치즈돈까스", countHeart: 6 },
    { menuName: "연어초밥", countHeart: 8 },
    { menuName: "콩나물국밥", countHeart: 5 },
  ];

  return (
    <>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Container>
        <TitleEditContainer>
          <BoxTitle>내 레시피</BoxTitle>
          <EditButton type="submit" onClick={handleEditClick}>
            {isEditing ? "저장" : "편집"}
          </EditButton>
        </TitleEditContainer>
        <AddWrapper>
          <MyRecipeContainer>
            <RecipeContainer>
              {recipeData.map((recipe, index) => (
                <RecipeBox
                  key={index}
                  menuName={recipe.menuName}
                  countHeart={recipe.countHeart}
                  isEditing={isEditing}
                  onClick={openRecipeModal}
                />
              ))}
            </RecipeContainer>
          </MyRecipeContainer>
          {isEditing && <PlusButton src={Plus} alt="레시피 추가 버튼" />}
        </AddWrapper>
        {showRecipeModal && (
          <>
            <Overlay />
            <ModalContent>
              <RecipeModal closeRecipeModal={closeRecipeModal} />
            </ModalContent>
          </>
        )}
        {showEditModal && (
          <>
            <Overlay />
            <ModalContent>
              <EditModal saveEditModal={closeEditModal} />
            </ModalContent>
          </>
        )}
      </Container>
    </>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
`;

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
  cursor: pointer;

  @media screen and (max-width: 1200px) {
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

  @media screen and (max-width: 1200px) {
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

const RecipeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const MyRecipeContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.green200};
  width: 900px;
  height: 814px;
  justify-content: center;
  align-items: center;
  border-radius: 1vw;
  padding: 0 30px;
  overflow-y: auto;

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

  @media screen and (max-width: 1200px) {
    font-size: 1.5vw;
  }
`;

export default MyRecipe;
