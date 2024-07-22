import React from "react";
import styled from "styled-components";
import Sidebar from "../components/RecipePage/Sidebar";
import RecipeMain from "../components/RecipePage/RecipeMain";

const Recipe = () => {
  return (
    <RecipeContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <RecipeMain />
    </RecipeContainer>
  );
};

const SidebarContainer = styled.div`
  display: flex;
  padding: 2.6vw;
  justify-content: end;
  width: 26vw;
  min-width: 300px;
`;

const RecipeContainer = styled.div`
  display: flex;
  width: 100%;
`;

export default Recipe;
