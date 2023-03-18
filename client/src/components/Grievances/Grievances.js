import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// Material UI
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';

// MUI Icons
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CreateIcon from '@mui/icons-material/Create';

// Components
import BarredPage from '../BarredPage';
import GrievanceList from './GrievanceList';
import CreateGrievance from './CreateGrievance';

import {
    lMode1, lMode2, lMode3, lMode4, lMode5, lMode6,
    dMode1, dMode2, dMode3, dMode4, dMode5, dMode6,
} from '../../utils/colors';

export default function Grievances({ themeChange, mode }) {

    const dispatch = useDispatch();

    // Can be 'createGrievance' or 'grievanceList'
    const [currentView, setCurrentView] = useState('createGrievance');

    const handleChangeView = (event, newView) => {
        if (newView !== null) {
            setCurrentView(newView);
        }
    };

    return (
        <BarredPage mode={mode}>

            <ToggleButtonGroup
                value={currentView}
                exclusive
                onChange={handleChangeView}
                aria-label="grievance view"
                sx={{
                    mt: 3,
                    background: mode === 'light' ? lMode1 : dMode1,
                    borderRadius: '50px',
                    border: `2px solid ${mode === 'light' ? lMode3 : dMode3}`,
                    '& .MuiToggleButton-root': {
                        border: 'none',
                        borderRadius: '50px',
                        '&.Mui-selected': {
                            color: mode === 'light' ? 'white' : 'black',
                            background: mode === 'light' ? lMode4 : dMode4,
                            '&:hover': {
                                background: mode === 'light' ? lMode2 : dMode2,
                            }
                        },
                    },
                }}
            >
                <ToggleButton value="createGrievance" aria-label="create grievance"
                >
                    <Typography
                        textTransform='none'
                        sx={{
                            font: '500 1rem Work Sans, sans-serif',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <CreateIcon /> &nbsp; Create Grievance
                    </Typography>

                </ToggleButton>
                <ToggleButton value="grievanceList" aria-label="grievance list">
                    <Typography
                        textTransform='none'
                        sx={{
                            font: '500 1rem Work Sans, sans-serif',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <FormatListBulletedIcon /> &nbsp; Grievance List
                    </Typography>
                </ToggleButton>
            </ToggleButtonGroup>

            {currentView === 'createGrievance' ? (
                <CreateGrievance {...{ themeChange, mode }} />
            ) : (
                <GrievanceList {...{ themeChange, mode }} />
            )}

        </BarredPage>
    )
}
