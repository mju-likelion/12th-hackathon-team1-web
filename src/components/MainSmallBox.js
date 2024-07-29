import React, { useState, useEffect } from "react";
import styled from "styled-components";
import arrow from "../assets/images/next.svg";
import PopularRecipeBox from "./PopularRecipeBox";
import { Axios } from "../api/Axios";

const MainSmallBox = ({ isLoggedIn, type }) => {
  const [recipeData, setRecipeData] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);

  const match = 3;

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const token = localStorage.getItem("token");
        let response;

        if (type === "my-refrigerator") {
          response = await Axios.get("/recipes/recommendations", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              page: page,
              size: 3,
              type: "type",
              match: match,
            },
          });
        } else {
          response = await Axios.get("/recipes", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              page: page,
              size: 3,
              type: "popularity",
              keyword: "",
            },
          });
        }

        if (response.data && response.data.data) {
          const { recipeList, pagination } = response.data.data;
          setRecipeData(recipeList);
          setTotalPage(pagination.totalPage);
        } else {
          throw new Error("응답 데이터 형식이 올바르지 않습니다.");
        }
      } catch (error) {
        console.error("레시피 데이터를 가져오는 데 실패했습니다.", error);
      }
    };

    fetchRecipeData();
  }, [page, type]);

  const handleNextPage = () => {
    if (page < totalPage - 1) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <SmallBox>
      <ArrowButton onClick={handlePreviousPage} disabled={page === 0}>
        <Img src={arrow} alt="이전" style={{ transform: "rotate(180deg)" }} />
      </ArrowButton>
      <RecipeBoxWrapper>
        {isLoggedIn ? (
          recipeData.map((recipe) => (
            <PopularRecipeBox
              key={recipe.recipeId}
              recipeId={recipe.recipeId}
            />
          ))
        ) : (
          <LoginPrompt>
            나만의 좋아요 레시피를 추가해주세요! (로그인 후 이용가능합니다.)
          </LoginPrompt>
        )}
      </RecipeBoxWrapper>
      <ArrowButton onClick={handleNextPage} disabled={page >= totalPage - 1}>
        <Img src={arrow} alt="다음" />
      </ArrowButton>
    </SmallBox>
  );
};

const SmallBox = styled.div`
  width: 555px;
  height: 220px;
  background-color: ${({ theme }) => theme.colors.green200};
  border-radius: 10px;
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  padding: 0 10px;

  @media screen and (max-width: 1200px) {
    width: 38.5vw;
    height: 16vw;
    border-radius: 1vw;
  }
`;

const RecipeBoxWrapper = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  width: 100%;

  @media screen and (max-width: 1200px) {
    gap: 1vw;
  }
`;

const ArrowButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const Img = styled.img`
  width: 30px;
  height: 30px;

  @media screen and (max-width: 1200px) {
    width: 2.08vw;
    height: 2.08vw;
  }
`;

const LoginPrompt = styled.div`
  font-size: ${({ theme }) => theme.fonts.default18};
  color: ${({ theme }) => theme.colors.mainPageBox1};
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 1200px) {
    font-size: 1.3vw;
  }
`;

export default MainSmallBox;
