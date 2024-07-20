import React, { useState } from 'react';
import styled from 'styled-components';
import FoodBox from './FoodBox';
import IngredientBox from './IngredientBox'
import arrow from '../assets/images/next.svg';
import plus from '../assets/images/circlePlus.svg';

const RefrigeratorBox = () => {
    const [ButtonText, setButtonText] = useState('편집');
    const [showIngredientBox, setShowIngredientBox] = useState(false);

    const [FoodData, setFoodData] = useState([
        {id: 'date', key: 1, title: "사과"},
        {id: 'date', key: 2, title: "자두"},
        {id: 'date', key: 3, title: "양파"},
        {id: 'date' ,key: 4, title: "대파"},
        {id: 'date' ,key: 5, title: "고기"},
        {id: 'date', key: 6, title: "바나나"},
        {id: 'date', key: 7, title: "간장"},
    ]);

    const toggleButton = () => {
        setButtonText(preText => (preText === '편집' ? '저장' : '편집'));
    }

    const removeFoodBox = (key) => {
        setFoodData(FoodData.filter(box => box.key !== key));
    }

    const openIngredientBox = () => {
        setShowIngredientBox(true);
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
                                    <FoodBoxWrapper>
                                        {FoodData.map(box =>(
                                            <FoodBox 
                                            key = {box.key}
                                            id = {box.id}
                                            ButtonText={ButtonText}
                                            title = {box.title}
                                            removeFoodBox={()=>removeFoodBox(box.key)}
                                            />
                                        ))}
                                        {ButtonText === '저장' && <PlusImg src={plus} alt="추가 이미지" onClick={openIngredientBox}/>}
                                    </FoodBoxWrapper>
                                </AllTextWrapper>
                            </Section>
                            <ArrowBox>
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
                                    <FoodBoxWrapper>
                                        <FoodBox ButtonText={ButtonText}/>
                                        <FoodBox ButtonText={ButtonText}/>
                                        <FoodBox ButtonText={ButtonText}/>
                                        <FoodBox ButtonText={ButtonText}/>
                                        <FoodBox ButtonText={ButtonText}/>
                                        <FoodBox ButtonText={ButtonText}/>
                                        <FoodBox ButtonText={ButtonText}/>
                                        {ButtonText === '저장' && <PlusImg src={plus} alt="추가 이미지" onClick={openIngredientBox}/>}
                                    </FoodBoxWrapper>
                                </AllTextWrapper>
                            </Section>
                            <ArrowBox>
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
                                    <FoodBoxWrapper>
                                        <FoodBox ButtonText={ButtonText}/>
                                        <FoodBox ButtonText={ButtonText}/>
                                        <FoodBox ButtonText={ButtonText}/>
                                        <FoodBox ButtonText={ButtonText}/>
                                        <FoodBox ButtonText={ButtonText}/>
                                        <FoodBox ButtonText={ButtonText}/>
                                        <FoodBox ButtonText={ButtonText}/>
                                        {ButtonText === '저장' && <PlusImg src={plus} alt="추가 이미지" onClick={openIngredientBox}/>}
                                    </FoodBoxWrapper>
                                </AllTextWrapper>
                            </Section>
                            <ArrowBox>
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
                                    <FoodBoxWrapper>
                                        <FoodBox ButtonText={ButtonText}/>
                                        <FoodBox ButtonText={ButtonText}/>
                                        <FoodBox ButtonText={ButtonText}/>
                                        <FoodBox ButtonText={ButtonText}/>
                                        <FoodBox ButtonText={ButtonText}/>
                                        <FoodBox ButtonText={ButtonText}/>
                                        <FoodBox ButtonText={ButtonText}/>
                                        {ButtonText === '저장' && <PlusImg src={plus} alt="추가 이미지" onClick={openIngredientBox}/>}
                                    </FoodBoxWrapper>
                                    <IngredientWrapper>
                                        {showIngredientBox  && <IngredientBox 
                                        closeIngredientBox = {closeIngredientBox}
                                        />}
                                    </IngredientWrapper>
                                </AllTextWrapper>
                            </Section>
                            <ArrowBox>
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
    overflow-x: auto;
    white-space: nowrap;

    &::-webkit-scrollbar{
        display: none;
    }

    @media screen and (max-width: 1200px){
        margin-left: 2.5vw;
        gap: 2.5vw;
    }
`;

const PlusImg = styled.img`
    margin-right: 60px;
    margin-left: 10px;
    cursor: pointer;

    @media screen and (max-width: 1200px){
        margin-right: 3.5vw;
        margin-left: 1.3vw;
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