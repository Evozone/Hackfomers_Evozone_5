import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// MUI Components
import Box from '@mui/material/Box';
import ForumIcon from '@mui/icons-material/Forum';
import CommentIcon from '@mui/icons-material/Comment';
import AssessmentIcon from '@mui/icons-material/Assessment';
import Groups2Icon from '@mui/icons-material/Groups2';
import ApartmentIcon from '@mui/icons-material/Apartment';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ListItemText from '@mui/material/ListItemText';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import LogoutIcon from '@mui/icons-material/Logout';
import Typography from '@mui/material/Typography';

// Custom Components
import { CustomSwitcherGroup, CustomSwitcherButton } from './CustomSwitcher';

// Actions
import { signOutAction } from '../actions/actions';

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
    richBlue,
} from '../utils/colors';

function MainAppbar({ mode, themeChange }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.auth);
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
            icon: <ForumIcon />,
            value: 'grievances',
            onClick: () => {
                handleMenuClose();
                navigate('/grievances');
            },
        },
        {
            text: 'Reports',
            icon: <AssessmentIcon />,
            value: 'reports',
            onClick: () => {
                handleMenuClose();
                navigate('/reports');
            },
        },
        {
            text: 'Organization',
            icon: <ApartmentIcon />,
            value: 'organization',
            onClick: () => {
                handleMenuClose();
                navigate('/organization');
            },
        },
    ];

    const handleSignOut = () => {
        const choice = window.confirm('Please click on OK to Log Out.');
        if (choice) {
            dispatch(signOutAction());
            window.localStorage.removeItem('hackathonAppLastPage');
            navigate('/'); // Redirect to home page
        }
    };

    const handleNavigation = (text, value) => {
        setSelected(text);
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
                justifyContent: 'space-between',
                alignItems: 'center',

                width: '100%',
                height: 'fit-content',
                background: mode === 'light' ? lMode1 : dMode1,

                boxShadow: hasScrolled
                    ? '0px 0px 4px 0px rgba(0,0,0,0.3)'
                    : 'none',
                transition: 'box-shadow 0.3s ease-in-out',

                zIndex: '1000',
                p: '4px',
            }}
        >
            {/* Name of the website */}
            <Typography
                variant="h6"
                sx={{
                    color: mode === 'light' ? lMode3 : dMode3,
                    font: '600 2.3rem Poppins, sans-serif',
                }}
            >
                | Resolva
            </Typography>
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
                            {hovered === item.text || selected === item.text
                                ? item.text
                                : ''}
                        </CustomSwitcherButton>
                    ))}
                </CustomSwitcherGroup>

                {currentUser?.isSignedIn ? (
                    <IconButton sx={{ p: '6px' }} onClick={handleMenuClick}>
                        <Avatar
                            alt={currentUser.name.charAt(0).toUpperCase()}
                            src={currentUser.avatarURL}
                            sx={{
                                bgcolor: mode === 'light' ? lMode1 : dMode1,
                                height: 40,
                                width: 40,
                                border: '2px solid',
                            }}
                        >
                            {currentUser.name.charAt(0).toUpperCase()}
                        </Avatar>
                    </IconButton>
                ) : null}
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    sx={{
                        '& .MuiPaper-root': {
                            backgroundColor: mode === 'light' ? lMode4 : dMode4,
                            boxShadow: 'none',
                            border: `1px solid ${lMode6}`,
                        },
                    }}
                >
                    <MenuItem
                        onClick={() => {
                            themeChange();
                        }}
                    >
                        {mode === 'light' ? (
                            <DarkModeIcon
                                sx={{
                                    color: mode === 'light' ? lMode1 : dMode1,
                                    fontSize: '1.7rem',
                                    ml: -0.5,
                                }}
                            />
                        ) : (
                            <LightModeIcon
                                sx={{
                                    color: mode === 'light' ? lMode1 : dMode1,
                                    fontSize: '1.7rem',
                                    ml: -0.5,
                                }}
                            />
                        )}
                        <ListItemText sx={{ ml: 1 }} primary='Theme' />
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            handleMenuClose();
                            navigate('/choose');
                            // setModalVisible(true);
                        }}
                    >
                        <CompareArrowsIcon
                            sx={{
                                color: mode === 'light' ? lMode1 : dMode1,
                                fontSize: '1.7rem',
                                ml: -0.5,
                            }}
                        />
                        <ListItemText sx={{ ml: 1 }} primary='Change Organization' />
                    </MenuItem>
                    {/* {renderInstallOption()} */}
                    <MenuItem
                        onClick={() => {
                            handleMenuClose();
                            handleSignOut();
                        }}
                    >
                        <LogoutIcon
                            sx={{
                                color: mode === 'light' ? lMode1 : dMode1,
                            }}
                        />
                        <ListItemText sx={{ ml: 1 }} primary='Logout' />
                    </MenuItem>
                </Menu>
            </Box>
            {/* End of Switcher */}

            {/* The Avatar */}
        </Box> // End of Container
    );
}

export default MainAppbar;
