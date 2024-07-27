import styled from "styled-components";
import ModifyModal from "../components/ModifyModal";
import FoodBoxModal from "../components/FoodBoxModal";
import AddModal from "../components/AddModal";

const Modal = ({
  isCloseShowFood,
  modal,
  name,
  year,
  month,
  date,
  id,
  closeModal,
  ingredientValue,
  storageName,
  closeIngredientBox,
  isDate,
  idName,
  main
}) => {
  return (
    <>
      <ModalBackground onClick={isCloseShowFood}>
        {modal === "단건조회" && (
          <FoodBoxModal
            isCloseShowFood={isCloseShowFood}
            id={id}
            isDate={isDate}
            idName={idName}
            main={main}
          />
        )}
        {modal === "수정" && (
          <ModifyModal
            name={name}
            id={id}
            isCloseShowFood={isCloseShowFood}
          />
        )}
        {modal === "등록" && (
          <AddModal
            closeModal={closeModal}
            ingredientValue={ingredientValue}
            storageName={storageName}
            closeIngredientBox={closeIngredientBox}
          />
        )}
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
  z-index: 1200;
`;

export default Modal;
