import React, { useState } from 'react';
import styled from 'styled-components';
import FoodBox from './FoodBox';
import arrow from '../assets/images/next.svg';

const RefrigeratorBox = (props) => {
    const [ButtonText, setButtonText] = useState('편집');

    const toggleButton = () => {
        setButtonText(preText => (preText === '편집' ? '저장' : '편집'));
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
                                        <FoodBox id = "date"/>
                                        <FoodBox id="date" />
                                        <FoodBox id="date" />
                                        <FoodBox id="date" />
                                        <FoodBox id="date"/>
                                        <FoodBox id="date"/>
                                        <FoodBox id="date"/>
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
                                        <FoodBox />
                                        <FoodBox />
                                        <FoodBox />
                                        <FoodBox />
                                        <FoodBox />
                                        <FoodBox />
                                        <FoodBox />
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
                                        <FoodBox />
                                        <FoodBox />
                                        <FoodBox />
                                        <FoodBox />
                                        <FoodBox />
                                        <FoodBox />
                                        <FoodBox />
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
                                        <FoodBox />
                                        <FoodBox />
                                        <FoodBox />
                                        <FoodBox />
                                        <FoodBox />
                                        <FoodBox />
                                        <FoodBox />
                                    </FoodBoxWrapper>
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
    width: 100%;
    height: 100%;
`;

const Section = styled.div`
    background-color: ${({theme})=> theme.colors.green100};
    width: 100%;
    height: 100%;
    border-radius: 10px;
`;

const AllTextWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
`;

const TextBox = styled.div`
    width: 230px;
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