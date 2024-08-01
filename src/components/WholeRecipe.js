import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Axios } from "../api/Axios";
import RecipeBox from "./RecipeBox";
import Next from "../assets/images/next.svg";
import { LikeAtom } from "../Recoil/Atom";
import { useRecoilValue } from "recoil";

const WholeRecipe = ({ type }) => {
  const likeRecipes = useRecoilValue(LikeAtom);
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await Axios.get(`/recipes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: page,
            size: 6,
            type: type,
          },
        });

        if (response.data && response.data.data) {
          const { recipeList, pagination } = response.data.data;
          setRecipes(recipeList);
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

    fetchRecipes();
  }, [page, type]);

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
    <WholeContainer>
      <PrevButton onClick={handlePrevPage} disabled={page === 0}>
        <img src={Next} alt="이전 버튼" />
      </PrevButton>
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
      <NextButton onClick={handleNextPage} disabled={page >= totalPage - 1}>
        <img src={Next} alt="다음 버튼" />
      </NextButton>
    </WholeContainer>
  );
};

const PrevButton = styled.button`
  transform: rotate(180deg);
  background: none;
  border: none;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const NextButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const RecipeContainer = styled.div`
  display: flex;
  width: 830px;
  flex-wrap: wrap;
  justify-content: space-between;

  @media screen and (max-width: 1200px) {
    width: 70vw;
  }
`;

const WholeContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.green200};
  width: 900px;
  height: 600px;
  align-items: center;
  border-radius: 1vw;

  @media screen and (max-width: 1200px) {
    width: 70vw;
    height: 45vw;
  }
`;

export default WholeRecipe;
