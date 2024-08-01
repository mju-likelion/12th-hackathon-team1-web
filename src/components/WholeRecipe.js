import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { Axios } from "../api/Axios";
import RecipeBox from "./RecipeBox";
import { LikeAtom } from "../Recoil/Atom";
import { useRecoilValue } from "recoil";

const WholeRecipe = ({ type }) => {
  const likeRecipes = useRecoilValue(LikeAtom);
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecipes = useCallback(async () => {
    if (loading || page >= totalPage) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await Axios.get(`/recipes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: page,
          size: 9, // 한번에 9개의 레시피를 불러옵니다.
          type: type,
        },
      });

      if (response.data && response.data.data) {
        const { recipeList, pagination } = response.data.data;
        setRecipes((prevRecipes) => [...prevRecipes, ...recipeList]);
        setTotalPage(pagination.totalPage);
        setPage(pagination.currentPage + 1); // 다음 페이지를 로드하도록 페이지 증가
      } else {
        throw new Error("응답 데이터 형식이 올바르지 않습니다.");
      }
    } catch (error) {
      console.error("레시피 데이터를 가져오는 데 실패했습니다.", error);
      setError("레시피 데이터를 가져오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }, [page, totalPage, loading, type]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const handleScroll = useCallback(
    (event) => {
      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
      if (scrollHeight - scrollTop === clientHeight && !loading) {
        fetchRecipes();
      }
    },
    [fetchRecipes, loading]
  );

  useEffect(() => {
    const container = document.getElementById("recipe-container");
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, [handleScroll]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <WholeContainer id="recipe-container">
      <RecipeContainer>
        {recipes.map((recipe) => (
          <RecipeBox
            key={recipe.recipeId}
            recipeId={recipe.recipeId}
            name={recipe.name}
            likeCount={recipe.likeCount}
            recipeLikeId={likeRecipes}
          />
        ))}
      </RecipeContainer>
      {loading && <LoadingSpinner>Loading...</LoadingSpinner>}
    </WholeContainer>
  );
};

const RecipeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  @media screen and (max-width: 1200px) {
    width: 70vw;
  }
`;

const WholeContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.green200};
  width: 900px;
  height: 600px;
  overflow-y: scroll;
  align-items: start;
  border-radius: 1vw;
  &::-webkit-scrollbar-button {
    display: none;
  }
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #ccc;
  }

  @media screen and (max-width: 1200px) {
    width: 70vw;
    height: 45vw;
  }
`;

const LoadingSpinner = styled.div`
  width: 100%;
  text-align: center;
  padding: 10px;
  color: ${({ theme }) => theme.colors.primary};
`;

export default WholeRecipe;
