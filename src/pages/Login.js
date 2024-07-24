import React, { useState } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import InputFilled from "../components/InputFilled";
import BigButton from "../components/BigButton";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [userIdError, setUserIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isUserIdValid, setIsUserIdValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const validateUserId = (value) => {
    const schema = Yup.string().matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "잘못된 아이디(이메일)입니다."
    );
    schema
      .validate(value)
      .then(() => {
        setUserIdError("");
        setIsUserIdValid(true);
      })
      .catch((err) => {
        setUserIdError(err.message);
        setIsUserIdValid(false);
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

  const handleLogin = () => {
    if (isUserIdValid && isPasswordValid) {
      try {
        const response = {
          userId,
          password,
        };
        console.log(response);
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
              value={userId}
              onChange={(e) => {
                const value = e.target.value;
                setUserId(value);
                if (value === "") {
                  setUserIdError("");
                  setIsUserIdValid(false);
                } else {
                  validateUserId(value);
                }
              }}
              hint={
                userIdError ? "" : "사용하실 아이디(이메일)를 입력하여 주세요."
              }
              error={userIdError}
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
            <Button>
              <BigButton
                disabled={!isUserIdValid || !isPasswordValid}
                onClick={handleLogin}
              >
                로그인
              </BigButton>
            </Button>
            <SignUp>
              처음 방문이신가요? <SignUpLink href="/join">회원가입</SignUpLink>
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
`;

const CenteredBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
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
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 20px;
`;

const Title = styled.p`
  ${({ theme }) => theme.fonts.title32};
  margin: 30px;
`;

const Button = styled.div`
  margin-top: 25px;
`;

const SignUp = styled.div`
  margin-top: 20px;
  ${({ theme }) => theme.fonts.helpText14};
  color: ${({ theme }) => theme.colors.helperText};
`;

const SignUpLink = styled.a`
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
`;

export default Login;
