import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../pages/Modal';

const Ingredient = ({searchValue, storageName, closeIngredientBox}) => {
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
        closeIngredientBox();
    }

    return (
        <IngredientWrapper>
        {arrays.map((ingredient, index) => ingredient.name.includes(searchValue) && (
            <IngredientBox key={index} onClick={() =>openModal(ingredient.name)}>{ingredient.name}</IngredientBox>
        ))}
        {choseShowIngredient && 
        <Modal 
        closeModal={closeModal} 
        ingredientValue={ingredientValue}
        storageName={storageName}
        closeIngredientBox={closeIngredientBox}
        modal= "등록"
        />}
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