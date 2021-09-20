import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

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
        history.push('/home');
    }

    const test = () => {
        console.log('jobDetail is', jobDetail);
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
                            <h1 onClick={test}>Edit Job Entry</h1>
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




                                    {/* <input name="company" type="text" placeholder="company" onChange={handleChange} value={editDetails.company}/>
                                    <input name="applicationUrl" type="text" placeholder="Application Url" onChange={handleChange} value={editDetails.applicationUrl}/>
                                    <input name="position" type="text" placeholder="position" onChange={handleChange} value={editDetails.position}/>
                                    <select name="appStatus" onChange={handleChange} value={editDetails.appStatus}>
                                        <option selected>Application Status</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Reviewed">Reviewed</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                    <select name="interviewStage" onChange={handleChange} value={editDetails.interviewStage}>
                                        <option selected>Interview Stage</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Round 1">Round 1</option>
                                        <option value="Round 2">Round 2</option>
                                        <option value="Round 3">Round 3</option>
                                        <option value="Final Round">Final Round</option>
                                    </select>
                                    <div>
                                        <input name="offer"type="checkbox" id="offerSwitch" onClick={handleToggle} value={editDetails.offer} />
                                        <label htmlFor="offerSwitch">Offer Received</label>
                                    </div>
                                    {offer && 
                                        <div className="form-check form-switch">
                                            <input name="offerAccepted" type="checkbox" id="offerAcceptedSwitch" onClick={handleAccepted} value={editDetails.offerAccepted}/>
                                            <label htmlFor="offerAcceptedSwitch">Offer Accepted?</label>
                                        </div>
                                        }
                                    <input name="contactName" type="text" placeholder="contact name" onChange={handleChange} value={editDetails.contactName}/>
                                    <input name="contactEmail" type="text" placeholder="contact email" onChange={handleChange} value={editDetails.contactEmail}/>
                                    <input name="contactNumber" type="text" placeholder="contact phone number" onChange={handleChange} value={editDetails.contactNumber}/> */}
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
