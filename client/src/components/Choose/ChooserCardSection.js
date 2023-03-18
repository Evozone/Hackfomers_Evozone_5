import React from 'react'

// MUI Components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// Colors
import {
    lMode1, lMode2, lMode3, lMode4, lMode5, lMode6,
    dMode1, dMode2, dMode3, dMode4, dMode5, dMode6
} from '../../utils/colors'

export default function ChooserCardSection({ floatDirection, mode, title, children }) {
    return (
        <Box
            sx={{
                width: '50%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                float: floatDirection,
            }}
        >
            <Typography
                sx={{
                    color: mode === 'light' ? lMode6 : dMode6,
                    font: '700 2rem Poppins, sans-serif',
                    margin: '10px',
                }}
            >
                {title}
            </Typography>

            {children}

        </Box>
    )
}
