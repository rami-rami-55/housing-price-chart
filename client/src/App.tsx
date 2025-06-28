import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import RealEstateSearch from './components/RealEstateSearch';

const theme = extendTheme({});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <RealEstateSearch />
    </ChakraProvider>
  );
}

export default App;
