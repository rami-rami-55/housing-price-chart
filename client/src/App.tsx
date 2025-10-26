import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Top } from './pages/Top';

const theme = extendTheme();

const App: React.FC = () => (
  <ChakraProvider theme={theme}>
    <Top />
  </ChakraProvider>
);

export default App;
