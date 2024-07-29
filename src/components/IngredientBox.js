import React, { useState } from 'react';
import styled from 'styled-components';
import exit from '../assets/images/x.svg'
import Ingredient from './Ingredient';

const IngredientBox = ({closeIngredientBox, storageName}) => {
    const [searchValue, setSearchValue] = useState('');

    const save = (event) => {
        setSearchValue(event.target.value);
    }

    return (
        <>
            <SearchBox>
                <SearchInput placeholder="재료 검색하기" onChange={save}/>
                <Exit src={exit} alt = "나가기" onClick={closeIngredientBox}/>
            </SearchBox>
            <BottomBox>
                <Ingredient 
                searchValue={searchValue} 
                storageName={storageName}
                closeIngredientBox={closeIngredientBox}
                />
            </BottomBox>
        </>

    );
};

const SearchBox = styled.div`
    width: 300px;
    height: 55px;
    background-color: ${({theme})=>theme.colors.ingredient};
    border-radius: 30px 30px 0 0;
    border: none;
    border-bottom: 1px solid ${({theme})=> theme.colors.helperText};
    display: flex;
    align-items: center;
`;


const SearchInput = styled.input`
    width: 205px;
    background-color: transparent;
    border: none;
    outline: none;
    margin-left: 35px;
`;

const Exit = styled.img`
    margin-left: 10px;
    cursor: pointer;
`;

const BottomBox = styled.div`
    background-color: ${({theme})=>theme.colors.ingredient};
    width: 300px;
    height: 260px;
    display: flex;
    justify-content: center;
    overflow-y: auto; 
`;

export default IngredientBox;