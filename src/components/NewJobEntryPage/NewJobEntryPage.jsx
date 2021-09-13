import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function NewJobEntryPage() {
    const jobHuntInfo = useSelector(store => store.jobHunt);
    const dispatch = useDispatch();
    const history = useHistory(); 
    // let hundId = jobHuntInfo[jobHuntInfo.length -1].id;

    useEffect(() => {
        dispatch({
            type: 'FETCH_JOB_HUNT'
        });
        // console.log('job hunt', jobHuntInfo);
    }, [])

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
        jobHuntId: ''
    };

    const [appDetails, setAppDetails] = useState(job);

    const handleChange = (event) =>{
        setAppDetails({...appDetails, [event.target.name]:event.target.value })
      };

    const handleCancel = () => {
        history.push('/home');
    }

    const handleTest = () => {
        console.log('job hunt reducer', jobHuntInfo);
    }

    

    const handleSubmit = (event) => {
        event.preventDefault();
        let jobstuff = appDetails;
        if (jobHuntInfo.length > 0 && jobHuntInfo[jobHuntInfo.length -1].end_date === null) {
            
            console.log('**** test ****', jobHuntInfo[jobHuntInfo.length -1].id);
            // not working as is now
           jobstuff = {...appDetails, jobHuntId: jobHuntInfo[jobHuntInfo.length -1].id};
        }
        console.log('jobstuff ', jobstuff);
        dispatch({
            type: 'ADD_JOB_DETAILS',
            payload: jobstuff
        });
        // setAppDetails(job);
        history.push('/dashboard')
    }

    return (
        <div>
            <h1>Job Entry</h1>
            <form onSubmit={handleSubmit}>
                {(( jobHuntInfo.length === 0 || jobHuntInfo[jobHuntInfo.length -1].end_date !== null)) &&
                <div className="mb-3">
                    <label htmlFor="titleOfJobHunt" className="form-label">Title Of New Job Hunt</label>
                    <input name="huntTitle" type="text" className="form-control" placeholder="Position Desired" onChange={handleChange} value={appDetails.huntTitle}/>
                </div>
                } 
                <div className="mb-3">
                    <label onClick={handleTest} htmlFor="jobEntryFields" className="form-label">Add Position Applied</label>
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
                        <label className="form-check-label" htmlFor="offerSwitch">Offer Received</label>
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
