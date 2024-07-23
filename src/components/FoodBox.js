import React, { useState } from 'react';
import styled from 'styled-components';
import remove from '../assets/images/delateIcon.svg'
import Modal from '../pages/Modal';

const FoodBox = ({title, ButtonText, removeFoodBox, year, month, date, isDate, quantity, storage, memo, id}) => {
    const [showFoodBox, setShowFoodBox] = useState(false);

    const isOpenShowFood = () => {
        setShowFoodBox(true);
    }
    const isCloseShowFood = () => {
        setShowFoodBox(false);
    }

    return (
        <Wrapper>
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
                <IngredientName $isDate={isDate}>{title}</IngredientName>
                <IngredientDate $isDate={isDate}>유통기한: {year}.{month}.{date}</IngredientDate>
            </TextWrapper>
            <ImgBox>
                {ButtonText === '저장' && <DeleteImg onClick={removeFoodBox} src={remove}/>}
            </ImgBox>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    position: relative;
    background-color: ${({theme})=>theme.colors.white};
    display: flex;
    flex-direction: row;
    width: 172px;
    height: 100px;
    border-radius: 23px;
    flex-shrink: 0;
    cursor: pointer;

    @media screen and (max-width: 1200px) {
        width: 12vw;
        height: 7vw;
        border-radius: 1.5vw;
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