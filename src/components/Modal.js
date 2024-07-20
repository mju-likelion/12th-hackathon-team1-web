import React from 'react';
import styled from 'styled-components';
import AddIngredient from '../pages/AddIngredient';

const Modal = ({closeModal, ingredientValue}) => {
  const handleWrapperClick = (e) => {
    e.stopPropagation();
  };
  return (

      <ModalWrapper onClick={closeModal}>
        <div onClick={handleWrapperClick}>
          <AddIngredient 
          closeModal={closeModal}
          ingredientValue={ingredientValue}
          />
        </div>
      </ModalWrapper>

  );
};

const ModalWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;


export default Modal;