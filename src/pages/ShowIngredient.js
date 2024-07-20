import React from 'react';
import styled from 'styled-components';
import SmallButton from '../components/SmallButton';

const ShowIngredient = ({title}) => {

  return (
    <>
      <WrapperBox>
            <Wrapper>
              <TitleBox>
                <MainTitle>재료 등록하기</MainTitle>
              </TitleBox>
                <SmallWrapper>
                  <TextBoxWrapper>
                    <TextWrapper>
                      <Title>재료명</Title>
                      <NameBox>
                        <Name>{title}</Name>
                      </NameBox>
                    </TextWrapper>
                    <TextWrapper>
                      <Title>남은 유통기한</Title>
                      <YearWrapper>
                        <YearBox>
                        <Text></Text>
                          <Title>년</Title>
                        </YearBox>
                        <YearBox>
                        <Text></Text>
                          <Title>월</Title>
                        </YearBox>
                        <YearBox>
                        <Text></Text>
                          <Title>일</Title>
                        </YearBox>
                      </YearWrapper>
                    </TextWrapper>
                    <TextWrapper>
                      <Title>수량 설정</Title>
                        <Text></Text>
                    </TextWrapper>
                    <TextWrapper>
                      <Title>보관 방법</Title>
                        <Text></Text>
                    </TextWrapper>
                    <TextWrapper>
                      <Title>메모</Title>
                      <LongText></LongText>
                    </TextWrapper>
                  </TextBoxWrapper>
                </SmallWrapper>
                <ButtonWrapper>
                    <SmallButton text="닫기"/>
                    <SmallButton text="수정하기"/>
                </ButtonWrapper>
            </Wrapper>
        </WrapperBox>
    </>
  );
};

const WrapperBox = styled.div`
    background-color: ${({theme}) => theme.colors.green200};
    width: 800px;
    height: 836px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;

    @media screen and (max-width: 1200px){
        width: 57.3vw;
        height: 60vw;
        border-radius: 1vw;
    }
    `;
    

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-between;

    @media screen and (max-width: 1200px){
        height: 54.5vw;
    }
`;

const TitleBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  margin-bottom: 25px;

  @media screen and (max-width: 1200px){
    margin-bottom: 1.5vw;
  }
`;

const MainTitle = styled.p`
  ${({theme})=>theme.fonts.title40}

  @media screen and (max-width: 1200px){
    font-size: 3vw;
  }
`;

const SmallWrapper = styled.div`
    background-color: ${({theme})=>theme.colors.green100};
    width: 725px;
    height: 630px;
    border-radius: 10px;
    margin-bottom: 25px;
    display: flex;
    align-items: center;

    @media screen and (max-width: 1200px){
        width: 50vw;
        height: 45vw;
        border-radius: 0.52vw;
        margin-bottom: 1.5vw;
    }
`;

const TextBoxWrapper = styled.div`
  width: 100%;
  height: 580px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (max-width: 1200px){
    height: 42vw;

  }
`;

const TextWrapper = styled.div`
`;

const Title = styled.p`
  ${({theme})=>theme.fonts.default18}
  margin-left: 20px;
  margin-bottom: 10px;

  @media screen and (max-width: 1200px){
    font-size: 1.5vw;
  }
`;

const NameBox = styled.div`
  background-color: ${({theme})=> theme.colors.white};
  width: 200px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  margin-left: 20px;

  @media screen and (max-width: 1200px){
    width: 13.89vw;
    height: 2.78vw;
  }
  
`;

const Name = styled.p`
  margin-left: 10px;
  color: ${({theme})=>theme.colors.dateGray};
  @media screen and (max-width: 1200px){
    font-size: 1.2vw;
  }
`;

const Text = styled.select`
  background-color: ${({theme})=>theme.colors.white};
  width: 80px;
  height: 40px;
  border: none;
  border-radius: 10px;
  margin-left: 20px;
  &:focus {
    outline: none;
  }

  @media screen and (max-width: 1200px){
    width: 5.6vw;
    height: 2.78vw;
  }
`;

const YearWrapper = styled.div`
  display: flex;
`;

const YearBox = styled.div`
  display: flex;
  justify-content: start;
  align-items: end;

`;

const LongText = styled.input`
  background-color: ${({theme})=>theme.colors.white};
  width: 450px;
  height: 150px;
  border: none;
  border-radius: 10px;
  margin-left: 20px;
  &:focus {
    outline: none;
  }

  @media screen and (max-width: 1200px){
    width: 31.25vw;
    height: 10.41vw;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  gap: 1.3vw;
`;

export default ShowIngredient;