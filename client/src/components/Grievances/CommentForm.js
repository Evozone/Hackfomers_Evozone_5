import React, { useRef, useState } from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const CommentForm = ({ grievance }) => {
    const commentRef = useRef();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth);

    const [characterCount, setCharacterCount] = useState(0);

    const CHARACTER_LIMIT = 150;

    const handleInputChange = (e) => {
        setCharacterCount(e.target.value.length);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const commentText = commentRef.current.value;
        if (commentText.length > CHARACTER_LIMIT || commentText.length === 0) {
            alert('Comment must be between 1 and 150 characters');
            return;
        }
        const data = {
            uid: uuidv4(),
            text: commentText,
            createdBy: currentUser.mid,
            createdAt: new Date().toISOString(),
            grievance: grievance._id,
        };
        const result = await axios({
            method: 'POST',
            url: `${process.env.REACT_APP_SERVER_URL}/api/comment/create`,
            headers: {
                'Content-Type': 'application/json',
            },
            data,
        });
        window.location.reload();
        commentRef.current.value = '';
        setCharacterCount(0);
    };

    return (
        <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{ display: 'flex', px: 2 }}
        >
            <TextField
                inputRef={commentRef}
                placeholder='comment'
                required={true}
                multiline
                sx={{ flexGrow: 1, mx: 1 }}
                helperText={`${characterCount}/${CHARACTER_LIMIT}`}
                inputProps={{
                    maxLength: CHARACTER_LIMIT,
                }}
                onChange={handleInputChange}
            />
            <IconButton sx={{ mb: 2.8 }} color='primary' type='submit'>
                <SendIcon />
            </IconButton>
        </Box>
    );
};

export default CommentForm;
