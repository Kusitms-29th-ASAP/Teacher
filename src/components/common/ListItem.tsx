import { theme } from "@/styles/theme";
import React, { useState } from "react";
import styled from "styled-components";
import Checkbox from "./Checkbox";
import Category from "./Category";
import Calendar from "./Calendar";

const categoryClass = ["가정통신문", "준비물", "숙제", "기타"];
type CategoryKey = "가정통신문" | "준비물" | "숙제" | "기타";

interface ListBoxItemProps {
  description: string;
  isLinkedWithTodo: boolean;
  todoType: string;
  deadline: string;
  onChange: (
    description: string,
    isLinkedWithTodo: boolean,
    todoType: string,
    deadline: string
  ) => void;
  setValue: (value: any) => void;
}

interface AnnouncementDetail {
  description: string;
  isLinkedWithTodo: boolean;
  todoType: string;
  deadline: string;
}

interface ListBoxComponentProps {
  items: AnnouncementDetail[];
  onChange: (updatedItems: AnnouncementDetail[]) => void;
  setValue: (value: any) => void;
}

const ListBoxItem: React.FC<ListBoxItemProps> = ({
  description,
  isLinkedWithTodo,
  todoType,
  deadline,
  onChange,
  setValue,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(isLinkedWithTodo);
  const [selectedCategory, setSelectedCategory] = useState(todoType);

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newDescription = event.target.value;
    onChange(newDescription, isChecked, todoType, deadline);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    onChange(description, !isChecked, todoType, deadline);
  };

  const categoryMap: Record<CategoryKey, string> = {
    가정통신문: "NONE",
    준비물: "SUPPLY",
    숙제: "HOMEWORK",
    기타: "ETC",
  };

  const handleCategoryChange = (selectedCategory: string) => {
    const newTodoType = categoryMap[selectedCategory as CategoryKey] || "NONE";
    setSelectedCategory(selectedCategory as CategoryKey);
    onChange(description, isChecked, newTodoType, deadline);
  };

  const handleDeadlineChange = (value: string) => {
    setValue(description);
    onChange(description, isChecked, todoType, value);
  };

  return (
    <LineBox>
      <Description>
        <Input
          value={description}
          onChange={handleDescriptionChange}
          placeholder="내용을 입력해주세요"
        />
      </Description>
      <div>
        <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
      </div>
      <Category
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        data={Object.keys(categoryMap)}
        onChange={handleCategoryChange}
      />
      <Calendar value={deadline} onChange={handleDeadlineChange} />
    </LineBox>
  );
};

const ListBoxComponent: React.FC<ListBoxComponentProps> = ({
  items,
  onChange,
  setValue,
}) => {
  console.log("Items prop:", items);

  const handleItemChange = (
    index: number,
    description: string,
    isLinkedWithTodo: boolean,
    todoType: string,
    deadline: string
  ) => {
    const updatedItems = items.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          description,
          isLinkedWithTodo,
          todoType,
          deadline,
        };
      }
      return item;
    });
    onChange(updatedItems);
  };

  return (
    <ListBox>
      {items.map((item, index) => (
        <ListBoxItem
          key={index}
          description={item.description}
          isLinkedWithTodo={item.isLinkedWithTodo}
          todoType={item.todoType}
          deadline={item.deadline}
          setValue={setValue}
          onChange={(description, isLinkedWithTodo, todoType, deadline) =>
            handleItemChange(
              index,
              description,
              isLinkedWithTodo,
              todoType,
              deadline
            )
          }
        />
      ))}
    </ListBox>
  );
};

export default ListBoxComponent;

const ListBox = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 700px;
  gap: 10px;
  border-radius: 16px;
  color: ${theme.colors.b400};
  ${(props) => props.theme.fonts.body3_m};
  background: ${theme.colors.white};
`;

const LineBox = styled.div`
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
  color: ${theme.colors.b700};
  ${(props) => props.theme.fonts.body2_m};

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${theme.colors.b300};
    ${(props) => props.theme.fonts.body2_r};
  }
`;
