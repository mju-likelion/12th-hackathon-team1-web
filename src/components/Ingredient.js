import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from '../pages/Modal';
import { Axios } from '../api/Axios';

const Ingredient = ({searchValue, storageName, closeIngredientBox}) => {
    const[addIngredient, setAddIngredient] = useState(false);
    const [ingredientName, setIngredientName] = useState('');
    const [ingredientId, setIngredientId] = useState('');
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        const fetchRec = async() => {
            try{
                const response = await Axios.get(`/ingredients`, {
                    params: { name: ingredientName },
                });
                setIngredients(response.data.data.ingredients)
            }catch(error){
                console.error(error);
            }
        }
        fetchRec();
    }, [ingredientName])

    const openAddModal = (name, id) => {
        setIngredientName(name);
        setIngredientId(id);
        setAddIngredient(true);
    }

    const closeAddModal = () => {
        setAddIngredient(false);
        closeIngredientBox();
    }

    return (
        <IngredientWrapper>
        {ingredients.map((ingredient) => 
        ingredient.name.includes(searchValue) && (
        <IngredientBox 
        ingredientId={ingredient.id}
        onClick={() =>openAddModal(ingredient.name, ingredient.id)}>{ingredient.name}</IngredientBox>
        ))}
        {addIngredient && 
        <Modal 
        closeAddModal={closeAddModal} 
        ingredientName={ingredientName}
        ingredientId = {ingredientId}
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
    border-radius: 5px;
    margin-top: 15px;
`;

export default Ingredient;