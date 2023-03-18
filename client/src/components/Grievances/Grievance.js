import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Material UI
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Avatar from '@mui/material/Avatar';

// Components
import BarredPage from '../BarredPage';
import ConsistentButton from '../ConsistentButton';

// Actions
import { startLoadingAction, stopLoadingAction } from '../../actions/actions';

// Colors
import {
    lMode1, lMode2, lMode3, lMode4, lMode5, lMode6,
    dMode1, dMode2, dMode3, dMode4, dMode5, dMode6,
} from '../../utils/colors';

export default function Grievance({ mode }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [grievance, setGrievance] = useState({});
    const routeInfo = window.location.pathname.split('/')[1] + '/' + window.location.pathname.split('/')[2];
    const id = window.location.pathname.split('/')[2];

    useEffect(() => {
        const getGrievanceById = async () => {
            dispatch(startLoadingAction());
            try {
                const { data } = await axios.get(
                    `${process.env.REACT_APP_SERVER_URL}/api/grievance/${id}`
                );
                console.log(data.result);
                setGrievance(data.result);
            } catch (error) {
                console.log(error);
            }
            dispatch(stopLoadingAction());
        };
        getGrievanceById();

        window.localStorage.setItem('hackathonAppLastPage', routeInfo);
    }, [id]);

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
                {/* Button to go back to Grievances */}
                <ConsistentButton
                    mode={mode}
                    title='Back'
                    onClick={() => { navigate('/grievances'); }}
                    icon={<KeyboardBackspaceIcon />}
                />

                <Divider orientation='horizontal' sx={{ margin: '2vh' }} />

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        p: 2,
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
                    <Typography
                        variant='body1'
                        sx={{ color: mode === 'light' ? lMode3 : dMode3, mt: '1rem' }}
                    >
                        {grievance.description}
                    </Typography>
                </Box>
            </Box>
        </BarredPage>
    );
}
