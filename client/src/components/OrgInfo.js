import { useEffect, useState } from 'react';
import axios from 'axios';
import { startLoadingAction, stopLoadingAction } from '../actions/actions';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import BarredPage from './BarredPage';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';

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
} from '../utils/colors';

export default function OrgInfo({ themeChange, mode }) {
    const dispatch = useDispatch();

    const [copySuccess, setCopySuccess] = useState(false);

    const handleCopyCode = () => {
        navigator.clipboard.writeText(orgInfo._id);
        setCopySuccess(true);
    };

    const [orgInfo, setOrgInfo] = useState(null);

    useEffect(() => {
        window.localStorage.setItem('hackathonAppLastPage', 'organization');
        const getOrgInfo = async () => {
            dispatch(startLoadingAction());
            const id = window.localStorage.getItem('organizationId');
            const orgId = JSON.parse(id);
            const { data } = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/api/org/${orgId}`
            );
            setOrgInfo(data.result);
            dispatch(stopLoadingAction());
        };
        getOrgInfo();
    }, []);

    return (
        <BarredPage mode={mode}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    width: '100%',
                    p: 2,
                }}
            >
                <Typography
                    sx={{
                        margin: '2vh',
                        color: lMode6,
                        font: '600 3rem Poppins, sans-serif',
                    }}
                >
                    This Organization
                </Typography>

                {orgInfo && (
                    <Card
                        sx={{
                            width: '90%',
                            backgroundColor: mode === 'light' ? lMode2 : dMode2,
                            borderRadius: '20px',
                            boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.25)',

                            display: 'flex',
                            flexDirection: 'column',

                            margin: 'auto',
                            my: '20px',
                        }}
                    >
                        <CardMedia
                            component='img'
                            image={orgInfo.avatarURL}
                            height='250'
                            sx={{
                                width: '100%',
                                objectFit: 'cover',
                            }}
                        />
                        <CardContent
                            sx={{
                                p: 4,
                            }}
                        >
                            {/* Organization Name */}
                            <Typography
                                gutterBottom
                                component='div'
                                sx={{
                                    color: mode === 'light' ? lMode1 : dMode1,
                                    font: '500 2.2rem Poppins, sans-serif',
                                }}
                            >
                                {orgInfo.name}
                            </Typography>

                            {/* Created By and Location */}
                            {orgInfo?.createdBy && (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent:
                                            'flex-start',
                                        alignItems: 'center',
                                        marginTop: '0.5rem',
                                    }}
                                >
                                    <Avatar
                                        alt={orgInfo.createdBy.name}
                                        src={
                                            orgInfo.createdBy
                                                .avatarURL
                                        }
                                        sx={{
                                            marginRight: '0.5rem',
                                            backgroundColor:
                                                'white',
                                        }}
                                    />

                                    <Divider
                                        orientation='vertical'
                                        sx={{
                                            height: '2rem',
                                            mr: 1,
                                            backgroundColor:
                                                mode === 'light'
                                                    ? lMode3
                                                    : dMode3,
                                        }}
                                    />

                                    <Typography
                                        variant='subtitle1'
                                        sx={{
                                            color:
                                                mode === 'light'
                                                    ? lMode6
                                                    : dMode6,
                                            mr: 1,
                                        }}
                                    >
                                        {orgInfo.createdBy.name}
                                    </Typography>

                                    <Divider
                                        orientation='vertical'
                                        sx={{
                                            height: '2rem',
                                            mr: 1,
                                            backgroundColor:
                                                mode === 'light'
                                                    ? lMode3
                                                    : dMode3,
                                        }}
                                    />

                                    <Typography
                                        variant='subtitle1'
                                        sx={{
                                            color:
                                                mode === 'light'
                                                    ? lMode6
                                                    : dMode6,
                                        }}
                                    >
                                        {orgInfo.location}
                                    </Typography>

                                </Box>
                            )}

                            {/* Other info */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    width: '100%',
                                    my: 3,
                                    p: 2,
                                }}
                            >
                                {/* About section */}
                                <Typography
                                    sx={{
                                        color: mode === 'light' ? 'black' : 'white',
                                        font: '500 1.5rem Work Sans, sans-serif',
                                        p: 5,
                                        pt: 0,
                                    }}
                                >
                                    {orgInfo.about}
                                </Typography>

                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr',
                                        gridGap: '10px',
                                        width: '100%',
                                        p: '10px',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            p: 4,
                                            m: 2,
                                            font: '500 1rem Work Sans, sans-serif',
                                            border: mode === 'light' ? `2px dashed ${lMode3}` : `2px dashed ${dMode3}`,
                                            borderRadius: '20px',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: mode === 'light' ? lMode6 : dMode6,
                                                font: '500 1.5rem Work Sans, sans-serif',
                                            }}
                                        >
                                            <b>Organization Code:</b> {orgInfo._id}
                                        </Typography>
                                        <Button
                                            sx={{
                                                width: '20px',
                                            }}
                                            variant='contained'
                                            onClick={handleCopyCode}
                                        >
                                            <ContentCopyIcon />
                                        </Button>
                                    </Box>

                                    <Box
                                        sx={{
                                            p: 4,
                                            m: 2,
                                            font: '500 1rem Work Sans, sans-serif',
                                            border: mode === 'light' ? `2px dashed ${lMode3}` : `2px dashed ${dMode3}`,
                                            borderRadius: '20px',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: mode === 'light' ? lMode6 : dMode6,
                                                font: '500 1.5rem Work Sans, sans-serif',
                                            }}
                                        >
                                            <b> Admins :</b>
                                        </Typography>
                                        {/* Get all admins */}
                                        {orgInfo.admin.map((admin) => (
                                            <Typography
                                                key={admin}
                                                sx={{
                                                    color: mode === 'light' ? lMode6 : dMode6,
                                                    font: '500 1.5rem Work Sans, sans-serif',
                                                }}
                                            >
                                                {/* Admin is the mid */}
                                                {admin}
                                            </Typography>
                                        ))}

                                    </Box>

                                    <Box
                                        sx={{
                                            p: 4,
                                            m: 2,
                                            font: '500 1rem Work Sans, sans-serif',
                                            border: mode === 'light' ? `2px dashed ${lMode3}` : `2px dashed ${dMode3}`,
                                            borderRadius: '20px',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: mode === 'light' ? lMode6 : dMode6,
                                                font: '500 1.5rem Work Sans, sans-serif',
                                            }}
                                        >
                                            <b>Website:</b> {orgInfo.website}
                                        </Typography>
                                    </Box>

                                    <Box
                                        sx={{
                                            p: 4,
                                            m: 2,
                                            font: '500 1rem Work Sans, sans-serif',
                                            border: mode === 'light' ? `2px dashed ${lMode3}` : `2px dashed ${dMode3}`,
                                            borderRadius: '20px',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: mode === 'light' ? lMode6 : dMode6,
                                                font: '500 1.5rem Work Sans, sans-serif',
                                            }}
                                        >
                                            <b> Grievances :</b> {orgInfo.grievances?.length}
                                        </Typography>
                                    </Box>
                                </Box>

                            </Box>


                            {/* Info end */}
                        </CardContent>
                    </Card>
                )}

            </Box>
        </BarredPage >
    );
}
