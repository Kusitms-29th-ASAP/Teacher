"use client";

import Button from "@/components/common/Button";
import CustomInput from "@/components/common/CustomInput";
import { theme } from "@/styles/theme";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styled from "styled-components";

interface Info {
  name: string;
  school: string;
  grade: string;
  classInfo: string;
}

const gradeData = ["1학년", "2학년", "3학년", "4학년", "5학년", "6학년"];
const classData = ["1반", "2반", "3반", "4반", "5반", "6반"];

const Step1 = () => {
  const router = useRouter();
  const [openDropdownGrade, setOpenDropdownGrade] = useState(false);
  const [openDropdownClass, setOpenDropdownClass] = useState(false);
  const [info, setInfo] = useState<Info>({
    name: "",
    school: "",
    grade: "",
    classInfo: "",
  });

  let isDisabled = !info.name || !info.school || !info.grade || !info.classInfo;

  const handleChangeName = (value: string) => {
    setInfo({ ...info, name: value });
    console.log(info);
  };

  const handleSelectDropGrade = (selectedDrop: string) => {
    setInfo({ ...info, grade: selectedDrop });
    setOpenDropdownGrade(false);
  };

  const handleSelectDropClass = (selectedDrop: string) => {
    setInfo({ ...info, classInfo: selectedDrop });
    setOpenDropdownClass(false);
  };

  const handleChangeSchool = (value: string) => {
    setInfo({ ...info, school: value });
  };
  const handleSearch = () => {
    alert("검색");
  };

  const handleSelectClickGrade = () => {
    setOpenDropdownGrade(!openDropdownGrade);
  };

  const handleSelectClickClass = () => {
    setOpenDropdownClass(!openDropdownClass);
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
            <Label>교사 이름</Label>
            <CustomInput
              value={info.name}
              onChange={handleChangeName}
              placeholder="김교사"
            />
          </div>
          <div>
            <Label>담당 학교</Label>
            <Row>
              <CustomInput
                value={info.school}
                onChange={handleChangeSchool}
                placeholder="학교의 이름을 입력해주세요."
              />
              <SearchButton>
                <Button
                  text="검색"
                  onClick={handleSearch}
                  disabled={!info.school}
                  size="small"
                />
              </SearchButton>
            </Row>
          </div>
          <div>
            <Label>담당학급</Label>
            <Row>
              <Contain>
                <CustomInput
                  inputType="select"
                  value={info.grade}
                  onClick={handleSelectClickGrade}
                  onChange={() => {}}
                  placeholder="학급"
                />
                {openDropdownGrade && (
                  <DropDown>
                    {gradeData.map((data, index) => (
                      <Cusor
                        key={index}
                        onClick={() => handleSelectDropGrade(data)}
                      >
                        {data}
                      </Cusor>
                    ))}
                  </DropDown>
                )}
              </Contain>
              <Contain>
                <CustomInput
                  inputType="select"
                  value={info.classInfo}
                  onClick={handleSelectClickClass}
                  onChange={() => {}}
                  placeholder="반"
                />
                {openDropdownClass && (
                  <DropDown>
                    {classData.map((data, index) => (
                      <Cusor
                        key={index}
                        onClick={() => handleSelectDropClass(data)}
                      >
                        {data}
                      </Cusor>
                    ))}
                  </DropDown>
                )}
              </Contain>
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

export default Step1;

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

const SearchButton = styled.div`
  width: 72px;
  height: 42px;
`;

const StyledButton = styled(Button)`
  margin-top: 54px;
`;

const Contain = styled.div`
  width: 100%;
  position: relative;
`;

const DropDown = styled.div`
  width: 100%;
  position: absolute;
  top: 44px;
  left: 0;
  padding: 16px 21px 16px 16px;
  border-radius: 10px;
  border: 1px solid ${theme.colors.b200};
  background: ${theme.colors.white};
  box-shadow: 0px 2px 64px 0px rgba(30, 41, 59, 0.06);
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 28px;
  color: ${theme.colors.b500};
  ${(props) => props.theme.fonts.body3_b};
  white-space: nowrap;
`;

const Cusor = styled.div`
  cursor: pointer;
`;
