import React, { useState } from "react";
import styled from "styled-components";
import RecipeBox from "../../components/RecipeBox";
import Plus from "../../assets/images/plus.svg";
import Sidebar from "../../components/Sidebar";
import RecipeModal from "../../components/RecipeModal";
import EditModal from "../../components/EditModal";
import { LikeAtom } from "../../Recoil/Atom";
import { useRecoilValue, useSetRecoilState } from "recoil";

const chunkArray = (array, size) => {
  const chunked = [];
  for (let i = 0; i < array.length; i += size) {
    chunked.push(array.slice(i, i + size));
  }
  return chunked;
};

const MyRecipe = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentRecipeId, setCurrentRecipeId] = useState(null);
  const [recipeData, setRecipeData] = useState([
    { id: 1, menuName: "스파게티", countHeart: 5 },
    { id: 2, menuName: "짜장면", countHeart: 3 },
    { id: 3, menuName: "김치찌개", countHeart: 8 },
    { id: 4, menuName: "된장찌개", countHeart: 4 },
    { id: 5, menuName: "불고기", countHeart: 7 },
    { id: 6, menuName: "갈비찜", countHeart: 6 },
    { id: 7, menuName: "비빔밥", countHeart: 9 },
    { id: 8, menuName: "삼겹살", countHeart: 10 },
    { id: 9, menuName: "순두부찌개", countHeart: 2 },
    { id: 10, menuName: "잡채", countHeart: 6 },
    { id: 11, menuName: "해물파전", countHeart: 7 },
    { id: 12, menuName: "떡볶이", countHeart: 8 },
    { id: 13, menuName: "라면", countHeart: 5 },
    { id: 14, menuName: "김밥", countHeart: 4 },
    { id: 15, menuName: "오징어볶음", countHeart: 5 },
    { id: 16, menuName: "부대찌개", countHeart: 7 },
    { id: 17, menuName: "갈비탕", countHeart: 6 },
    { id: 18, menuName: "된장국", countHeart: 4 },
    { id: 19, menuName: "양념치킨", countHeart: 9 },
    { id: 20, menuName: "치즈돈까스", countHeart: 6 },
    { id: 21, menuName: "연어초밥", countHeart: 8 },
    { id: 22, menuName: "콩나물국밥", countHeart: 5 },
  ]);

  const Like = useRecoilValue(LikeAtom);
  const setLike = useSetRecoilState(LikeAtom);

  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };

  // const handleContextMenu = (e) => {
  //   e.preventDefault();
  //   setMenuPosition({ x: e.clientX, y: e.clientY });
  //   setShowMenu(true);
  // };

  // const handleClickOutside = () => {
  //   setShowMenu(false);
  // };
  const openRecipeModal = (id) => {
    setCurrentRecipeId(id);
    if (isEditing) {
      setShowEditModal(true);
    } else {
      setShowRecipeModal(true);
    }
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setCurrentRecipeId(null);
  };

  const closeRecipeModal = () => {
    setShowRecipeModal(false);
  };

  const removeRecipeBox = (id) => {
    setRecipeData((prevBox) => {
      const newData = prevBox.filter((box) => box.id !== id);
      if (currentRecipeId === id) {
        setCurrentRecipeId(null);
      }
      setShowEditModal(false);
      return newData;
    });
  };

  const handleSave = (updatedRecipe) => {
    setRecipeData((prevData) =>
      prevData.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      )
    );
    closeEditModal();
  };

  const chunkedData = chunkArray(recipeData, 3);

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
            <Wrapper>
              {chunkedData.map((chunk, index) => (
                <Line key={index}>
                  {chunk.map((data) => (
                    <RecipeBox
                      key={data.id}
                      Like={Like}
                      setLike={setLike}
                      menuName={data.menuName}
                      id={data.id}
                      countHeart={data.countHeart}
                      isEditing={isEditing}
                      removeRecipeBox={removeRecipeBox}
                      onClick={() => openRecipeModal(data.id)}
                    />
                  ))}
                </Line>
              ))}
            </Wrapper>
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
        {showEditModal && currentRecipeId !== null && (
          <>
            <Overlay />
            <ModalContent>
              <EditModal
                recipeId={currentRecipeId}
                onSave={handleSave}
                saveEditModal={closeEditModal}
              />
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

  @media screen and (max-width: 1200px) {
    margin-left: 71vw;
    width: 2vw;
    height: 2vw;
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

const Line = styled.div`
  display: flex;
  width: 830px;
  justify-content: start;
  gap: 10px;

  @media screen and (max-width: 1200px) {
    width: 64vw;
    gap: 2.3vw;
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
  max-height: 900px;
  height: 100%;
  overflow-y: auto;
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

  @media screen and (max-width: 1200px) {
    font-size: 1.5vw;
  }
`;

export default MyRecipe;
