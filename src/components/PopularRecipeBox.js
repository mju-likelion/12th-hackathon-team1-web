import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Axios } from "../api/Axios";
import Heart from "../assets/images/Heart.svg";
import FullHeart from "../assets/images/fullHeart.svg";
import RecipeModal from "./RecipeModal";

const PopularRecipeBox = ({ recipeId, recipeLikeId, countHeart }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recipeData, setRecipeData] = useState(null);
  const [likeId, setLikeId] = useState([]);
  const [likeCount, setLikeCount] = useState(countHeart);

  useEffect(() => {
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
  }, [recipeId, recipeLikeId]);

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const response = await Axios.get(`/recipes/${recipeId}`);
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
  }, [recipeId]);

  const onClickHeart = async (e) => {
    e.stopPropagation();

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
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!recipeData) {
    return <div>Loading...</div>;
  }

  const imageUrl = recipeData.image ? recipeData.image.url : "";

  return (
    <>
      <PopularContainer onClick={handleOpenModal}>
        <BackgroundImage style={{ backgroundImage: `url(${imageUrl})` }} />
        <Container>
          <MenuName>{recipeData.name}</MenuName>
          <HeartContainer>
            <HeartImg
              onClick={onClickHeart}
              src={likeId === recipeId ? FullHeart : Heart}
              alt="좋아요 버튼"
            />
            <CountHeart>{likeCount}</CountHeart>
          </HeartContainer>
        </Container>
      </PopularContainer>
      {isModalOpen && (
        <>
          <Overlay />
          <ModalContainer>
            <RecipeModal
              recipeId={recipeId}
              closeRecipeModal={handleCloseModal}
            />
          </ModalContainer>
        </>
      )}
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
`;

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

const CountHeart = styled.p`
  ${({ theme }) => theme.fonts.default20};
  margin-left: 5px;

  @media screen and (max-width: 1200px) {
    margin-left: 0.35vw;
    font-size: 1.3vw;
  }

  @media screen and (max-width: 480px) {
    font-size: 3vw;
  }
`;

const HeartImg = styled.img`
  height: 26px;
  width: 26px;
  cursor: pointer;

  @media screen and (max-width: 1200px) {
    height: 2vw;
    width: 2vw;
  }

  @media screen and (max-width: 480px) {
    height: 5vw;
    width: 5vw;
  }
`;

const MenuName = styled.p`
  ${({ theme }) => theme.fonts.default16};
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 120px;
  margin: 10px 0 20px;
  text-align: center;

  @media screen and (max-width: 1200px) {
    height: 4.3vw;
    width: 9vw;
    margin: 0.7vw 0 1.4vw;
    font-size: 1.2vw;
  }

  @media screen and (max-width: 480px) {
    font-size: 2.5vw;
    width: 19vw;
  }
`;

const HeartContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PopularContainer = styled.div`
  display: flex;
  width: 140px;
  height: 170px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  position: relative;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
  @media screen and (max-width: 1200px) {
    width: 11.3vw;
    height: 13.8vw;
    border-radius: 0.7vw;
  }

  @media screen and (max-width: 480px) {
    width: 22.2vw;
    height: 27.7vw;
    border-radius: 2vw;
  }
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-size: cover;
  background-position: center;
  opacity: 0.4;
  z-index: 999;

  @media screen and (max-width: 1200px) {
    border-radius: 0.7vw;
  }

  @media screen and (max-width: 480px) {
    border-radius: 2vw;
  }
`;

export default PopularRecipeBox;
