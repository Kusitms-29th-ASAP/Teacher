import { theme } from "@/styles/theme";
import React, { useState } from "react";
import styled from "styled-components";
import Checkbox from "./Checkbox";
import Image from "next/image";

const ListItem = () => {
  const [todo, setTodo] = useState("");

  return (
    <ListBox>
      <Description>
        <Input
          value={todo}
          onChange={() => setTodo(todo)}
          placeholder="내용을 입력해주세요"
        />
      </Description>
      <Check>
        <Checkbox />
      </Check>
      <Category>
        <Label>카테고리</Label>
      </Category>
      <DeadLine>
        <Image
          src="/assets/icons/ic_calender_orange.svg"
          alt="calendar"
          width={24}
          height={24}
        />
      </DeadLine>
    </ListBox>
  );
};

export default ListItem;

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

const Input = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  color: var(--Basic-B-700, #334155);
  color: ${theme.colors.b700};
  ${(props) => props.theme.fonts.body2_m};

  &:focus {
    outline: none;
  }
`;

const Check = styled.div``;
const Category = styled.div``;
const Label = styled.div`
  width: 68px;
  height: 25px;
  padding: 4px 8px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: ${theme.colors.b700};
  color: ${theme.colors.white};
  ${(props) => props.theme.fonts.caption1_b};
`;

const DeadLine = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 16px;
`;
