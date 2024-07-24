import React, { useState } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import InputFilled from "../components/InputFilled";
import BigButton from "../components/BigButton";

const Join = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [userIdError, setUserIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [userIdSuccess, setUserIdSuccess] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [nicknameSuccess, setNicknameSuccess] = useState("");
  const [isUserIdValid, setIsUserIdValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isNicknameValid, setIsNicknameValid] = useState(false);

  const navigate = useNavigate();

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
        setUserIdSuccess("사용가능한 아이디(이메일)입니다.");
      })
      .catch((err) => {
        setUserIdError(err.message);
        setIsUserIdValid(false);
        setUserIdSuccess("");
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
        setPasswordSuccess("사용가능한 비밀번호입니다.");
      })
      .catch((err) => {
        setPasswordError(err.message);
        setIsPasswordValid(false);
        setPasswordSuccess("");
      });
  };

  const validateNickname = (value) => {
    const schema = Yup.string().matches(
      /^[a-zA-Z가-힣]{3,10}$/,
      "사용하실 닉네임(3~10자)을 입력해주세요. 특수기호 사용불가."
    );
    schema
      .validate(value)
      .then(() => {
        setNicknameError("");
        setIsNicknameValid(true);
        setNicknameSuccess("사용가능한 닉네임입니다.");
      })
      .catch((err) => {
        setNicknameError(err.message);
        setIsNicknameValid(false);
        setNicknameSuccess("");
      });
  };

  const handleSignUp = () => {
    if (isUserIdValid && isPasswordValid && isNicknameValid) {
      try {
        const response = {
          userId,
          password,
          nickname,
        };
        console.log(response);
        navigate("/auth/login ");
      } catch (error) {
        console.error("회원가입 실패", error);
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
              value={userId}
              onChange={(e) => {
                const value = e.target.value;
                setUserId(value);
                if (value === "") {
                  setUserIdError("");
                  setIsUserIdValid(false);
                  setUserIdSuccess("");
                } else {
                  validateUserId(value);
                }
              }}
              hint={
                userIdError ? "" : "사용하실 아이디(이메일)를 입력하여 주세요."
              }
              error={userIdError}
              success={userIdSuccess}
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
              value={nickname}
              onChange={(e) => {
                const value = e.target.value;
                setNickname(value);
                if (value === "") {
                  setNicknameError("");
                  setIsNicknameValid(false);
                  setNicknameSuccess("");
                } else {
                  validateNickname(value);
                }
              }}
              hint={
                nicknameError
                  ? ""
                  : "사용하실 닉네임(3~10자)을 입력하여 주세요. (특수기호 사용 불가)"
              }
              error={nicknameError}
              success={nicknameSuccess}
            />
            <Button>
              <BigButton
                disabled={
                  !isUserIdValid || !isPasswordValid || !isNicknameValid
                }
                onClick={handleSignUp}
              >
                회원가입
              </BigButton>
            </Button>
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
  height: 600px;
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
  margin-top: 30px;
  margin-bottom: 40px;
`;

const Button = styled.div`
  margin-top: 25px;
`;

export default Join;
