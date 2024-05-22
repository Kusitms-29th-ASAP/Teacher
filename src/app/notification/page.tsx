"use client";

import GetItem from "@/components/common/GetItem";
import { theme } from "@/styles/theme";
import { useState } from "react";
import styled from "styled-components";

const ClassAnnouncement = () => {
  const [date, setDate] = useState("");
  const [filter, setFilter] = useState("school");

  const handleDateChange = (value: string) => {
    setDate(value);
  };

  return (
    <div>
      <Title>가정통신문</Title>
      <Tab>
        <TabItem
          onClick={() => setFilter("school")}
          $selected={filter === "school"}
        >
          학교 가정통신문
        </TabItem>
        <TabItem onClick={() => setFilter("edu")} $selected={filter === "edu"}>
          교육청 가정통신문
        </TabItem>
      </Tab>
      <ListBox>
        <Head>
          <div>목록</div>
          <div>학부모 투두 연동 여부</div>
          <div>카테고리</div>
          <div>마감기한 설정</div>
        </Head>
        <GetItem />
        <GetItem />
        <GetItem />
        <GetItem />
        <Foot>
          <Save>변경사항 저장하기</Save>
        </Foot>
      </ListBox>
    </div>
  );
};

export default ClassAnnouncement;

const Title = styled.div`
  color: ${theme.colors.b800};
  ${(props) => props.theme.fonts.heading1_b};
  margin-bottom: 24px;
`;

const Tab = styled.div`
  width: 310px;
  height: 44px;
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
  border: 1px solid ${theme.colors.b200};
  background: ${theme.colors.white};
  color: ${theme.colors.b500};
  ${(props) => props.theme.fonts.body2_m};
`;

const TabItem = styled.div<{ $selected: boolean }>`
  width: 155px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  color: ${({ $selected, theme }) =>
    $selected ? theme.colors.primary500 : theme.colors.b500};
  background: ${({ $selected }) =>
    $selected ? "rgba(255, 135, 0, 0.20)" : "transparent"};
`;

const ListBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;
  border-radius: 16px;
  color: ${theme.colors.b400};
  ${(props) => props.theme.fonts.body3_m};
  background: ${theme.colors.white};
`;

const Head = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr 1fr 1fr;
  gap: 30px;
  white-space: nowrap;
`;

const Foot = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Save = styled.div`
  display: flex;
  width: 218px;
  height: 44px;
  padding: 16px 28px;
  border-radius: 10px;
  background: ${theme.colors.primary500};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: ${theme.colors.white};
  ${(props) => props.theme.fonts.body3_b};
  cursor: pointer;
`;
