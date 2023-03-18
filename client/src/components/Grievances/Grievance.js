import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const dummyGrievances = [
    {
        id: 1,
        title: "Grievance 1",
        description: "Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet",
        status: "Pending",
        createdBy: "User 1",
        createdAt: "2021-07-01",
    },
]

export default function Grievance() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                width: '100%',
                p: 2
            }}
        >
            <Box>
                <Typography>
                    Grievance
                </Typography>
            </Box>

            {/* Box to Hold the Grievances */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    width: '100%',
                    p: 2
                }}
            >
                Grievances bars
            </Box>

        </Box>
    )
}
