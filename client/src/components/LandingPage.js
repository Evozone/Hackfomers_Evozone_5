import { Box } from '@mui/material';
import GoogleOneTapLogin from './GoogleOneTapLogin';
import Typography from '@mui/material/Typography';

export default function LandingPage() {
    // return <GoogleOneTapLogin />;
    return(
        <Box
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
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
           >
            </Box>
            <GoogleOneTapLogin />
            <Box>
                <Typography variant='h1' component='div' gutterBottom>
                    Hackfomers
                </Typography>
            </Box>
            </Box> 
    );
}

