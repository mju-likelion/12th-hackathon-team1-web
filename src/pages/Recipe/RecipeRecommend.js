import React, { useState } from "react";
import styled from "styled-components";
import RecipeBox from "../../components/RecipeBox";
import Sidebar from "../../components/Sidebar";
import { LikeAtom } from "../../Recoil/Atom";
import { useRecoilValue } from "recoil";

const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

const RecipeRecommend = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const Like = useRecoilValue(LikeAtom);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setMenuPosition({ x: e.clientX, y: e.clientY });
    setShowMenu(true);
  };

  const handleClickOutside = () => {
    setShowMenu(false);
  };

  const groupedLikes = chunkArray(Like, 3);

  return (
    <>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Container onClick={handleClickOutside}>
        <TitleEditContainer>
          <BoxTitle>나의 냉장고 레시피</BoxTitle>
        </TitleEditContainer>
        <RecommendContainer>
          <Wrapper>
            {groupedLikes.map((group, index) => (
              <Line key={index}>
                {group.map((box) => (
                  <RecipeBox
                    key={box.id}
                    state="좋아요"
                    menuName={box.menuName}
                    id={box.id}
                    countHeart={box.countHeart}
                    showMenu={showMenu}
                    menuPosition={menuPosition}
                    handleContextMenu={handleContextMenu}
                  />
                ))}
              </Line>
            ))}
          </Wrapper>
        </RecommendContainer>
      </Container>
    </>
  );
};

const SidebarContainer = styled.div`
  position: absolute;
  display: flex;
  position: fixed;
`;

const TitleEditContainer = styled.div`
  display: flex;
  width: 900px;
  justify-content: space-between;
  align-items: center;
  padding: 0 3px;

  @media screen and (max-width: 1200px) {
    width: 70vw;
  }
`;

const Line = styled.div`
  display: flex;
  width: 830px;
  justify-content: start;
  gap: 10px;

  @media screen and (max-width: 1200px) {
    width: 64vw;
    gap: 2.3vw;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RecommendContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.green200};
  width: 900px;
  min-height: 900px;
  height: auto;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 1vw;

  @media screen and (max-width: 1200px) {
    width: 70vw;
    min-height: 70vw;
  }
`;

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

const BoxTitle = styled.p`
  ${({ theme }) => theme.fonts.default18};
  display: flex;
  align-items: center;
  height: 50px;

  @media screen and (max-width: 1200px) {
    font-size: 1.5vw;
    height: 5vw;
  }
`;

export default RecipeRecommend;
