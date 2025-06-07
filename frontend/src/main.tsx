import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material';

const queryClient = new QueryClient();


const theme = createTheme({
  palette: {
    primary: {
      main: '#E02C45',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#F25C54',
    },
    info: {
      main: '#FFCF56',
    },
    grey: {
      900: '#333333',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
