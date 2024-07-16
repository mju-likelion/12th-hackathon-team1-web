import React from 'react';
import styled from 'styled-components';

const InputFilled = () => {
    return (
        <InputBox>
        </InputBox>
    );
};

const InputBox = styled.input`
    width: 400px;
    height: 60px;
    border-radius: 10px;
    border-bottom: 1px solid ${({theme})=>theme.colors.helperText};
    border-top: none;
    border-left: none;
    border-right: none;
    background-color: white;
`;

export default InputFilled;