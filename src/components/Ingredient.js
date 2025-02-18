import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Axios } from '../api/Axios';
import AddModal from './AddModal';

const Ingredient = ({searchValue, storageName, closeIngredientBox}) => {
    const[addIngredient, setAddIngredient] = useState(false);
    const [ingredientName, setIngredientName] = useState('');
    const [ingredientId, setIngredientId] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [maxLength, setMaxLength] = useState('');

    useEffect(() => {
        const handleResize = () => {
                setMaxLength(20);
            };
        
            window.addEventListener("resize", handleResize);
        
            handleResize();
        
            return () => {
            window.removeEventListener("resize", handleResize);
            };
        }, []);

    const truncateText = (text, maxLength) => {
        if (!text) return "";
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + "...";
            }
            return text;
        };

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
        onClick={() =>openAddModal(ingredient.name, ingredient.id)}>{truncateText(ingredient.name, maxLength)}</IngredientBox>
        ))}
        {addIngredient && 
        <AddModal 
        closeAddModal={closeAddModal} 
        ingredientName={ingredientName}
        ingredientId = {ingredientId}
        storageName={storageName}
        closeIngredientBox={closeIngredientBox}
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

    @media screen and (max-width: 480px){
        width: 50vw;
        height: 8vw;
        font-size: 3vw;
    }
`;

export default Ingredient;