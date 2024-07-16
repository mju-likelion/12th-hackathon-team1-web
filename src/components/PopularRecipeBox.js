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
`;

export default PopularRecipeBox;
