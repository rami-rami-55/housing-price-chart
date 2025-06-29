import { FormControl } from '@chakra-ui/form-control';
import { Box, Button, Container, Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import { MdHome } from 'react-icons/md';
import styled from 'styled-components';
import { CustomSelect } from '../common/Select';
import { prefectures } from '../options/prefectures';

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #2563eb;
  padding: 0 0 24px 0;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 24px;
`;

const NavWrapper = styled.nav`
  width: 400px;
  height: 100vh;
  background: #ffffff;
  border-right: 2px solid #e2e8f0;
  box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.25);
  padding: 32px 24px;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
`;

export const RealEstateSearch: React.FC = () => {
  return (
    <Container py={8}>
      <NavWrapper>
        <Title>
          <MdHome size={28} />
          <Heading as="h1" size="md">
            不動産価格推移アプリ
          </Heading>
        </Title>
        <VStack gap={6}>
          <Box width="100%">
            <FormControl>
              <CustomSelect
                placeholder="都道府県を選択"
                options={prefectures.map((p) => ({
                  value: p.code,
                  label: p.name,
                }))}
              />
            </FormControl>

            <FormControl mt={4}>
              <CustomSelect placeholder="市区町村を選択" options={[]} />
            </FormControl>

            <FormControl mt={4}>
              <CustomSelect placeholder="駅を選択" options={[]} />
            </FormControl>

            <FormControl mt={4}>
              <CustomSelect placeholder="種別を選択" options={[]} />
            </FormControl>

            <FormControl mt={4}>
              <CustomSelect placeholder="間取りを選択" options={[]} />
            </FormControl>

            <Button mt={6} colorScheme="blue" width="100%">
              検索
            </Button>
          </Box>
        </VStack>
      </NavWrapper>
    </Container>
  );
};
