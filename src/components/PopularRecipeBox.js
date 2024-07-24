import React, { useState } from "react";
import styled from "styled-components";
import Heart from "../assets/images/Heart.svg";
import FullHeart from "../assets/images/fullHeart.svg";
import RecipeModal from "./RecipeModal";

const PopularRecipeBox = ({ menuName, countHeart }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlerHeartClick = () => {
    setIsClicked(!isClicked);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <PopularContainer onClick={handleOpenModal}>
        <MenuName>{menuName}</MenuName>
        <HeartContainer>
          <HeartImg
            onClick={handlerHeartClick}
            src={isClicked ? FullHeart : Heart}
            alt="좋아요 버튼"
          />
          <CountHeart>{countHeart}</CountHeart>
        </HeartContainer>
      </PopularContainer>
      {isModalOpen && (
        <>
          <Overlay />
          <ModalContainer>
            <RecipeModal closeRecipeModal={handleCloseModal} />
          </ModalContainer>
        </>
      )}
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
`;

const HeartImg = styled.img`
  height: 26px;
  width: 26px;
  cursor: pointer;

  @media screen and (max-width: 1200px) {
    height: 2vw;
    width: 2vw;
  }
`;

const MenuName = styled.p`
  ${({ theme }) => theme.fonts.default16};
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
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 1200px) {
    width: 11.3vw;
    height: 13.8vw;
    border-radius: 0.7vw;
  }
`;

export default PopularRecipeBox;
