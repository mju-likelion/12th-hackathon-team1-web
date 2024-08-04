import React from 'react';
import styled from 'styled-components';

const NotFound = () => {
  return (
    <>
    <AllWrapper>
      <Wrapper>
        <InfoWrapper>
          <ErrorCode>404 Error</ErrorCode>
          <NotFoundText>Not Found</NotFoundText>
          <FirstText>페이지를 찾을 수 없습니다</FirstText>
          <SecondText>입력한 주소가 정확한지 다시 확인해주세요!</SecondText>
        </InfoWrapper>
      </Wrapper>
    </AllWrapper>
    </>
  );
};

const AllWrapper = styled.div`
  background-color: #E7EAEE;
  width: 100vw;
  height: 45vw;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 800px){
    height: 70vh;
    margin-bottom: 5vw;
  }

  @media screen and (max-width: 480vw){
    height: 90vh;
  }
  
`;

const Wrapper = styled.div`
  width: 90vw;
  height: 75vh;
  border-radius: 5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({theme})=>theme.colors.white};

  @media screen and (max-width: 800px){
    height: 70vh;
    margin-bottom: 5vw;
  }

  @media screen and (max-width: 480px){
    height: 70vh;
    margin-bottom: 5vw;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #535353;
  height: 45vw;
  justify-content: center;

`;

const ErrorCode = styled.div`
  ${({theme})=> theme.fonts.title40};
  font-size: 5vw;
  margin-bottom: 3vw;

  @media screen and (max-width: 800px){
    font-size: 8vw;
  }

  @media screen and (max-width: 480px){
    font-size: 10vw
  }
`;

const NotFoundText = styled.div`
  margin-bottom: 10vw;
  font-size: 2.5vw;

  @media screen and (max-width: 800px){
    font-size: 3vw;
  }

  @media screen and (max-width: 480px){
    font-size: 4vw;
  }
  `;

const FirstText = styled.p`
  ${({theme})=> theme.fonts.title20}
  margin-bottom: 3vw;
  font-weight: 500;
  font-size: 2vw;

  @media screen and (max-width: 800px){
    font-size: 2.5vw;
  }

  @media screen and (max-width: 480px){
    font-size: 3.5vw;
  }
`;

const SecondText = styled.p`
  font-weight: 500;
  font-size: 1.5vw;

  @media screen and (max-width: 800px){
    font-size: 2vw;
  }

  @media screen and (max-width: 480px){
    font-size: 3vw;
  }
`;

export default NotFound;