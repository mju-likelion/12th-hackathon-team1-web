import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import FoodBox from './FoodBox';
import IngredientBox from './IngredientBox';
import plus from '../assets/images/circlePlus.svg';
import { Axios } from '../api/Axios';

const RefrigeratorSection = ({title, ButtonText, dateRef, location}) => {
    const [showIngredientBox, setShowIngredientBox] = useState(false);
    const [storageName, setStorageName] = useState('');
    const [expiredData, setExpiredData] = useState([]);
    const [freezerData, setFreezerData] = useState([]);
    const [fridgeData, setFridgeData] = useState([]);
    const [roomTempData, setRoomTempData] = useState([]);

    const isDateDDay = (expirationDate) => {
        const today = new Date();
        const expiryDate = new Date(expirationDate);

        today.setHours(0, 0, 0, 0);
        expiryDate.setHours(0, 0, 0, 0);

        const diffTime = expiryDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    useEffect(()=> {
        const fetchFood = async () => {
            try{
                const token = localStorage.getItem(`token`);
                const response = await Axios.get(`/fridge/ingredients`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setExpiredData(response.data.data.expirationDate);
                setFreezerData(response.data.data.frozen);
                setFridgeData(response.data.data.coldStorage);
                setRoomTempData(response.data.data.ambient);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFood();
    }, [])

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
                        <FoodBoxWrapper ref={dateRef}>
                        {title === "유통기한 만료" && 
                            expiredData.map(box => (
                                <FoodBox
                                    key = {box.id}
                                    id = {box.id}
                                    ingredientName = {box.ingredientName}
                                    isDate="유통기한만료"
                                    ButtonText={ButtonText}
                                />
                            ))}
                        {title === '냉동실' && (
                            <>
                            {freezerData.map((box) => (
                                <FoodBox
                                    key = {box.id}
                                    id = {box.id}
                                    ingredientName = {box.ingredientName}
                                    storage="냉동"
                                    year={box.expirationDate.split('-')[0]}
                                    month={box.expirationDate.split('-')[1]}
                                    date={box.expirationDate.split('-')[2]}
                                    expirationDate={isDateDDay(box.expirationDate)}
                                    location={location}
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
                                    key = {box.id}
                                    id = {box.id}
                                    ingredientName = {box.ingredientName}
                                    storage="냉장"
                                    year={box.expirationDate.split('-')[0]}
                                    month={box.expirationDate.split('-')[1]}
                                    date={box.expirationDate.split('-')[2]}
                                    expirationDate={isDateDDay(box.expirationDate)}
                                    location={location}
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
                                    key = {box.id}
                                    id = {box.id}
                                    ingredientName = {box.ingredientName}
                                    storage="상온"
                                    year={box.expirationDate.split('-')[0]}
                                    month={box.expirationDate.split('-')[1]}
                                    date={box.expirationDate.split('-')[2]}
                                    expirationDate={isDateDDay(box.expirationDate)}
                                    location={location}
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

    @media screen and (max-width: 480px){
        width: 83.3vw;
        height: 16.6vw;
        border-radius: 2vw;
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

    @media screen and (max-width: 480px){
        width: 83.3vw;
        height: 16.6vw;
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

    @media screen and (max-width: 480vw){
        width: 15.8vw;
    }
`;

const Text = styled.p`
    @media screen and (max-width: 1200px){
        font-size: 1.3vw;
    }

    @media screen and (max-width: 480px){
        font-size: 2.5vw;
    }
`;

const LineBox = styled.div`
    max-width: 935px;
    display: flex;
    align-items: center;

    @media screen and (max-width: 1200px){
        width: 65vw;
    }

    @media screen and (max-width: 480px){
        max-width: auto;
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

    @media screen and (max-width: 480px){
        width: 0.8vw;
        height: 12vw;
        margin-right: 3vw;
    }
`;
const FoodBoxWrapper = styled.div`
    width: 890px;
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
        width: 62vw;
        margin-left: 2.5vw;
        gap: 2.5vw;
        margin-right: 2.5vw;
    }

    @media screen and (max-width: 480px){
        height: 16.6vw;
        width: 62vw;
        margin-left: 0;
        gap: 4vw;
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

    @media screen and (max-width: 480px){
        width: 4.5vw;
        height: 4.5vw;
    }
`;

const IngredientWrapper = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    margin-left: 300px;


    @media screen and (max-width: 1200px){
        right: 60vw;
        top: 60vw;
    }

    @media screen and (max-width: 480px){
        right: 60vw;
        top: 120vw;
    }
`;

export default RefrigeratorSection;