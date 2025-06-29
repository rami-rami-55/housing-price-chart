import { Select } from '@chakra-ui/react';
import styled from 'styled-components';

const SelectWrapper = styled.div`
  background-color: #ffffff;
  width: 100%;
  font-size: 24px;
  border-radius: 8px;
  text-align: left;
`;

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  placeholder: string;
  options: Option[];
};

export const CustomSelect: React.FC<SelectProps> = ({ placeholder, options }) => {
  return (
    <SelectWrapper>
      <Select placeholder={placeholder} size="md" variant="outline" bg="white" textAlign="left">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </SelectWrapper>
  );
};
