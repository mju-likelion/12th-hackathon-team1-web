import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import nextIcon from "../assets/images/next.svg";
import { Axios } from "../api/Axios";
import RecipeBox from "./RecipeBox";
import { LikeAtom } from "../Recoil/Atom";
import { useRecoilValue } from "recoil";

const WholeRecipe = ({ type }) => {
  const location = useLocation();
  const likeRecipes = useRecoilValue(LikeAtom);
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const query = new URLSearchParams(location.search);
  const keyword = query.get("keyword") || "";

  const fetchRecipes = useCallback(
    async (pageToFetch) => {
      setLoading(true);

      try {
        const token = localStorage.getItem("token");
        const response = await Axios.get(`/recipes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: pageToFetch,
            size: 12,
            type: type,
            keyword: keyword,
          },
        });

        if (response.data && response.data.data) {
          const { recipeList } = response.data.data;
          setRecipes((prevRecipes) => {
            const existingRecipeIds = new Set(
              prevRecipes.map((recipe) => recipe.recipeId)
            );
            const newRecipes = recipeList.filter(
              (recipe) => !existingRecipeIds.has(recipe.recipeId)
            );
            return [...prevRecipes, ...newRecipes];
          });
          setPage(pageToFetch);
        } else {
          throw new Error("응답 데이터 형식이 올바르지 않습니다.");
        }
      } catch (error) {
        if (error.response && error.response.data.errorCode === "4046") {
          setHasMore(false);
        } else {
          console.error("레시피 데이터를 가져오는 데 실패했습니다.", error);
          setError("레시피 데이터를 가져오는 데 실패했습니다.");
        }
      } finally {
        setLoading(false);
      }
    },
    [type, keyword]
  );

  useEffect(() => {
    setRecipes([]);
    setPage(0);
    setHasMore(true);
    fetchRecipes(0);
  }, [type, keyword, fetchRecipes]);

  const loadMoreRecipes = () => {
    if (!loading && hasMore) {
      fetchRecipes(page + 1);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <WholeContainer>
      <WholeRecipeContainer>
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
        {!loading && hasMore && (
          <LoadMoreButton onClick={loadMoreRecipes}>
            <img src={nextIcon} alt="Load more" />
          </LoadMoreButton>
        )}
      </WholeRecipeContainer>
    </WholeContainer>
  );
};

const WholeRecipeContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: start;
  padding: 20px;
  flex-direction: column;
`;

const RecipeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  gap: 50px;
  width: 820px;
  margin-bottom: 20px;

  @media screen and (max-width: 1200px) {
    width: auto;
    width: 61.4vw;
    gap: 4vw;
    margin-bottom: 0.7vw;
  }

  @media screen and (max-width: 480px) {
    width: 84vw;
    row-gap: 4vw;
    column-gap: 4vw;
    margin: 2vw 0;
  }
`;

const WholeContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.green200};
  width: 900px;
  height: 600px;
  overflow-y: auto;
  align-items: center;
  justify-content: center;
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
    height: 43vw;
  }

  @media screen and (max-width: 480px) {
    width: 90vw;
    height: 145.8vw;
    border-radius: 2vw;
  }
`;

const LoadingSpinner = styled.div`
  width: 100%;
  text-align: center;
  padding: 10px;
  color: ${({ theme }) => theme.colors.primary};
`;

const LoadMoreButton = styled.button`
  margin-top: 20px;
  background: none;
  border: none;
  cursor: pointer;

  img {
    width: 30px;
    height: 30px;
    transform: rotate(90deg);
  }

  &:hover {
    opacity: 0.8;
  }

  @media screen and (max-width: 480px) {
    width: 85vw;
  }
`;

export default WholeRecipe;
