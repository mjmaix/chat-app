import React from 'react';
import { ThemeContextProvider } from './core/ThemeProviderHoc';
import Routes from './Routes';

const App = () => {
  return (
    <ThemeContextProvider>
      <Routes />
    </ThemeContextProvider>
  );
};

export default App;
