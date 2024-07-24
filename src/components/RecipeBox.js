import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Heart from "../assets/images/Heart.svg";
import FullHeart from "../assets/images/fullHeart.svg";
import Delete from "../assets/images/delateIcon.svg";

const RecipeBox = ({ menuName, isEditing, countHeart, onClick }) => {
  const [maxLength, setMaxLength] = useState(12);
  const [isHearted, setIsHearted] = useState(false);

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

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

  return (
    <Container onClick={onClick}>
      <HeadContainer>
        <MenuName title={menuName}>
          {truncateText(menuName, maxLength)}
        </MenuName>
        {isEditing && <DeleteIcon src={Delete} alt="삭제 아이콘" />}
      </HeadContainer>
      <PhotoWrapper />
      <HeartContainer>
        <HeartImg
          onClick={() => setIsHearted(!isHearted)}
          src={isHearted ? FullHeart : Heart}
          alt="좋아요 버튼"
        />
        <CountHeart>{countHeart}</CountHeart>
      </HeartContainer>
    </Container>
  );
};

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
  height: 30px;
  margin-left: auto;
  right: -15px;
  top: -3px;
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

const CountHeart = styled.p`
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
  margin: 15px;

  @media screen and (max-width: 1200px) {
    height: 20vw;
    width: 17.8vw;
    border-radius: 0.7vw;
    margin: 1vw;
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
