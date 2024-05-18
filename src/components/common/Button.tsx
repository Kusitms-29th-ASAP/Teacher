import { theme } from "@/styles/theme";
import styled from "styled-components";

export type ButtonType = "primary" | "primaryLight";

export interface ButtonProps {
  text: string;
  type?: ButtonType;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
}

const Button = (props: ButtonProps) => {
  const { text, type = "primary", onClick, disabled } = props;

  return (
    <StyledButton className={type} onClick={onClick} disabled={disabled}>
      {text}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button`
  display: flex;
  width: 100%;
  padding: 16px 28px;
  position: relative;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 10px;
  ${(props) => props.theme.fonts.body3_b};
  white-space: nowrap;
  cursor: pointer;
  gap: 10px;
  transition: color 200ms, background-color 200ms;

  &:disabled {
    color: ${theme.colors.b400};
    background: ${theme.colors.b200};
  }

  /* type */
  &.primary {
    color: ${theme.colors.white};
    background: ${theme.colors.primary500};
    &:active {
      background: ${theme.colors.primary800};
    }
    &:disabled {
      color: ${theme.colors.b400};
      background: ${theme.colors.b200};
    }
  }
  &.primaryLight {
    color: ${theme.colors.primary500};
    background: rgba(255, 135, 0, 0.15);
    &:active {
      background: rgba(255, 135, 0, 0.3);
    }
    &:disabled {
      color: ${theme.colors.b400};
      background: ${theme.colors.b200};
    }
  }
`;
