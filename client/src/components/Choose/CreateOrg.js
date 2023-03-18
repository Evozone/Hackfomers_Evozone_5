import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';

// MUI Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

// Custom Components
import ConsistentButton from '../ConsistentButton';
import DashBoardContent from './DashBoardContent'

// Colors
import {
    lMode1, lMode2, lMode3, lMode4, lMode5, lMode6, dMode1, dMode2, dMode3, dMode4, dMode5, dMode6
} from '../../utils/colors'


export const StyledTextField = styled(TextField)({
    marginBottom: '1rem',
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: lMode3,
        },
    },
});

export default function CreateOrg({ mode }) {

    const [organization, setOrganization] = useState({
        uid: '',
        name: '',
        about: '',
        avatarURL: '',
        createdBy: '',
        createdAt: Date.now().toString(),
        website: '',
        admin: []
    });

    const currentUser = useSelector((state) => state.auth);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setOrganization((prevOrg) => ({
            ...prevOrg,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        // Backend team handles the organization code submission
        console.log(currentUser);

        // Generate a unique id for the organization
        const uid = uuid();
        setOrganization((prevOrg) => ({
            ...prevOrg,
            uid
        }));

        // Add created by, avatarURL, and createdAt
        setOrganization((prevOrg) => ({
            ...prevOrg,
            createdBy: currentUser.mid,
            avatarURL: currentUser.avatarURL,
            createdAt: Date.now().toString(),
        }));

        // Add the current user as an admin
        setOrganization((prevOrg) => ({
            ...prevOrg,
            admin: [prevOrg.createdBy],
        }));

        alert(`Submitted organization code: ${organization}`);
        console.log(organization);
    };

    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: '100vh',
                background: mode === 'light' ? lMode1 : dMode1,
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    height: '80vh',
                    width: '100%',
                    background: `url('/assets/vectors/sun-tornado.svg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Typography sx={{
                    margin: '5vh',
                    color: 'white',
                    fontSize: '5rem',
                    font: '700 4rem Poppins, sans-serif',
                }}>Create an Organization</Typography>

            </Box>

            {/* The Component to choose */}
            <DashBoardContent mode={mode}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingLeft: '20px',
                        paddingRight: '20px',
                    }}
                >
                    <Typography
                        sx={{
                            font: '500 1.5rem Work Sans, sans-serif',
                            color: mode === 'light' ? lMode6 : dMode6,
                            textAlign: 'center',
                            my: 2,
                        }}
                    >
                        Note: You can only create one organization.
                    </Typography>

                    <StyledTextField
                        label="Name"
                        name="name"
                        value={organization.name}
                        onChange={handleInputChange}
                        variant="outlined"
                        fullWidth
                    />

                    <StyledTextField
                        label="About"
                        name="about"
                        value={organization.about}
                        onChange={handleInputChange}
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                    />

                    <StyledTextField
                        label="Website"
                        name="website"
                        value={organization.website}
                        onChange={handleInputChange}
                        variant="outlined"
                        fullWidth
                    />

                    <ConsistentButton
                        mode={mode}
                        title="Create Organization"
                        onClick={handleSubmit}
                        sx={{
                            marginTop: '1rem',
                            width: '100%',
                        }}
                    />
                </Box>
            </DashBoardContent>
        </Box >
    )
}
