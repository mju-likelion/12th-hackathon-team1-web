import React from "react";
import styled from "styled-components";
import RefrigeratorSection from "./RefrigeratorSection";
import arrow from "../assets/images/next.svg";

const MainBigBox = ({main}) => {
  return (
    <>
      <BigBox>
        <BoxWrapper>
          <WrapperWrapper>
            <RefrigeratorSection title="냉동실" main={main}/>
            <Arrow src={arrow} alt="화살표" />
          </WrapperWrapper>
          <Line />
          <WrapperWrapper>
            <RefrigeratorSection title="냉장실" main={main}/>
            <Arrow src={arrow} alt="화살표" />
          </WrapperWrapper>
          <Line />
          <WrapperWrapper>
            <RefrigeratorSection title="상온" main={main}/>
            <Arrow src={arrow} alt="화살표" />
          </WrapperWrapper>
        </BoxWrapper>
      </BigBox>
    </>
  );
};

const BigBox = styled.div`
  width: 1150px;
  height: 514px;
  background-color: ${({ theme }) => theme.colors.green200};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;

  @media screen and (max-width: 1200px) {
    width: 80vw;
    height: 35.6vw;
    border-radius: 0.7vw;
  }
`;

const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  @media screen and (max-width: 1200px) {
    gap: 1.38vw;
  }
`;

const WrapperWrapper = styled.div`
  display: flex;
`;

const Line = styled.div`
  width: 1058px;
  height: 3px;
  background-color: ${({ theme }) => theme.colors.white};

  @media screen and (max-width: 1200px) {
    width: 73.5vw;
  }
`;

const Arrow = styled.div`
  background-color: blue;
  display: flex;
  align-items: center;
`;

export default MainBigBox;
