import React from "react";
import styled from "styled-components";

const MainBigBox = () => {
  return <BigBox />;
};

const BigBox = styled.div`
  width: 1150px;
  height: 772px;
  background-color: ${({ theme }) => theme.colors.green200};
  border-radius: 10px;

  @media screen and (max-width: 1200px){
    width: 80vw;
    height: 40vw;
  }
`;


export default MainBigBox;