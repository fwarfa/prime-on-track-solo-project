import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Material UI
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

function EditJobEntry() {
    const jobDetail = useSelector(store => store.jobDetail);
    const dispatch = useDispatch();
    const history = useHistory();

    let job = {
        company: jobDetail.company,
        applicationUrl: jobDetail.applicationUrl,
        position: jobDetail.position,
        appStatus: jobDetail.appStatus,
        interviewStage: jobDetail.interviewStage,
        offer: jobDetail.offer,
        offerAccepted: jobDetail.offerAccepted,
        contactName: jobDetail.contactName,
        contactEmail: jobDetail.contactEmail,
        contactNumber: jobDetail.contactNumber,
        jobHuntId: jobDetail.jobHuntId,
        id: jobDetail.id
    };

    const [editDetails, setEditDetails] = useState(job);
    const [offer, setOffer] = useState(false);
    const [offerAccepted, setOfferAccepted] = useState(false);

    const handleChange = (event) =>{
        setEditDetails({...editDetails, [event.target.name]:event.target.value })
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
        history.goBack();
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let editedJob = editDetails;
        editedJob = {...editedJob, offer: offer, offerAccepted: offerAccepted};
        console.log('new edit job: ', editedJob);
        dispatch({
            type: 'UPDATE_JOB_DETAILS',
            payload: editedJob
        });
        history.push(`/dashboard/${editedJob.jobHuntId}`);
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
                                <Typography variant="h3">Edit Job Entry</Typography>
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <InputLabel>Add Position Applied</InputLabel>
                                        <TextField style={{marginTop: 10}} fullWidth name="company" label="company" variant="outlined" size="small" placeholder="company" onChange={handleChange} value={editDetails.company}/>
                                        <TextField style={{marginTop: 10}} fullWidth name="applicationUrl" label="application url" variant="outlined" size="small" placeholder="application url" onChange={handleChange} value={editDetails.applicationUrl}/>
                                        <TextField style={{marginTop: 10}} fullWidth name="position" label="position titile" variant="outlined" size="small" placeholder="position titile" onChange={handleChange} value={editDetails.position}/>
                                        <TextField style={{marginTop: 10}} fullWidth name="contactName" label="contact name" variant="outlined" size="small" onChange={handleChange} value={editDetails.contactName}/>
                                        <TextField style={{marginTop: 10}} fullWidth name="contactEmail" label="contact email" variant="outlined" size="small" onChange={handleChange} value={editDetails.contactEmail}/>
                                        <TextField style={{marginTop: 10}} fullWidth name="contactNumber" label="contact phone number" variant="outlined" size="small" onChange={handleChange} value={editDetails.contactNumber}/>
                                        
                                        <InputLabel style={{marginTop: 10}}>Application Status</InputLabel>
                                        <Select
                                            name="appStatus"
                                            value={editDetails.appStatus}
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
                                            value={editDetails.interviewStage}
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
                                            <FormControlLabel name="offer" control={<Switch />} label="Offer Received" onClick={handleToggle} value={editDetails.offer}/>
                                            {offer && 
                                            <FormControlLabel name="offerAccepted" control={<Switch />} label="Offer Accepted?" onClick={handleAccepted} value={editDetails.offerAccepted}/>
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

export default EditJobEntry
