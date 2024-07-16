import React from 'react';
import styled from 'styled-components';

const RefrigeratorBox = () => {
    return (
        <Wrapper>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    background-color: ${({theme})=> theme.colors.green200};
    width: 60vw;
    height: 41vw;
    border-radius: 10px;

    @media screen and (max-width: 1100px ){
        width: 70vw;
        height: 48vw;
    }
`;

export default RefrigeratorBox;