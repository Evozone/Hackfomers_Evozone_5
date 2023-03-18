import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

// MUI Styles
import { styled } from '@mui/material/styles';

// MUI Components
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import {
    lMode1, lMode2, lMode3, lMode4, lMode5, lMode6,
    dMode1, dMode2, dMode3, dMode4, dMode5, dMode6,
} from '../../utils/colors';

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
    color: theme.palette.mode === 'light' ? '#000000' : '#ffffff',
    '& .MuiCardHeader-title': {
        font: '500 1.5rem Poppins, sans-serif',
    },
    '& .MuiCardHeader-subheader': {
        font: '400 1rem Work Sans, sans-serif',
    },
}));

export default function GrievancePanel({ grievance, mode }) {
    const navigate = useNavigate();

    const handleGrievanceClick = () => {
        navigate(`/grievance/${grievance._id}`);
    }

    return (
        <Card
            sx={{
                minWidth: 275,

                display: 'flex',
                justifyContent: 'space-between',

                px: '30px',
                margin: '10px',
                borderRadius: '20px',
                boxShadow: 'none',

                backgroundColor: mode === 'light' ? lMode2 : dMode2,
                '&:hover': {
                    cursor: 'pointer',
                    backgroundColor: mode === 'light' ? lMode4 : lMode5,
                }
            }}
            onClick={handleGrievanceClick}
        >

            <StyledCardHeader
                title={grievance.title}
                subheader={`${grievance.createdBy.name} | Status : ${grievance.status}`}
            />

            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '50px',
                }}
            >
                {/* Divider with thickness */}
                <Divider
                    orientation='vertical'
                    flexItem
                    sx={{
                        height: '70px',
                        width: '1px',
                        backgroundColor: mode === 'light' ? lMode3 : dMode3,
                    }}
                />

                <Typography variant='body2' color='text.secondary'
                    sx={{
                        textAlign: 'center',
                        font: '400 1.2rem Work Sans, sans-serif',
                    }}
                >
                    {grievance.votes} <br></br> Votes
                </Typography>

                {/* Divider with thickness */}
                <Divider
                    orientation='vertical'
                    flexItem
                    sx={{
                        height: '70px',
                        width: '1px',
                        backgroundColor: mode === 'light' ? lMode3 : dMode3,
                    }}
                />

                <Typography variant='body2' color='text.secondary'
                    sx={{
                        textAlign: 'center',
                        font: '400 1.2rem Work Sans, sans-serif',
                    }}
                >
                    {grievance.comments.length} <br></br> Comments
                </Typography>

            </CardContent>
        </Card >
    );
}
