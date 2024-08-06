import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Axios } from "../api/Axios";
import PopularRecipeBox from "./PopularRecipeBox";
import Next from "../assets/images/next.svg";
import { LikeAtom } from "../Recoil/Atom";
import { useRecoilValue } from "recoil";
import { useLocation } from "react-router-dom";

const PopularRecipe = () => {
  const location = useLocation();
  const likeRecipes = useRecoilValue(LikeAtom);
  const [recipeData, setRecipeData] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [error, setError] = useState(null);

  const query = new URLSearchParams(location.search);
  const keyword = query.get("keyword") || "";

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await Axios.get(`/recipes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: page,
            size: 3,
            type: "popularity",
            keyword: keyword,
          },
        });

        if (response.data && response.data.data) {
          const { recipeList, pagination } = response.data.data;
          setRecipeData(recipeList);
          setTotalPage(pagination.totalPage);
          setPage(pagination.currentPage);
        } else {
          throw new Error("응답 데이터 형식이 올바르지 않습니다.");
        }
      } catch (error) {
        console.error("레시피 데이터를 가져오는 데 실패했습니다.", error);
        setError("레시피 데이터를 가져오는 데 실패했습니다.");
      }
    };

    fetchRecipeData();
  }, [page, keyword]);

  useEffect(() => {
    setRecipeData([]);
    setPage(0);
  }, [keyword]);

  const handleNextPage = () => {
    if (page < totalPage - 1) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <PopularContainer>
      <PrevButton onClick={handlePrevPage} disabled={page === 0}>
        <img
          src={Next}
          alt="이전 버튼"
          style={{ transform: "rotate(180deg)" }}
        />
      </PrevButton>
      {recipeData.map((recipe) => (
        <PopularRecipeBox
          key={recipe.recipeId}
          recipeId={recipe.recipeId}
          recipeLikeId={likeRecipes}
          countHeart={recipe.likeCount}
        />
      ))}
      <NextButton onClick={handleNextPage} disabled={page >= totalPage - 1}>
        <img src={Next} alt="다음 버튼" />
      </NextButton>
    </PopularContainer>
  );
};

const PrevButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  &:disabled {
    cursor: not-allowed;
  }
`;

const NextButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const PopularContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.green200};
  width: 900px;
  height: 198px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 80px;
  border-radius: 10px;
  z-index: 999;

  @media screen and (max-width: 1200px) {
    width: 70vw;
    height: 15.4vw;
    gap: 5.5vw;
    border-radius: 0.7vw;
  }
`;

export default PopularRecipe;
