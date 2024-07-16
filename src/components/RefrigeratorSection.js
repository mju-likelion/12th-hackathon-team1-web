import React from 'react';
import styled from 'styled-components';

const RefrigeratorSection = () => {
    return (
        <Section>
        </Section>
    );
};

const Section = styled.div`
    background-color: ${({theme})=> theme.colors.green100};
    width: 100%;
    height: 100%;
    border-radius: 10px;
`;

export default RefrigeratorSection;