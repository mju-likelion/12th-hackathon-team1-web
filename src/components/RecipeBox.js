import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Heart from "../assets/images/Heart.svg";
import FullHeart from "../assets/images/fullHeart.svg";
import Delete from "../assets/images/delateIcon.svg";
import Dropdown from "./DropDown";
import RecipeModal from "./RecipeModal";

const RecipeBox = ({
  menuName,
  countHeart,
  isEditing,
  showMenu,
  menuPosition,
  handleContextMenu,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [maxLength, setMaxLength] = useState(12);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlerHeartClick = () => {
    setIsClicked(!isClicked);
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const handleDelete = () => {
    if (window.confirm("레시피를 정말 삭제하시겠습니까?")) {
      console.log("레시피 삭제됨");
      // 레시피 삭제 로직 추가 예정
      alert("레시피가 삭제되었습니다.");
    }
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
    <Container onContextMenu={handleContextMenu}>
      <HeadContainer>
        <MenuName title={menuName}>
          {truncateText(menuName, maxLength)}
        </MenuName>
        {isEditing && <DeleteIcon src={Delete} alt="삭제 아이콘" />}
      </HeadContainer>
      <PhotoWrapper />
      <HeartContainer>
        <HeartImg
          onClick={handlerHeartClick}
          src={isClicked ? FullHeart : Heart}
          alt="좋아요 버튼"
        />
        <CountHeart>{countHeart}</CountHeart>
      </HeartContainer>
      {showMenu && (
        <Dropdown
          position={menuPosition}
          onOptionSelect={(option) => {
            if (option === "edit") handleEdit();
            if (option === "delete") handleDelete();
          }}
        />
      )}
      {isModalOpen && (
        <>
          <Overlay />
          <ModalContainer>
            <RecipeModal closeModal={handleCloseModal} />
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
  align-items: start;
`;

const DeleteIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-left: auto;
  right: -15px;
  top: -3px;
  cursor: pointer;
`;

const HeartContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CountHeart = styled.p`
  ${({ theme }) => theme.fonts.default20};
`;

const MenuName = styled.p`
  ${({ theme }) => theme.fonts.default16};
  margin: 0.8vw;
  text-align: center;
  white-space: nowrap;
  max-width: 217px;

  @media screen and (max-width: 1200px) {
    max-width: 11.3vw;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 270px;
  width: 248px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0.52vw;
  align-items: center;
  justify-content: center;
  margin: 10px;

  @media screen and (max-width: 1200px) {
    height: 14vw;
    width: 12.9vw;
    border-radius: 0.52vw;
  }
`;

const PhotoWrapper = styled.div`
  height: 183px;
  width: 217px;
  background-color: ${({ theme }) => theme.colors.green200};
  border-radius: 10px;

  @media screen and (max-width: 1200px) {
    height: 9.5vw;
    width: 11.3vw;
    border-radius: 0.52vw;
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
