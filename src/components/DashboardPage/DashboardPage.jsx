import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import './DashboardPage.css'

import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';

import {
    Button,
    TextField,
    Grid,
    Paper,
    AppBar,
    Toolbar,
    Link,
    } from "@material-ui/core";

function DashboardPage() {
    const dispatch = useDispatch();
    const params = useParams();
    const jobDetailInfo = useSelector(store => store.jobDetails);
    const totals = useSelector(store => store.jobTotals);
    const history = useHistory();
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    
    let isOfferAccepted;
    for (let job of jobDetailInfo) {
        if (job.offer_accepted === true) {
            isOfferAccepted = true;
            let id = job.job_hunt_id;
            console.log('jobs been found for' , id);
            dispatch({
                type: 'END_JOB_HUNT',
                payload: id
            })
        }
    }

    useEffect(() => {
        dispatch({
            type: 'FETCH_JOB_DETAILS',
            payload: params.id
        });
        dispatch({
            type: 'FETCH_TOTALS',
            payload: params.id
        });
    }, [])

    const handleDelete = (id) => {
        console.log('delete clicked for: ', id);
        dispatch({
            type: 'DELETE_JOB_DETAILS',
            payload: id
        })
    }

    const handleEdit = (id) => {
        let jobToEdit;
        for (let job of jobDetailInfo) {
            if (job.id === id) {
                jobToEdit = {
                    company: job.company_name,
                    applicationUrl: job.application_url,
                    position: job.position_title,
                    appStatus: job.application_status,
                    interviewStage: job.interview_stage,
                    offer: job.offer,
                    contactName: job.contact_name,
                    contactEmail: job.contact_email,
                    contactNumber: job.contact_phone_number,
                    jobHuntId: job.job_hunt_id,
                    id: job.id
                }
            }
        }

        console.log('job to edit ', jobToEdit);
        dispatch({
            type: 'SET_JOB',
            payload: jobToEdit
        });

        history.push('/editJobEntry');
    }

    const onAddJob = () => {
        history.push('/newJobEntry');
    }

    const onStartHunt = () => {
        history.push('/newJobEntry');
    }

    return (
        <div>
        { params.id === "undefined" ? 
            <div>
            <h3>You haven't started a Job Hunt Yet!</h3>
            <h5>Click on the button below to start a new job hunt</h5>
            <button onClick={onStartHunt}>Start A New Job Hunt</button>
            </div>
            :
            <div>
            <center>
            <Typography variant="h4">Dashboard</Typography>
            </center>
            <Box sx={{ width: '100%' }}>
            <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList variant="fullWidth" onChange={handleChange} aria-label="lab API tabs example">
                <Tab value="1" label="Job Board" />
                <Tab value="2" label="Progress Tracker" />
            </TabList>
            </Box>
            <TabPanel value="1">
            <Typography variant="h5">Job Board</Typography>
            <Button className="btn" variant="contained" size="small" onClick={onAddJob}>Add Additional Job</Button>

            { isOfferAccepted && 
            <center>
                <h1>Congratulations!</h1>
            </center>
            
            }

            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="right">Edit</TableCell>
                                <TableCell align="right">Company</TableCell>
                                <TableCell align="right">Contact Name</TableCell>
                                <TableCell align="right">Contact #</TableCell>
                                <TableCell align="right">Contact Email</TableCell>
                                <TableCell align="right">Application Link</TableCell>
                                <TableCell align="right">Position</TableCell>
                                <TableCell align="right">Application Status</TableCell>
                                <TableCell align="right">Interview Stage</TableCell>
                                <TableCell align="right">Offer</TableCell>
                                <TableCell align="right">Offer Taken</TableCell>
                                <TableCell align="right">Delete</TableCell>
                            </TableRow>
                    </TableHead>
                    <TableBody>
                {jobDetailInfo.map((job, index) => (
                    <TableRow 
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">{index + 1}</TableCell>
                        <TableCell align="right"><Button className="btn" variant="contained" size="small" onClick={() => handleEdit(job.id)}>edit</Button></TableCell>
                        <TableCell align="right">{job.company_name}</TableCell>
                        <TableCell align="right">{job.contact_name}</TableCell>
                        <TableCell align="right">{job.contact_phone_number}</TableCell>
                        <TableCell align="right">{job.contact_email}</TableCell>
                        <TableCell align="right">{job.application_url}</TableCell>
                        <TableCell align="right">{job.position_title}</TableCell>
                        <TableCell align="right">{job.application_status}</TableCell>
                        <TableCell align="right">{job.interview_stage}</TableCell>
                        <TableCell align="right">{job.offer ? <p>yes</p> : <p>no</p>}</TableCell>
                        <TableCell align="right">{job.offer_accepted ? <p>yes</p> : <p>no</p>}</TableCell>
                        <TableCell align="right"><Button className="btn" variant="contained" size="small" onClick={() => handleDelete(job.id)}>delete</Button></TableCell>  
                    </TableRow>

                ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </TabPanel>
            <TabPanel value="2">
            <center>
            <div id="doughnut">
            <Typography variant="h5">Progress Tracker</Typography>
                <Doughnut 
                    data={{
                        labels: ['Total Applications', 'Total Interviews', 'Total Rejections', 'Total Offers'],
                        datasets: [{
                                data: [totals.applied, totals.interviewed, totals.rejected, totals.offered],
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)'
                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)'
                                ],
                                borderWidth: 1
                            }]
                    }}
                    option={{
                        responsive: false,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }}
                />
            </div>
            </center>
            </TabPanel>
            </TabContext>
            </Box>
        </div>
    }
    </div>
    )
}

export default DashboardPage
