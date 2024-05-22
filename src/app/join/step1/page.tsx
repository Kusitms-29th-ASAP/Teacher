"use client";

import Axios from "@/apis/axios";
import getSchool from "@/apis/getShcool";
import Button from "@/components/common/Button";
import CustomInput from "@/components/common/CustomInput";
import { School } from "@/interface/School";
import { theme } from "@/styles/theme";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface Info {
  name: string;
  schoolId: number;
  schoolName: string;
  grade: string;
  classInfo: string;
}

interface Classroom {
  grade: string;
  classNumbers: string[];
}

const GradeMap: { [key: string]: string } = {
  FIRST: "1학년",
  SECOND: "2학년",
  THIRD: "3학년",
  FOURTH: "4학년",
  FIFTH: "5학년",
  SIXTH: "6학년",
};

const ClassMap: { [key: string]: string } = {
  1: "1반",
  2: "2반",
  3: "3반",
  4: "4반",
  5: "5반",
  6: "6반",
};

const Step1 = () => {
  const router = useRouter();
  const [openDropdownGrade, setOpenDropdownGrade] = useState(false);
  const [openDropdownClass, setOpenDropdownClass] = useState(false);
  const [info, setInfo] = useState<Info>({
    name: "",
    schoolId: 0,
    schoolName: "",
    grade: "",
    classInfo: "",
  });

  const [schoolList, setSchoolList] = useState<School[]>([]);
  const [openSchoolList, setOpenSchoolList] = useState(true);
  /* API로 받아온 학교의 학년 - 반 정보 */
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  /* 학년 별 반 정보 배열 */
  const [classNumbers, setClassNumbers] = useState<string[]>([]);

  let isDisabled =
    !info.name || !info.schoolName || !info.grade || !info.classInfo;

  /* 이름 입력 변경 */
  const handleChangeName = (value: string) => {
    setInfo({ ...info, name: value });
    console.log(info);
  };

  useEffect(() => {
    console.log("info.grade", info.grade);
    console.log("classNumbers", classNumbers);
  }, [info.grade, classNumbers]);

  /* 학년 드롭박스 선택 */
  const handleSelectDropGrade = (selectedDrop: string) => {
    setInfo({ ...info, grade: selectedDrop });
    setOpenDropdownGrade(false);
    const selectedClassroom = classrooms.find(
      (classroom) => classroom.grade === selectedDrop
    );
    setClassNumbers(selectedClassroom ? selectedClassroom.classNumbers : []);
  };

  /* 학급 드롭박스 선택 */
  const handleSelectDropClass = (selectedDrop: string) => {
    setInfo({ ...info, classInfo: selectedDrop });
    setOpenDropdownClass(false);
  };

  /* 학교 입력 변경 */
  const handleChangeSchool = async (value: string) => {
    setInfo({ ...info, schoolName: value });
    console.log("change");
    if (value !== "") {
      const data = await getSchool(value);
      setSchoolList(data.schools);
      setOpenSchoolList(true);
    } else {
      setSchoolList([]);
      setOpenSchoolList(false);
    }
  };

  /* 학교 선택 */
  const handleSchoolClick = async (id: number, name: string) => {
    setInfo({ ...info, schoolName: name, schoolId: id });
    setSchoolList([]);
    setOpenSchoolList(false);
    const classroomData = await findClassrooms(id);
    setClassrooms(classroomData);
  };

  /* 학교, 학년의 해당 학급 찾는 API */
  const findClassrooms = async (schoolId: number): Promise<Classroom[]> => {
    try {
      const response = await Axios.get(
        `/api/v1/schools/${schoolId}/classrooms`
      );
      console.log("데이터", response.data);
      return response.data.classrooms;
    } catch (error) {
      console.error("학급 error", error);
      return [];
    }
  };

  /* 검색하기 */
  const handleSearch = () => {};

  const handleSelectClickGrade = () => {
    setOpenDropdownGrade(!openDropdownGrade);
  };

  const handleSelectClickClass = () => {
    setOpenDropdownClass(!openDropdownClass);
  };

  const handleNext = () => {
    const classInfo = ClassMap[info.classInfo][0] || "";

    const params = new URLSearchParams({
      name: info.name,
      schoolId: info.schoolId.toString(),
      grade: info.grade,
      className: classInfo,
    });

    router.push(`/join/step2?${params}`);
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
              <Contain>
                <SchoolInput
                  value={info.schoolName}
                  onChange={handleChangeSchool}
                  placeholder="학교의 이름을 입력해주세요."
                />
                <SearchButton>
                  <Button
                    text="검색"
                    onClick={handleSearch}
                    disabled={!info.schoolName}
                    size="small"
                  />
                </SearchButton>
                {openSchoolList && schoolList.length > 0 && (
                  <SearchBoxList>
                    {schoolList.map((school) => (
                      <SearchBox
                        key={school.id}
                        onClick={() =>
                          handleSchoolClick(school.id, school.name)
                        }
                      >
                        <h1>{school.name}</h1>
                        <h2>{school.address}</h2>
                      </SearchBox>
                    ))}
                  </SearchBoxList>
                )}
              </Contain>
            </Row>
          </div>
          <div>
            <Label>담당학급</Label>
            <Row>
              <Contain>
                <CustomInput
                  inputType="select"
                  value={GradeMap[info.grade]}
                  onClick={handleSelectClickGrade}
                  onChange={() => {}}
                  placeholder="학급"
                />
                {openDropdownGrade && info.schoolName && (
                  <DropDown>
                    {classrooms?.map((data, index) => (
                      <Cusor
                        key={index + 1}
                        onClick={() => handleSelectDropGrade(data.grade)}
                      >
                        {`${index + 1}학년`}
                      </Cusor>
                    ))}
                  </DropDown>
                )}
              </Contain>
              <Contain>
                <CustomInput
                  inputType="select"
                  value={ClassMap[info.classInfo]}
                  onClick={handleSelectClickClass}
                  onChange={() => {}}
                  placeholder="반"
                />
                {openDropdownClass && info.schoolName && (
                  <DropDown>
                    {classNumbers.map((data, index) => (
                      <Cusor
                        key={index}
                        onClick={() => handleSelectDropClass(data)}
                      >
                        {`${data}반`}
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
  display: flex;
  gap: 12px;
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

const SchoolInput = styled(CustomInput)`
  width: 100%;
  position: absolute;
  top: 36px;
  left: 0;
`;

const SearchBoxList = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 64px 0px rgba(30, 41, 59, 0.06);
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.b200};
  position: absolute;
  top: 44px;
  left: 0;
  width: 291px;
  max-height: 200px;
  overflow-y: scroll;
  background: ${({ theme }) => theme.colors.white};
  z-index: 10;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background: ${({ theme }) => theme.colors.white};
  cursor: pointer;

  h1 {
    ${({ theme }) => theme.fonts.body3_b};
    color: ${({ theme }) => theme.colors.b700};
  }
  h2 {
    ${({ theme }) => theme.fonts.caption1_r};
    color: ${({ theme }) => theme.colors.b400};
  }
`;
