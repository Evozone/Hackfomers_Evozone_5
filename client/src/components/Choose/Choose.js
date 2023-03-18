import React from 'react';

// MUI Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Custom Components
import ChooserCard from './ChooserCard';

// Colors
import {
    lMode1,
    lMode2,
    lMode3,
    lMode4,
    lMode5,
    lMode6,
    dMode1,
    dMode2,
    dMode3,
    dMode4,
    dMode5,
    dMode6,
} from '../../utils/colors';

export default function Choose({ mode }) {
    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: '100vh',
                background: mode === 'light' ? lMode1 : dMode1,
            }}
        >

            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    height: '80vh',
                    width: '100%',
                    background: `url('/assets/vectors/sun-tornado.svg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    justifyContent: 'center',

                }}
            >
                <Typography sx={{
                    margin: '5vh',
                    color: 'white',
                    fontSize: '5rem',
                    font: '700 5rem Poppins, sans-serif',
                }}>Dashboard</Typography>

            </Box>

            {/* The Component to choose */}
            <ChooserCard mode={mode} />
        </Box >
    );
}
