import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import jwtDecode from 'jwt-decode';
import CssBaseline from '@mui/material/CssBaseline';
import { HMSRoomProvider } from '@100mslive/hms-video-react';

// Routes
import LandingPage from './components/LandingPage';
import Choose from './components/Choose/Choose';
import Spaces from './components/Spaces';
import Grievances from './components/Grievances/Grievances.js';
import CreateGrievance from './components/Grievances/CreateGrievance';
import Reports from './components/Reports';
import MainAppbar from './components/MainAppbar';
import CreateOrg from './components/Choose/CreateOrg'; //Changed
import OrgInfo from './components/OrgInfo';

// Components
import Loading from './components/Loading';
import Grievance from './components/Grievances/Grievance';

// Actions
import { signInAction } from './actions/actions';
import VoiceRoom from './components/VoiceRoom';

export default function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const localTheme = window.localStorage.getItem('hackathonAppTheme');

    const [mode, setMode] = useState(localTheme ? localTheme : 'light');

    // Where to not show the appbar
    const noAppbar = ['/', '/choose', '/createOrg'];

    useEffect(() => {
        const auth = window.localStorage.getItem('hackathonApp');
        if (auth) {
            const { dnd } = JSON.parse(auth);
            const {
                _id,
                uid,
                email,
                name,
                avatarURL,
                username,
                grievances,
                comments,
                organizations,
                socialLinks,
            } = jwtDecode(dnd);
            dispatch(
                signInAction(
                    _id,
                    uid,
                    email,
                    name,
                    avatarURL,
                    username,
                    grievances,
                    comments,
                    organizations,
                    socialLinks,
                    dnd
                )
            );
            const value = window.localStorage.getItem('hackathonAppLastPage');

            if (value && value !== undefined) {
                navigate(`/${value}`);
            } else {
                navigate('/choose');
            }
        } else {
            navigate('/');
        }
    }, []);

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

    const isSignedIn = useSelector((state) => state.auth.isSignedIn);

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Loading />

            <Routes>
                {/* Landing Page */}
                <Route
                    path='/'
                    element={
                        <LandingPage themeChange={themeChange} mode={mode} />
                    }
                />

                {/* Choose Page */}
                <Route path='/choose' element={<Choose mode={mode} />} />

                {/* Create Organization */}
                <Route path='/createOrg' element={<CreateOrg mode={mode} />} />

                {/* Spaces Page */}
                <Route
                    path='/spaces'
                    element={
                        <HMSRoomProvider>
                            <Spaces themeChange={themeChange} mode={mode} />
                        </HMSRoomProvider>
                    }
                />

                {/* Individual Space Page */}
                <Route
                    path='/room/:id'
                    element={
                        <HMSRoomProvider>
                            <VoiceRoom themeChange={themeChange} mode={mode} />
                        </HMSRoomProvider>
                    }
                />

                {/* Grievances Page */}
                <Route
                    path='/grievances'
                    element={
                        <Grievances themeChange={themeChange} mode={mode} />
                    }
                />

                {/* Individual Grievance Page */}
                <Route
                    path='/grievances/:id'
                    element={
                        <Grievance themeChange={themeChange} mode={mode} />
                    }
                />

                {/* Create Grievance Page */}
                <Route
                    path='/createGrievance'
                    element={
                        <CreateGrievance
                            themeChange={themeChange}
                            mode={mode}
                        />
                    }
                />

                {/* Reports Page */}
                <Route
                    path='/reports'
                    element={<Reports themeChange={themeChange} mode={mode} />}
                />

                {/* Organization page */}
                <Route
                    path='/organization'
                    element={<OrgInfo themeChange={themeChange} mode={mode} />}
                />
            </Routes>

            {/* Don't show if on Choose page */}
            {isSignedIn && !noAppbar.includes(window.location.pathname) ? (
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
