"use client";

import Button from "@/components/common/Button";
import CustomInput from "@/components/common/CustomInput";
import { theme } from "@/styles/theme";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styled from "styled-components";

interface Info {
  id: string;
  password: string;
  rePassword: string;
}

const Step2 = () => {
  const router = useRouter();
  const [info, setInfo] = useState<Info>({
    id: "",
    password: "",
    rePassword: "",
  });

  let error = info.password !== info.rePassword;
  let isDisabled = !info.id || !info.password || !info.rePassword;

  const handleChangeId = (value: string) => {
    setInfo({ ...info, id: value });
  };

  const handleChangePassword = (value: string) => {
    setInfo({ ...info, password: value });
  };
  const handleChangeRePassword = (value: string) => {
    setInfo({ ...info, rePassword: value });
  };

  const handleNext = () => {
    router.push("/join/step2");
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
        <Title>교사 페이지 회원가입</Title>
        <Gap>
          <div>
            <Label>아이디</Label>
            <CustomInput
              value={info.id}
              onChange={handleChangeId}
              placeholder="아이디를 입력해주세요."
            />
          </div>
          <div>
            <Label>비밀번호</Label>
            <CustomInput
              inputType="password"
              value={info.password}
              onChange={handleChangePassword}
              placeholder="비밀번호를 입력해주세요."
            />
          </div>
          <div>
            <Label>비밀번호 확인</Label>
            <Row>
              <CustomInput
                inputType="password"
                value={info.rePassword}
                onChange={handleChangeRePassword}
                placeholder="비밀번호를 다시 입력해주세요."
              />
            </Row>
            <Error>{error && " 비밀번호가 일치하지 않습니다."}</Error>
          </div>
          <Row>
            <BeforeButton onClick={() => router.push("/join/step1")}>
              <Image
                src="/assets/icons/ic_chevron_right.svg"
                width={20}
                height={20}
                alt="back"
              />
              이전 단계
            </BeforeButton>
            <StyledButton
              text="다음"
              onClick={handleNext}
              disabled={isDisabled}
            />
          </Row>
        </Gap>
      </Box>
    </Container>
  );
};

export default Step2;

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
  height: 494px;
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
  gap: 24px;
`;

const Label = styled.div`
  color: ${theme.colors.b600};
  ${(props) => props.theme.fonts.body2_m};
  margin-bottom: 8px;
`;

const Row = styled.div`
  display: flex;
  gap: 11px;
`;

const Error = styled.p`
  height: 20px;
  color: #ef4444;
  ${(props) => props.theme.fonts.caption1_m};
`;

const BeforeButton = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${theme.colors.primary500};
  ${(props) => props.theme.fonts.body3_m};
  white-space: nowrap;
  cursor: pointer;
`;

const StyledButton = styled(Button)`
  margin-top: 54px;
`;
