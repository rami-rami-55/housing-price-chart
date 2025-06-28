import { Select as ChakraSelect } from '@chakra-ui/react';
import styled from 'styled-components';

const SelectWrapper = styled.div`
  width: 180px;
  font-size: 24px;
  background-color: #ffffff;
  border-radius: 8px;
  text-align: center;
  text-align-last: center;
`;

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  placeholder: string;
  options: Option[];
};

const Select: React.FC<SelectProps> = ({ placeholder, options }) => {
  return (
    <SelectWrapper>
      <ChakraSelect
        placeholder={placeholder}
        size="md"
        fontSize="24px"
        borderRadius="8px"
        textAlign="center"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </ChakraSelect>
    </SelectWrapper>
  );
};

export default Select;
