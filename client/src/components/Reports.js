import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import BarredPage from './BarredPage';
import ConsistentButton from './ConsistentButton';

// Material UI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';

import axios from 'axios';
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
import { startLoadingAction, stopLoadingAction } from '../actions/actions';

export default function Reports({ themeChange, mode }) {
    // State variables for filters and filtered grievances
    const [dateFilter, setDateFilter] = useState({
        startDate: new Date(),
        endDate: new Date(),
    });
    const [locationFilter, setLocationFilter] = useState('');
    const [filteredGrievances, setFilteredGrievances] = useState([]);
    const [summarizedPoints, setSummarizedPoints] = useState([]);

    useEffect(() => {
        window.localStorage.setItem('hackathonAppLastPage', 'reports');
    }, []);

    // Function to filter grievances
    const filterGrievances = () => {
        // Call API with dateFilter and locationFilter as parameters
        // Update filteredGrievances state with the result
        getReports();
    };

    const dispatch = useDispatch();
    // useEffect(() => {
    //     getReports();
    // }, []);

    const getReports = async () => {
        dispatch(startLoadingAction());
        try {
            console.log(locationFilter);
            const resp = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/api/grievance/lastSevenDaysGrievance/${locationFilter}`
            );
            console.log(resp.data.result);
            let description = resp.data.result.map((item) => {
                return item.description;
            });
            if (description.length !== 0) {
                description = description.join(' -- ');
                const input =
                    'Below is a list of grievances seperated by -- , give a small summary for each of them seperated by a hyphen (-) ' +
                    description;

                console.log(input);
                const options = {
                    method: 'POST',
                    headers: {
                        accept: 'application/json',
                        'content-type': 'application/json',
                        authorization:
                            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYTdlYTFiNzAtNDg1Ni00ODlhLWExYjYtMjFjNDY1ODQ2ZTRhIiwidHlwZSI6ImFwaV90b2tlbiJ9.q8xipihWH7Ys3HcRSQmPlnpW8NEi1w-nyeDrB9LKmP8',
                    },
                    body: JSON.stringify({
                        response_as_dict: true,
                        attributes_as_list: false,
                        show_original_response: false,
                        output_sentences: 1,
                        text: input,
                        providers: 'openai',
                    }),
                };

                fetch('https://api.edenai.run/v2/text/summarize', options)
                    .then((response) => response.json())
                    .then((response) => {
                        const points = response.openai.result;
                        // make an array from points by taking - as the escape sequence
                        const array = points.split('-').filter((x) => x);
                        console.log(array);
                        setSummarizedPoints(array);
                        dispatch(stopLoadingAction());
                    })
                    .catch((err) => console.error(err));
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <BarredPage mode={mode}>
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
                        m: 2,
                        color: lMode6,
                        font: '600 3rem Poppins, sans-serif',
                    }}
                >
                    Reports
                </Typography>

                {/* Page Subtitle */}
                <Typography
                    sx={{
                        color:
                            'mode' === 'light'
                                ? dMode4.concat('aa')
                                : lMode6.concat('aa'),
                        m: 2,
                        font: '400 1.5rem Work Sans, sans-serif',
                    }}
                >
                    Generate official letters from all grievances
                </Typography>

                {/* Filters */}
                <Box
                    sx={{
                        width: 'fit-content',
                        m: 2,
                        px: 2,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: mode === 'light' ? lMode2 : dMode2,
                        borderRadius: '10px',
                        font: '400 1.1rem Work Sans, sans-serif',
                    }}
                >
                    <>Start Date: </>
                    <TextField
                        type='date'
                        label=''
                        value={dateFilter.startDate}
                        onChange={(event) =>
                            setDateFilter({
                                ...dateFilter,
                                startDate: event.target.value,
                            })
                        }
                        sx={{
                            m: 1,
                            backgroundColor:
                                mode === 'light' ? 'white' : dMode3,
                            borderRadius: '10px',
                        }}
                    />
                    <>End Date: </>
                    <TextField
                        type='date'
                        label=''
                        value={dateFilter.endDate}
                        onChange={(event) =>
                            setDateFilter({
                                ...dateFilter,
                                endDate: event.target.value,
                            })
                        }
                        sx={{
                            m: 1,
                            backgroundColor:
                                mode === 'light' ? 'white' : dMode3,
                            borderRadius: '10px',
                        }}
                    />
                    <>Location: </>
                    <TextField
                        type='text'
                        label=''
                        value={locationFilter}
                        onChange={(event) =>
                            setLocationFilter(event.target.value)
                        }
                        sx={{
                            m: 1,
                            backgroundColor:
                                mode === 'light' ? 'white' : dMode3,
                            borderRadius: '10px',
                        }}
                    />
                    <ConsistentButton
                        mode={mode}
                        title='Filter'
                        onClick={filterGrievances}
                    />
                </Box>

                {/* Page Content */}
                <Card
                    sx={{
                        m: 2,
                        p: 2,
                        backgroundColor:
                            mode === 'light' ? 'whitesmoke' : 'black',
                        borderRadius: '10px',
                    }}
                >
                    <Typography
                        sx={{
                            color: mode === 'light' ? lMode6 : dMode6,
                            my: 2,
                            font: '600 2rem Poppins, sans-serif',
                        }}
                    >
                        Generated Letter
                    </Typography>
                    <Divider orientation='horizontal' sx={{ my: 2 }} />
                    {/* Put dummy letter */}

                    <br />
                    {summarizedPoints?.length > 0 &&
                        summarizedPoints.map((points) => {
                            return <Typography>{points}</Typography>;
                        })}
                </Card>
            </Box>
        </BarredPage>
    );
}
