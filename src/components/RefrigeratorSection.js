import React, {useState} from 'react';
import styled from 'styled-components';
import FoodBox from './FoodBox';
import IngredientBox from './IngredientBox';
import { dataAtom } from '../Recoil/Atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import plus from '../assets/images/circlePlus.svg';

const RefrigeratorSection = ({title, ButtonText, dateRef}) => {
    const FoodData = useRecoilValue(dataAtom);
    const setFoodData = useSetRecoilState(dataAtom);
    const [showIngredientBox, setShowIngredientBox] = useState(false);
    const [storageName, setStorageName] = useState('');

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

    const expiredFoodData = FoodData.filter(box => isDateExpired(box.expiredDate));
    const freezerData = FoodData.filter(box => box.storage === "냉동" && !isDateExpired(box.expiredDate));
    const fridgeData = FoodData.filter(box => box.storage === "냉장" && !isDateExpired(box.expiredDate));
    const roomTempData = FoodData.filter(box => box.storage === "상온" && !isDateExpired(box.expiredDate));

    const removeFoodBox = (key) => {
        setFoodData((prevData) => prevData.filter(box => box.key !== key));
    }

    const openIngredientBox = (box) => {
        setShowIngredientBox(true);
        setStorageName(box.storage);
    }

    const closeIngredientBox = () => {
        setShowIngredientBox(false);
    }

    return (
        <Section>
            <AllTextWrapper>
                <TextBox>
                    <Text>{title}</Text>
                </TextBox>
                <LineBox>
                    <VerticalLine />
                        <FoodBoxWrapper ref={dateRef}>
                            {title === "유통기한 만료" && 
                                expiredFoodData.map(box => (
                                    <FoodBox
                                        key = {box.key}
                                        id = {box.key}
                                        name = {box.title}
                                        year={box.expiredDate.split('-')[0]}
                                        month={box.expiredDate.split('-')[1]}
                                        date={box.expiredDate.split('-')[2]}
                                        quantity={box.quantity}
                                        storage={box.storage}
                                        memo={box.memo}
                                        removeFoodBox={()=>removeFoodBox(box.key)}
                                        isDate={isDateExpired(box.expiredDate)}
                                        ButtonText={ButtonText}
                                    />
                                ))}
                                {title === '냉동실' && (
                                <>
                                    {freezerData.map((box) => (
                                        <FoodBox
                                            key={box.key}
                                            id={box.key}
                                            name={box.title}
                                            year={box.expiredDate.split('-')[0]}
                                            month={box.expiredDate.split('-')[1]}
                                            date={box.expiredDate.split('-')[2]}
                                            quantity={box.quantity}
                                            storage={box.storage}
                                            memo={box.memo}
                                            expiryDate={isDateDDay(box.expiredDate)}
                                            ButtonText={ButtonText}
                                            removeFoodBox={() => removeFoodBox(box.key)}
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
                                            key={box.key}
                                            id={box.key}
                                            name={box.title}
                                            year={box.expiredDate.split('-')[0]}
                                            month={box.expiredDate.split('-')[1]}
                                            date={box.expiredDate.split('-')[2]}
                                            quantity={box.quantity}
                                            storage={box.storage}
                                            memo={box.memo}
                                            expiryDate={isDateDDay(box.expiredDate)}
                                            ButtonText={ButtonText}
                                            removeFoodBox={() => removeFoodBox(box.key)}
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
                                            key={box.key}
                                            id={box.key}
                                            name={box.title}
                                            year={box.expiredDate.split('-')[0]}
                                            month={box.expiredDate.split('-')[1]}
                                            date={box.expiredDate.split('-')[2]}
                                            quantity={box.quantity}
                                            storage={box.storage}
                                            memo={box.memo}
                                            expiryDate={isDateDDay(box.expiredDate)}
                                            ButtonText={ButtonText}
                                            removeFoodBox={() => removeFoodBox(box.key)}
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
                        <IngredientWrapper>
                            {showIngredientBox  && <IngredientBox 
                            closeIngredientBox = {closeIngredientBox}
                            storageName={storageName}
                        />}
                    </IngredientWrapper>
                </LineBox>
            </AllTextWrapper>
        </Section>
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
`;

export default RefrigeratorSection;