import React from 'react'
import BarredPage from './BarredPage';
import Box from '@mui/material/Box';

import {
    lMode1, lMode2, lMode3, lMode4, lMode5, lMode6,
    dMode1, dMode2, dMode3, dMode4, dMode5, dMode6,
} from '../utils/colors';


export default function Spaces({ themeChange, mode }) {
    return (
        <BarredPage mode={mode}>
            <Box>
                Spaces
            </Box>
        </BarredPage>
    )
}
