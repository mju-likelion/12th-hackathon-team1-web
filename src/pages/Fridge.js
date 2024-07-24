import React from 'react';
import styled from 'styled-components';
import RefrigeratorBox from '../components/RefrigeratorBox'

const Refrigerator = () => {
    return (
        <Wrapper>
            <RefrigeratorBox />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 50px;

    @media screen and (max-width: 1200px){
        margin-top: 5vw;
    }
`;

export default Refrigerator;