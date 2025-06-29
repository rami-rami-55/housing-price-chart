import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { RealEstateSearch } from './components/features/RealEstateSearch';

const theme = extendTheme();

const App: React.FC = () => (
  <ChakraProvider theme={theme}>
    <RealEstateSearch />
  </ChakraProvider>
);

export default App;
