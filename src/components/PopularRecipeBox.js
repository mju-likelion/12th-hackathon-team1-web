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

  @media screen and (max-width: 1200px){
    width: 9.7vw;
    height: 11.8vw;
    border-radius: 0.7vw;
  }
`;

export default PopularRecipeBox;