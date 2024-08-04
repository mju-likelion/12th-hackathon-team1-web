import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import remove from '../assets/images/delateIcon.svg'
import { Axios } from '../api/Axios';
import FoodBoxModal from './FoodBoxModal';

const FoodBox = ({ingredientName, ButtonText, year, month, date, isDate, id, expirationDate, location}) => {
    const [showFoodBox, setShowFoodBox] = useState(false);
    const [maxLength, setMaxLength] = useState(5);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
        return text.slice(0, maxLength) + "..";
        }
        return text;
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 480) {
                setMaxLength(6);
                } else {
                setMaxLength(7);
                }
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    })

    return (
        <AllWrapper>
            {windowWidth > 480 && expirationDate<=3&&
            (expirationDate === 0 ?
                <DdayText>D-DAY</DdayText>
                : <DdayText>D-{ expirationDate }</DdayText>
                )}
        <Wrapper expirationDate={expirationDate}>
            <TextWrapper onClick={isOpenShowFood}>
                {showFoodBox &&(
                <FoodBoxModal
                    id={id}
                    isCloseShowFood={isCloseShowFood}
                    location = {location}
                    isDate={isDate}
                />)}
                {windowWidth <= 480 && 
                    <ImgBox>
                    {ButtonText === '저장' && <DeleteImg onClick={handleDelete} src={remove} alt='삭제'/>}
                    </ImgBox>
                    }
                <HighWrapper>
                    <IngredientName $isDate={isDate}>{truncateText(ingredientName, maxLength)}</IngredientName>
                    {windowWidth > 480 && 
                        <ImgBox>
                        {ButtonText === '저장' && <DeleteImg onClick={handleDelete} src={remove} alt='삭제'/>}
                        </ImgBox>
                    }
                </HighWrapper>
                {windowWidth > 480 &&
                <IngredientDate $isDate={isDate}>유통기한: {year}.{month}.{date}</IngredientDate>
                }
                
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

    @media screen and (max-width: 480px){
        height: 13.88vw;
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

    @media screen and (max-width: 480px) {
        width: 22.2vw;
        height: 13.88vw;
        border-radius: 2vw;
        display: flex;
        justify-content: center;
        align-items: center;
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

    @media screen and (max-width: 480px){
        width: 18vw;
        align-items: center;
        position: relative;
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

    @media screen and (max-width: 480px){
        justify-content: center;
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

    @media screen and (max-width: 480px){
        font-size: 3.2vw;
        margin: 0;
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

    @media screen and (max-width: 480px){
        position: absolute;
        margin-left: 16vw;
        margin-bottom: 8vw;
        width: 4.5vw;
        height: 4.5vw;
        z-index: 500;
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

    @media screen and (max-width: 480px){
        width: 4.5vw;
        height: 4.5vw;
        position: absolute;
    }
`;

export default FoodBox;