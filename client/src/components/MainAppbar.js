import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// MUI Components
import Box from '@mui/material/Box';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CommentIcon from '@mui/icons-material/Comment';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import Groups2Icon from '@mui/icons-material/Groups2';

// Custom Components
import { CustomSwitcherGroup, CustomSwitcherButton } from './CustomSwitcher';

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
} from '../utils/colors';

import { Avatar, Icon } from '@mui/material';

function MainAppbar({ mode, themeChange }) {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const [hovered, setHovered] = useState(false);

    const [selected, setSelected] = useState(
        window.localStorage.getItem('hackathonAppLastPage') || 'spaces'
    );

    // Array of menu items
    const menuItems = [
        {
            text: 'Spaces',
            icon: <Groups2Icon />,
            value: 'Spaces',
            onClick: () => {
                handleMenuClose();
                navigate('/spaces');
            },
        },
        {
            text: 'Grievances',
            icon: <LibraryBooksIcon />,
            value: 'Grievances',
            onClick: () => {
                handleMenuClose();
                navigate('/grievances');
            },
        },
        {
            text: 'Chat',
            icon: <CommentIcon />,
            value: 'Chat',
            onClick: () => {
                handleMenuClose();
                navigate('/chat');
            },
        },
        {
            text: 'Reports',
            icon: <PersonSearchIcon />,
            value: 'Reports',
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
        window.localStorage.setItem('hackathonAppLastPage', value);
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
                            key={item.text}
                            value={item.text}
                            selected={selected === item.text.toLowerCase()}
                            onClick={() =>
                                handleNavigation(item.text.toLowerCase())
                            }
                            onMouseEnter={() => setHovered(item.value)}
                            onMouseLeave={() => setHovered(false)}
                        >
                            {item.icon}
                            &nbsp;
                            {hovered === item.value ||
                            selected === item.text.toLowerCase()
                                ? item.text
                                : ''}
                        </CustomSwitcherButton>
                    ))}
                </CustomSwitcherGroup>
            </Box>
            {/* End of Switcher */}
        </Box> // End of Container
    );
}

export default MainAppbar;
