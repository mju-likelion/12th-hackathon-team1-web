import React, {useState, useRef, useEffect} from 'react';
import styled, {keyframes} from 'styled-components';
import RefrigeratorSection from './RefrigeratorSection';
import arrow from '../assets/images/next.svg'

const RefrigeratorBox = () => {
    const [ButtonText, setButtonText] = useState('편집');
    const dateRefOne = useRef(null);
    const dateRefTwo = useRef(null);
    const dateRefThree = useRef(null);
    const dateRefFour = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    const toggleButton = () => {
        setButtonText((prevText) => (prevText === '편집' ? '저장' : '편집'));
    };

    const handleScroll = (ref) => {
        if (ref.current) {
            ref.current.scrollBy({ left: 220, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 300)); // 2초 지연 시뮬레이션
            setIsLoading(false);
        };

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <LoadingWrapper>
                <LoadingSpinner />
            </LoadingWrapper>
        );
    }

    return (
        <Wrapper>
            <BoxWrapper>
                <TopLine>
                    <Button onClick={toggleButton}>{ButtonText}</Button>
                </TopLine>
                    <WrapperWrapper>
                            <RefrigeratorSection 
                                title="유통기한 만료"
                                dateRef={dateRefOne}
                                ButtonText={ButtonText}
                            />
                        <ArrowBox onClick={() => handleScroll(dateRefOne)}>
                            <Arrow src={arrow} alt="화살표"/>
                        </ArrowBox>
                    </WrapperWrapper>
                    <Line />
                    <WrapperWrapper>
                            <RefrigeratorSection 
                                title="냉동실"
                                dateRef={dateRefTwo}
                                ButtonText={ButtonText} />
                        <ArrowBox onClick={() => handleScroll(dateRefTwo)}>
                            <Arrow src={arrow} alt="화살표"/>
                        </ArrowBox>
                    </WrapperWrapper>
                    <Line />
                    <WrapperWrapper>
                            <RefrigeratorSection 
                                title="냉장실"
                                dateRef={dateRefThree}
                                ButtonText={ButtonText} />
                        <ArrowBox onClick={() => handleScroll(dateRefThree)}>
                            <Arrow src={arrow} alt="화살표"/>
                        </ArrowBox>
                    </WrapperWrapper>
                    <Line />
                    <WrapperWrapper>
                            <RefrigeratorSection 
                                title="상온"
                                dateRef={dateRefFour}
                                ButtonText={ButtonText}/>
                        <ArrowBox onClick={() => handleScroll(dateRefFour)}>
                            <Arrow src={arrow} alt="화살표"/>
                        </ArrowBox>
                    </WrapperWrapper>
            </BoxWrapper>
        </Wrapper>
    );
};

const LoadingWrapper = styled.div`
    height: 70vh;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 1200px) {
        height: 50vh;
    }
`;

const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const LoadingSpinner = styled.div`
    border: 16px solid #f3f3f3;
    border-top: 16px solid ${({theme})=>theme.colors.green200};
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: ${rotate} 2s linear infinite;
`;


const Wrapper = styled.div`
    background-color: ${({theme})=> theme.colors.green200};
    width: 1150px;
    height: 772px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 1200px){
        width: 80vw;
        height: 53.6vw;
        border-radius: 0.52vw;
    }

`;

const BoxWrapper = styled.div`
    width: 1058px;
    height: 700px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;

    @media screen and (max-width: 1200px){
        width: 73.5vw;
        height: 48.7vw;
        gap: 1.05vw;
    }
`;

const TopLine = styled.div`
    width: 1058px;
    height: 61px;
    border-radius: 10px;
    background-color: ${({theme})=>theme.colors.white};
    margin-bottom: 20px;
    display: flex;
    justify-content: end;
    align-items: center;

    @media screen and (max-width: 1200px){
        width: 73.5vw;
        height: 4.24vw;
        border-radius: 0.52vw;
        margin-bottom: 1vw;
    }
`;

const Button = styled.button`
    background-color: ${({theme})=> theme.colors.green200};
    ${({theme})=> theme.fonts.default16}
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
        font-size: 1.3vw;
    }
`;

const WrapperWrapper = styled.div`
    display: flex;
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
position: absolute;
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