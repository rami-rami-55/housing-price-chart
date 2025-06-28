import { Button, Stack } from '@chakra-ui/react';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
  border-radius: 12px;
`;

type ButtonProps = {
  text: string;
};

const PrimaryButton: React.FC<ButtonProps> = ({ text }) => {
  return (
    <ButtonWrapper>
      <Stack gap="2" align="flex-start">
        <Stack align="center" direction="row" gap="10">
          <Button colorScheme="blue" width="180px">
            {text}
          </Button>
        </Stack>
      </Stack>
    </ButtonWrapper>
  );
};

export default PrimaryButton;
