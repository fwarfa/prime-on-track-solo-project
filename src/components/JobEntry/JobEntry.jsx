import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function JobEntry() {
    const jobHuntInfo = useSelector(store => store.jobHunt);
    const jobs = useSelector(store => store.jobDetails);
    const jobDetail = useSelector(store => store.jobDetail);
    const dispatch = useDispatch();
    const history = useHistory(); 

    // useEffect(() => {
    //     dispatch({
    //         type: 'FETCH_JOB_HUNT'
    //     });
    //     dispatch({
    //         type: 'FETCH_JOB_DETAILS'
    //     });
    //     dispatch({
    //         type: 'EDIT_JOB_DETAILS'
    //     });
    // }, [])

    let job = {
        company: jobDetail[0].company_name,
        applicationUrl: jobDetail[0].application_url,
        position: jobDetail[0].position_title,
        appStatus: jobDetail[0].application_status,
        interviewStage: jobDetail[0].interview_stage,
        offer: jobDetail[0].offer,
        contactName: jobDetail[0].contact_name,
        contactEmail: jobDetail[0].contact_email,
        contactNumber: jobDetail[0].contact_phone_number,
        jobHuntId: jobDetail[0].job_hunt_id,
        id: jobDetail[0].id
    };

    const [editDetails, setEditDetails] = useState(job);

    const handleChange = (event) =>{
        setEditDetails({...editDetails, [event.target.name]:event.target.value })
      };

    const handleCancel = () => {
        history.push('/home');
    }

    const testing = () => {
        console.log('jobDetail is ', jobDetail);
    }

    const app = () => {
        console.log('editDetails is ', editDetails);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('new edit details: ', editDetails);

        dispatch({
            type: 'UPDATE_JOB_DETAILS',
            payload: editDetails
        });
        history.push('/dashboard')
    }

    return (
        <div>
        <h1 onClick={testing}>Edit Job Entry</h1>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label onClick={app} htmlFor="jobEntryFields" className="form-label">Add Position Applied</label>
                <input name="company" type="text" className="form-control" placeholder={jobDetail[0].company_name} onChange={handleChange} value={editDetails.company}/>
                <input name="applicationUrl" type="text" className="form-control" placeholder={jobDetail[0].application_url} onChange={handleChange} value={editDetails.applicationUrl}/>
                <input name="position" type="text" className="form-control" placeholder={jobDetail[0].position_title} onChange={handleChange} value={editDetails.position}/>
                <select name="appStatus" className="form-select" aria-label="Application Status" onChange={handleChange} value={editDetails.appStatus}>
                    <option selected>Application Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Rejected">Rejected</option>
                </select>
                <select name="interviewStage" className="form-select" aria-label="Interview Status" onChange={handleChange} value={editDetails.interviewStage}>
                    <option selected>Interview Stage</option>
                    <option value="Pending">Pending</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Rejected">Rejected</option>
                </select>
                <div className="form-check form-switch">
                    <input name="offer" className="form-check-input" type="checkbox" id="offerSwitch" onChange={handleChange} value={editDetails.offer}/>
                    <label className="form-check-label" htmlFor="offerSwitch">Offer Received</label>
                </div>
                <input name="contactName" type="text" className="form-control" placeholder={jobDetail[0].contact_name} onChange={handleChange} value={editDetails.contactName}/>
                <input name="contactEmail" type="text" className="form-control" placeholder={jobDetail[0].contact_email} onChange={handleChange} value={editDetails.contactEmail}/>
                <input name="contactNumber" type="text" className="form-control" placeholder={jobDetail[0].contact_phone_number} onChange={handleChange} value={editDetails.contactNumber}/>
            </div>
            <button onClick={handleCancel}>Cancel</button>
            <button type="submit">Submit</button>
        </form>
    </div>
    )
}

export default JobEntry
