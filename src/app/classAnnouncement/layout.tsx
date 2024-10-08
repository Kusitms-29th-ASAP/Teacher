"use client";

import { theme } from "@/styles/theme";
import { Toaster } from "react-hot-toast";
import styled from "styled-components";

const layout = (props: any) => {
  return (
    <Container>
      <Toaster />
      {props.children}
    </Container>
  );
};

export default layout;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 80px 80px;
  background-color: ${theme.colors.b80};
`;
