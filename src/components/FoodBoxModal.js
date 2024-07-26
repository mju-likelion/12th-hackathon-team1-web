import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import SmallButton from './SmallButton';
import Modal from './ModifyModal';
import { Axios } from '../api/Axios';

const FoodBoxModal = ({isCloseShowFood, id, isDate, idName}) => {
  const [showModify, setShowModify] = useState(false);
  const [foodData, setFoodData] = useState([]);

  useEffect(()=> {
    const ShowFood = async () => {
        try{
            const response = await Axios.get(`/fridge/ingredients/${id}`);
            console.log("show: ", response)
            setFoodData(response.data.data)
      
        } catch (error) {
            console.log(error);
        }
    };

    ShowFood();
}, [])

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const openModifyModal = () => {
    setShowModify(true);
  }

  const closeModifyModal = () => {
    setShowModify(false);
  }

  return (
        <div>
        <WrapperBox onClick={stopPropagation}>
            <Wrapper>
              <TitleBox>
                <MainTitle>{foodData.ingredientName}</MainTitle>
              </TitleBox>
                <SmallWrapper>
                  <TextBoxWrapper>
                    <TextWrapper>
                      <Title>유통기한</Title>
                      <NameBox>
                      <TextBox>
                  {foodData.expiredDate ? 
                    `${foodData.expiredDate.split('-')[0]}.${foodData.expiredDate.split('-')[1]}.${foodData.expiredDate.split('-')[2]}` :
                    '정보 없음'}
                </TextBox>
                      </NameBox>
                    </TextWrapper>
                    <TextWrapper>
                      <Title>남은 재료 개수</Title>
                      <NameBox>
                        <TextBox>{foodData.quantity}</TextBox>
                      </NameBox>
                    </TextWrapper>
                    <TextWrapper>
                      <Title>보관 방법</Title>
                      <NameBox>
                        <TextBox>{foodData.storage}</TextBox>
                      </NameBox>
                    </TextWrapper>
                    <TextWrapper>
                      <Title>메모</Title>
                      <NameBox>
                        <TextBox>{foodData.memo}</TextBox>
                      </NameBox>
                    </TextWrapper>
                  </TextBoxWrapper>
                </SmallWrapper>
                <ButtonWrapper>
                    <SmallButton text="닫기" onClick={isCloseShowFood}/>
                      {!isDate && <SmallButton text="수정하기" onClick={openModifyModal}/>}
                    {showModify && (
                    <Modal 
                      name = {foodData.ingredientName}
                      closeModifyModal={closeModifyModal}
                      id={id}
                      isCloseShowFood={isCloseShowFood}
                      modal = "수정"
                      idName = {idName}
                    />
                    )}
                </ButtonWrapper>
            </Wrapper>
        </WrapperBox>
        </div>
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
  height: 530px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (max-width: 1200px){
    height: 38vw;

  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
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

const TextBox = styled.p`
  margin-left: 10px;
  @media screen and (max-width: 1200px){
    font-size: 1.2vw;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  gap: 1.3vw;
`;


export default FoodBoxModal;