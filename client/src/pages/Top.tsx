import styled from 'styled-components';
import { AveragePriceChart } from '../components/features/AveragePriceChart';
import { HouseFilter } from '../components/features/HouseFilter';
import { LocationFilter } from '../components/features/LocationFilter';

const Top = () => {
  const TopWrapper = styled.div`
    margin: 0 auto;
    min-height: calc(100vh - 48px);
    max-width: 800px;
    justify-content: center;
    align-items: center;
  `;

  const SearchContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
  `;

  return (
    <TopWrapper>
      <SearchContainer>
        <LocationFilter />
      </SearchContainer>
      <SearchContainer>
        <HouseFilter />
      </SearchContainer>
      <>
        <AveragePriceChart />
      </>
    </TopWrapper>
  );
};

export default Top;
