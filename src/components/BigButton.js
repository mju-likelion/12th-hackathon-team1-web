import React from 'react';
import styled from 'styled-components';

const BigButton = () => {
    return (
        <Btn>
        </Btn>
    );
};

const Btn = styled.button`
    width: 400px;
    height: 60px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.greenButton};
    color: ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.fonts.bigButtonText}
`;

export default BigButton;