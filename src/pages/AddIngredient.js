import React, { useState } from 'react';
import styled from 'styled-components';
import SmallButton from '../components/SmallButton';

const AddIngredient = ({closeModal, ingredientValue}) => {

  const [saveYear, setSaveYear] = useState('');
  const [saveMonth, setSaveMonth] = useState('');
  const [saveDate, setSaveDate] = useState('');
  const [count, setCount] = useState('');
  const [saveMethod, setSaveMethod] = useState('');

  const years = [
    { value: "", label: "년 선택" },
    { value: "2024", label: "2024" },
    { value: "2025", label: "2025" },
    { value: "2026", label: "2026" },
    { value: "2027", label: "2027" },
  ];
  const months = [
    { value: "", label: "월 선택" },
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

  const dates = [
    { value: "", label: "일 선택" },
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
  const numbers = [
    {value: ""},
    {value: "01"},
    {value: "02"},
    {value: "03"},
    {value: "04"},
    {value: "05"},
    {value: "06"},
    {value: "07"},
    {value: "08"},
    {value: "09"},
    {value: "10"},
  ]
  const methods = [
    {value: ""},
    {value: "냉동실"},
    {value: "냉장실"},
    {value: "상온"},
  ]

  const handleYearChange = (e) => setSaveYear(e.target.value);
  const handleMonthChange = (e) => setSaveMonth(e.target.value);
  const handleDateChange = (e) => setSaveDate(e.target.value);
  const handleCountChange = (e) => setCount(e.target.value);
  const handleMethodChange = (e) => setSaveMethod(e.target.value);

  console.log("Year: ", saveYear);
  return (
    <>
      <WrapperBox>
            <Wrapper>
              <TitleBox>
                <MainTitle>재료 등록하기</MainTitle>
              </TitleBox>
                <SmallWrapper>
                  <TextBoxWrapper>
                    <TextWrapper>
                      <Title>재료명</Title>
                      <NameBox>
                        <Name>{ingredientValue}</Name>
                      </NameBox>
                    </TextWrapper>
                    <TextWrapper>
                      <Title>남은 유통기한</Title>
                      <YearWrapper>
                        <YearBox>
                        <Text value={saveYear} onChange={handleYearChange}>
                      {years.map((year, index) => (
                        <option key={index} value={year.value} disabled={year.value === ""}>
                          {year.label}
                        </option>
                      ))}
                    </Text>
                          <Title>년</Title>
                        </YearBox>
                        <YearBox>
                        <Text> value={saveMonth} onChange={handleMonthChange}
                      {months.map((month, index) => (
                        <option key={index} value={month.value} disabled={month.value === ""}>
                          {month.label}
                        </option>
                      ))}
                    </Text>
                          <Title>월</Title>
                        </YearBox>
                        <YearBox>
                        <Text value={saveDate} onChange={handleDateChange}>
                      {dates.map((date, index) => (
                        <option key={index} value={date.value} disabled={date.value === ""}>
                          {date.label}
                        </option>
                      ))}
                    </Text>
                          <Title>일</Title>
                        </YearBox>
                      </YearWrapper>
                    </TextWrapper>
                    <TextWrapper>
                      <Title>수량 설정</Title>
                        <Text value={count} onChange={handleCountChange}>
                          {numbers.map((number, index)=>(
                            <option key={index} value={number.value} disabled={number.value === ""}>
                              {number.value}
                            </option>
                          ))}
                        </Text>
                    </TextWrapper>
                    <TextWrapper>
                      <Title>보관 방법</Title>
                        <Text lue={saveMethod} onChange={handleMethodChange}>
                        {methods.map((method, index)=>(
                              <option key={index} value={method.value} disabled={method.value===""}>
                                {method.value}
                              </option>
                            ))}
                        </Text>
                    </TextWrapper>
                    <TextWrapper>
                      <Title>메모</Title>
                      <LongText></LongText>
                    </TextWrapper>
                  </TextBoxWrapper>
                </SmallWrapper>
                <ButtonWrapper>
                    <SmallButton text="등록 취소" closeModal={closeModal}/>
                    <SmallButton text="등록 완료"/>
                </ButtonWrapper>
            </Wrapper>
        </WrapperBox>
    </>
  );
};

const WrapperBox = styled.div`
    background-color: ${({theme}) => theme.colors.green200};
    width: 800px;
    height: 836px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;

    @media screen and (max-width: 1200px){
        width: 57.3vw;
        height: 60vw;
        border-radius: 1vw;
    }
    `;
    

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-between;

    @media screen and (max-width: 1200px){
        height: 54.5vw;
    }
`;

const TitleBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  margin-bottom: 25px;

  @media screen and (max-width: 1200px){
    margin-bottom: 1.5vw;
  }
`;

const MainTitle = styled.p`
  ${({theme})=>theme.fonts.title40}

  @media screen and (max-width: 1200px){
    font-size: 3vw;
  }
`;

const SmallWrapper = styled.div`
    background-color: ${({theme})=>theme.colors.green100};
    width: 725px;
    height: 630px;
    border-radius: 10px;
    margin-bottom: 25px;
    display: flex;
    align-items: center;

    @media screen and (max-width: 1200px){
        width: 50vw;
        height: 45vw;
        border-radius: 0.52vw;
        margin-bottom: 1.5vw;
    }
`;

const TextBoxWrapper = styled.div`
  width: 100%;
  height: 580px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (max-width: 1200px){
    height: 42vw;

  }
`;

const TextWrapper = styled.div`
`;

const Title = styled.p`
  ${({theme})=>theme.fonts.default18}
  margin-left: 20px;
  margin-bottom: 10px;

  @media screen and (max-width: 1200px){
    font-size: 1.5vw;
  }
`;

const NameBox = styled.div`
  background-color: ${({theme})=> theme.colors.white};
  width: 200px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  margin-left: 20px;

  @media screen and (max-width: 1200px){
    width: 13.89vw;
    height: 2.78vw;
  }
  
`;

const Name = styled.p`
  margin-left: 10px;
  color: ${({theme})=>theme.colors.dateGray};
  @media screen and (max-width: 1200px){
    font-size: 1.2vw;
  }
`;

const Text = styled.select`
  background-color: ${({theme})=>theme.colors.white};
  width: 80px;
  height: 40px;
  border: none;
  border-radius: 10px;
  margin-left: 20px;
  &:focus {
    outline: none;
  }

  @media screen and (max-width: 1200px){
    width: 5.6vw;
    height: 2.78vw;
  }
`;

const YearWrapper = styled.div`
  display: flex;
`;

const YearBox = styled.div`
  display: flex;
  justify-content: start;
  align-items: end;

`;

const LongText = styled.input`
  background-color: ${({theme})=>theme.colors.white};
  width: 450px;
  height: 150px;
  border: none;
  border-radius: 10px;
  margin-left: 20px;
  &:focus {
    outline: none;
  }

  @media screen and (max-width: 1200px){
    width: 31.25vw;
    height: 10.41vw;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  gap: 1.3vw;
`;

export default AddIngredient;