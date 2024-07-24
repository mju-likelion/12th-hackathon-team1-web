import React from "react";
import styled from "styled-components";
import Sidebar from "../../components/Sidebar";
import RecipeMain from "./RecipeMain";

const Recipe = () => {
  return (
    <>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
    <RecipeContainer>
      <PageContainer>
        <RecipeMain />
      </PageContainer>
    </RecipeContainer>
    </>
  );
};

const SidebarContainer = styled.div`
position: absolute;
  display: flex;
  justify-content: end;

  @media screen and (max-width: 1200px) {
  }
`;

const RecipeContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Recipe;
