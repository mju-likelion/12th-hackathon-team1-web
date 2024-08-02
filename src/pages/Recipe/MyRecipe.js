import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import RecipeBox from "../../components/RecipeBox";
import Plus from "../../assets/images/plus.svg";
import Sidebar from "../../components/Sidebar";
import RecipeModal from "../../components/RecipeModal";
import EditModal from "../../components/EditModal";
import CreateModal from "../../components/CreateModal";
import { Axios } from "../../api/Axios";
import { LikeAtom } from "../../Recoil/Atom";
import { useRecoilValue } from "recoil";

const MyRecipe = () => {
  const likeRecipes = useRecoilValue(LikeAtom);
  const [isEditing, setIsEditing] = useState(false);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentRecipeId, setCurrentRecipeId] = useState(null);
  const [recipeData, setRecipeData] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (loading || !hasMore) return;

      setLoading(true);
      try {
        const response = await Axios.get("/users/me/recipes", {
          params: { page, size: 12, type: "newest" },
        });
        if (response.data && response.data.data) {
          const newRecipes = response.data.data.recipeList;
          setRecipeData((prevData) => [...prevData, ...newRecipes]);
          setHasMore(newRecipes.length === 12);
          setPage((prevPage) => prevPage + 1);
        } else {
          console.error("응답 데이터 형식이 올바르지 않습니다.");
          setHasMore(false);
        }
      } catch (error) {
        console.error("레시피 데이터를 가져오는 데 실패했습니다.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [page, loading, hasMore]);

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

  const openEditModal = (recipeId) => {
    setCurrentRecipeId(recipeId);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
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
    setShowEditModal(false);
  };

  const handleScroll = useCallback(() => {
    const container = document.getElementById("recipe-container");
    if (
      container.scrollTop + container.clientHeight >=
      container.scrollHeight - 5
    ) {
      if (!loading && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, [loading, hasMore]);

  useEffect(() => {
    const container = document.getElementById("recipe-container");
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

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
          <MyRecipeContainer id="recipe-container">
            {recipeData.map((recipeData) => (
              <div>
                <RecipeBox
                  key={recipeData.recipeId}
                  recipeId={recipeData.recipeId}
                  menuName={recipeData.name}
                  countHeart={recipeData.likeCount}
                  image={recipeData.image}
                  isEditing={isEditing}
                  removeRecipeBox={removeRecipeBox}
                  onClick={openRecipeModal}
                  onEdit={openEditModal}
                  onSave={handleSave}
                  recipeLikeId={likeRecipes}
                />
              </div>
            ))}
            {loading && <LoadingSpinner>Loading...</LoadingSpinner>}
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
        {showEditModal && (
          <>
            <Overlay />
            <ModalContent>
              <EditModal
                recipeId={currentRecipeId}
                onSave={handleSave}
                closeEditModal={closeEditModal}
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

const MyRecipeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: ${({ theme }) => theme.colors.green200};
  width: 900px;
  height: 850px;
  padding: 20px 0;
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
`;

const LoadingSpinner = styled.div`
  width: 100%;
  text-align: center;
  margin: 20px 0;
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
