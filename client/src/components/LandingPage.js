import { Box } from '@mui/material';
import GoogleOneTapLogin from './GoogleOneTapLogin';
import Typography from '@mui/material/Typography';

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

export default function LandingPage({ themeChange, mode }) {
    // return <GoogleOneTapLogin />;
    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
            }}
        >
            <Box
                component='img'
                src='./assets/vectors/sun-tornado.svg'
                sx={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    margin: 'auto',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    width: '100vw',
                    color: 'primary.contrastText',
                    padding: '20px',
                    zIndex: 1,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        width: '100%',
                        borderRadius: '10px',
                        padding: '20px',
                    }}
                >
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <img
                            src={'/assets/vectors/hollowed-boxes.svg'}
                            alt='logo'
                            style={{
                                width: '400px',
                                height: '400px',
                                borderRadius: '50%',
                                boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.3)',
                            }}
                        />
                    </div>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        borderRadius: '10px',
                        padding: '20px',
                    }}
                >
                    <Box
                        sx={{
                            height: '100%',
                            width: '100%',
                            padding: '40px',
                            borderRadius: '60px',
                        }}
                    >
                        <h1
                            style={{
                                color: `${mode === 'light' ? lMode1 : dMode1}`,
                                fontSize: '3rem',
                            }}
                        >
                            Resolva
                        </h1>
                        <Typography
                            sx={{
                                color: '#1B262C',
                                fontSize: '1.1rem',
                                fontWeight: 500,
                                p: 2,
                                background: ' rgba(255, 255, 255, 0.26)',
                                borderRadius: '6px',
                                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                                backdropFilter: 'blur(3.1px)',
                                border: '1px solid rgba(255, 255, 255, 0.5)',
                                fontFamily: 'Work Sans, sans-serif',
                            }}
                        >
                            We are creating platform that allows users to report
                            and express their complaints, dissatisfaction or
                            grievances to the appropriate authorities or
                            concerned parties. This type of website can be used
                            by individuals, organizations or communities to
                            communicate their issues and concerns to the
                            government, private organizations, institutions or
                            other relevant parties.
                        </Typography>
                        <GoogleOneTapLogin />
                    </Box>
                    <a
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: '42%',
                            color: 'black',
                            fontSize: '0.7rem',
                        }}
                        href='https://loading.io/icon/'
                        target='_blank'
                        rel='noreferrer'
                    >
                        the icon "loading" is provided by loading.io
                    </a>
                </Box>
            </Box>
        </Box>
    );
}
