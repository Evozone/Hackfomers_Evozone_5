import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

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

export default function GrievancePanel({ key, grievance, mode }) {
    const navigate = useNavigate();

    const handleGrievanceClick = () => {
        navigate(`/grievance/${grievance._id}`);
    }

    return (
        <Card
            sx={{
                minWidth: 275,
                margin: '5px',

                display: 'flex',
                justifyContent: 'space-between',

                padding: '10px',
                margin: '10px',
                borderRadius: '20px',
                boxShadow: 'none',

                backgroundColor: mode === 'light' ? lMode2 : lMode6,
                '&:hover': {
                    cursor: 'pointer',
                    backgroundColor: mode === 'light' ? lMode4 : lMode5,
                }
            }}
            onClick={handleGrievanceClick}
        >

            <CardHeader
                title={grievance.title}
                subheader={`${grievance.createdBy.name} | Status : ${grievance.status}`}
            />

            <CardContent
                sx={{
                    display: 'flex',
                    padding: '10px',
                    margin: '10px',
                    gap: '50px',
                }}
            >
                <Typography variant='body2' color='text.secondary'
                    sx={{
                        textAlign: 'center',
                        font: '400 2rem work-sans, Sans-Serif',
                    }}
                >
                    {grievance.votes} <br></br> Votes
                </Typography>

                <Divider orientation='vertical' flexItem />

                <Typography variant='body2' color='text.secondary'
                    sx={{
                        textAlign: 'center',
                        font: '400 2rem work-sans, Sans-Serif',
                    }}
                >
                    {grievance.comments.length} <br></br> Comments
                </Typography>

            </CardContent>
        </Card >
    );
}
