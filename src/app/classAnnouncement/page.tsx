"use client";

import Calendar from "@/components/common/Calendar";
import { theme } from "@/styles/theme";
import { useState } from "react";
import styled from "styled-components";

const ClassAnnouncement = () => {
  const [date, setDate] = useState("");

  const handleDateChange = (value: string) => {
    setDate(value);
  };

  return (
    <div>
      <Title>알림장</Title>
      <WriteDate>
        <Text>작성일자</Text>
        <Calendar value={date} onChange={handleDateChange} />
      </WriteDate>
      <ListBox>
        <Head>설명</Head>
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
`;

const Head = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr 1fr 1fr;
`;
