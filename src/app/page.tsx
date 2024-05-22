"use client";

import Axios from "@/apis/axios";
import Button from "@/components/common/Button";
import CustomInput from "@/components/common/CustomInput";
import { theme } from "@/styles/theme";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";

const Home = () => {
  const router = useRouter();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleLogin = () => {
    Axios.post(`/api/v1/teachers/login`, {
      username: id,
      password: pw,
    })
      .then((response) => {
        const accessToken = response.data.accessToken;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("name", id);
        router.push("/classAnnouncement");
        console.log("로그인 성공", response.data);
      })
      .catch((error) => {
        console.log("로그인 실패", error);
      });
  };

  const handleChangeId = (id: string) => {
    setId(id);
  };

  const handleChangePw = (pw: string) => {
    setPw(pw);
  };

  return (
    <Container>
      <Image
        src="/assets/icons/logo_big.svg"
        width={305}
        height={54}
        alt="logo"
      />
      <Box>
        <Title>교사 페이지 로그인</Title>
        <LoginBox>
          <CustomInput
            value={id}
            onChange={handleChangeId}
            placeholder="아이디"
          />
          <CustomInput
            inputType="password"
            value={pw}
            onChange={handleChangePw}
            placeholder="비밀번호"
          />
        </LoginBox>
        <Gap>
          <Button text="로그인" onClick={handleLogin} />
          <Join>
            아직 교사 계정이 없나요?
            <JoinGo href="/join/step1">교사 회원가입</JoinGo>
          </Join>
        </Gap>
      </Box>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 38.5px;
  width: 100%;
  height: 100vh;
  padding-top: 130px;
  background-color: ${theme.colors.b80};
`;

const Box = styled.div`
  width: 415px;
  height: 363px;
  padding: 20px;
  border-radius: 16px;
  background: ${theme.colors.white};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Title = styled.div`
  color: ${theme.colors.b800};
  ${(props) => props.theme.fonts.heading1_b};
  margin-bottom: 46px;
`;

const Gap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const LoginBox = styled(Gap)`
  margin-bottom: 36px;
`;

const Join = styled.div`
  width: 375px;
  height: 45px;
  padding: 12px 16px;
  border-radius: 12px;
  background: ${theme.colors.b80};
  color: ${theme.colors.b500};
  ${(props) => props.theme.fonts.body3_b};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const JoinGo = styled(Link)`
  color: ${theme.colors.primary500};
  ${(props) => props.theme.fonts.body3_m};
  text-decoration: underline;
`;
