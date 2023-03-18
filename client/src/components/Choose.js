import Box from '@mui/material/Box';
import React from 'react';

import { lMode1, lMode2, lMode3, lMode4, lMode5, lMode6, dMode1, dMode2, dMode3, dMode4, dMode5, dMode6 }
    from '../utils/colors';

export default function Choose({ themeChange, mode }) {

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                background: mode === 'light' ? lMode1 : dMode1,
            }}
        >

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '70vh',
                    width: '100%',
                    background: 'url(/client/public/assets/vectors/hollowed-boxes.svg) no-repeat center center fixed',
                }}
            >
            </Box>
        </Box >
    )
}
