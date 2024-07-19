import React from 'react'
import styled from 'styled-components';
import SmallButton from './SmallButton';

const ContentsBox = () => {
    return (
        <WrapperBox>
            <Wrapper>
                <SmallWrapper />
                <ButtonWrapper>
                    <SmallButton />
                    <SmallButton />
                </ButtonWrapper>
            </Wrapper>
        </WrapperBox>
    );
};

const WrapperBox = styled.div`
    background-color: ${({theme}) => theme.colors.green200};
    width: 800px;
    height: 836px;
    display: flex;
    
    justify-content: center;
    border-radius: 1vw;

    @media screen and (max-width: 1200px){
        width: 57.3vw;
        height: 60vw;
    }
    `;
    

const Wrapper = styled.div`
    display: flex;
    align-items: end;
    flex-direction: column;
    margin-top: 100px;

    @media screen and (max-width: 1200px){
        margin-top: 8vw;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 1.3vw;
`;

const SmallWrapper = styled.div`
    background-color: ${({theme})=>theme.colors.green100};
    width: 725px;
    height: 630px;
    border-radius: 10px;
    margin-bottom: 25px;

    @media screen and (max-width: 1200px){
        width: 50vw;
        height: 45vw;
        border-radius: 0.52vw;
        margin-bottom: 1.5vw;
    }
`;


export default ContentsBox;