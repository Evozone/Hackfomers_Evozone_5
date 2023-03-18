import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import storage from '../../appwrite';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

// MUI Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

// Custom Components
import ConsistentButton from '../ConsistentButton';
import DashBoardContent from './DashBoardContent';

import ImageIcon from '@mui/icons-material/Image';
import CancelIcon from '@mui/icons-material/Cancel';

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
import axios from 'axios';

export const StyledTextField = styled(TextField)({
    marginBottom: '1rem',
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: lMode3,
        },
    },
});

export default function CreateOrg({ mode }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [organization, setOrganization] = useState({
        uid: '',
        name: '',
        about: '',
        avatarURL: '',
        createdBy: '',
        createdAt: Date.now().toString(),
        website: '',
        admin: [],
    });
    const [imgLocalURL, setImgLocalURL] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const currentUser = useSelector((state) => state.auth);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setOrganization((prevOrg) => ({
            ...prevOrg,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!organization.name || !organization.about) {
            alert('Please fill all the fields');
            return;
        }
        let result = '';
        dispatch(startLoadingAction());
        if (imageFile) {
            const id = uuid();
            await storage.createFile(
                process.env.REACT_APP_APPWRITE_BUCKET_ID,
                id,
                imageFile
            );
            result = await storage.getFilePreview(
                process.env.REACT_APP_APPWRITE_BUCKET_ID,
                id
            );
        }
        setOrganization((prevOrg) => ({
            ...prevOrg,
            createdBy: currentUser.mid,
            avatarURL: currentUser.avatarURL,
            createdAt: Date.now().toString(),
        }));
        console.log(result.href);
        const data = {
            uid: uuid(),
            name: organization.name,
            about: organization.about,
            avatarURL: result.href,
            website: organization.website,
            createdAt: Date.now().toString(),
            createdBy: currentUser.mid,
            admin: [currentUser.mid],
        };
        try {
            const result = await axios({
                method: 'POST',
                url: `${process.env.REACT_APP_SERVER_URL}/api/org/create`,
                headers: {
                    'Content-Type': 'application/json',
                },
                data,
            });
            window.localStorage.setItem(
                'organizationId',
                JSON.stringify(result.data.result._id)
            );
            navigate(`/organization`);
        } catch (error) {
            console.log(error);
        }
        dispatch(stopLoadingAction());
    };

    const handleCloseImgModal = () => {
        setImgLocalURL('');
        setImageFile(null);
    };

    const handleImageInput = (e) => {
        const file = e?.target.files[0];
        if (file) {
            const fileExt = file?.name.split('.').pop();
            if (
                fileExt === 'jpg' ||
                fileExt === 'jpeg' ||
                fileExt === 'png' ||
                fileExt === 'gif'
            ) {
                const localUrl = URL.createObjectURL(file);
                setImgLocalURL(localUrl);
                setImageFile(file);
                e.target.value = '';
            } else {
                alert(
                    'Please upload a valid image file of type jpg, jpeg, png or gif'
                );
            }
        }
    };

    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: '100vh',
                background: mode === 'light' ? lMode1 : dMode1,
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    height: '80vh',
                    width: '100%',
                    background: `url('/assets/vectors/sun-tornado.svg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    sx={{
                        margin: '5vh',
                        color: 'white',
                        fontSize: '5rem',
                        font: '700 4rem Poppins, sans-serif',
                    }}
                >
                    Create an Organization
                </Typography>
            </Box>

            {/* The Component to choose */}
            <DashBoardContent mode={mode}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingLeft: '20px',
                        paddingRight: '20px',
                    }}
                >
                    <Typography
                        sx={{
                            font: '500 1.5rem Work Sans, sans-serif',
                            color: mode === 'light' ? lMode6 : dMode6,
                            textAlign: 'center',
                            my: 2,
                        }}
                    >
                        Note: You can only create one organization.
                    </Typography>

                    <StyledTextField
                        label='Name'
                        name='name'
                        value={organization.name}
                        onChange={handleInputChange}
                        variant='outlined'
                        fullWidth
                    />

                    <StyledTextField
                        label='About'
                        name='about'
                        value={organization.about}
                        onChange={handleInputChange}
                        variant='outlined'
                        fullWidth
                        multiline
                        rows={4}
                    />

                    <StyledTextField
                        label='Website'
                        name='website'
                        value={organization.website}
                        onChange={handleInputChange}
                        variant='outlined'
                        fullWidth
                    />

                    {imageFile && (
                        <Box sx={{ position: 'relative' }}>
                            <CancelIcon
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    right: '-30px',
                                }}
                                cursor='pointer'
                                onClick={handleCloseImgModal}
                            />
                            <img
                                style={{
                                    objectFit: 'contain',
                                    height: '100%',
                                    maxWidth: '600px',
                                    maxHeight: '400px',
                                    display: 'block',
                                }}
                                alt='loading ...'
                                src={imgLocalURL}
                            />
                        </Box>
                    )}

                    <Divider sx={{ mt: '2px', width: '100%' }} />

                    <input
                        accept='image/*'
                        id='sendImage'
                        type='file'
                        style={{ display: 'none' }}
                        onChange={handleImageInput}
                    />
                    <IconButton sx={{ ml: 1, pb: '4px' }}>
                        <label htmlFor='sendImage'>
                            <Tooltip title='Select an Image'>
                                <ImageIcon
                                    sx={{
                                        fontSize: '33px',
                                        cursor: 'pointer',
                                        color: lMode6,
                                    }}
                                />
                            </Tooltip>
                        </label>
                    </IconButton>

                    <ConsistentButton
                        mode={mode}
                        title='Create Organization'
                        onClick={handleSubmit}
                        sx={{
                            marginTop: '1rem',
                            width: '100%',
                        }}
                    />
                </Box>
            </DashBoardContent>
        </Box>
    );
}
