import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Axios } from "../api/Axios";
import Heart from "../assets/images/Heart.svg";
import FullHeart from "../assets/images/fullHeart.svg";
import Delete from "../assets/images/delateIcon.svg";
import RecipeModal from "./RecipeModal";

const RecipeBox = ({
  recipeId,
  menuName,
  countHeart,
  isClicked: initialClicked,
  isEditing,
  removeRecipeBox,
  onClick,
}) => {
  const [isClicked, setIsClicked] = useState(initialClicked);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recipeData, setRecipeData] = useState(null);
  const [maxLength, setMaxLength] = useState(12);

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const response = await Axios.get(`/recipes/${recipeId}`);
        if (response.data && response.data.data) {
          setRecipeData(response.data.data);
        } else {
          throw new Error("응답 데이터 형식이 올바르지 않습니다.");
        }
      } catch (error) {
        console.error("레시피 데이터를 가져오는 데 실패했습니다.", error);
      }
    };

    fetchRecipeData();
  }, [recipeId]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1200) {
        setMaxLength(6);
      } else {
        setMaxLength(12);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleHeartClick = (e) => {
    e.stopPropagation();
    setIsClicked((prev) => !prev);
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm("레시피를 정말 삭제하시겠습니까?")) {
      try {
        await Axios.delete(`/recipes/${recipeId}`);
        removeRecipeBox(recipeId);
        alert("레시피가 삭제되었습니다.");
      } catch (error) {
        console.error("Error deleting recipe:", error);
        alert("레시피 삭제에 실패했습니다.");
      } finally {
        setIsModalOpen(false);
      }
    }
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const recipeImage = recipeData?.image?.url || "";
  const recipeName = recipeData?.name || menuName;
  const recipeLikeCount = recipeData?.likeCount || 0;

  return (
    <Container onClick={isEditing ? handleEdit : handleOpenModal}>
      <HeadContainer>
        <MenuName>{truncateText(recipeName, maxLength)}</MenuName>
        {isEditing && (
          <DeleteIcon src={Delete} alt="삭제 아이콘" onClick={handleDelete} />
        )}
      </HeadContainer>
      <PhotoWrapper
        onClick={handleOpenModal}
        style={{ backgroundImage: `url(${recipeImage})` }}
      />
      <HeartContainer>
        <HeartImg
          onClick={handleHeartClick}
          src={isClicked ? FullHeart : Heart}
          alt="좋아요 버튼"
        />
        <Count>{recipeLikeCount}</Count>
      </HeartContainer>
      {isModalOpen && (
        <>
          <Overlay />
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <RecipeModal
              recipeId={recipeId}
              closeRecipeModal={handleCloseModal}
              recipe={recipeData}
            />
          </ModalContainer>
        </>
      )}
    </Container>
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

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
`;

const HeadContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 230px;
  height: 35px;

  @media screen and (max-width: 1200px) {
    width: 17vw;
    height: 2vw;
    margin-bottom: 0.4vw;
    font-size: 1.3vw;
  }
`;

const DeleteIcon = styled.img`
  width: 30px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10;
  height: 30px;
  margin-left: auto;
  right: -15px;
  top: -3px;
  z-index: 1000;
  cursor: pointer;

  @media screen and (max-width: 1200px) {
    width: 2.5vw;
    height: 2.5vw;
  }
`;

const HeartContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Count = styled.p`
  ${({ theme }) => theme.fonts.default20};
`;

const MenuName = styled.p`
  width: 160px;
  margin-left: 33px;
  ${({ theme }) => theme.fonts.default16};
  text-align: center;
  white-space: nowrap;

  @media screen and (max-width: 1200px) {
    font-size: 1.5vw;
    width: 11.3vw;
    margin-left: 2.8vw;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 270px;
  width: 240px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 10px 0;

  @media screen and (max-width: 1200px) {
    height: 20vw;
    width: 17.8vw;
    border-radius: 0.7vw;
    margin: 0.8vw;
  }
`;

const PhotoWrapper = styled.div`
  height: 183px;
  width: 210px;
  background-color: ${({ theme }) => theme.colors.green200};
  border-radius: 10px;

  @media screen and (max-width: 1200px) {
    height: 12.8vw;
    width: 15.5vw;
    border-radius: 0.7vw;
  }
`;

const HeartImg = styled.img`
  height: 26px;
  width: 26px;
  margin: 12px 11px;
  cursor: pointer;

  @media screen and (max-width: 1200px) {
    height: 2vw;
    width: 2vw;
    margin: 0.625vw;
  }
`;

export default RecipeBox;
