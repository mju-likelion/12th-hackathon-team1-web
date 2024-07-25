import React from "react";
import styled from "styled-components";
import PopularRecipe from "../../components/PopularRecipe";
import WholeRecipe from '../../components/WholeRecipe';
import Sidebar from "../../components/Sidebar";

const RecipeMain = () => {
  return (
    <>
    <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Wrapper>
        <RecipeContainer>
          <div>
            <TextContainer>
              <BoxTitle>인기 레시피</BoxTitle>
            </TextContainer>
            <PopularRecipe />
          </div>
          <div>
            <TextContainer>
              <BoxTitle>전체 레시피</BoxTitle>
              <TabContainer>
                <TabText>최신순</TabText>
                <TabText>인기순</TabText>
              </TabContainer>
            </TextContainer>
            <WholeRecipe />
          </div>
        </RecipeContainer>
      </Wrapper>
    </>
  );
};

const SidebarContainer = styled.div`
  position: absolute;
  display: flex;
  position: fixed;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 900px;

  @media screen and (max-width: 1200px){
    width: 70vw;
    margin-top: 2vw;
  }
  `;

const TabContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;

  @media screen and (max-width: 1200px){
    gap: 0.7vw;
  }
`;

const TabText = styled.p`
  display: flex;
  font-size: ${({ theme }) => theme.fonts.default16};
  cursor: pointer;
  &:hover {
    font-weight: 600;
  }

  @media screen and (max-width: 1200px){
    font-size: 1.3vw;
  }
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;

  @media screen and (max-width: 1200px) {
    height: 3vw;
  }
`;


const BoxTitle = styled.p`
  font-size: ${({ theme }) => theme.fonts.default18};
  @media screen and (max-width: 1200px){
    font-size: 1.3vw;
  }
`;

export default RecipeMain;
