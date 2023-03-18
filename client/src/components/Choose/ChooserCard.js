import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import ChooserCardSection from './ChooserCardSection';

// MUI Components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';

// Custom Components
import DashBoardContent from './DashBoardContent';
import ConsistentButton from '../ConsistentButton';

// Colors
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

export default function ChooserCard({ mode }) {
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.auth);

    const [adminOrgs, setAdminOrgs] = useState([]);
    const [orgCode, setOrgCode] = useState('');

    const handleOrgCodeChange = (event) => {
        setOrgCode(event.target.value);
    };

    const handleOrgCodeSubmit = async () => {
        // Backend team handles the organization code submission
        console.log(`Submitted organization code: ${orgCode}`);
        window.localStorage.setItem('organizationId', JSON.stringify(orgCode));
        const data = {
            orgId: orgCode,
            mid: currentUser.mid,
        };
        await axios({
            method: 'POST',
            url: `${process.env.REACT_APP_SERVER_URL}/api/user/joinOrg`,
            data,
        });
        navigate('/organization');
    };

    const handleOrgJoin = (orgId) => {
        window.localStorage.setItem('organizationId', JSON.stringify(orgId));
        navigate('/organization');
    };

    return (
        <DashBoardContent mode={mode}>
            <ChooserCardSection
                floatDirection='left'
                mode={mode}
                title='Create an Organization'
            >
                {adminOrgs?.length === 0 ? (
                    <Button
                        sx={{
                            color: mode === 'light' ? lMode1 : dMode1,
                            background: mode === 'light' ? lMode6 : dMode6,
                            borderRadius: '20px',
                            width: '50px',
                            height: '50px',
                            margin: '10px',

                            '&:hover': {
                                background: mode === 'light' ? lMode5 : dMode5,
                            },
                        }}
                        onClick={() => {
                            navigate('/createOrg');
                        }}
                    >
                        <AddIcon sx={{ fontSize: 30 }} />
                    </Button>
                ) : (
                    // Show the list of organizations (not buttons)
                    <Typography
                        sx={{
                            color: mode === 'light' ? lMode4 : dMode4,
                            font: '400 1.2rem Work Sans, sans-serif',
                            margin: '20px',
                        }}
                    >
                        You are already an admin of an organization.
                    </Typography>
                )}
            </ChooserCardSection>

            {/* Central Divider */}
            <Divider orientation='vertical' flexItem />

            <ChooserCardSection
                floatDirection='right'
                mode={mode}
                title='Join An Organization'
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <TextField
                        id='organization-code-input'
                        label='Enter organization code'
                        variant='outlined'
                        margin='normal'
                        value={orgCode}
                        onChange={handleOrgCodeChange}
                    />
                    <ConsistentButton
                        mode={mode}
                        title='Join'
                        onClick={handleOrgCodeSubmit}
                    />
                </Box>
                {currentUser?.organizations?.length > 0 ? (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography
                            sx={{
                                color: mode === 'light' ? lMode4 : dMode4,
                                font: '400 1.2rem Work Sans, sans-serif',
                                margin: '20px',
                            }}
                        >
                            You are already a member of the following
                            organizations:
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            {currentUser.organizations.map((org) => (
                                <Box
                                    sx={{
                                        display: 'grid',
                                        placeItems: 'center',
                                        textAlign: 'center',
                                        p: 2,
                                        m: 2,
                                        width: '400px',
                                        font: '500 1rem Work Sans, sans-serif',
                                        backgroundColor:
                                            mode === 'light' ? lMode2 : dMode2,
                                        borderRadius: '20px',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            backgroundColor:
                                                mode === 'light'
                                                    ? lMode3
                                                    : dMode3,
                                        },
                                    }}
                                    onClick={() => {
                                        handleOrgJoin(org._id);
                                    }}
                                >
                                    {`${org.name}  |  open`}
                                </Box>
                            ))}
                        </Box>
                    </Box>
                ) : (
                    <Typography
                        sx={{
                            color: mode === 'light' ? lMode4 : dMode4,
                            font: '400 1.2rem Work Sans, sans-serif',
                            margin: '20px',
                        }}
                    >
                        You are not a member of any organizations.
                    </Typography>
                )}
            </ChooserCardSection>
        </DashBoardContent>
    );
}
