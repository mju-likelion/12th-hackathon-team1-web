import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as Yup from "yup";
import InputFilled from "../components/InputFilled";
import BigButton from "../components/BigButton";
import { Axios } from "../api/Axios";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (value) => {
    const schema = Yup.string().matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "잘못된 아이디(이메일)입니다."
    );
    schema
      .validate(value)
      .then(() => {
        setEmailError("");
        setIsEmailValid(true);
      })
      .catch((err) => {
        setEmailError(err.message);
        setIsEmailValid(false);
      });
  };

  const validatePassword = (value) => {
    const schema = Yup.string().matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,14})/,
      "잘못된 비밀번호입니다."
    );
    schema
      .validate(value)
      .then(() => {
        setPasswordError("");
        setIsPasswordValid(true);
      })
      .catch((err) => {
        setPasswordError(err.message);
        setIsPasswordValid(false);
      });
  };

  const handleLogin = async () => {
    if (isEmailValid && isPasswordValid) {
      try {
        const response = await Axios.post(`/auth/login`, {
          email,
          password,
        });
        console.log(response.data);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userToken", response.data.token);
        setIsLoggedIn(true);
        navigate("/main");
      } catch (error) {
        console.error("로그인 실패", error);
      }
    }
  };

  return (
    <Container>
      <CenteredBox>
        <AllBox>
          <Title>로그인</Title>
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
                } else {
                  validateEmail(value);
                }
              }}
              hint={
                emailError ? "" : "사용하실 아이디(이메일)를 입력하여 주세요."
              }
              error={emailError}
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
            />
            <ButtonContainer>
              <BigButton
                disabled={!isEmailValid || !isPasswordValid}
                onClick={handleLogin}
              >
                로그인
              </BigButton>
            </ButtonContainer>
            <SignUp>
              처음 방문이신가요?
              <Link to="/auth/signin">
                <SignUpLink> 회원가입</SignUpLink>
              </Link>
            </SignUp>
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
  height: 514px;
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
  margin: 30px;

  @media screen and (max-width: 480px) {
    font-size: 6vw;
    margin: 4vw;
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

const SignUp = styled.div`
  margin-top: 20px;
  ${({ theme }) => theme.fonts.helpText14};
  color: ${({ theme }) => theme.colors.helperText};

  @media screen and (max-width: 480px) {
    font-size: 3.5vw;
  }
`;

const SignUpLink = styled.p`
  ${({ theme }) => theme.fonts.default16};
  color: ${({ theme }) => theme.colors.black};
  text-decoration: none;
  &:visited {
    color: ${({ theme }) => theme.colors.black};
  }
  &:active {
    color: ${({ theme }) => theme.colors.black};
  }
  &:hover {
    text-decoration: underline;
  }

  @media screen and (max-width: 480px) {
    font-size: 4vw;
  }
`;

export default Login;
