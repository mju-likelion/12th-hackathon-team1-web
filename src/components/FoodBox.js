import React from 'react';
import styled from 'styled-components';

const FoodBox = (props) => {
    return (
        <Box>
            <TextWrapper>
                <IngredientName isDate={props.id === "date"}>사과</IngredientName>
                <IngredientDate isDate={props.id === "date"}>유통기한: 2024.08.07</IngredientDate>
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
    flex-shrink: 0;

    @media screen and (max-width: 1200px) {
        width: 12vw;
        height: 7vw;
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
    color: ${({theme, isDate})=> (isDate ? theme.colors.dateGray : 'initial')};

    @media screen and (max-width: 1200px){
        font-size: 1.3vw;
    }
`;

const IngredientDate = styled.p`
    ${({theme})=>theme.fonts.default12}
    color: ${({theme, isDate})=> (isDate ? theme.colors.dateGray : 'initial')};

    @media screen and (max-width:1200px){
        font-size: 0.8vw;
    }
`;

export default FoodBox;