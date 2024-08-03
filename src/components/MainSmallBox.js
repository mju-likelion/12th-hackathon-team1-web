import React, { useState, useEffect } from "react";
import styled from "styled-components";
import arrow from "../assets/images/next.svg";
import PopularRecipeBox from "./PopularRecipeBox";
import { Axios } from "../api/Axios";
import { LikeAtom } from "../Recoil/Atom";
import { useRecoilValue } from "recoil";

const MainSmallBox = ({ isLoggedIn, type }) => {
  const likeRecipes = useRecoilValue(LikeAtom)
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
      <AllWrapper>
        {isLoggedIn ? (
          <>
          <ArrowButton onClick={handlePreviousPage} disabled={page === 0}>
            <Img src={arrow} alt="이전" style={{ transform: "rotate(180deg)" }} />
          </ArrowButton>
          <RecipeBoxWrapper>
            {recipeData.map((recipe) => (
                <PopularRecipeBox
                  key={recipe.recipeId}
                  recipeId={recipe.recipeId}
                  recipeLikeId={likeRecipes}
                />
              ))}
          </RecipeBoxWrapper>
          <ArrowButton onClick={handleNextPage} disabled={page >= totalPage - 1}>
        <Img src={arrow} alt="다음" />
      </ArrowButton>
          </>
        ):(
          <LoginPrompt>
            나만의 좋아요 레시피를 추가해주세요! (로그인 후 이용가능합니다.)
          </LoginPrompt>
        )}
      </AllWrapper>
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

  @media screen and (max-width: 1200px) {
    width: 38.5vw;
    height: 16vw;
    border-radius: 1vw;
  }

  @media screen and (max-width: 480px) {
    width: 90vw;
    height: 33.3vw;
    border-radius: 2vw;
  }
`;

const AllWrapper = styled.div`
  width: 100%;
  height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 1200px){
    height: 15.3vw;
  }
  `;

const RecipeBoxWrapper = styled.div`
  width: 500px;
  height: 220px;
  display: flex;
  gap: 35px;
  align-items: center;

  @media screen and (max-width: 1200px){
    width: 34.7vw;
    height: 15.3vw;
    gap: 1vw;
  }

  @media screen and (max-width: 480px){
    width: 85vw;
    height: 30vw;
    gap: 3vw;
    margin-left: 2vw;
  }
`;

const ArrowButton = styled.div`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;

  @media screen and (max-width: 1200px) {
    height: 2vw;
    width: 2vw;
  }

  @media screen and (max-width: 480px) {
    height: 7vw;
    width: 7vw;
  }

`;

const Img = styled.img`
  width: 30px;
  height: 30px;

  @media screen and (max-width: 1200px) {
    width: 2vw;
    height: 2vw;
  }

  @media screen and (max-width: 480px) {
    height: 7vw;
    width: 7vw;
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

  @media screen and (max-width: 480px) {
    font-size: 3vw;
  }
`;

export default MainSmallBox;
