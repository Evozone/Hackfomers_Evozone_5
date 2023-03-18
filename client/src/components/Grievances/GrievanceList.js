import { useEffect, useState } from 'react';
import GrievancePanel from './GrievancePanel';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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

const dummyGrievances = [
    {
        uid: '1679137321522opo12',
        title: 'Broken street light',
        description:
            'The street light outside my house is broken and needs to be fixed.',
        status: 'Pending',
        organization: '6145d0993f6a3d6c19d20cb3',
        createdBy: '64157b6a93602085f48a4461',
        createdAt: '1679137321522',
        imageURL: 'https://example.com/image.jpg',
        location: '123 Main St',
        votes: 10,
        comments: [],
    },
    {
        uid: '1679137321522opo13',
        title: 'Pothole on Main St',
        description:
            'There is a large pothole on Main St that needs to be filled in.',
        status: 'Resolved',
        organization: '6145d0993f6a3d6c19d20cb3',
        createdBy: '64157b6a93602085f48a4461',
        createdAt: '1679137321523',
        imageURL: 'https://example.com/image2.jpg',
        location: '456 Elm St',
        votes: 20,
        comments: [],
    },
    {
        uid: '1679137321522opo14',
        title: 'Garbage pickup delayed',
        description:
            "Garbage pickup was supposed to happen on Monday but it hasn't happened yet.",
        status: 'Pending',
        organization: '6145d0993f6a3d6c19d20cb3',
        createdBy: '64157b6a93602085f48a4461',
        createdAt: '1679137321524',
        imageURL: 'https://example.com/image3.jpg',
        location: '789 Oak St',
        votes: 5,
        comments: [],
    },
    {
        uid: '1679137321522opo15',
        title: 'Noise complaint',
        description:
            "My neighbors are being very loud and it's disturbing the peace.",
        status: 'Pending',
        organization: '6145d0993f6a3d6c19d20cb3',
        createdBy: '64157b6a93602085f48a4461',
        createdAt: '1679137321525',
        imageURL: 'https://example.com/image4.jpg',
        location: '1011 Pine St',
        votes: 15,
        comments: [],
    },
    {
        uid: '1679137321522opo16',
        title: 'Graffiti on park bench',
        description:
            'Someone has spray-painted graffiti on the park bench in the town square.',
        status: 'Pending',
        organization: '6145d0993f6a3d6c19d20cb3',
        createdBy: '64157b6a93602085f48a4461',
        createdAt: '1679137321526',
        imageURL: 'https://example.com/image5.jpg',
        location: '1213 Maple St',
        votes: 8,
        comments: [],
    },
];

export default function GrievanceList({ mode }) {
    const [grievances, setGrievances] = useState([]);

    useEffect(() => {
        const getGrievance = async () => {
            const response = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/api/grievance`
            );
            console.log(response.data.result);
            setGrievances(response.data.result);
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
            {/* <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    width: '100%',
                    p: 2,
                }}
            >
                {dummyGrievances.map((grievance) => (
                    <GrievancePanel
                        key={grievance.uid}
                        grievance={grievance}
                        mode={mode}
                    />
                ))}
            </Box> */}
            {grievances.length > 0 &&
                grievances.map((grievance) => (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            width: '100%',
                            p: 2,
                        }}
                    >
                        <GrievancePanel
                            key={grievance.uid}
                            grievance={grievance}
                            mode={mode}
                        />
                    </Box>
                ))}
        </Box>
    );
}
