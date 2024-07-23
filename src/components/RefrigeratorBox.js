import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import FoodBox from './FoodBox';
import IngredientBox from './IngredientBox'
import arrow from '../assets/images/next.svg';
import plus from '../assets/images/circlePlus.svg';
import { dataAtom } from '../Recoil/Atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

const RefrigeratorBox = () => {
    const FoodData = useRecoilValue(dataAtom);
    const setFoodData = useSetRecoilState(dataAtom);
    const [ButtonText, setButtonText] = useState('편집');
    const [showIngredientBox, setShowIngredientBox] = useState(false);
    const [storageName, setStorageName] = useState('');

    const dateRefOne = useRef(null);
    const dateRefTwo = useRef(null);
    const dateRefThree = useRef(null);
    const dateRefFour = useRef(null);
    
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
    const expiredFoodData = FoodData.filter(box => isDateExpired(box.expiredDate));
    const freezerData = FoodData.filter(box => box.storage === "냉동" && !isDateExpired(box.expiredDate));
    const fridgeData = FoodData.filter(box => box.storage === "냉장" && !isDateExpired(box.expiredDate));
    const roomTempData = FoodData.filter(box => box.storage === "상온" && !isDateExpired(box.expiredDate));

    const handleScroll = (ref) => {
        if (ref.current) {
            ref.current.scrollBy({ left: 220, behavior: 'smooth' });
        }
    };

    const toggleButton = () => {
        setButtonText((prevText) => (prevText === '편집' ? '저장' : '편집'));
    };

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
        <Wrapper>
            <div>
                <TopLine>
                    <Button onClick={toggleButton}>{ButtonText}</Button>
                </TopLine>
                <BottomBox>
                    <SectionBox>
                        <WrapperWrapper>
                            <Section>
                                <AllTextWrapper>
                                    <TextBox>
                                        <Text>유통기한 만료</Text>
                                    </TextBox>
                                    <LineBox>
                                        <VerticalLine />
                                    </LineBox>
                                    <FoodBoxWrapper ref={dateRefOne}>
                                        {expiredFoodData.map(box =>(
                                            <FoodBox
                                            key = {box.key}
                                            id = {box.key}
                                            title = {box.title}
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
                                    </FoodBoxWrapper>
                                </AllTextWrapper>
                            </Section>
                            <ArrowBox onClick={() => handleScroll(dateRefOne)}>
                                <Arrow src={arrow} alt="화살표"/>
                            </ArrowBox>
                        </WrapperWrapper>
                    </SectionBox>
                    <Line />
                    <SectionBox>
                        <WrapperWrapper>
                            <Section>
                                <AllTextWrapper>
                                    <TextBox>
                                        <Text>냉동실</Text>
                                    </TextBox>
                                    <LineBox>
                                        <VerticalLine />
                                    </LineBox>
                                    <FoodBoxWrapper ref={dateRefTwo}>
                                        {freezerData.map(box =>(
                                            <FoodBox 
                                            key = {box.key}
                                            id = {box.key}
                                            title = {box.title}
                                            year={box.expiredDate.split('-')[0]}
                                            month={box.expiredDate.split('-')[1]}
                                            date={box.expiredDate.split('-')[2]}
                                            quantity={box.quantity}
                                            storage={box.storage}
                                            memo={box.memo}
                                            ButtonText = {ButtonText}
                                            removeFoodBox={()=>removeFoodBox(box.key)}
                                            />
                                        ))}
                                        {ButtonText === '저장' && <PlusImg src={plus} alt="추가 이미지" 
                                        onClick={() => openIngredientBox({ storage: "냉동" })}
                                        
                                        />}
                                    </FoodBoxWrapper>
                                </AllTextWrapper>
                            </Section>
                            <ArrowBox onClick={() => handleScroll(dateRefTwo)}>
                                <Arrow src={arrow} alt="화살표"/>
                            </ArrowBox>
                        </WrapperWrapper>
                    </SectionBox>
                    <Line />
                    <SectionBox>
                        <WrapperWrapper>
                            <Section>
                                <AllTextWrapper>
                                    <TextBox>
                                        <Text>냉장실</Text>
                                    </TextBox>
                                    <LineBox>
                                        <VerticalLine />
                                    </LineBox>
                                    <FoodBoxWrapper ref={dateRefThree}>
                                        {fridgeData.map(box =>(
                                                <FoodBox 
                                                key = {box.key}
                                                id = {box.key}
                                                title = {box.title}
                                                year={box.expiredDate.split('-')[0]}
                                                month={box.expiredDate.split('-')[1]}
                                                date={box.expiredDate.split('-')[2]}
                                                quantity={box.quantity}
                                                storage={box.storage}
                                                memo={box.memo}
                                                ButtonText = {ButtonText}
                                                removeFoodBox={()=>removeFoodBox(box.key)}
                                                />
                                            ))}
                                        {ButtonText === '저장' && <PlusImg src={plus} alt="추가 이미지" 
                                        onClick={() => openIngredientBox({ storage: "냉장" })}/>}
                                    </FoodBoxWrapper>
                                </AllTextWrapper>
                            </Section>
                            <ArrowBox onClick={() => handleScroll(dateRefThree)}>
                                <Arrow src={arrow} alt="화살표"/>
                            </ArrowBox>
                        </WrapperWrapper>
                    </SectionBox>
                    <Line />
                    <SectionBox>
                        <WrapperWrapper>
                            <Section>
                                <AllTextWrapper>
                                    <TextBox>
                                        <Text>상온</Text>
                                    </TextBox>
                                    <LineBox>
                                        <VerticalLine />
                                    </LineBox>
                                    <FoodBoxWrapper ref={dateRefFour}>
                                        {roomTempData.map(box =>(
                                                <FoodBox 
                                                key = {box.key}
                                                id = {box.key}
                                                title = {box.title}
                                                year={box.expiredDate.split('-')[0]}
                                                month={box.expiredDate.split('-')[1]}
                                                date={box.expiredDate.split('-')[2]}
                                                quantity={box.quantity}
                                                storage={box.storage}
                                                memo={box.memo}
                                                ButtonText = {ButtonText}
                                                removeFoodBox={()=>removeFoodBox(box.key)}
                                                />
                                            ))}
                                        {ButtonText === '저장' && <PlusImg src={plus} alt="추가 이미지" 
                                        onClick={() => openIngredientBox({ storage: "상온" })}/>}
                                    </FoodBoxWrapper>
                                    <IngredientWrapper>
                                        {showIngredientBox  && <IngredientBox 
                                            closeIngredientBox = {closeIngredientBox}
                                            storageName={storageName}
                                        />}
                                    </IngredientWrapper>
                                </AllTextWrapper>
                            </Section>
                            <ArrowBox onClick={() => handleScroll(dateRefFour)}>
                                <Arrow src={arrow} alt="화살표"/>
                            </ArrowBox>
                        </WrapperWrapper>
                    </SectionBox>
                </BottomBox>
            </div> 
        </Wrapper>
    );
};

const Wrapper = styled.div`
    background-color: ${({theme})=> theme.colors.green200};
    width: 1150px;
    height: 772px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 1200px){
        width: 80vw;
        height: 53.6vw;
        border-radius: 0.52vw;
    }

`;


const TopLine = styled.div`
    width: 1058px;
    height: 61px;
    border-radius: 10px;
    background-color: ${({theme})=>theme.colors.white};
    margin-bottom: 30px;
    display: flex;
    justify-content: end;
    align-items: center;

    @media screen and (max-width: 1200px){
        width: 73.5vw;
        height: 4.24vw;
        border-radius: 0.52vw;
        margin-bottom: 2vw;
    }
`;

const Button = styled.button`
    background-color: ${({theme})=> theme.colors.green200};
    width: 140px;
    height: 36px;
    border-radius: 10px;
    margin-right: 10px;

    &:hover {
        background-color: ${({theme})=>theme.colors.greenButton};
    }

    @media screen and (max-width:1200px){
        width: 10vw;
        height: 2.57vw;
        border-radius: 0.7vw;
    }
`;


const BottomBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media screen and (max-width: 1200px){
        gap: 1.3vw;
    }
`;

const SectionBox = styled.div`
    width: 1058px;
    height: 118px;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 1200px){
        width: 73.5vw;
        height: 8.5vw;
    }
`;

const WrapperWrapper = styled.div`
    display: flex;
    width: 1058px;
    height: 118px;

    @media screen and (max-width: 1200px){
        width: 73.5vw;
        height: 8.5vw;
    }
`;

const Section = styled.div`
    background-color: ${({theme})=> theme.colors.green100};
    width: 1058px;
    height: 118px;
    border-radius: 10px;

    @media screen and (max-width: 1200px){
        width: 73.5vw;
        height: 8.5vw;
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
        width: 15vw;
    }
`;

const Text = styled.p`
    @media screen and (max-width: 1200px){
        font-size: 1.3vw;
    }
`;

const LineBox = styled.div`
    display: flex;
    align-items: center;
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
    width: 935px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 50px;
    margin-left: 30px;
    margin-right: 50px;
    overflow-x: auto;
    white-space: nowrap;

    &::-webkit-scrollbar{
        display: none;
    }

    @media screen and (max-width: 1200px){
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

const Line = styled.div`
    width: 1058px;
    height: 3px;
    background-color: ${({theme})=>theme.colors.white};

    @media screen and (max-width: 1200px){
        width: 73.5vw;
    }
`;

const ArrowBox = styled.div`
    display: flex;
    align-items: center;
`;

const Arrow = styled.img`
    width: 25px;
    height: 25px;
    margin-left: 10px;
    cursor: pointer;

    @media screen and (max-width: 1200px){
        width: 1.5vw;
        height: 1.5vw;
        margin: 0.9vw;
    }
`;


export default RefrigeratorBox;