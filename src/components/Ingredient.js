import React from 'react';
import styled from 'styled-components';

const Ingredient = () => {
    return (
        <IngredientBox>
            양파
        </IngredientBox>
    );
};

const IngredientBox = styled.button`
    background-color: ${({theme})=> theme.colors.white};
    width: 250px;
    height: 25px;
    border-radius: 7px;
    margin-top: 2vw;
`;

export default Ingredient;