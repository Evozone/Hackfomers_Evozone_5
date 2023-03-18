import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CommentIcon from '@mui/icons-material/Comment';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

import AccountBoxIcon from '@mui/icons-material/AccountBox';

import { CustomSwitcherGroup, CustomSwitcherButton } from './CustomSwitcher';

import {
    lMode1, lMode2, lMode3, lMode4, lMode5, lMode6, dMode1, dMode2, dMode3, dMode4, dMode5, dMode6,
} from '../utils/colors';

import { Avatar, Icon } from '@mui/material';

function MainAppbar({ mode, themeChange }) {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);

    const [selected, setSelected] = useState(
        window.localStorage.getItem('grievancesAppLastPage') || 'stage'
    );

    // Array of menu items
    const menuItems = [
        {
            text: 'Spaces',
            icon: <AccountBoxIcon />,
            onClick: () => {
                handleMenuClose();
                navigate('/spaces');
            },
        },
        {
            text: 'Grievances',
            icon: <LibraryBooksIcon />,
            onClick: () => {
                handleMenuClose();
                navigate('/grievances');
            },
        },
        {
            text: 'Chat',
            icon: <CommentIcon />,
            onClick: () => {
                handleMenuClose();
                navigate('/chat');
            },
        },
        {
            text: 'Reports',
            icon: <PersonSearchIcon />,
            onClick: () => {
                handleMenuClose();
                navigate('/reports');
            },
        },
    ];

    const handleSignOut = () => {
        const choice = window.confirm('Please click on OK to Log Out.');
    };

    const handleNavigation = (value) => {
        setSelected(value);
        window.localStorage.setItem('grievancesAppLastPage', value);
        navigate(`/${value}`);
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        // Container for the Top Appbar
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                width: '100%',
            }}
        >
            {/* The rounded swticher thing */}
            <Box
                sx={{
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'space-between',

                    alignItems: 'center',
                    background: 'transparent',
                    color: 'white',
                    pr: 1,
                    zIndex: '1000',
                    top: '5px',
                }}
            >

                <CustomSwitcherGroup exclusive>
                    {/* Map over the menu */}
                    {menuItems.map((item) => (
                        <CustomSwitcherButton
                            value={item.text}
                            selected={selected === item.text.toLowerCase()}
                            onClick={() => handleNavigation(item.text.toLowerCase())}
                        >
                            {item.icon} {item.text}
                        </CustomSwitcherButton>
                    ))}
                </CustomSwitcherGroup>

                {/* <IconButton onClick={handleMenuClick}>
                        <Avatar
                            // alt={currentUser.name.charAt(0).toUpperCase()}
                            // src={currentUser.photoURL}
                            sx={{
                                bgcolor: mode === 'light' ? deepDark : light,
                                color: mode === 'light' ? light : deepDark,
                                height: 45,
                                width: 45,
                                border: '2px solid',
                            }}
                        >
                            {currentUser.name.charAt(0).toUpperCase()}
                        </Avatar>
                    </IconButton> */}

            </Box>
            {/* End of Switcherx */}
        </Box> // End of Container
    );
}

export default MainAppbar;
