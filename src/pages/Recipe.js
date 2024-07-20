import React from "react";
import styled from "styled-components";

const Recipe = () => {
  return (
    <Wrapper>
      <BoxTitle>인기 레시피</BoxTitle>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const BoxTitle = styled.p`
  font-size: ${({ theme }) => theme.fonts.default18};
`;

export default Recipe;
