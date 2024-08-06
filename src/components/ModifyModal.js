import React, { useState } from "react";
import styled from "styled-components";
import SmallButton from "./SmallButton";
import { Axios } from "../api/Axios";

const ModifyModal = ({
  name,
  id,
  year,
  month,
  date,
  count,
  storage,
  memo,
  closeModifyModal,
  isCloseShowFood,
}) => {
  const [changeYear, setChangeYear] = useState(year);
  const [changeMonth, setChangeMonth] = useState(month);
  const [changeDate, setChangeDate] = useState(date);
  const [changeCount, setChangeCount] = useState(count);
  const [changeStorage, setChangeStorage] = useState(storage);
  const [changeMemo, setChangeMemo] = useState(memo);

  const handleSave = () => {
    Modify();
    isCloseShowFood();
  };

  const handleClose = (e) => {
    e.stopPropagation();
    isCloseShowFood();
  };

  const changeYears = [
    { value: "", label: changeYear },
    { value: "2024", label: "2024" },
    { value: "2025", label: "2025" },
    { value: "2026", label: "2026" },
    { value: "2027", label: "2027" },
  ];
  const changeMonths = [
    { value: "", label: changeMonth },
    { value: "01", label: "01" },
    { value: "02", label: "02" },
    { value: "03", label: "03" },
    { value: "04", label: "04" },
    { value: "05", label: "05" },
    { value: "06", label: "06" },
    { value: "07", label: "07" },
    { value: "08", label: "08" },
    { value: "09", label: "09" },
    { value: "10", label: "10" },
    { value: "11", label: "11" },
    { value: "12", label: "12" },
  ];

  const changeDates = [
    { value: "", label: changeDate },
    { value: "01", label: "01" },
    { value: "02", label: "02" },
    { value: "03", label: "03" },
    { value: "04", label: "04" },
    { value: "05", label: "05" },
    { value: "06", label: "06" },
    { value: "07", label: "07" },
    { value: "08", label: "08" },
    { value: "09", label: "09" },
    { value: "10", label: "10" },
    { value: "11", label: "11" },
    { value: "12", label: "12" },
    { value: "13", label: "13" },
    { value: "14", label: "14" },
    { value: "15", label: "15" },
    { value: "16", label: "16" },
    { value: "17", label: "17" },
    { value: "18", label: "18" },
    { value: "19", label: "19" },
    { value: "20", label: "20" },
    { value: "21", label: "21" },
    { value: "22", label: "22" },
    { value: "23", label: "23" },
    { value: "24", label: "24" },
    { value: "25", label: "25" },
    { value: "26", label: "26" },
    { value: "27", label: "27" },
    { value: "28", label: "28" },
    { value: "29", label: "29" },
    { value: "30", label: "30" },
    { value: "31", label: "31" },
  ];
  const changeCounts = [
    { value: "", label: changeCount },
    { value: "01", label: "01" },
    { value: "02", label: "02" },
    { value: "03", label: "03" },
    { value: "04", label: "04" },
    { value: "05", label: "05" },
    { value: "06", label: "06" },
    { value: "07", label: "07" },
    { value: "08", label: "08" },
    { value: "09", label: "09" },
    { value: "10", label: "10" },
  ];
  const changeStorages = [
    { value: "", label: changeStorage },
    { value: "냉동", label: "냉동" },
    { value: "냉장", label: "냉장" },
    { value: "상온", label: "상온" },
  ];

  const Modify = async () => {
    try {
      await Axios.patch(`/fridge/ingredients/${id}`, {
        ingredientId: id,
        expiredDate: `${changeYear}-${changeMonth}-${changeDate}`,
        quantity: changeCount,
        storage: changeStorage,
        memo: changeMemo,
      });
      window.location.href = `/fridge`;
    } catch (error) {
      console.error(error);
    }
  };

  const close = () => {
    isCloseShowFood();
  };

  return (
    <ModalWrapper onClick={handleClose}>
      <WrapperBox onClick={(e) => e.stopPropagation()}>
        <Wrapper>
          <TitleBox>
            <MainTitle>재료 수정하기</MainTitle>
          </TitleBox>
          <SmallWrapper>
            <TextBoxWrapper>
              <TextWrapper>
                <Title>재료명</Title>
                <NameBox>
                  <Name>{name}</Name>
                </NameBox>
              </TextWrapper>
              <TextWrapper>
                <Title>남은 유통기한</Title>
                <YearWrapper>
                  <YearBox>
                    <Text
                      value={changeYear}
                      onChange={(e) => setChangeYear(e.target.value)}
                    >
                      {changeYears.map((years, index) => (
                        <option
                          key={index}
                          value={years.value}
                          disabled={years.value === ""}
                        >
                          {years.label}
                        </option>
                      ))}
                    </Text>
                    <Year>년</Year>
                  </YearBox>
                  <YearBox>
                    <Text
                      value={changeMonth}
                      onChange={(e) => setChangeMonth(e.target.value)}
                    >
                      {changeMonths.map((months, index) => (
                        <option
                          key={index}
                          value={months.value}
                          disabled={months.value === ""}
                        >
                          {months.label}
                        </option>
                      ))}
                    </Text>
                    <Year>월</Year>
                  </YearBox>
                  <YearBox>
                    <Text
                      value={changeDate}
                      onChange={(e) => setChangeDate(e.target.value)}
                    >
                      {changeDates.map((dates, index) => (
                        <option
                          key={index}
                          value={dates.value}
                          disabled={dates.value === ""}
                        >
                          {dates.label}
                        </option>
                      ))}
                    </Text>
                    <Year>일</Year>
                  </YearBox>
                </YearWrapper>
              </TextWrapper>
              <TextWrapper>
                <Title>수량 설정</Title>
                <Text
                  value={changeCount}
                  onChange={(e) => setChangeCount(e.target.value)}
                >
                  {changeCounts.map((counts, index) => (
                    <option
                      key={index}
                      value={counts.value}
                      disabled={counts.value === ""}
                    >
                      {counts.label}
                    </option>
                  ))}
                </Text>
              </TextWrapper>
              <TextWrapper>
                <Title>보관 방법</Title>
                <Text
                  value={changeStorage}
                  onChange={(e) => setChangeStorage(e.target.value)}
                >
                  {changeStorages.map((storages, index) => (
                    <option
                      key={index}
                      value={storages.value}
                      disabled={storages.value === ""}
                    >
                      {storages.label}
                    </option>
                  ))}
                </Text>
              </TextWrapper>
              <TextWrapper>
                <Title>메모</Title>
                <LongText
                  value={changeMemo}
                  onChange={(e) => setChangeMemo(e.target.value)}
                />
              </TextWrapper>
            </TextBoxWrapper>
          </SmallWrapper>
          <ButtonWrapper>
            <SmallButton text="닫기" onClick={close} />
            <SmallButton text="수정 완료" onClick={handleSave} />
          </ButtonWrapper>
        </Wrapper>
      </WrapperBox>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WrapperBox = styled.div`
  background-color: ${({ theme }) => theme.colors.green200};
  width: 650px;
  height: 680px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;

  @media screen and (max-width: 1200px) {
    width: 57.3vw;
    height: 60vw;
    border-radius: 1vw;
  }

  @media screen and (max-width: 480px) {
    width: 77.2vw;
    height: 104vw;
    border-radius: 2vw;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-between;

  @media screen and (max-width: 1200px) {
    height: 54.5vw;
  }

  @media screen and (max-width: 480px) {
    height: 96vw;
    justify-content: space-between;
  }
`;

const TitleBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  margin-bottom: 25px;

  @media screen and (max-width: 1200px) {
    margin-bottom: 1.5vw;
  }

  @media screen and (max-width: 480px) {
    margin-top: 1.5vw;
  }
`;

const MainTitle = styled.p`
  ${({ theme }) => theme.fonts.title32}

  @media screen and (max-width: 1200px) {
    font-size: 3vw;
  }

  @media screen and (max-width: 480px) {
    font-size: 4.8vw;
  }
`;

const SmallWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.green100};
  width: 580px;
  height: 500px;
  border-radius: 10px;
  margin-bottom: 25px;
  display: flex;
  align-items: center;

  @media screen and (max-width: 1200px) {
    width: 50vw;
    height: 45vw;
    border-radius: 0.52vw;
    margin-bottom: 1.5vw;
  }

  @media screen and (max-width: 480px) {
    width: 70vw;
    height: 78.6vw;
    border-radius: 2vw;
    margin-bottom: 0;
  }
`;

const TextBoxWrapper = styled.div`
  width: 100%;
  height: 450px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;

  @media screen and (max-width: 1200px) {
    height: 42vw;
  }

  @media screen and (max-width: 480px) {
    height: 70vw;
  }
`;

const TextWrapper = styled.div``;

const Title = styled.p`
  ${({ theme }) => theme.fonts.default16}
  margin-left: 20px;
  margin-bottom: 10px;
  display: flex;

  @media screen and (max-width: 1200px) {
    font-size: 1.5vw;
    margin-left: 2vw;
    margin-bottom: 1vw;
  }

  @media screen and (max-width: 480px) {
    font-size: 3vw;
  }
`;

const NameBox = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  width: auto;
  height: 35px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  margin-left: 20px;

  @media screen and (max-width: 1200px) {
    height: 2.78vw;
    border-radius: 2vw;
    margin-left: 2vw;
  }

  @media screen and (max-width: 480px) {
    height: 5.5vw;
  }
`;

const Name = styled.p`
  ${({ theme }) => theme.fonts.helpText14}
  color: ${({ theme }) => theme.colors.dateGray};
  margin: 0 15px;

  @media screen and (max-width: 1200px) {
    font-size: 1.2vw;
  }

  @media screen and (max-width: 480px) {
    font-size: 2.5vw;
  }
`;

const Text = styled.select`
  background-color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.helpText14}
  width: 90px;
  height: 35px;
  border: none;
  border-radius: 20px;
  margin-left: 20px;
  &:focus {
    outline: none;
  }

  @media screen and (max-width: 1200px) {
    width: 5.6vw;
    height: 2.78vw;
    font-size: 1.3vw;
    border-radius: 2vw;
    margin-left: 2vw;
  }

  @media screen and (max-width: 480px) {
    font-size: 2.5vw;
    height: 5.5vw;
    width: auto;
  }
`;

const Year = styled.p`
  ${({ theme }) => theme.fonts.default16}
  margin-left: 5px;
  margin-bottom: 10px;
  display: flex;

  @media screen and (max-width: 1200px) {
    font-size: 1.5vw;
    margin-left: 0.35vw;
    margin-bottom: 0.7vw;
  }

  @media screen and (max-width: 480px) {
    font-size: 2.5vw;
    margin-left: 0.8vw;
  }
`;

const YearWrapper = styled.div`
  display: flex;
`;

const YearBox = styled.div`
  display: flex;
  align-items: end;
`;

const LongText = styled.input`
  background-color: ${({ theme }) => theme.colors.white};
  width: 350px;
  height: 120px;
  border: none;
  border-radius: 10px;
  margin-left: 20px;
  &:focus {
    outline: none;
  }

  @media screen and (max-width: 1200px) {
    width: 31.25vw;
    height: 10.41vw;
    font-size: 1.5vw;
    margin-left: 2vw;
  }

  @media screen and (max-width: 480px) {
    width: 40vw;
    height: 11vw;
    font-size: 2.5vw;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  gap: 1.3vw;
`;

export default ModifyModal;
