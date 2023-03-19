import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Fab from '@mui/material/Fab';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import Typography from '@mui/material/Typography';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import CancelIcon from '@mui/icons-material/Cancel';

import { useHMSActions } from '@100mslive/hms-video-react';
import { startLoadingAction, stopLoadingAction } from '../actions/actions';

import BarredPage from './BarredPage';

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

export default function Spaces({ themeChange, mode }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const hmsActions = useHMSActions();
    const currentUser = useSelector((state) => state.auth);

    const [modalVisible, setModalVisible] = useState(false);
    const [roomId, setRoomId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [coverImgURL, setCoverImgURL] = useState(null);
    const [groups, setGroups] = useState(null);

    useEffect(() => {
        console.log(
            '%cHey if u like this project, consider giving it a star on github :) https://github.com/Evozone/Hackfomers_Evozone_5',
            'color: green; font-size: 26px;'
        );
        console.log(
            "%cIf someone told you to copy/paste something here, there's an 11/10 chance you're being scammed.",
            'font-size: 19px;'
        );
        console.log(
            '%cPasting anything in here could give attackers access to your account, so do not paste anything here.',
            'color:red; font-size: 19px;'
        );
        console.log('%c-inspired by discord', 'font-size: 17px;');
        const getGroups = async () => {
            dispatch(startLoadingAction());
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_SERVER_URL}/api/rooms/getRooms`
                );
                setGroups(res.data.result);
            } catch (error) {
                console.log(error);
            }
            dispatch(stopLoadingAction());
        };
        getGroups();
    }, []);

    useEffect(() => {
        window.localStorage.setItem('hackathonAppLastPage', 'spaces');
        const getManagementToken = async () => {
            generateCoverImgURL();
            var managementToken = '';
            await fetch(`${process.env.REACT_APP_SERVER_URL}/mtoken`, {
                method: 'GET',
            })
                .then((res) => res.json())
                .then((data) => {
                    managementToken = data.data.token;
                })
                .catch((err) => {
                    alert('Something went wrong, please try again later.');
                });
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${managementToken}`,
                },
                body: JSON.stringify({
                    name: `${currentUser.username}-${uuid()}`,
                    description: 'This is a sample description for the room',
                    template_id: '63b72b6a447a48e7edc226bf',
                    region: 'us',
                }),
            };
            await fetch('https://api.100ms.live/v2/rooms', requestOptions)
                .then((response) => response.json())
                .then((data) => setRoomId(data.id))
                .catch((err) => {
                    alert('Something went wrong, please try again later.');
                });
        };
        modalVisible && getManagementToken();
        return () => {
            setRoomId('');
            setCoverImgURL(null);
        };
    }, [modalVisible]);

    const generateCoverImgURL = async () => {
        try {
            const apiKey = process.env.REACT_APP_UNSPLASH_API_KEY;
            const response = await fetch(
                `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=1&query=nature`
            );
            const data = await response.json();
            const url = data[0].urls.regular;
            setCoverImgURL(url);
        } catch (error) {
            console.log(error);
            alert('Something went wrong, please try again later.');
        }
    };

    const joinGroup = (roomId, createdById) => {
        dispatch(startLoadingAction());
        getToken(roomId, createdById)
            .then(async (token) => {
                await hmsActions.join({
                    userName: `${currentUser.username}@${currentUser.photoURL}`,
                    authToken: token,
                    settings: {
                        isAudioMuted: true,
                    },
                    initEndpoint: process.env.REACT_APP_100MS_TOKEN_ENDPOINT,
                });
                dispatch(stopLoadingAction());
                navigate(`/room/${roomId}`);
            })
            .catch((error) => {
                dispatch(stopLoadingAction());
                console.log('Token API Error', error);
            });
    };

    const getToken = async (roomId, createdById) => {
        var role = '';
        createdById.includes(currentUser.uid)
            ? (role = 'moderator')
            : (role = 'participant');
        const response = await fetch(
            `${process.env.REACT_APP_100MS_TOKEN_ENDPOINT}api/token`,
            {
                method: 'POST',
                body: JSON.stringify({
                    user_id: currentUser.uid,
                    role,
                    room_id: roomId,
                }),
            }
        );
        const { token } = await response.json();
        return token;
    };

    const createNewGroup = async (e) => {
        e.preventDefault();
        if (!title || !description || !coverImgURL) {
            alert('Please fill all the fields');
            return;
        }
        try {
            const auth = window.localStorage.getItem('hackathonApp');
            const { dnd } = JSON.parse(auth);
            const data = {
                roomId,
                title,
                description,
                cover: coverImgURL,
            };
            const response = await axios({
                method: 'POST',
                url: `${process.env.REACT_APP_SERVER_URL}/api/rooms/create`,
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${dnd}`,
                },
                data,
            });
            setModalVisible(false);
            setTitle('');
            setDescription('');
            setCoverImgURL(null);
            setGroups((prev) => [...prev, response.data.result]);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteGroup = async (roomId) => {
        const choice = window.confirm(
            'Are you sure you want to delete this group?'
        );
        if (!choice) return;
        const auth = window.localStorage.getItem('healthApp');
        const { dnd } = JSON.parse(auth);
        try {
            await axios({
                method: 'DELETE',
                url: `${process.env.REACT_APP_SERVER_URL}/api/rooms/delete/${roomId}`,
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${dnd}`,
                },
            });
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };
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
                {/* Page Title */}
                <Typography
                    sx={{
                        m: 2,
                        color: lMode6,
                        font: '600 3rem Poppins, sans-serif',
                    }}
                >
                    Spaces
                </Typography>

                {/* Page Subtitle */}
                <Typography
                    sx={{
                        color:
                            'mode' === 'light'
                                ? dMode4.concat('aa')
                                : lMode6.concat('aa'),
                        m: 2,
                        font: '400 1.5rem Work Sans, sans-serif',
                    }}
                >
                    Find people to talk about common grievances
                </Typography>


                <Box
                    sx={{
                        p: 4,
                        display: 'grid',
                        borderRadius: '10px',
                        gridTemplateColumns: 'repeat(3, minmax(280px, 1fr))',
                        gap: '24px 24px',
                        gridAutoFlow: 'dense',
                    }}
                >
                    {groups &&
                        groups.map((space) => (
                            <Card
                                key={space.roomId}
                                sx={{
                                    backgroundColor: mode === 'light' ? lMode2 : dMode2,
                                    color: 'mode' === 'light' ? lMode6 : dMode6,
                                    borderRadius: '10px',
                                    border: mode === 'light' ? '1px solid #e0e0e0' : '',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <CardMedia
                                    image={space.cover}
                                    sx={{
                                        height: '200px',
                                    }}
                                />
                                <CardContent>
                                    <Typography
                                        variant='h5'
                                        sx={{
                                            color:
                                                'mode' === 'light'
                                                    ? lMode6
                                                    : dMode2,
                                            font: '600 1.5rem/1.5rem Poppins, sans-serif',
                                            mb: '0.5rem',
                                        }}
                                    >
                                        {space.title}
                                    </Typography>
                                    <Typography
                                        variant='subtitle2'
                                        color='textSecondary'
                                        sx={{
                                            m: 0,
                                        }}
                                    >
                                        by{' '}
                                        {`${space.createdByUsername}  on   ${space.createdAt.split('T')[0]
                                            }`}
                                    </Typography>
                                    <Box
                                        sx={{
                                            height: '4rem',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <Typography
                                            variant='body1'
                                            sx={{
                                                font: '400 1rem/1.5rem Work Sans, sans-serif',
                                                color: mode === 'light' ? lMode6 : dMode6,
                                            }}
                                        >
                                            {space.description}
                                        </Typography>
                                    </Box>

                                    <Button
                                        disableElevation
                                        color='success'
                                        variant='contained'
                                        sx={{
                                            width: 'fit-content',
                                            color: mode === 'light' ? lMode1 : dMode1,
                                            background: mode === 'light' ? lMode6 : dMode6,
                                            borderRadius: '10px',
                                            boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.25)',
                                            padding: '10px 20px',

                                            '&:hover': {
                                                background: mode === 'light' ? lMode3 : dMode3,
                                            },
                                        }}
                                        onClick={() => {
                                            joinGroup(
                                                space.roomId,
                                                space.createdById
                                            );
                                        }}
                                        endIcon={<PhoneInTalkIcon />}
                                    >
                                        Join
                                    </Button>
                                    {space.createdById === currentUser.uid && (
                                        <Button
                                            sx={{ ml: 2 }}
                                            disableElevation
                                            variant='contained'
                                            color='error'
                                            endIcon={<DeleteIcon />}
                                            onClick={() => {
                                                deleteGroup(space._id);
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                </Box>
            </Box>

            <Modal open={modalVisible}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',

                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',

                        minWidth: 600,
                        maxHeight: '700px',
                        backgroundColor: mode === 'light' ? lMode2 : dMode2,
                        boxShadow: 24,
                        borderRadius: '10px',
                        p: 2,
                        pb: 1,
                        border: 'none',
                    }}
                >
                    <CancelIcon
                        sx={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                        }}
                        cursor='pointer'
                        onClick={() => {
                            setTitle('');
                            setDescription('');
                            setCoverImgURL('');
                            setModalVisible(false);
                            return;
                        }}
                    />
                    {/* Modal Title */}
                    <Typography
                        variant='h4'
                        sx={{
                            textAlign: 'center',
                            mb: 3,
                            color: 'mode' === 'light' ? dMode4 : lMode6,
                            font: '600 1.8rem Poppins, sans-serif',
                        }}
                    >
                        Create New Space
                    </Typography>

                    {/* Modal Form */}
                    <form
                        onSubmit={createNewGroup}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '500px',
                        }}
                    >
                        {/* For Title */}
                        <TextField
                            color='primary'
                            fullWidth
                            required
                            id='outlined-required'
                            label='Title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            sx={{
                                mb: 3,
                                '& .MuiInputBase-input': {
                                    p: 1,
                                },
                                '& .MuiInputLabel-root': {
                                    top: -5,
                                    fontSize: '0.9rem',
                                },
                            }}
                        />
                        {/* For Description */}
                        <TextField
                            color='primary'
                            fullWidth
                            required
                            id='outlined-required'
                            label='Description (max 55 characters)'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            sx={{
                                mb: 3,
                                '& .MuiInputBase-input': {
                                    p: 1,
                                },
                                '& .MuiInputLabel-root': {
                                    top: -5,
                                    fontSize: '0.9rem',
                                },
                            }}
                        />
                        {/* For Cover Image */}
                        {coverImgURL && (
                            <img
                                style={{
                                    objectFit: 'fill',
                                    maxHeight: '300px',
                                    width: '455px',
                                    alignSelf: 'center',
                                    position: 'relative',
                                }}
                                alt='loading ...'
                                src={coverImgURL}
                            />
                        )}
                        <Button
                            disableElevation
                            color='success'
                            variant='contained'
                            sx={{
                                mt: 1,
                                alignSelf: 'center',
                                backgroundColor:
                                    'mode' === 'light' ? dMode2 : lMode6,
                                color: 'black',
                                ':hover': {
                                    backgroundColor: dMode2,
                                    color: 'black',
                                },
                            }}
                            onClick={generateCoverImgURL}
                        >
                            Change Cover Image
                        </Button>
                        <Button
                            color='success'
                            variant='contained'
                            disableElevation
                            sx={{
                                width: 'fit-content',
                                color: mode === 'light' ? lMode1 : dMode1,
                                background: mode === 'light' ? lMode6 : dMode6,
                                borderRadius: '10px',
                                boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.25)',
                                padding: '10px 20px',

                                alignSelf: 'flex-end',

                                '&:hover': {
                                    background: mode === 'light' ? lMode3 : dMode3,
                                },
                            }}
                            type='submit'
                        >
                            Create
                        </Button>
                    </form>
                </Box>
            </Modal>

            {/* Tooltip to add new Space */}
            <Tooltip title='Create a new Space  '>
                <Fab
                    color='primary'
                    aria-label='add'
                    sx={{
                        position: 'fixed',
                        bottom: '2rem',
                        right: '2rem',
                        color: mode === 'light' ? lMode1 : dMode1,
                        backgroundColor: mode === 'light' ? lMode6 : dMode6,

                        borderRadius: '50%',
                        height: '3.5rem',
                        width: '3.5rem',

                        display: 'grid',
                        placeItems: 'center',
                        cursor: 'pointer',

                        boxShadow: '0 0 10px 0 rgba(78,135,140, 0.5)',

                        '&:hover': {
                            color: mode === 'light' ? lMode6 : dMode6,
                            backgroundColor: mode === 'light' ? lMode2 : dMode2,
                            transform: 'scale(1.1) rotate(90deg)',
                            transition: 'transform 0.2s ease-in-out',
                        },
                    }}
                    onClick={() => {
                        setModalVisible(true);
                    }}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>

        </BarredPage>
    );
}
