import React from 'react';
import styled from 'styled-components';

const FoodBox = () => {
    return (
        <Box>
            <TextWrapper>
                <IngredientName>사과</IngredientName>
                <IngredientDate>유통기한: 2024.08.07</IngredientDate>
            </TextWrapper>
        </Box>
    );
};

const Box = styled.div`
    background-color: ${({theme})=>theme.colors.white};
    width: 172px;
    height: 100px;
    border-radius: 23px;
    display: flex;
    justify-content: center;

    @media screen and (max-width: 1200px) {
        width: 10vw;
        height: 5.5vw;
        border-radius: 1.5vw;
    }
`;

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20%;
`;

const IngredientName = styled.p`
    ${({theme})=>theme.fonts.default18}
    @media screen and (max-width: 1200px){
        font-size: 1.3vw;
    }
`;

const IngredientDate = styled.p`
    ${({theme})=>theme.fonts.default12}

    @media screen and (max-width:1200px){
        font-size: 0.8vw;
    }
`;

export default FoodBox;