import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import remove from '../assets/images/delateIcon.svg'
import Modal from '../pages/Modal';
import { Axios } from '../api/Axios';

const FoodBox = ({ingredientName, ButtonText, year, month, date, isDate, id, expirationDate, location}) => {
    const [showFoodBox, setShowFoodBox] = useState(false);
    const [maxLength, setMaxLength] = useState(5);

        const handleDelete = async () => {
            try {
                await Axios.delete(`/fridge/ingredients/${id}`);
                window.location.href = `/fridge`;
            }catch (error) {
                console.error(error);
            }
        }
    const isOpenShowFood = () => {
        if (ButtonText === '편집' || location==="main") {
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
            setMaxLength(7);
        };
        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    })

    return (
        <AllWrapper>
            {expirationDate <=3 &&
        (expirationDate === 0 ?
            <DdayText>D-DAY</DdayText>
            : <DdayText>D-{ expirationDate }</DdayText>
            )
        }
        <Wrapper expirationDate={expirationDate}>
            <TextWrapper onClick={isOpenShowFood}>
                {showFoodBox &&(
                <Modal
                    id={id}
                    isCloseShowFood={isCloseShowFood}
                    modal = "단건조회"
                    location = {location}
                    isDate={isDate}
                />)}
                <HighWrapper>
                <IngredientName $isDate={isDate}>{truncateText(ingredientName, maxLength)}</IngredientName>
                <ImgBox>
                    {ButtonText === '저장' && <DeleteImg onClick={handleDelete} src={remove} alt='삭제'/>}
                </ImgBox>
                </HighWrapper>
                <IngredientDate $isDate={isDate}>유통기한: {year}.{month}.{date}</IngredientDate>
            </TextWrapper>
        </Wrapper>
    </AllWrapper>

    );
};

const AllWrapper = styled.div`
    display: flex;
    align-items : center;
    justify-content: center;
    height: 140px;
    position: relative;

    @media screen and (max-width: 1200px){
        height: 9.72vw;
    }

`;

const Wrapper = styled.div`
    background-color: ${({ theme, expirationDate }) => 
        expirationDate === 2 ? '#FFD8D9' :
    expirationDate === 1 ? '#FFBAB7' :
    expirationDate === 0 ? '#FF9F9F' :
        theme.colors.white};
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
    width: 172px;
    height: 100px;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;

    @media screen and (max-width: 1200px){
        width: 12vw;
        height: 7vw;
        gap: 1.39vw;
        margin-left: 0.7vw;
    }
`;

const DdayText = styled.div`
    margin-bottom: 100px;
    position: absolute;
    top: 15px;
    background-color: ${({theme})=>theme.colors.error};
    width: 60px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    color: ${({theme})=>theme.colors.white};

    @media screen and (max-width: 1200px){
        width: 5vw;
        height: 1.8vw;
        font-size: 1.3vw;
        margin-bottom: 6.95vw;
        top: 1vw;
    }
`;

const HighWrapper = styled.div`
    height: 40px;
    width: 162px;
    display: flex;
    justify-content: space-between;

    @media screen and (max-width: 1200px){
        width: 11.25vw;
        height: 2.78vw;
    }
`;

const IngredientName = styled.p`
    height: 40px;
    display: flex;
    margin-top: 20px;
    ${({theme})=>theme.fonts.default18}
    color: ${({theme, $isDate})=> ($isDate ? theme.colors.dateGray : 'initial')};

    @media screen and (max-width: 1200px){
        font-size: 1.3vw;
        height: 2.78vw;
        margin-top: 1.4vw;
    }
`;

const IngredientDate = styled.p`
    margin-bottom: 10px;
    ${({theme})=>theme.fonts.default12}
    color: ${({theme, $isDate})=> ($isDate ? theme.colors.dateGray : 'initial')};

    @media screen and (max-width:1200px){
        font-size: 0.8vw;
        margin-bottom: 0.7vw;
    }
`;

const ImgBox = styled.div`
    width: 40px;
    height: 40px;
    margin-right: 5px;

    @media screen and (max-width: 1200px){
        width: 2.78vw;
        height: 2.78vw;
        margin-right: 0.35vw;
    }
`;

const DeleteImg = styled.img`
    width: 40px;
    height: 40px;
    cursor: pointer;

    @media screen and (max-width: 1200px){
        width: 2.78vw;
        height: 2.78vw;
    }
`;

export default FoodBox;