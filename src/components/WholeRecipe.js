import React, { useState } from "react";
import styled from "styled-components";
import RecipeBox from "./RecipeBox";
import RecipeModal from "./RecipeModal";

const WholeRecipe = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 임시 레시피 데이터
  const recipeData = [
    { menuName: "스파게티", countHeart: 5 },
    { menuName: "짜장면", countHeart: 3 },
    { menuName: "김치찌개", countHeart: 8 },
    { menuName: "된장찌개", countHeart: 4 },
    { menuName: "불고기", countHeart: 7 },
    { menuName: "갈비찜", countHeart: 6 },
    { menuName: "비빔밥", countHeart: 9 },
    { menuName: "삼겹살", countHeart: 10 },
    { menuName: "순두부찌개", countHeart: 2 },
    { menuName: "잡채", countHeart: 6 },
    { menuName: "해물파전", countHeart: 7 },
    { menuName: "떡볶이", countHeart: 8 },
    { menuName: "라면", countHeart: 5 },
    { menuName: "김밥", countHeart: 4 },
    { menuName: "오징어볶음", countHeart: 5 },
    { menuName: "부대찌개", countHeart: 7 },
    { menuName: "크림파스타", countHeart: 7 },
    { menuName: "파인애플볶음밥", countHeart: 6 },
    { menuName: "피자", countHeart: 10 },
    { menuName: "치킨너겟", countHeart: 5 },
    { menuName: "케밥", countHeart: 8 },
    { menuName: "초밥", countHeart: 7 },
    { menuName: "삼계탕", countHeart: 9 },
    { menuName: "홍합탕", countHeart: 6 },
    { menuName: "쌀국수", countHeart: 8 },
    { menuName: "떡국", countHeart: 4 },
    { menuName: "된장찌개", countHeart: 6 },
    { menuName: "고추장찌개", countHeart: 5 },
  ];

  return (
    <WholeContainer>
      <RecipeContainer>
        {recipeData.map((recipe, index) => (
          <RecipeBox
            key={index}
            menuName={recipe.menuName}
            countHeart={recipe.countHeart}
            onClick={openModal}
          />
        ))}
        {isModalOpen && (
          <>
            <Overlay />
            <ModalContainer>
              <RecipeModal closeRecipeModal={closeModal} />
            </ModalContainer>
          </>
        )}
      </RecipeContainer>
    </WholeContainer>
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

const RecipeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const WholeContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.green200};
  width: 900px;
  height: 600px;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 1vw;
  margin-bottom: 3px;
  padding: 0 30px;
  overflow-y: auto;

  @media screen and (max-width: 1200px) {
    width: 70vw;
    height: 45vw;
  }
`;

export default WholeRecipe;
