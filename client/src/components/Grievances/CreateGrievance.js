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
import Alert from '@mui/material/Alert';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';


// Custom Components
import ConsistentButton from '../ConsistentButton';
import { StyledTextField } from '../Choose/CreateOrg';
import ImageIcon from '@mui/icons-material/Image';
import CancelIcon from '@mui/icons-material/Cancel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

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
    const [duplicate, setDuplicate] = useState(false);
    const [duplicateGrievances, setDuplicateGrievances] = useState([]);

    // define the state variable for Alert visibility
    const [showAlert, setShowAlert] = useState(false);

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

    const handleSubmit = async (keywords) => {
        // Backend team handles the grievance code submission

        if (!grievance.title || !grievance.description || !grievance.location) {
            alert('Title, description  & location are required');
            return;
        }
        dispatch(startLoadingAction());
        // Generate a unique id for the grievance
        const uid = uuid();

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
            keywords,
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
            navigate(`/grievances/${result.data.result._id}`);
        } catch (error) {
            console.log(error);
        }
        dispatch(stopLoadingAction());
        console.log(grievance);
    };

    const getKeywords = async () => {
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: `Bearer ${process.env.REACT_APP_EDENAI_API_KEY}`,
            },
            body: JSON.stringify({
                response_as_dict: false,
                attributes_as_list: false,
                show_original_response: true,
                providers: 'openai',
                text: grievance.description,
            }),
        };
        const response = await fetch(
            'https://api.edenai.run/v2/text/keyword_extraction',
            options
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data[0].items;
    };

    const checkGrievance = async () => {
        if (grievance.description && grievance.location) {
            dispatch(startLoadingAction());
            const keywords = await getKeywords();
            const res = await axios({
                method: 'POST',
                url: `${process.env.REACT_APP_SERVER_URL}/api/grievance/check`,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    location: grievance.location,
                    keywords,
                },
            });

            if (res.data.result?.length > 0) {
                dispatch(stopLoadingAction());
                setDuplicateGrievances(res.data.result);
                setDuplicate(true);
                setShowAlert(true);

                // Play the sound when the alert appears
                const audio = new Audio('/assets/audio/notification.mp3');
                audio.play();

                setTimeout(() => {
                    setShowAlert(false);
                }, 5000);
            } else {
                handleSubmit(keywords);
            }
        } else {
            alert('Please enter a description and location');
        }
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
            {/* Page Title */}
            <Typography
                sx={{
                    margin: '2vh',
                    color: lMode6,
                    font: '600 3rem Poppins, sans-serif',
                }}
            >
                Create a Grievance
            </Typography>

            {/* Grievance Form */}
            <Box
                sx={{
                    p: 5,
                    m: 1,
                    borderRadius: '20px',
                    boxShadow: 'none',

                    backgroundColor: mode === 'light' ? lMode2 : dMode2,
                }}
            >
                {/* Form Title */}
                <Typography
                    sx={{
                        font: '500 1.5rem Work Sans, sans-serif',
                        color: mode === 'light' ? 'white' : 'black',
                        mb: 4,
                    }}
                >
                    Fill in the details of your grievance
                </Typography>

                {/* Input Title */}
                <StyledTextField
                    label='Title'
                    variant='outlined'
                    fullWidth
                    name='title'
                    value={grievance.title}
                    onChange={handleInputChange}
                />

                {/* Input Description */}
                <StyledTextField
                    label='Description'
                    variant='outlined'
                    multiline
                    maxRows={5}
                    fullWidth
                    name='description'
                    value={grievance.description}
                    onChange={handleInputChange}
                />

                {/* Input Location */}
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

                {/* Select Image */}
                <input
                    accept='image/*'
                    id='sendImage'
                    type='file'
                    style={{ display: 'none' }}
                    onChange={handleImageInput}
                />

                {/* Select Image */}
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

                {/* Submit Button */}
                <ConsistentButton
                    mode={mode}
                    title='Create Grievance'
                    onClick={checkGrievance}
                />
            </Box>

            {/* Duplicate Grievances */}
            {duplicate && (
                <Box
                    sx={{
                        p: 5,
                        m: 1,
                        borderRadius: '20px',
                        boxShadow: 'none',
                        backgroundColor: mode === 'light' ? lMode2 : dMode2,
                    }}
                >
                    {showAlert && (
                        <Alert
                            severity="warning"
                            sx={{
                                position: 'fixed',
                                bottom: '0',
                                right: '0',
                                font: '500 1.2rem Work Sans, sans-serif',
                                mb: 4,
                                border: `1px solid red`,
                                zIndex: 1000,
                            }}
                        >
                            There are similar grievances already created. Please check them out.
                        </Alert>
                    )}

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            width: '100%',
                            p: 2,
                        }}
                    >
                        {/* Form Title */}
                        <Typography
                            sx={{
                                font: '500 1.5rem Work Sans, sans-serif',
                                color: mode === 'light' ? 'white' : 'black',
                                mb: 4,
                            }}
                        >
                            These are the complaints or grievances that are similar to yours. Please check them out.
                        </Typography>

                        {duplicateGrievances.map((grievance) => (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start',
                                    width: '100%',
                                    p: 4,
                                    mb: 2,
                                    border: mode === 'light' ? `2px dashed ${lMode3}` : `2px dashed ${dMode3}`,
                                    borderRadius: '20px',
                                }}
                                key={grievance._id}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'flex-start',
                                            width: '100%',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                font: '500 1.5rem Work Sans, sans-serif',
                                                color: mode === 'light' ? 'black' : 'white',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                width: '70%',
                                                mr: 2,
                                            }}
                                        >
                                            {grievance.title}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                font: '400 1rem Work Sans, sans-serif',
                                                color: mode === 'light' ? lMode6 : dMode6,
                                                mt: 2,
                                            }}
                                        >
                                            {grievance.description.substr(0, 200)}...
                                        </Typography>
                                    </Box>
                                    <ConsistentButton
                                        mode={mode}
                                        title='Write a Comment Here instead'
                                        icon={<HistoryEduIcon />}
                                        onClick={() =>
                                            navigate(`/grievances/${grievance._id}`)
                                        }
                                    />
                                </Box>
                            </Box>
                        ))}
                        {/* Submit Button */}
                        <ConsistentButton
                            mode={mode}
                            title='Create new Grievance anyway'
                            onClick={checkGrievance}
                        />
                    </Box>
                </Box>
            )}
        </Box>
    );
}
