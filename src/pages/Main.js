import React from 'react';
import styled from 'styled-components';
import MainBigBox from '../components/MainBigBox';
import MainSmallBox from '../components/MainSmallBox';

const Main = () => {
  return (
    <Wrapper>
      <BoxWrapper>
        <MainBigBox />
        <SmallBoxWrapper>
          <SmallTextBox>
            <Text>인기 레시피</Text>
            <MainSmallBox />
          </SmallTextBox>
          <SmallTextBox>
            <Text>내 좋아요 레시피</Text>
            <MainSmallBox />
          </SmallTextBox>
        </SmallBoxWrapper>
      </BoxWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;

  @media screen and (max-width: 1200px){
    margin-top: 5vw;
  }
`;

const BoxWrapper = styled.div`
  width: 1150px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1200px){
    width: 80vw;
  }
`;

const SmallBoxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SmallTextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const Text = styled.p`
  height: 50px;
  display: flex;
  align-items: center;

  @media screen and (max-width: 1200px){
    height: 3vw;
    font-size: 1.3vw;
  }
`;

export default Main;