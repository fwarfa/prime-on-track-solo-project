import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './NewJobEntryPage.css'

// Material UI Imports
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function NewJobEntryPage() {
    const jobHuntInfo = useSelector(store => store.jobHunt);
    const dispatch = useDispatch();
    const history = useHistory(); 

    let job = {
        huntTitle: '',
        company: '',
        applicationUrl: '',
        position: '',
        appStatus: '',
        interviewStage: '',
        offer: false,
        offerAccepted: false,
        contactName: '',
        contactEmail: '',
        contactNumber: '',
        jobHuntId: ''
    };

    const [appDetails, setAppDetails] = useState(job);
    const [offer, setOffer] = useState(false);
    const [offerAccepted, setOfferAccepted] = useState(false);

    const handleChange = (event) =>{
        setAppDetails({...appDetails, [event.target.name]:event.target.value })
      };

    const handleToggle = () => {
        setOffer(!offer);
        if (offer === false) {
            setOfferAccepted(false);
        }
    }

    const handleAccepted = () => {
        setOfferAccepted(!offerAccepted);
    }

    const handleCancel = () => {
        history.push('/home');
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        let jobApp = appDetails;
        if (jobHuntInfo.length > 0) {
            if (jobHuntInfo[0].end_date === null) {
                jobApp = {...appDetails, offer: offer, offerAccepted: offerAccepted, jobHuntId: jobHuntInfo[0].id};
                console.log('jobApp with hunt id', jobApp);
                dispatch({
                    type: 'ADD_JOB_DETAILS',
                    payload: jobApp
                });
                history.push(`/dashboard/${jobApp.jobHuntId}`)
            }
            else {
                jobApp = {...appDetails, offer: offer, offerAccepted: offerAccepted};
                console.log('jobApp without hunt id', jobApp);
                dispatch({
                    type: 'ADD_JOB_DETAILS',
                    payload: jobApp
                });
                history.push(`/home`);
            }
        }
        else {
            jobApp = {...appDetails, offer: offer, offerAccepted: offerAccepted};
            console.log('jobApp without hunt id', jobApp);
            dispatch({
                type: 'ADD_JOB_DETAILS',
                payload: jobApp
            });
            history.push(`/home`);
        }
        console.log('submit button clicked');
        
    }

    return (
        <div>
            <Grid container style={{padding: 30}}>
                <Paper 
                    elevation={3}
                    style={{margin: 30, padding: 10}}
                >
                    <center>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h3">Job Entry</Typography>
                            <form onSubmit={handleSubmit}>
                                {(( jobHuntInfo.length === 0 || jobHuntInfo[0].end_date !== null)) &&
                                <div>
                                    <InputLabel htmlFor="huntTitle">Title Of New Job Hunt</InputLabel>
                                    <TextField style={{marginTop: 10}} fullWidth name="huntTitle" type="text" placeholder="Position Desired" onChange={handleChange} value={appDetails.huntTitle}/>
                                </div>
                                } 
                                <div>
                                    <InputLabel>Add Position Applied</InputLabel>
                                    <TextField className="textField" style={{marginTop: 10}} fullWidth name="company" label="company" variant="outlined" size="small" placeholder="company" onChange={handleChange} value={appDetails.company}/>
                                    <TextField className="textField" style={{marginTop: 10}} fullWidth name="applicationUrl" label="application url" variant="outlined" size="small" placeholder="application url" onChange={handleChange} value={appDetails.applicationUrl}/>
                                    <TextField className="textField" style={{marginTop: 10}} fullWidth name="position" label="position titile" variant="outlined" size="small" placeholder="position titile" onChange={handleChange} value={appDetails.position}/>
                                    <TextField className="textField" style={{marginTop: 10}} fullWidth name="contactName" label="contact name" variant="outlined" size="small" onChange={handleChange} value={appDetails.contactName}/>
                                    <TextField className="textField" style={{marginTop: 10}} fullWidth name="contactEmail" label="contact email" variant="outlined" size="small" onChange={handleChange} value={appDetails.contactEmail}/>
                                    <TextField className="textField" style={{marginTop: 10}} fullWidth name="contactNumber" label="contact phone number" variant="outlined" size="small" onChange={handleChange} value={appDetails.contactNumber}/>
                                    
                                    <InputLabel style={{marginTop: 10}}>Application Status</InputLabel>
                                    <Select
                                        name="appStatus"
                                        value={appDetails.appStatus}
                                        label="Application Status"
                                        onChange={handleChange}
                                        fullWidth
                                    >
                                        <MenuItem value="Pending">Pending</MenuItem>
                                        <MenuItem value="Reviewed">Reviewed</MenuItem>
                                        <MenuItem value="Rejected">Rejected</MenuItem>
                                    </Select>

                                    <InputLabel style={{marginTop: 10}}>Interview Stage</InputLabel>
                                    <Select
                                        name="interviewStage"
                                        value={appDetails.interviewStage}
                                        label="Interview Stage"
                                        onChange={handleChange}
                                        fullWidth
                                    >
                                        <MenuItem value="Pending">Pending</MenuItem>
                                        <MenuItem value="Round 1">Round 1</MenuItem>
                                        <MenuItem value="Round 2">Round 2</MenuItem>
                                        <MenuItem value="Round 3">Round 3</MenuItem>
                                        <MenuItem value="Final Round">Final Round</MenuItem>
                                    </Select>

                                    <FormGroup>
                                        <FormControlLabel name="offer" control={<Switch />} label="Offer Received" onClick={handleToggle} value={appDetails.offer}/>
                                        {offer && 
                                            <FormControlLabel name="offerAccepted" control={<Switch />} label="Offer Accepted?" onClick={handleAccepted} value={appDetails.offerAccepted}/>
                                        }
                                    </FormGroup>
                                </div>
                                <Button style={{marginRight: 10}} variant="contained" size="small" onClick={handleCancel}>Cancel</Button>
                                <Button style={{marginRight: 10}} variant="contained" size="small" type="submit">Submit</Button>
                            </form>
                        </Grid>
                    </center>
                </Paper>
            </Grid>
        </div>
    )
}

export default NewJobEntryPage
