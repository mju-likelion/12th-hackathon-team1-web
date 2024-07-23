import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import remove from '../assets/images/delateIcon.svg'
import Modal from '../pages/Modal';

const FoodBox = ({title, ButtonText, removeFoodBox, year, month, date, isDate, quantity, storage, memo, id, expiryDate}) => {
    const [showFoodBox, setShowFoodBox] = useState(false);
    const [maxLength, setMaxLength] = useState(5);

    const isOpenShowFood = () => {
        if (ButtonText === '편집') {
            setShowFoodBox(true);
        }
    }
    const isCloseShowFood = () => {
        setShowFoodBox(false);
    }

    const truncateText = (text, maxLength) => {
        if (!text) return "";
        if (text.length > maxLength) {
        return text.slice(0, maxLength) + "...";
        }
        return text;
    };

    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth <= 1200) {
                setMaxLength(4);
            }else {
                setMaxLength(5);
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    })

    return (
      <AllWrapper>
        <Wrapper expiryDate={expiryDate}>
            <TextWrapper onClick={isOpenShowFood}>
                {showFoodBox && ButtonText === '편집' &&
                <Modal 
                    id={id}
                    isCloseShowFood={isCloseShowFood}
                    year={year}
                    month={month}
                    date={date}
                    title={title}
                    quantity={quantity}
                    storage={storage}
                    memo={memo}
                    modal = "단건조회"
                    isDate={isDate}
                />}
                <IngredientName $isDate={isDate}>{truncateText(title, maxLength)}</IngredientName>
                <IngredientDate $isDate={isDate}>유통기한: {year}.{month}.{date}</IngredientDate>
            </TextWrapper>
            <ImgBox>
                {ButtonText === '저장' && <DeleteImg onClick={removeFoodBox} src={remove}/>}
            </ImgBox>
        </Wrapper>
        {expiryDate <=2 &&
        (expiryDate === 0 ?
            <DdayText>D-DAY</DdayText>
            : <DdayText>D-{expiryDate}</DdayText>
            )
        }
    </AllWrapper>

    );
};

const AllWrapper = styled.div`
    width: 172px;
    height: 140px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: 1200px){
        width: 12vw;
        height: 10vw;
    }
`;

const Wrapper = styled.div`
//position: absolute;
    background-color: ${({ theme, expiryDate }) => 
        expiryDate === 2 ? '#FFD8D9' :
        expiryDate === 1 ? '#FFBAB7' :
        expiryDate === 0 ? '#FF9F9F' :
        theme.colors.white};
    display: flex;
    flex-direction: row;
    width: 172px;
    height: 100px;
    border-radius: 23px;
    flex-shrink: 0;
    cursor: pointer;
    margin-top: 20px;

    @media screen and (max-width: 1200px) {
        width: 12vw;
        height: 7vw;
        border-radius: 1.5vw;
        margin-top: 1.8vw;
    }
`;

const TextWrapper = styled.div`
    width: 100%;
    height: 100%;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20%;

`;

const DdayText = styled.div`
  position: absolute;
  background-color: ${({theme})=>theme.colors.error};
  width: 60px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  color: ${({theme})=>theme.colors.white};

  @media screen and (max-width: 1200px){
    width: 5vw;
    height: 3vw;
    font-size: 1.5vw;
  }
`;

const IngredientName = styled.p`
    ${({theme})=>theme.fonts.default18}
    color: ${({theme, $isDate})=> ($isDate ? theme.colors.dateGray : 'initial')};

    @media screen and (max-width: 1200px){
        font-size: 1.3vw;
    }
`;

const IngredientDate = styled.p`
    ${({theme})=>theme.fonts.default12}
    color: ${({theme, $isDate})=> ($isDate ? theme.colors.dateGray : 'initial')};

    @media screen and (max-width:1200px){
        font-size: 0.8vw;
    }
`;

const ImgBox = styled.div`
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: end;
    margin-top: 5px;

`;

const DeleteImg = styled.img`
    width: 40px;
    height: 40px;
    cursor: pointer;

    @media screen and (max-width: 1200px){
        width: 3vw;
        height: 3vw;
    }
`;

export default FoodBox;