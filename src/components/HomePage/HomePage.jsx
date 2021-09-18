import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ButtonGroup from '@mui/material/ButtonGroup';


import {
    Button,
    TextField,
    Grid,
    Paper,
    AppBar,
    Typography,
    Toolbar,
    Link,
    } from "@material-ui/core";

function HomePage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const jobHuntInfo = useSelector(store => store.jobHunt);

    useEffect(() => {
        dispatch({
            type: 'FETCH_JOB_HUNT'
        });
    }, [])

    let openHunt;
    if (jobHuntInfo.length > 0) {
        for (let hunt of jobHuntInfo) {
            if (hunt.end_date === null) {
                console.log('this was hit');
                openHunt = hunt;
            }
        }
    }

    const onNewJobHunt = () => {
        history.push('/newJobEntry')
    }

    const onEditProfile = () => {
        history.push('/profile')
    }

    const onViewClick = (huntId) => {
        console.log('hunt id is', huntId);
        history.push(`/dashboard/${huntId}`)
    }


    return (
        <div>
            <Typography variant="h4">Home Page!</Typography>
            <div>
                <img src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png" alt="profile picture" height="100px" width="100px"/> 
            </div>
            <Typography>{user.first_name} {user.last_name}</Typography>
            <Typography>Bio: {user.bio}</Typography>
            <Typography>{user.email}</Typography>
            <Button className="btn" variant="contained" size="small" onClick={onEditProfile}>Edit Profile</Button>
            <Button className="btn" variant="contained" size="small" onClick={onNewJobHunt}>New Job Hunt</Button>
            <Typography variant="h6">Job Hunt History</Typography>

            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Number</TableCell>
                        <TableCell align="right">Job Hunt Title</TableCell>
                        <TableCell align="right">End Date</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    { jobHuntInfo.some(hunt => hunt.end_date !== null) ?
                    jobHuntInfo.filter(hunt => hunt.end_date !== null).map((hunt) => (
                        <TableRow
                        key={hunt.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {hunt.id}
                        </TableCell>
                        <TableCell align="right">{hunt.job_hunt_title}</TableCell>
                        <TableCell align="right">{hunt.end_date}</TableCell>
                        <TableCell align="right"><Button className="btn" variant="contained" size="small" onClick={() => onViewClick(hunt.id)}>view</Button></TableCell>
                        </TableRow>
                    ))
                    :
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                            You Have No Previous Job Hunts
                        </TableCell>
                    </TableRow>
                    }                   
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default HomePage


