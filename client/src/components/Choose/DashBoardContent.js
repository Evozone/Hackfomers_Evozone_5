import React, { useEffect, useState } from 'react'

// MUI  components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// Colors
import {
    lMode1, lMode2, lMode3, lMode4, lMode5, lMode6,
    dMode1, dMode2, dMode3, dMode4, dMode5, dMode6
} from '../../utils/colors'

export default function DashBoardContent({ mode, children }) {
    return (
        <Box
            sx={{
                position: 'absolute',
                width: '80%',
                height: 'fit-content',
                top: 200,

                background: mode === 'light' ? 'whitesmoke' : '#1a1a1a',
                borderRadius: '10px',
                boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.25)',

                padding: '20px',
                margin: '20px',

                display: 'flex',
            }}
        >
            {children}
        </Box >
    )
}
