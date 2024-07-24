import styled from 'styled-components';
import ModifyModal from '../components/ModifyModal';
import FoodBoxModal from '../components/FoodBoxModal';
import AddModal from '../components/AddModal';

const Modal = ({isCloseShowFood, modal, title, year, month, date, quantity, storage, memo, id,
    closeModal, ingredientValue, storageName, closeIngredientBox, closeModifyModal, isDate
}) => {
    return (
        <>
        <ModalBackground onClick={isCloseShowFood}>
            {modal === "단건조회" && (
                <FoodBoxModal 
                    isCloseShowFood={isCloseShowFood}
                    title={title}
                    year={year}
                    month={month}
                    date={date}
                    quantity={quantity}
                    storage={storage}
                    memo={memo}
                    id={id}
                    isDate={isDate}
            />)}
            {modal === "수정" && 
            (<ModifyModal 
            title={title}
            id={id}
            quantity={quantity}
            closeModifyModal={closeModifyModal}
            isCloseShowFood={isCloseShowFood}
            />
            )}
            {modal === "등록" &&(
            <AddModal 
            closeModal={closeModal} 
            ingredientValue={ingredientValue}
            storageName={storageName}
            closeIngredientBox={closeIngredientBox}
            />)
            }
        </ModalBackground>
    </>
    );
};

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;


export default Modal;