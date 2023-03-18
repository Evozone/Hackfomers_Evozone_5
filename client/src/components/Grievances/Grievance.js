import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Material UI
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

// Components
import BarredPage from '../BarredPage';
import ConsistentButton from '../ConsistentButton';
import GrievanceThreadParent from './GrievanceThreadParent';

// Actions
import { startLoadingAction, stopLoadingAction } from '../../actions/actions';

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

export default function Grievance({ mode }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [grievance, setGrievance] = useState({});
    const routeInfo =
        window.location.pathname.split('/')[1] +
        '/' +
        window.location.pathname.split('/')[2];
    const id = window.location.pathname.split('/')[2];

    useEffect(() => {
        const getGrievanceById = async () => {
            dispatch(startLoadingAction());
            try {
                const { data } = await axios.get(
                    `${process.env.REACT_APP_SERVER_URL}/api/grievance/${id}`
                );
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
                    onClick={() => {
                        navigate('/grievances');
                    }}
                    icon={<KeyboardBackspaceIcon />}
                />

                <Divider orientation='horizontal' sx={{ margin: '2vh' }} />

                {/* Component for Main Greivance */}

                <GrievanceThreadParent mode={mode} grievance={grievance} />

            </Box>
        </BarredPage>
    );
}
