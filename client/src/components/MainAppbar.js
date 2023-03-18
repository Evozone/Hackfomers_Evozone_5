import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// MUI Components
import Box from '@mui/material/Box';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CommentIcon from '@mui/icons-material/Comment';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import Groups2Icon from '@mui/icons-material/Groups2';
import ApartmentIcon from '@mui/icons-material/Apartment';

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
        window.localStorage.getItem('hackathonAppLastPage') || 'Spaces'
    );

    const [hasScrolled, setHasScrolled] = useState(false);

    // Array of menu items
    const menuItems = [
        {
            text: 'Spaces',
            icon: <Groups2Icon />,
            value: 'spaces',
            onClick: () => {
                handleMenuClose();
                navigate('/spaces');
            },
        },
        {
            text: 'Grievances',
            icon: <LibraryBooksIcon />,
            value: 'grievances',
            onClick: () => {
                handleMenuClose();
                navigate('/grievances');
            },
        },
        {
            text: 'Chat',
            icon: <CommentIcon />,
            value: 'chat',
            onClick: () => {
                handleMenuClose();
                navigate('/chat');
            },
        },
        {
            text: 'Reports',
            icon: <PersonSearchIcon />,
            value: 'reports',
            onClick: () => {
                handleMenuClose();
                navigate('/reports');
            },
        },
        {
            text: 'Organization',
            text: 'Organization',
            icon: <ApartmentIcon />,
            value: 'organization/12345',
            onClick: () => {
                handleMenuClose();
                navigate('/organization/12345');
            },
        },
    ];

    const handleSignOut = () => {
        const choice = window.confirm('Please click on OK to Log Out.');
    };

    const handleNavigation = (text, value) => {
        setSelected(text);
        window.localStorage.setItem('hackathonAppLastPage', text);
        navigate(`/${value}`);
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            if (scrollTop > 0) {
                setHasScrolled(true);
            } else {
                setHasScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
                height: 'fit-content',
                background: mode === 'light' ? lMode1 : dMode1,

                boxShadow: hasScrolled ? '0px 0px 4px 0px rgba(0,0,0,0.3)' : 'none',
                transition: 'box-shadow 0.3s ease-in-out',

                zIndex: '1000',
                p: '4px',
            }}
        >
            {/* The rounded swticher thing */}
            <Box
                sx={{
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
                            key={item.value}
                            value={item.value}
                            selected={selected === item.text}
                            onClick={() =>
                                handleNavigation(item.text, item.value)
                            }
                            onMouseEnter={() => setHovered(item.text)}
                            onMouseLeave={() => setHovered(false)}
                        >
                            {item.icon}
                            &nbsp;
                            {hovered === item.text ||
                                selected === item.text
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
