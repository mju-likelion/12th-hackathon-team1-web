import React from "react";
import styled from "styled-components";

const MainSmallBox = () => {
  return (
    <>
      <SmallBox>
      </SmallBox>
    </>
  );
  
};

const SmallBox = styled.div`
  width: 555px;
  height: 220px;
  background-color: ${({ theme }) => theme.colors.green200};
  border-radius: 10px;

  @media screen and (max-width: 1200px){
    width: 39vw;
    height: 16vw;
    border-radius: 1vw;
  }
`;

export default MainSmallBox;
