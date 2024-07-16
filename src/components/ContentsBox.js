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
    height: 44vw;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 1200px){
        width: 50vw;
        height: 55vw;
    }

    @media screen and (max-width: 800px){
        width: 70vw;
        height: 77vw;
    }
    `;
    

const SmallWrapper = styled.div`
    background-color: ${({theme})=>theme.colors.green100};
    width: 90%;
    height: 78%;
`;

export default ContentsBox;