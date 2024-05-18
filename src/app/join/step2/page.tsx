"use client";

import Button from "@/components/common/Button";
import CustomInput from "@/components/common/CustomInput";
import { theme } from "@/styles/theme";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styled from "styled-components";

const Step2 = () => {
  const router = useRouter();
  const [id, setId] = useState("");
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("");
  const [classInfo, setClassInfo] = useState("");

  let isDisabled = !id || !school || !grade || !classInfo;

  const handleSearch = () => {
    alert("검색");
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
              value={id}
              onChange={() => setName(id)}
              placeholder="아이디를 입력해주세요."
            />
          </div>
          <div>
            <Label>담당 학교</Label>
            <Row>
              <CustomInput
                value={school}
                onChange={() => setSchool(school)}
                placeholder="학교의 이름을 입력해주세요."
              />
              <Button text="검색" onClick={handleSearch} disabled={!school} />
            </Row>
          </div>
          <div>
            <Label>담당학급</Label>
            <Row>
              <CustomInput
                inputType="select"
                value={grade}
                onChange={() => setGrade(grade)}
                placeholder="학급"
              />
              <CustomInput
                inputType="select"
                value={classInfo}
                onChange={() => setClassInfo(classInfo)}
                placeholder="반"
              />
            </Row>
          </div>
          <StyledButton
            text="다음"
            onClick={handleNext}
            disabled={isDisabled}
          />
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

const StyledButton = styled(Button)`
  margin-top: 54px;
`;
