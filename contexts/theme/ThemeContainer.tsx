import React, { useEffect } from 'react';
import ReactGA from 'react-ga';

import { 
  ThemeProvider as ChakraThemeProvider, 
  ColorModeProvider,
  CSSReset
} from '@chakra-ui/core';

import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming'

import theme from '../../styles/theme';

const ThemeContainer: React.FC = ({ children }) => {
  useEffect(() => {
    ReactGA.initialize('UA-180073662-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [])
  
  return (
    <ChakraThemeProvider theme={theme}>
      <ColorModeProvider value="dark">
        <EmotionThemeProvider theme={theme}>
          <CSSReset />
          {children}
        </EmotionThemeProvider>
      </ColorModeProvider>
    </ChakraThemeProvider>
  );
}

export default ThemeContainer;