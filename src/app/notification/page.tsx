"use client";

import GetItem from "@/components/common/GetItem";
import ListItem from "@/components/common/ListItem";
import { theme } from "@/styles/theme";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";

const ClassAnnouncement = () => {
  const [date, setDate] = useState("");

  const handleDateChange = (value: string) => {
    setDate(value);
  };

  return (
    <div>
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
`;

const WriteDate = styled.div`
  width: 377px;
  /* height: 44px; */
  padding: 12px 20px;
  border-radius: 16px;
  background: ${theme.colors.white};
`;

const Text = styled.div`
  color: ${theme.colors.b500};
  ${(props) => props.theme.fonts.body3_m};
`;

const ListBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;
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

const AddButton = styled.div`
  display: flex;
  width: 168px;
  height: 32px;
  padding: 8px 10px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  color: #ff7c00;
  background: #ffe5cd;
  transition: color 200ms, background-color 200ms;
  cursor: pointer;

  &:active {
    background: ${theme.colors.primary200};
  }
`;

const Gap = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`;

const Send = styled.div`
  text-align: center;
  color: ${theme.colors.primary500};
  ${(props) => props.theme.fonts.body3_b};
  cursor: pointer;
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