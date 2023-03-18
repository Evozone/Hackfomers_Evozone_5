import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';

import BarredPage from './BarredPage';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

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
import axios from 'axios';
import { startLoadingAction, stopLoadingAction } from '../actions/actions';
import { useDispatch } from 'react-redux';

export default function OrgInfo({ themeChange, mode }) {
    const dispatch = useDispatch();

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

                            {/* Create a Box with 2 columns */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: '100%',
                                }}
                            >
                                <Box
                                    sx={{
                                        maxWidth: 'min-content',
                                    }}
                                >
                                    <Typography
                                        sx={{ wordBreak: 'break-all' }}
                                        gutterBottom
                                        variant='h6'
                                        component='div'
                                    >
                                        {orgInfo.about}
                                    </Typography>
                                    <Typography>
                                        <b>Organization Code:</b> {orgInfo._id}
                                    </Typography>
                                    <Typography>
                                        <b>Website:</b> {orgInfo.website}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography>
                                        <b> Admins :</b> {orgInfo.admin?.length}
                                    </Typography>
                                    <Typography>
                                        <b> Grievances :</b>{' '}
                                        {orgInfo.grievances?.length}
                                    </Typography>
                                    <Typography>
                                        <b>Founder :</b> {orgInfo.createdBy.name}
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                )}
            </Box>
        </BarredPage>
    );
}
