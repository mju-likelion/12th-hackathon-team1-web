import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Heart from "../assets/images/Heart.svg";
import FullHeart from "../assets/images/fullHeart.svg";
import Delete from "../assets/images/delateIcon.svg";
import Dropdown from "./DropDown";
import RecipeModal from "./RecipeModal";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { LikeAtom } from "../Recoil/Atom";

const RecipeBox = ({
  menuName,
  countHeart,
  isEditing,
  showMenu,
  menuPosition,
  removeRecipeBox,
  id,
  state,
  onClick,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [maxLength, setMaxLength] = useState(12);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countHeartNumber, setCountHeartNumber] = useState(countHeart);
  const setLike = useSetRecoilState(LikeAtom);
  const Like = useRecoilValue(LikeAtom);

  useEffect(() => {
    const isLiked = Like.some((like) => like.id === id);
    setIsClicked(isLiked);
  }, [Like, id]);

  const handlerHeartClick = (e) => {
    e.stopPropagation();
    setIsClicked(!isClicked);
    if (!isClicked) {
      setCountHeartNumber((preCount) => preCount + 1);
      pushLike();
    } else {
      setCountHeartNumber((preCount) => preCount - 1);
      removeLike();
    }
  };

  const pushLike = () => {
    setLike((prevLike) => [
      ...prevLike,
      { id, menuName, countHeart: countHeartNumber + 1 },
    ]);
  };

  const removeLike = () => {
    setLike((prevLike) => prevLike.filter((like) => like.id !== id));
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm("레시피를 정말 삭제하시겠습니까?")) {
      removeRecipeBox(id);
      console.log("레시피 삭제됨");
      alert("레시피가 삭제되었습니다.");
      setIsModalOpen(false); // 삭제 후 모달을 닫습니다.
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
    <Container onClick={onClick}>
      <HeadContainer>
        <MenuName>{truncateText(menuName, maxLength)}</MenuName>
        <div>
          {isEditing && (
            <DeleteIcon src={Delete} alt="삭제 아이콘" onClick={handleDelete} />
          )}
        </div>
      </HeadContainer>
      <PhotoWrapper />
      <HeartContainer>
        {state === "좋아요" || isClicked ? (
          <HeartImg
            onClick={handlerHeartClick}
            src={FullHeart}
            alt="좋아요 버튼"
          />
        ) : (
          <HeartImg onClick={handlerHeartClick} src={Heart} alt="좋아요 버튼" />
        )}
        <Count>{countHeartNumber}</Count>
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
  z-index: 1200;
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
