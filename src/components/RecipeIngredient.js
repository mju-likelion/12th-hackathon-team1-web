import React, { useEffect, useState } from "react";
import styled from "styled-components";
import exit from "../assets/images/x.svg";
import { Axios } from "../api/Axios";

const RecipeIngredient = ({ closeIngredientBox, onIngredientSelect }) => {
  const [searchValue, setSearchValue] = useState("");
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await Axios.get("/ingredients", {
          params: { name: searchValue },
        });
        setIngredients(response.data.data.ingredients);
      } catch (error) {
        console.error(error);
      }
    };

    fetchIngredients();
  }, [searchValue]);

  const handleIngredientSelect = (ingredients) => {
    onIngredientSelect({ name: ingredients.name, id: ingredients.id }); // ID를 함께 전달
    closeIngredientBox();
  };

  return (
    <IngredientContainer>
      <SearchBox>
        <SearchInput
          placeholder="재료 검색하기"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Exit src={exit} alt="나가기" onClick={closeIngredientBox} />
      </SearchBox>
      <BottomBox>
        {ingredients.map((ingredient) => (
          <IngredientBox
            key={ingredient.id}
            onClick={() => handleIngredientSelect(ingredient)}
          >
            {ingredient.name}
          </IngredientBox>
        ))}
      </BottomBox>
    </IngredientContainer>
  );
};

const IngredientBox = styled.button`
  background-color: ${({ theme }) => theme.colors.white};
  width: 250px;
  height: 35px;
  border-radius: 5px;
  margin-top: 15px;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
`;

const IngredientContainer = styled.div`
  position: absolute;
  z-index: 1200;
`;

const SearchBox = styled.div`
  width: 300px;
  height: 55px;
  background-color: ${({ theme }) => theme.colors.ingredient};
  border-radius: 30px 30px 0 0;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.helperText};
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
  background-color: ${({ theme }) => theme.colors.ingredient};
  width: 300px;
  height: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`;

export default RecipeIngredient;
