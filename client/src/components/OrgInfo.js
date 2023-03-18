import React from 'react';
import Box from '@mui/material/Box';

import BarredPage from './BarredPage';

import {
    lMode1, lMode2, lMode3, lMode4, lMode5, lMode6,
    dMode1, dMode2, dMode3, dMode4, dMode5, dMode6,
} from '../utils/colors';

export default function OrgInfo({ themeChange, mode }) {
    return (
        <BarredPage mode={mode}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',

                    width: '100%',
                }}
            >
                {/* Cover image */}
                <Box
                    role="img"
                    aria-label="cover"
                    sx={{
                        height: '300px', // set a height for the cover image
                        width: '100%',
                        background: 'red',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >image</Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        minHeight: '100vh',
                        backgroundColor: mode ? dMode1 : lMode1,
                        color: mode ? dMode6 : lMode6,
                        padding: '10px',
                    }}
                >
                </Box>

            </Box>
        </BarredPage>
    )
}
