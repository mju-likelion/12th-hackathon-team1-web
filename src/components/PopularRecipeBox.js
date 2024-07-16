import React from "react";
import styled from "styled-components";
import { Theme } from "../styles/Theme";

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
  background-color: ${Theme.colors.white};
  border-radius: 10px;
`;

export default PopularRecipeBox;
