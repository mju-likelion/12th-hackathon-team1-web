import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal';

const Ingredient = ({searchValue}) => {
    const[choseShowIngredient, setChoseShowIngredient] = useState(false);
    const [ingredientValue, setIngredientValue] = useState('');

    const arrays = [
        {name: '양파'},
        {name: '대파'},
        {name: '양파볶음'},
    ];

    const openModal = (ingredientName) => {
        setIngredientValue(ingredientName)
        setChoseShowIngredient(true);
    }

    const closeModal = () => {
        setChoseShowIngredient(false);
    }

    return (
        <IngredientWrapper>
        {arrays.map((ingredient, index) => ingredient.name.includes(searchValue) && (
            <IngredientBox key={index} onClick={() =>openModal(ingredient.name)}>{ingredient.name}</IngredientBox>
        ))}
        {choseShowIngredient && 
        <Modal 
        closeModal={closeModal} 
        ingredientValue={ingredientValue}/>}
        </IngredientWrapper>
        
    );
};

const IngredientWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const IngredientBox = styled.button`
    background-color: ${({theme})=> theme.colors.white};
    width: 250px;
    height: 25px;
    border-radius: 7px;
    margin-top: 15px;
`;

export default Ingredient;