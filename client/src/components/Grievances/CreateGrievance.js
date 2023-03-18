import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';

// MUI Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Custom Components
import ConsistentButton from '../ConsistentButton';
import { StyledTextField } from '../Choose/CreateOrg';
import DashBoardContent from '../Choose/DashBoardContent';

import {
    lMode1, lMode2, lMode3, lMode4, lMode5, lMode6,
    dMode1, dMode2, dMode3, dMode4, dMode5, dMode6,
} from '../../utils/colors';

export default function CreateGrievance({ mode }) {

    const [grievance, setGrievance] = useState({
        uid: '',
        title: '',
        description: '',
        status: '',
        organization: '',
        createdBy: '',
        createdAt: '',
        imageURL: '',
        location: '',
        votes: 0,
        comments: []
    });

    const currentUser = useSelector(state => state.auth);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setGrievance((prevGrievance) => ({
            ...prevGrievance,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        // Backend team handles the grievance code submission

        // Generate a unique id for the grievance
        const uid = uuid();
        setGrievance((prevGrievance) => ({
            ...prevGrievance,
            uid: uid,
            createdBy: currentUser.mid,
            createdAt: Date.now().toString(),
            status: 'open',
            organization: currentUser.organization,
        }));
        console.log(grievance);
    };

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
                    Create a Grievance
                </Typography>

                <Box>
                    <StyledTextField
                        label="Title"
                        variant="outlined"
                        fullWidth
                        name="title"
                        value={grievance.title}
                        onChange={handleInputChange}
                    />

                    <StyledTextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        name="description"
                        value={grievance.description}
                        onChange={handleInputChange}
                    />

                    <StyledTextField
                        label="Title"
                        variant="outlined"
                        fullWidth
                        name="title"
                        value={grievance.title}
                        onChange={handleInputChange}
                    />

                    {/* TODO: Vishal (Put image input) */}

                    <ConsistentButton
                        mode={mode}
                        title="Create Grievance"
                        onClick={handleSubmit}
                    />
                </Box>
            </Box>
        </Box>
    );
}
