import { theme } from "@/styles/theme";
import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";

interface CategoryProps {
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  data: string[];
}

const Category: React.FC<CategoryProps> = ({
  selectedCategory,
  setSelectedCategory,
  data,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedCategory(option);
    setIsOpen(false);
  };
  return (
    <CategoryContainer>
      <Label onClick={handleCategoryClick}>
        {selectedCategory || "카테고리"}
      </Label>
      {isOpen && (
        <Dropdown>
          {data.map((category) => (
            <DropdownItem
              key={category}
              onClick={() => handleOptionClick(category)}
            >
              {category}
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </CategoryContainer>
  );
};

export default Category;

const CategoryContainer = styled.div`
  position: relative;
`;

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
  cursor: pointer;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.b100};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const DropdownItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background: ${theme.colors.b80};
  }
`;
