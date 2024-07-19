import React from "react";
import styled from "styled-components";

const PopularRecipeBox = () => {
  return (
    <div>
      <RecipeBox />
    </div>
  );
};

const RecipeBox = styled.div`
  width: 140px;
  height: 170px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  margin-left: 34px;

  @media screen and (max-width: 1200px){
    width: 10.5vw;
    height: 13.8vw;
    margin-left: 1.8vw;
    border-radius: 1vw;
  }
`;

export default PopularRecipeBox;
