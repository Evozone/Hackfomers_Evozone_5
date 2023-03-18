import React from 'react'
import Box from '@mui/material/Box'

import {
    lMode1, lMode2, lMode3, lMode4, lMode5, lMode6,
    dMode1, dMode2, dMode3, dMode4, dMode5, dMode6,
} from '../utils/colors';

export default function BarredPage({ mode, children }) {
    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: '100vh',
                background: mode === 'light' ? lMode1 : dMode1,
                pt: 8,
            }}>
            {children}
        </Box>
    )
}
