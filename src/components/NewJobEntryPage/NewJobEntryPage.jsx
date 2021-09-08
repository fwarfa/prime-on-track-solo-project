import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function NewJobEntryPage() {
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
        contactName: '',
        contactEmail: '',
        contactNumber: '',
    };

    const [appDetails, setApplDetails] = useState(job);

    const handleChange = (event) =>{
        setApplDetails({...appDetails, [event.target.name]:event.target.value })
      };

    const handleCancel = () => {
        history.push('/home');
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('appDetails', appDetails);

        dispatch({
            type: 'ADD_JOB_DETAILS',
            payload: appDetails
        });
        // setApplDetails(job);
    }

    return (
        <div>
            <h1>Job Entry</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="titleOfJobHunt" className="form-label">Title Of New Job Hunt</label>
                    <input name="huntTitle" type="text" class="form-control" placeholder="Position Desired" onChange={handleChange} value={appDetails.huntTitle}/>
                </div>
                <div className="mb-3">
                    <label for="jobEntryFields" className="form-label">Add Position Applied</label>
                    <input name="company" type="text" className="form-control" placeholder="company" onChange={handleChange} value={appDetails.company}/>
                    <input name="applicationUrl" type="text" className="form-control" placeholder="application url" onChange={handleChange} value={appDetails.applicationUrl}/>
                    <input name="position" type="text" className="form-control" placeholder="position titile" onChange={handleChange} value={appDetails.position}/>
                    <select name="appStatus" className="form-select" aria-label="Application Status" onChange={handleChange} value={appDetails.appStatus}>
                        <option selected>Application Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Reviewed">Reviewed</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                    <select name="interviewStage" className="form-select" aria-label="Interview Status" onChange={handleChange} value={appDetails.interviewStage}>
                        <option selected>Interview Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Reviewed">Reviewed</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                    <div className="form-check form-switch">
                        <input name="offer" className="form-check-input" type="checkbox" id="offerSwitch" onChange={handleChange} value={appDetails.offer}/>
                        <label class="form-check-label" for="offerSwitch">Offer Received</label>
                    </div>
                    <input name="contactName" type="text" className="form-control" placeholder="contact name" onChange={handleChange} value={appDetails.contactName}/>
                    <input name="contactEmail" type="email" className="form-control" placeholder="contact email" onChange={handleChange} value={appDetails.contactEmail}/>
                    <input name="contactNumber" type="text" className="form-control" placeholder="contact phone #" onChange={handleChange} value={appDetails.contactNumber}/>
                </div>
                <button onClick={handleCancel}>Cancel</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default NewJobEntryPage