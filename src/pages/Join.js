import React, { useState } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import InputFilled from "../components/InputFilled";
import BigButton from "../components/BigButton";
import { Axios } from "../api/Axios";

const Join = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailSuccess, setEmailSuccess] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [nameSuccess, setNameSuccess] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (value) => {
    const schema = Yup.string().matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "잘못된 형식의 아이디(이메일)입니다."
    );
    schema
      .validate(value)
      .then(() => {
        setEmailError("");
        setIsEmailValid(true);
        setEmailSuccess("올바른 형식의 아이디(이메일)입니다.");
      })
      .catch((err) => {
        setEmailError(err.message);
        setIsEmailValid(false);
        setEmailSuccess("");
      });
  };

  const validatePassword = (value) => {
    const schema = Yup.string().matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,14})/,
      "잘못된 형식의 비밀번호입니다."
    );
    schema
      .validate(value)
      .then(() => {
        setPasswordError("");
        setIsPasswordValid(true);
        setPasswordSuccess("올바른 형식의 비밀번호입니다.");
      })
      .catch((err) => {
        setPasswordError(err.message);
        setIsPasswordValid(false);
        setPasswordSuccess("");
      });
  };

  const validateName = (value) => {
    const schema = Yup.string().matches(
      /^[a-zA-Z가-힣]{3,10}$/,
      "사용하실 닉네임(3~10자)을 입력해주세요. 특수기호 사용불가."
    );
    schema
      .validate(value)
      .then(() => {
        setNameError("");
        setIsNameValid(true);
        setNameSuccess("올바른 형식의 닉네임입니다.");
      })
      .catch((err) => {
        setNameError(err.message);
        setIsNameValid(false);
        setNameSuccess("");
      });
  };

  const handleSignup = async () => {
    if (isEmailValid && isPasswordValid && isNameValid) {
      try {
        const response = await Axios.post("/auth/signin", {
          name,
          email,
          password,
        });
        if (response.status === 201) {
          navigate("/auth/login");
        }
      } catch (error) {
        console.error("회원가입 중 에러 발생:", error);
        if (error.response) {
          if (error.response.status === 409) {
            if (error.response.data.errorCode === "4090") {
              alert(error.response.data.message);
            } else {
              console.error("서버에서 에러 응답:", error.response.data);
            }
          } else {
            console.error("서버에서 에러 응답:", error.response.data);
          }
        } else {
          console.error("클라이언트 요청에서 에러 발생:", error.message);
        }
      }
    }
  };

  return (
    <Container>
      <CenteredBox>
        <AllBox>
          <Title>회원가입</Title>
          <FormContainer>
            <InputFilled
              placeholder="아이디(이메일)"
              type="text"
              value={email}
              onChange={(e) => {
                const value = e.target.value;
                setEmail(value);
                if (value === "") {
                  setEmailError("");
                  setIsEmailValid(false);
                  setEmailSuccess("");
                } else {
                  validateEmail(value);
                }
              }}
              hint={
                emailError ? "" : "사용하실 아이디(이메일)를 입력하여 주세요."
              }
              error={emailError}
              success={emailSuccess}
            />
            <InputFilled
              placeholder="비밀번호"
              type="password"
              value={password}
              onChange={(e) => {
                const value = e.target.value;
                setPassword(value);
                if (value === "") {
                  setPasswordError("");
                  setIsPasswordValid(false);
                  setPasswordSuccess("");
                } else {
                  validatePassword(value);
                }
              }}
              hint={
                passwordError
                  ? ""
                  : "영문, 숫자, 특수문자를 조합하여 8~14글자 미만으로 입력하여 주세요."
              }
              error={passwordError}
              success={passwordSuccess}
            />
            <InputFilled
              placeholder="닉네임"
              type="text"
              value={name}
              onChange={(e) => {
                const value = e.target.value;
                setName(value);
                if (value === "") {
                  setNameError("");
                  setIsNameValid(false);
                  setNameSuccess("");
                } else {
                  validateName(value);
                }
              }}
              hint={
                nameError
                  ? ""
                  : "사용하실 닉네임(3~10자)을 입력하여 주세요. (특수기호 사용 불가)"
              }
              error={nameError}
              success={nameSuccess}
            />
            <ButtonContainer>
              <BigButton
                disabled={!isEmailValid || !isPasswordValid || !isNameValid}
                onClick={handleSignup}
              >
                회원가입
              </BigButton>
            </ButtonContainer>
          </FormContainer>
        </AllBox>
      </CenteredBox>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;

  @media screen and (max-width: 480px) {
    padding: 4vw;
  }
`;

const CenteredBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media screen and (max-width: 480px) {
    flex-direction: column;
  }
`;

const AllBox = styled.div`
  width: 650px;
  height: 600px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 32px;

  @media screen and (max-width: 480px) {
    width: 90vw;
    height: auto;
    padding: 8vw;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 20px;

  @media screen and (max-width: 480px) {
    gap: 4vw;
  }
`;

const Title = styled.p`
  ${({ theme }) => theme.fonts.title32};
  margin-top: 30px;
  margin-bottom: 40px;

  @media screen and (max-width: 480px) {
    font-size: 6vw;
    margin-top: 4vw;
    margin-bottom: 8vw;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 25px;

  @media screen and (max-width: 480px) {
    margin-top: 5vw;
  }
`;

export default Join;
