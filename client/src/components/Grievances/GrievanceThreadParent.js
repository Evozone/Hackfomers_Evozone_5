import React from 'react'

// Material UI
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// Colors
import {
    lMode1, lMode2, lMode3, lMode4, lMode5, lMode6,
    dMode1, dMode2, dMode3, dMode4, dMode5, dMode6,
} from '../../utils/colors';

export default function GrievanceThreadParent({ themeChange, mode, grievance }) {

    const handleVoteChange = async (voteType) => {
        // TODO: Chinu to implement this
        console.log(voteType);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                p: 2,
                pt: 4,
                m: 2,

                backgroundColor: mode === 'light' ? lMode2 : dMode2,
                borderRadius: '20px',
            }}
        >
            <Typography
                component='div'
                sx={{
                    color: mode === 'light' ? lMode1 : dMode1,
                    font: '500 2.2rem Poppins, sans-serif',
                    px: 2,
                }}
            >
                {grievance.title}
            </Typography>

            {/* Poster Details */}
            {grievance?.createdBy && (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        marginTop: '0.5rem',
                        px: 2,
                    }}
                >
                    <Avatar
                        alt={grievance.createdBy.name}
                        src={grievance.createdBy.avatarURL}
                        sx={{
                            marginRight: '0.5rem',
                            backgroundColor: 'white',
                        }}
                    />

                    <Divider orientation='vertical' sx={{
                        height: '2rem',
                        mr: 1,
                        backgroundColor: mode === 'light' ? lMode3 : dMode3,
                    }} />

                    <Typography
                        variant='subtitle1'
                        sx={{ color: mode === 'light' ? lMode6 : dMode6 }}
                    >
                        {grievance.createdBy.name}
                    </Typography>
                </Box>
            )}

            {/* Description */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    m: 2,
                    mb: 1,
                    p: 2,
                    backgroundColor: mode === 'light' ? lMode3 : dMode3,
                    borderRadius: '20px',
                }}
            >
                <Typography
                    variant='body1'
                    sx={{
                        color: mode === 'light' ? 'black' : 'white',
                        mt: '1rem',
                        p: 2,
                        font: '400 1.1rem Work Sans, sans-serif',
                    }}
                >
                    {grievance.description}
                </Typography>
                {grievance?.imageURL && (
                    <img
                        src={grievance.imageURL}
                        alt='Grievance'
                        style={{
                            width: '300px',
                            height: 'auto',
                            borderRadius: '20px',
                        }}
                    />
                )}
            </Box>

            {/* Other Details */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 2,
                    borderRadius: '20px',
                }}
            >
                {/* Status with Colors */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                        sx={{
                            width: '0.5rem',
                            height: '0.5rem',
                            borderRadius: '50%',
                            marginRight: '0.5rem',
                            backgroundColor:
                                grievance.status === 'open'
                                    ? '#27AE60'
                                    : grievance.status === 'pending'
                                        ? '#F2994A'
                                        : '#EB5757',
                        }}
                    ></Box>
                    <Typography
                        variant='subtitle1'
                        sx={{
                            color:
                                grievance.status === 'open'
                                    ? '#27AE60'
                                    : grievance.status === 'pending'
                                        ? '#F2994A'
                                        : '#EB5757',
                            font: '500 1.1rem Work Sans, sans-serif',
                        }}
                    >
                        {grievance.status}
                    </Typography>
                </Box>

                {/* Empty space */}
                <Box sx={{ flexGrow: 1 }}></Box>

                {/* Upvotes */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                        sx={{
                            color: mode === 'light' ? lMode6 : dMode6,
                            '&:hover': {
                                backgroundColor: mode === 'light' ? lMode1 : dMode1,
                            },
                        }}
                        onClick={handleVoteChange('upvote')}
                    >
                        <KeyboardArrowUpIcon />
                    </IconButton>

                    <Typography
                        variant='subtitle1'
                        sx={{
                            color: mode === 'light' ? lMode6 : dMode6,
                            font: '500 1.1rem Poppins, sans-serif',
                            mx: 1,
                        }}
                    >
                        {grievance.votes}
                    </Typography>

                    <IconButton
                        sx={{
                            color: mode === 'light' ? lMode6 : dMode6,
                            '&:hover': {
                                backgroundColor: mode === 'light' ? lMode1 : dMode1,
                            },
                        }}
                        onClick={handleVoteChange('downvote')}
                    >
                        <KeyboardArrowDownIcon />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    )
}
