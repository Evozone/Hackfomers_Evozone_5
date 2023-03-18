import { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Grievance() {

    const [grievance, setGrievance] = useState({});
    const id = window.location.pathname.split('/')[2];

    useEffect(() => {
        const getGrievanceById = async () => {
            try {
                const { data } = await axios.get(
                    `${process.env.REACT_APP_SERVER_URL}/api/grievance/${id}`
                );
                console.log(data.result);
                setGrievance(data.result);
            } catch (error) {
                console.log(error);
            }
        };
        getGrievanceById();
    }, [id]);

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
                <Typography>Single Grievance</Typography>
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
                Grievances bars
            </Box>
        </Box>
    );
}
