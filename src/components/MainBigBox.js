import React, {useState, useEffect} from "react";
import styled from "styled-components";
import RefrigeratorSection from "./RefrigeratorSection";
import arrow from "../assets/images/next.svg";

const MainBigBox = ({location}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
  return (
    <>
      <BigBox>
        <BoxWrapper>
          <WrapperWrapper>
            <RefrigeratorSection title="냉동실" location={location}/>
            <Arrow src={arrow} alt="화살표" />
          </WrapperWrapper>
          {windowWidth > 480 && <Line />}
          <WrapperWrapper>
            <RefrigeratorSection title="냉장실" location={location}/>
            <Arrow src={arrow} alt="화살표" />
          </WrapperWrapper>
          {windowWidth > 480 && <Line />}
          <WrapperWrapper>
            <RefrigeratorSection title="상온" location={location}/>
            <Arrow src={arrow} alt="화살표" />
          </WrapperWrapper>
        </BoxWrapper>
      </BigBox>
    </>
  );
};

const BigBox = styled.div`
  width: 1150px;
  height: 514px;
  background-color: ${({ theme }) => theme.colors.green200};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;

  @media screen and (max-width: 1200px) {
    width: 80vw;
    height: 35.6vw;
    border-radius: 0.7vw;
  }

  @media screen and (max-width: 480px){
      width: 90vw;
      height: 71.6vw;
      border-radius: 2vw;
    }
`;

const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  @media screen and (max-width: 1200px) {
    gap: 1.38vw;
  }

  @media screen and (max-width: 480px) {
    gap: 4.5vw;
  }
`;

const WrapperWrapper = styled.div`
  display: flex;
`;

const Line = styled.div`
  width: 1058px;
  height: 3px;
  background-color: ${({ theme }) => theme.colors.white};

  @media screen and (max-width: 1200px) {
    width: 73.5vw;
  }
`;

const Arrow = styled.div`
  background-color: blue;
  display: flex;
  align-items: center;
`;

export default MainBigBox;
