import React from 'react'
import styled from 'styled-components';

const ContentsBox = () => {
    return (
        <Wrapper>
            <SmallWrapper></SmallWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    background-color: ${({theme}) => theme.colors.green200};
    width: 40vw;
    height: calc(40vw * 1.1);
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 1100px){
        width: 50vw;
        height: calc(50vw * 1.1);
    }

    @media screen and (max-width: 800px){
        width: 70vw;
        height: calc(70vw * 1.1);
    }
    `;
    

const SmallWrapper = styled.div`
    background-color: ${({theme})=>theme.colors.green100};
    width: 90%;
    height: 78%;
`;

export default ContentsBox;