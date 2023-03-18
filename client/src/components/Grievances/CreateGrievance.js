import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

// MUI Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Custom Components
import ConsistentButton from '../ConsistentButton';
import { StyledTextField } from '../Choose/CreateOrg';
import DashBoardContent from '../Choose/DashBoardContent';
import ImageIcon from '@mui/icons-material/Image';
import CancelIcon from '@mui/icons-material/Cancel';

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

import storage from '../../appwrite';
import { startLoadingAction, stopLoadingAction } from '../../actions/actions';

export default function CreateGrievance({ mode }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [grievance, setGrievance] = useState({
        uid: '',
        title: '',
        description: '',
        status: '',
        organization: '',
        createdBy: '',
        createdAt: '',
        location: '',
        votes: 0,
        comments: [],
    });
    const [imgLocalURL, setImgLocalURL] = useState('');
    const [imageFile, setImageFile] = useState(null);

    const currentUser = useSelector((state) => state.auth);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setGrievance((prevGrievance) => ({
            ...prevGrievance,
            [name]: value,
        }));
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

    const handleSubmit = async () => {
        // Backend team handles the grievance code submission

        if (!grievance.title || !grievance.description) {
            alert('Title and description are required');
            return;
        }
        dispatch(startLoadingAction());
        // Generate a unique id for the grievance
        const uid = uuid();

        setGrievance((prevGrievance) => ({
            ...prevGrievance,
            uid: uid,
            createdBy: currentUser.mid,
            createdAt: Date.now().toString(),
            status: 'open',
            organization: 'Put something here Vishal',
        }));

        const orgId = JSON.parse(window.localStorage.getItem('organizationId'));

        let result = '';
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

        const data = {
            uid,
            title: grievance.title,
            description: grievance.description,
            status: 'open',
            organization: orgId,
            createdBy: currentUser.mid,
            createdAt: Date.now().toString(),
            imageURL: result.href,
            location: grievance.location,
            votes: 0,
            comments: [],
        };

        try {
            const result = await axios({
                method: 'POST',
                url: `${process.env.REACT_APP_SERVER_URL}/api/grievance/create`,
                headers: {
                    'Content-Type': 'application/json',
                },
                data,
            });
            navigate(`/grivances/${result.data.result._id}`);
        } catch (error) {
            console.log(error);
        }
        dispatch(stopLoadingAction());
        console.log(grievance);
    };

    return (
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
                Create a Grievance
            </Typography>

            <Box
                sx={{
                    p: 5,
                    m: 1,
                    borderRadius: '20px',
                    boxShadow: 'none',

                    backgroundColor: mode === 'light' ? lMode2 : dMode2,
                }}
            >
                <Typography
                    sx={{
                        font: '500 1.5rem Work Sans, sans-serif',
                        color: mode === 'light' ? lMode3 : dMode3,
                        mb: 4,
                    }}
                >
                    Fill in the details of your grievance
                </Typography>

                <StyledTextField
                    label='Title'
                    variant='outlined'
                    fullWidth
                    name='title'
                    value={grievance.title}
                    onChange={handleInputChange}
                />

                <StyledTextField
                    label='Description'
                    variant='outlined'
                    fullWidth
                    name='description'
                    value={grievance.description}
                    onChange={handleInputChange}
                />

                <StyledTextField
                    label='Location'
                    variant='outlined'
                    fullWidth
                    name='location'
                    value={grievance.location}
                    onChange={handleInputChange}
                />

                {imageFile && (
                    <Box sx={{ position: 'relative' }}>
                        <CancelIcon
                            sx={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
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
                                margin: 'auto',
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
                    title='Create Grievance'
                    onClick={handleSubmit}
                />
            </Box>
        </Box >
    );
}
