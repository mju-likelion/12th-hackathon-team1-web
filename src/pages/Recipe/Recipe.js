import React from "react";
import styled from "styled-components";
import Sidebar from "../../components/Sidebar";
import RecipeMain from "./RecipeMain";

const Recipe = () => {
  return (
    <RecipeContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <PageContainer>
        <RecipeMain />
      </PageContainer>
    </RecipeContainer>
  );
};

const SidebarContainer = styled.div`
  display: flex;
  padding: 1.8vw;
  justify-content: end;
  width: 26vw;
  min-width: 300px;

  @media screen and (max-width: 1200px) {
    padding: 10px;
  }
`;

const RecipeContainer = styled.div`
  display: flex;
  width: 100%;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Recipe;
