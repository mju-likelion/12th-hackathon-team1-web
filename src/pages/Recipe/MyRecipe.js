import React, { useEffect, useState } from "react";
import styled from "styled-components";
import RecipeBox from "../../components/RecipeBox";
import Plus from "../../assets/images/plus.svg";
import Sidebar from "../../components/Sidebar";
import RecipeModal from "../../components/RecipeModal";
import CreateModal from "../../components/CreateModal";
import { Axios } from "../../api/Axios";

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
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentRecipeId, setCurrentRecipeId] = useState(null);
  const [recipeData, setRecipeData] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await Axios.get("/users/me/recipes", {
          params: { page: 0, size: 10, type: "newest" },
        });
        if (response.data && response.data.data) {
          setRecipeData(response.data.data.recipeList);
        } else {
          console.error("응답 데이터 형식이 올바르지 않습니다.");
        }
      } catch (error) {
        console.error("레시피 데이터를 가져오는 데 실패했습니다.", error);
      }
    };

    fetchRecipes();
  }, []);

  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };

  const openRecipeModal = (recipeId) => {
    if (!isEditing) {
      setCurrentRecipeId(
        recipeData.find((recipeData) => recipeData.recipeId === recipeId)
      );
      setShowRecipeModal(true);
    }
  };

  const openCreateModal = () => {
    setCurrentRecipeId(null);
    setShowCreateModal(true);
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
    setCurrentRecipeId(null);
  };

  const closeRecipeModal = () => {
    setShowRecipeModal(false);
  };

  const removeRecipeBox = (recipeId) => {
    setRecipeData((prevBox) => {
      const newData = prevBox.filter((box) => box.recipeId !== recipeId);
      if (currentRecipeId?.recipeId === recipeId) {
        setCurrentRecipeId(null);
      }
      setShowCreateModal(false);
      return newData;
    });
  };

  const handleSave = (updatedRecipe) => {
    if (updatedRecipe.recipeId) {
      setRecipeData((prevData) =>
        prevData.map((recipeData) =>
          recipeData.recipeId === updatedRecipe.recipeId
            ? updatedRecipe
            : recipeData
        )
      );
    } else {
      setRecipeData((prevData) => [updatedRecipe, ...prevData]);
    }
    setShowCreateModal(false);
  };

  const chunkedData = chunkArray(recipeData || [], 3);

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
                  {chunk.map((recipeData) => (
                    <RecipeBox
                      key={recipeData.recipeId}
                      recipeId={recipeData.recipeId}
                      menuName={recipeData.name}
                      countHeart={recipeData.likeCount}
                      image={recipeData.image}
                      isEditing={isEditing}
                      removeRecipeBox={removeRecipeBox}
                      onClick={openRecipeModal}
                      onSave={handleSave}
                    />
                  ))}
                </Line>
              ))}
            </Wrapper>
          </MyRecipeContainer>
          {isEditing && (
            <PlusButton
              src={Plus}
              alt="레시피 추가 버튼"
              onClick={openCreateModal}
            />
          )}
        </AddWrapper>
        {showRecipeModal && (
          <>
            <Overlay />
            <ModalContent>
              <RecipeModal closeRecipeModal={closeRecipeModal} />
            </ModalContent>
          </>
        )}
        {showCreateModal && (
          <>
            <Overlay />
            <ModalContent>
              <CreateModal
                onSave={handleSave}
                saveCreateModal={closeCreateModal}
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
  z-index: 1050;
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1100;
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
  justify-content: space-between;
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
  min-height: 900px;
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
