import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';

import BarredPage from './BarredPage';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
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
            {/* <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <img
                    src={orgInfo.avatarURL}
                    alt='cover'
                    style={{
                        width: '100%',
                        maxHeight: '400px',
                        objectFit: 'cover',
                    }}
                />

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        minHeight: '100vh',
                        backgroundColor: mode ? dMode1 : lMode1,
                        color: mode ? dMode6 : lMode6,
                        padding: '10px',
                    }}
                ></Box>
            </Box>
             */}
            {orgInfo && (
                <Card>
                    <CardMedia
                        component='img'
                        height='350px'
                        image={orgInfo.avatarURL}
                        sx={{
                            width: '900px',
                            objectFit: 'fill',
                        }}
                    />
                    <CardContent
                        sx={{
                            p: 4,
                        }}
                    >
                        <Typography
                            sx={{ textAlign: 'center' }}
                            gutterBottom
                            variant='h3'
                            component='div'
                        >
                            {orgInfo.name}
                        </Typography>

                        {/* <div
                            className='content'
                            style={{ wordBreak: 'break-word' }}
                            dangerouslySetInnerHTML={{ __html: blog?.content }}
                        /> */}

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
                            <Box>
                                <Typography
                                    // sx={{ textAlign: 'center' }}
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
        </BarredPage>
    );
}
