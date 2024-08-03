import React from "react";
import styled from "styled-components";

const InputFilled = ({
  placeholder,
  type,
  value,
  onChange,
  hint,
  error,
  success,
}) => {
  return (
    <InputContainer>
      <Filled
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        isValid={!error && value !== ""}
        isSuccess={success}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {!error && !value && hint && <Hint>{hint}</Hint>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
    </InputContainer>
  );
};

const InputContainer = styled.div`
  position: relative;
  width: fit-content;

  @media screen and (max-width: 480px) {
    width: 80vw;
  }
`;

const Filled = styled.input`
  width: 400px;
  min-height: 60px;
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  ${({ theme }) => theme.fonts.default};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  &:focus {
    outline: none;
  }

  @media screen and (max-width: 480px) {
    width: 100%;
    min-height: 12vw;
  }
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  margin-top: 5px;
  ${({ theme }) => theme.fonts.helpText12};

  @media screen and (max-width: 480px) {
    margin-top: 1vw;
    font-size: 2.4vw;
  }
`;

const Hint = styled.div`
  color: ${({ theme }) => theme.colors.helperText};
  margin-top: 5px;
  ${({ theme }) => theme.fonts.helpText12};

  @media screen and (max-width: 480px) {
    margin-top: 1vw;
    font-size: 2.4vw;
  }
`;

const SuccessMessage = styled.div`
  color: ${({ theme }) => theme.colors.check};
  margin-top: 5px;
  ${({ theme }) => theme.fonts.helpText12};

  @media screen and (max-width: 480px) {
    margin-top: 1vw;
    font-size: 2.4vw;
  }
`;

export default InputFilled;
