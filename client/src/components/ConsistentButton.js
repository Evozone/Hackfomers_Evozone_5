import React from 'react'

// MUI Components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Colors
import {
    lMode1, lMode2, lMode3, lMode4, lMode5, lMode6,
    dMode1, dMode2, dMode3, dMode4, dMode5, dMode6
} from '../utils/colors'

export default function ConsistentButton({ mode, title, onClick, icon }) {
    return (
        <Button
            sx={{
                width: 'fit-content',
                color: mode === 'light' ? lMode1 : dMode1,
                background: mode === 'light' ? lMode6 : dMode6,
                borderRadius: '10px',
                boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.25)',
                padding: '10px 20px',
                margin: '20px',

                '&:hover': {
                    background: mode === 'light' ? lMode3 : dMode3,
                },
            }}
            onClick={onClick}
        >
            {icon ? (
                <Box
                    sx={{
                        margin: '0px',
                        marginRight: '10px',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    {icon}
                </Box>
            ) : null}
            <Typography
                textTransform='none'
                sx={{
                    font: '500 1rem Poppins, sans-serif',
                }}
            >
                {title}
            </Typography>
        </Button>
    )
}