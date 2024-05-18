import React from "react";
import styled from "styled-components";

const ListItem = () => {
  return (
    <ListBox>
      <Description>설명</Description>
      <Check>체크</Check>
      <Category>카테고리</Category>
      <DeadLine>마감기한</DeadLine>
    </ListBox>
  );
};

export default ListItem;

const ListBox = styled.div``;
const Description = styled.div``;
const Check = styled.div``;
const Category = styled.div``;
const DeadLine = styled.div``;
