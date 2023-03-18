import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LandingPage from './components/LandingPage';
import Choose from './components/Choose';
import Spaces from './components/Spaces';
import Grievances from './components/Grievances';
import Chat from './components/Chat';
import Reports from './components/Reports';
import MainAppbar from './components/MainAppbar';

export default function App() {

  const navigate = useNavigate();

  const localTheme = window.localStorage.getItem('hackathonAppTheme');

  const [mode, setMode] = useState(localTheme ? localTheme : 'light');

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },

    typography: {
      fontFamily: "'Open Sans', sans-serif",
    },
  });

  const themeChange = () => {
    const updatedTheme = mode === 'light' ? 'dark' : 'light';
    window.localStorage.setItem('hackathonAppTheme', updatedTheme);
    setMode(updatedTheme);
  };

  const isSignedIn = true;

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <Routes>
        {/*  */}

        <Route
          path='/'
          element={<LandingPage themeChange={themeChange} mode={mode} />}
        />

        <Route
          path='/choose'
          element={<Choose themeChange={themeChange} mode={mode} />}
        />

        <Route
          path='/spaces'
          element={<Spaces themeChange={themeChange} mode={mode} />}
        />

        <Route
          path='/spaces/:id'
          element={<Spaces themeChange={themeChange} mode={mode} />}
        />

        <Route
          path='/grievances'
          element={<Grievances themeChange={themeChange} mode={mode} />}
        />

        <Route
          path='/grievances/:id'
          element={<Grievances themeChange={themeChange} mode={mode} />}
        />

        <Route
          path='/chat'
          element={<Chat themeChange={themeChange} mode={mode} />}
        />

        <Route
          path='/chat/:id'
          element={<Chat themeChange={themeChange} mode={mode} />}
        />

        <Route
          path='/reports'
          element={<Reports themeChange={themeChange} mode={mode} />}
        />

      </Routes>

      {isSignedIn ? (
        <MainAppbar
          {...{
            themeChange,
            mode,
          }}
        />
      ) : null}

    </ThemeProvider>
  );
}
