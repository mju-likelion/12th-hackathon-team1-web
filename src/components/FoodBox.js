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
    width: 10vw;
    height: 5.5vw;
    border-radius: 2vw;
    display: flex;
    justify-content: center;
`;

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20%;
`;

const IngredientName = styled.p`
    font-size: 1.3vw;
`;

const IngredientDate = styled.p`
    font-size: 0.8vw;
`;

export default FoodBox;