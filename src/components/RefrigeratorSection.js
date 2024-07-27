import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import FoodBox from './FoodBox';
import IngredientBox from './IngredientBox';
import plus from '../assets/images/circlePlus.svg';
import { Axios } from '../api/Axios';

const RefrigeratorSection = ({title, ButtonText, dateRef, main}) => {
    const [showIngredientBox, setShowIngredientBox] = useState(false);
    const [storageName, setStorageName] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [expiredData, setExpiredData] = useState([]);
    const [freezerData, setFreezerData] = useState([]);
    const [fridgeData, setFridgeData] = useState([]);
    const [roomTempData, setRoomTempData] = useState([]);

    useEffect(() => {
        const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
        setIsLoggedIn(loggedInStatus);
    }, []);

    useEffect(()=> {
        const fetchFood = async () => {
            try{
                const response = await Axios.get(`/fridge/ingredients`);
                setExpiredData(response.data.data.expirationDate);
                setFreezerData(response.data.data.frozen);
                setFridgeData(response.data.data.coldStorage);
                setRoomTempData(response.data.data.ambient);
            } catch (error) {
                console.log(error);
            }
        };

        fetchFood();
    }, [])

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    const isDateExpired = (expiredDate) => {
        const [foodYear, foodMonth, foodDay] = expiredDate.split('-').map(Number);
        if (foodYear < year) return true;
        if (foodYear > year) return false;
        if (foodMonth < month) return true;
        if (foodMonth > month) return false;
        if (foodDay < day) return true;
        return false;
    }

    const isDateDDay = (expiredDate) => {
        const expiryDate = new Date(expiredDate);
        const diffTime = expiryDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const openIngredientBox = (box) => {
        setShowIngredientBox(true);
        setStorageName(box.storage);
    }

    const closeIngredientBox = () => {
        setShowIngredientBox(false);
    }
    return (
        <>
        <Section>
            <AllTextWrapper>
                <TextBox>
                    <Text>{title}</Text>
                </TextBox>
                <LineBox>
                    <VerticalLine />
                    {isLoggedIn && (
                        <FoodBoxWrapper ref={dateRef}>
                        {title === "유통기한 만료" && 
                            expiredData.map(box => (
                                <FoodBox
                                    id = {box.id}
                                    idName = {box.ingredientName}
                                    name = {box.ingredientName}
                                    isDate="유통기한"
                                    ButtonText={ButtonText}
                                />
                            ))}
                        {title === '냉동실' && (
                            <>
                            {freezerData.map((box) => (
                                <FoodBox
                                    id = {box.id}
                                    idName = {box.ingredientName}
                                    name = {box.ingredientName}
                                    storage="냉동"
                                    main={main}
                                    ButtonText={ButtonText}
                                />
                            ))}
                            {ButtonText === '저장' && (
                                <PlusImg
                                    src={plus}
                                    alt="추가 이미지"
                                    onClick={() => openIngredientBox({ storage: '냉동' })}
                                />
                            )}
                            </>
                            )}
                        {title === '냉장실' && (
                            <>
                            {fridgeData.map((box) => (
                                <FoodBox
                                    id = {box.id}
                                    idName = {box.ingredientName}
                                    name = {box.ingredientName}
                                    storage="냉장"
                                    main={main}
                                    ButtonText={ButtonText}
                                />
                            ))}
                                {ButtonText === '저장' && (
                                <PlusImg
                                    src={plus}
                                    alt="추가 이미지"
                                    onClick={() => openIngredientBox({ storage: '냉장' })}
                                />
                                )}
                            </>
                            )}
                        {title === '상온' && (
                            <>
                            {roomTempData.map((box) => (
                                <FoodBox
                                    id = {box.id}
                                    idName = {box.ingredientName}
                                    name = {box.ingredientName}
                                    storage="상온"
                                    main={main}
                                    ButtonText={ButtonText}
                                />
                            ))}
                            {ButtonText === '저장' && (
                                <PlusImg
                                    src={plus}
                                    alt="추가 이미지"
                                    onClick={() => openIngredientBox({ storage: '상온' })}
                                />
                                )}
                            </>
                            )}
                        </FoodBoxWrapper>
                    )}
                </LineBox>
            </AllTextWrapper>
        </Section>
        <IngredientWrapper>
        {showIngredientBox  && <IngredientBox 
            closeIngredientBox = {closeIngredientBox}
            storageName={storageName}
        />}
        </IngredientWrapper>
        </>    
    );
};

const Section = styled.div`
    background-color: ${({theme})=> theme.colors.green100};
    width: 1050px;
    height: 120px;
    border-radius: 10px;

    @media screen and (max-width: 1200px){
        width: 73vw;
        height: 8.3vw;
        border-radius: 0.7vw;
    }
`;

const AllTextWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 1058px;
    height: 118px;

    @media screen and (max-width: 1200px){
        width: 73.5vw;
        height: 8.5vw;
    }
`;

const TextBox = styled.div`
    width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 1200px){
        width: 8.3vw;
    }
`;

const Text = styled.p`
    @media screen and (max-width: 1200px){
        font-size: 1.3vw;
    }
`;

const LineBox = styled.div`
    max-width: 935px;
    display: flex;
    align-items: center;

    @media screen and (max-width: 1200px){
        max-width: 65vw;
    }
`;

const VerticalLine = styled.div`
    background-color: ${({theme})=>theme.colors.white};
    width: 3px;
    height: 90px;
    
    @media screen and (max-width: 1200px){
        width: 0.4vw;
        height: 4.5vw;
    }
`;

const FoodBoxWrapper = styled.div`
    height: 118px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 50px;
    margin-left: 30px;
    margin-right: 50px;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;

    &::-webkit-scrollbar{
        display: none;
    }

    @media screen and (max-width: 1200px){
        height: 8.2vw;
        margin-left: 2.5vw;
        gap: 2.5vw;
        margin-right: 2.5vw;
    }
`;

const PlusImg = styled.img`
    margin-right: 80px;
    margin-left: 50px;
    cursor: pointer;

    @media screen and (max-width: 1200px){
        margin-right: 3.5vw;
        margin-left: 3vw;
        width: 2.5vw;
        height: 2.5vw;
    }
`;

const IngredientWrapper = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    margin-left: 300px;
`;

export default RefrigeratorSection;