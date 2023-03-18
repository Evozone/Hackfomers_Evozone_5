import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import GrievancePanel from './GrievancePanel';

// Material UI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Actions
import { startLoadingAction, stopLoadingAction } from '../../actions/actions';

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
import axios from 'axios';

export default function GrievanceList({ mode }) {
    const dispatch = useDispatch();

    const [grievances, setGrievances] = useState([]);

    useEffect(() => {
        const getGrievance = async () => {
            dispatch(startLoadingAction());
            const response = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/api/grievance`
            );
            setGrievances(response.data.result);
            dispatch(stopLoadingAction());
        };
        getGrievance();
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                width: '100%',
                p: 2,
            }}
        >
            <Box>
                <Typography
                    sx={{
                        margin: '2vh',
                        color: lMode6,
                        font: '600 3rem Poppins, sans-serif',
                    }}
                >
                    Grievances
                </Typography>
            </Box>

            {/* Box to Hold the Grievances */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    width: '100%',
                    p: 2,
                }}
            >
                {grievances.length > 0 &&
                    grievances.map((grievance) => (
                        <GrievancePanel
                            key={grievance.uid}
                            grievance={grievance}
                            mode={mode}
                        />
                    ))}
            </Box>
        </Box>
    );
}
