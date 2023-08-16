import React from 'react';
import {
  ChakraProvider,
 
  theme,
} from '@chakra-ui/react';
import Tracker from './component/tracker';


function App() {
  return (
    <ChakraProvider theme={theme}>
   <Tracker/>
    </ChakraProvider>
  );
}

export default App;
