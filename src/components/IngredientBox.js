import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import exit from '../assets/images/x.svg'
import Ingredient from './Ingredient';

const IngredientBox = ({closeIngredientBox, storageName}) => {
    const [searchValue, setSearchValue] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const save = (event) => {
        setSearchValue(event.target.value);
    }

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isDragging) {
                setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, offset]);


    return (
        <Wrapper
            style={{ top: `${position.y}px`, left: `${position.x}px` }}
        >
            <SearchBox onMouseDown={handleMouseDown}>
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
        </Wrapper>

    );
};

const Wrapper = styled.div`
    position: absolute;
    z-index: 1000;
`;

const SearchBox = styled.div`
    width: 300px;
    height: 55px;
    background-color: ${({theme})=>theme.colors.ingredient};
    border-radius: 30px 30px 0 0;
    border: none;
    border-bottom: 1px solid ${({theme})=> theme.colors.helperText};
    display: flex;
    align-items: center;
    cursor: move;

    @media screen and (max-width: 480px){
        width: 58vw;
        height: 10vw;
        border-radius: 2vw 2vw 0 0;
    }
`;


const SearchInput = styled.input`
    width: 205px;
    background-color: transparent;
    border: none;
    outline: none;
    margin-left: 35px;

    @media screen and (max-width: 480px){
        width: 45vw;
        height: 10vw;
        margin-left: 3vw;
        font-size: 3vw;
    }
`;

const Exit = styled.img`
    margin-left: 10px;
    cursor: pointer;

    @media screen and (max-width: 480px){
        width: 5vw;
        height: 5vw;
        margin-left: 1.5vw;
    }
`;

const BottomBox = styled.div`
    background-color: ${({theme})=>theme.colors.ingredient};
    width: 300px;
    height: 260px;
    display: flex;
    justify-content: center;
    overflow-y: auto; 

    @media screen and (max-width: 480px){
        width: 58vw;
        height: 58vw;
    }
`;

export default IngredientBox;