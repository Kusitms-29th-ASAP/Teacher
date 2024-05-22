import { theme } from "@/styles/theme";
import React, { useState } from "react";
import styled from "styled-components";
import Checkbox from "./Checkbox";
import Image from "next/image";
import Category from "./Category";

const categoryNoti = [
  "급식",
  "교내외 프로그램",
  "학교 운영",
  "보건",
  "학교 일정",
  "교육 혜택",
  "생활/안전",
  "기타",
];

const GetItem = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <ListBox>
      <Description>
        <Title>가정통신문</Title>
      </Description>
      <Checkbox />
      <Category
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        data={categoryNoti}
      />
      <DeadLine>
        <Image
          src="/assets/icons/ic_calender_orange.svg"
          alt="calendar"
          width={24}
          height={24}
          style={{ cursor: "pointer" }}
        />
      </DeadLine>
    </ListBox>
  );
};

export default GetItem;

const ListBox = styled.div`
  width: 100%;
  height: 52px;
  border-radius: 8px;
  border: 1px solid ${theme.colors.b100};
  background: ${theme.colors.white};
  display: grid;
  grid-template-columns: 5fr 1fr 1fr 1fr;
  align-items: center;
  gap: 30px;
`;
const Description = styled.div`
  height: 100%;
  padding: 13px 16px;
  background: ${theme.colors.b80};
`;

const Title = styled.div`
  width: 100%;
  border: none;
  background: transparent;
  color: ${theme.colors.b700};
  ${(props) => props.theme.fonts.body2_m};
`;

const DeadLine = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 16px;
`;
