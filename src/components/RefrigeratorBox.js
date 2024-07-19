import React from 'react';
import styled from 'styled-components';
import RefrigeratorSection from "./RefrigeratorSection"

const RefrigeratorBox = () => {
    return (
        <Wrapper>
            <TopLine />
            <LinBox>
                <RefrigeratorSection />
                <Line />
                <RefrigeratorSection />
                <Line />
                <RefrigeratorSection />
                <Line />
                <RefrigeratorSection />
            </LinBox>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    background-color: ${({theme})=> theme.colors.green200};
    width: 1150px;
    height: 42vw;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: 1200px){
        width: 80vw;
        height: 53.6vw;
        border-radius: 0.52vw;
    }

`;

const TopLine = styled.div`
    width: 92%;
    height: 8%;
    border-radius: 10px;
    background-color: ${({theme})=>theme.colors.white};
    margin-top: 5%;
    margin-bottom: 2%;
`;

const LinBox = styled.div`
    width: 92%;
    height: 75%;
    display: flex;
    flex-direction: column;
    gap: 3%;
`;

const Line = styled.div`
    width: 100%;
    height: 4%;
    background-color: ${({theme})=>theme.colors.white};
`;

export default RefrigeratorBox;