import React from "react";
import styled from "@emotion/styled";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

export default function MainPage() {

  const navigate = useNavigate();

  const buttons = (
    localStorage.getItem("token") ? (
      <div>
        <HeaderButtonWrapper onClick={() => navigate("/app")}>App</HeaderButtonWrapper>
        <HeaderButtonWrapper
          onClick={() => {
            localStorage.setItem("token", "");
            navigate("/auth/login");
          }}
        >
          Logout
        </HeaderButtonWrapper>
      </div>
    ) : (
      <div>
        <HeaderButtonWrapper onClick={() => navigate("/auth/signup")}>Sign Up</HeaderButtonWrapper>
        <HeaderButtonWrapper onClick={() => navigate("/auth/login")}>Login</HeaderButtonWrapper>
      </div>
    )
  );

  return (
    <MainPageWrapper>
      <Header buttons={buttons}></Header>
      <IntroWrapper>
        <TitleWrapper>Focus More</TitleWrapper>
        <DescriptionWrapper>
          <div>오늘 하루 내가 무엇을 해냈는지, 얼마나 집중했는지 알고 계신가요?</div>
          <div>버닝타이머로 중요한 일을 구분짓고, 집중하고, 리포트로 돌아보세요!</div>
        </DescriptionWrapper>
        <ButtonWrapper onClick={() => navigate("/auth/signup")}>Sign up for free</ButtonWrapper>
        <ImageCoverWrapper>
         <ImageWrapper alt="intro" src={"/image/intro.png"}></ImageWrapper>
        </ImageCoverWrapper>
      </IntroWrapper>
      <div>
        <PointWrapper>
          <SubTitleWrapper>중요한 일을 선정하세요</SubTitleWrapper>
          <DescriptionWrapper>
            <div>중요한 일을 카테고리와 라벨로 관리하세요.</div>
            <div>드래그하여 순서를 변경할 수도 있습니다.</div>
          </DescriptionWrapper>
          <ImageCoverWrapper>
            <ImageWrapper alt="intro" src={"/image/label.png"}></ImageWrapper>
          </ImageCoverWrapper>
        </PointWrapper>
        <PointWrapper primary={true}>
          <SubTitleWrapper>타이머를 시작하세요</SubTitleWrapper>
          <DescriptionWrapper>
            <div>어떤 작업을 했는지 자유롭게 메모하고,</div>
            <div>집중을 방해하는 딴짓이 생각나면 따로 적어두세요.</div>
          </DescriptionWrapper>
          <ImageCoverWrapper>
            <ImageWrapper alt="intro" src={"/image/intro.png"}></ImageWrapper>
          </ImageCoverWrapper>
        </PointWrapper>
        <PointWrapper>
          <SubTitleWrapper>지난 나를 돌아보세요</SubTitleWrapper>
          <DescriptionWrapper>
            <div>날짜를 설정하면 지난 기록을 확인할 수 있습니다.</div>
            <div>카테고리와 라벨별로 구분되며, 더 세부적인 정보도 제공합니다.</div>
          </DescriptionWrapper>
          <ImageCoverWrapper>
            <ImageWrapper alt="intro" src={"/image/report.png"}></ImageWrapper>
          </ImageCoverWrapper>
        </PointWrapper>
      </div>
    </MainPageWrapper>
  );
}

const MainPageWrapper = styled.section`
  background-color: #F8F8F9;
  text-align: center;
`

const IntroWrapper = styled.div`
  margin: 100px 0;
`

const HeaderButtonWrapper = styled.button`
  background: none;
  border: none;
  margin-right: 10px;
  color: #FFFFFF;
  font-size: 15px;
  font-Weight: 600;
`

const TitleWrapper = styled.h1`
  font-size: 72px;
  letter-spacing: -1px;
  font-weight: 800;
`

const DescriptionWrapper = styled.div`
  font-size: 24px;
  letter-spacing: 1px;
  font-weight: 500;
`

const ButtonWrapper = styled.button`
  width: 220px;
  height: 60px;
  margin-top: 40px;
  border: none;
  border-radius: 10px;
  background-color: #DA291C;
  color: #FFFFFF;
  font-size: 24px;
  font-weight: 600;

  &:hover {
    font-size: 25px;
    background-color: #FF291CCC;
  }
`

const ImageCoverWrapper = styled.div`
  width: 80%;
  margin: 80px auto 0;
`

const ImageWrapper = styled.img`
  width: 100%;
`

const PointWrapper = styled.div`
  padding: 100px 0;
  background-color: ${props => props.primary ? "#F8F8F9" : "#FFFFFF"};
`

const SubTitleWrapper = styled.h2`
  font-size: 54px;
  margin: 0 0 30px 0;
  letter-spacing: -1px;
  font-weight: 800;
`
