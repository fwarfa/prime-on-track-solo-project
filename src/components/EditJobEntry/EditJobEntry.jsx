import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

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
        <h1 onClick={test}>Edit Job Entry</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Add Position Applied</label>
                <input name="company" type="text" placeholder="company" onChange={handleChange} value={editDetails.company}/>
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
                <input name="contactNumber" type="text" placeholder="contact phone number" onChange={handleChange} value={editDetails.contactNumber}/>
            </div>
            <button onClick={handleCancel}>Cancel</button>
            <button type="submit">Submit</button>
        </form>
    </div>
    )
}

export default EditJobEntry
