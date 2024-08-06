import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Axios } from "../api/Axios";
import Heart from "../assets/images/Heart.svg";
import FullHeart from "../assets/images/fullHeart.svg";
import Delete from "../assets/images/delateIcon.svg";
import RecipeModal from "./RecipeModal";
import EditModal from "./EditModal";

const RecipeBox = ({
  recipeId,
  recipeLikeId,
  menuName,
  countHeart,
  isEditing,
  removeRecipeBox,
  location,
}) => {
  const [likeId, setLikeId] = useState([]);
  const page = true;

  useEffect(() => {
    if (location === "좋아요") {
      setLikeId(recipeId);
    } else {
      const findLikeId = () => {
        for (let i = 0; i < recipeLikeId.length; i++) {
          if (recipeLikeId[i].recipeId === recipeId) {
            setLikeId(recipeLikeId[i].recipeId);
            return;
          }
        }
        setLikeId(null);
      };

      findLikeId();
    }
  }, [recipeId, recipeLikeId, location]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recipeData, setRecipeData] = useState(null);
  const [maxLength, setMaxLength] = useState(12);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [likeCount, setLikeCount] = useState(countHeart);

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const response = await Axios.get(
          `/recipes/${recipeId || recipeLikeId}`
        );
        if (response.data && response.data.data) {
          setRecipeData(response.data.data);
          setLikeCount(response.data.data.likeCount || 0);
        } else {
          throw new Error("응답 데이터 형식이 올바르지 않습니다.");
        }
      } catch (error) {
        console.error("레시피 데이터를 가져오는 데 실패했습니다.", error);
      }
    };

    fetchRecipeData();
  }, [recipeId, recipeLikeId]);

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

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSave = (updatedRecipe) => {
    setRecipeData(updatedRecipe);
    setIsEditModalOpen(false);
  };

  const onClickHeart = async (e) => {
    e.stopPropagation();

    if (location === "좋아요") {
      try {
        await Axios.delete(`/recipes/${recipeId}/likes`);
        setLikeId(null);
        setLikeCount((prevCount) => prevCount - 1);
        window.location.href = `/auth/likes`;
      } catch (error) {
        console.error("좋아요 취소 에러:", error);
      }
    } else {
      if (likeId !== recipeId) {
        try {
          await Axios.post(`/recipes/${recipeId}/likes`);
          setLikeId(recipeId);
          setLikeCount((prevCount) => prevCount + 1);
        } catch (error) {
          console.error("좋아요 클릭 에러:", error);
        }
      } else {
        try {
          await Axios.delete(`/recipes/${recipeId}/likes`);
          setLikeId(null);
          setLikeCount((prevCount) => prevCount - 1);
        } catch (error) {
          console.error("좋아요 취소 에러:", error);
        }
      }
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        await Axios.delete(`/recipes/${recipeId}`, {
          params: { recipe_id: recipeId },
        });
        removeRecipeBox(recipeId);
        alert("레시피가 삭제되었습니다.");
      } catch (error) {
        console.error("레시피 삭제 에러:", error);
        alert("레시피 삭제에 실패했습니다.");
      }
    }
  };

  if (!recipeData) {
    return <div>Loading...</div>;
  }

  const recipeImage = recipeData?.image?.url || "";
  const recipeName = recipeData?.name || menuName;

  return (
    <Container onClick={isEditing ? openEditModal : openModal}>
      <HeadContainer>
        <MenuName>{truncateText(recipeName, maxLength)}</MenuName>
        {isEditing && (
          <DeleteIcon src={Delete} alt="삭제 아이콘" onClick={handleDelete} />
        )}
      </HeadContainer>
      <PhotoWrapper style={{ backgroundImage: `url(${recipeImage})` }} />
      <HeartContainer>
        {page === false ? (
          <HeartImg onClick={onClickHeart} src={Heart} alt="좋아요 버튼" />
        ) : (
          <HeartImg
            onClick={onClickHeart}
            src={likeId === recipeId ? FullHeart : Heart}
            alt="좋아요 버튼"
          />
        )}
        <Count>{likeCount}</Count>
      </HeartContainer>
      {isModalOpen && (
        <>
          <Overlay />
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <RecipeModal
              menuName={menuName}
              recipeId={recipeId}
              closeRecipeModal={closeModal}
            />
          </ModalContainer>
        </>
      )}
      {isEditModalOpen && (
        <>
          <Overlay />
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <EditModal
              recipeId={recipeId}
              onSave={handleSave}
              closeEditModal={closeEditModal}
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
  }

  @media screen and (max-width: 480px) {
    width: 33vw;
    height: 4vw;
    margin-bottom: 1vw;
    justify-content: center;
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
  z-index: 900;
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

  @media screen and (max-width: 480px) {
    font-size: 1.5vw;
    margin-bottom: 0.5vw;
  }
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

  @media screen and (max-width: 480px) {
    font-size: 3vw;
    width: 30vw;
    margin-left: 0;
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

  @media screen and (max-width: 1200px) {
    height: 20vw;
    width: 17.8vw;
    border-radius: 0.7vw;
  }

  @media screen and (max-width: 480px) {
    width: 38.88vw;
    height: 40vw;
    border-radius: 2vw;
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

  @media screen and (max-width: 480px) {
    height: 27.77vw;
    width: 30vw;
    border-radius: 2vw;
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

  @media screen and (max-width: 480px) {
    height: 3vw;
    width: 3vw;
    margin: 1vw;
  }
`;

export default RecipeBox;
