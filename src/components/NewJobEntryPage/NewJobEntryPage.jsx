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
    }, [])

    let job = {
        huntTitle: '',
        company: '',
        applicationUrl: '',
        position: '',
        appStatus: '',
        interviewStage: '',
        // offer: false,
        // offerAccepted: false,
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
            console.log('helllooo');
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
        jobApp = {...appDetails, offer: offer, offerAccepted: offerAccepted};
        console.log('jobApp before', jobApp);
        if (jobHuntInfo.length > 0 && jobHuntInfo[jobHuntInfo.length -1].end_date === null) {
            console.log('**** test ****', jobHuntInfo[jobHuntInfo.length -1].id);
            // not working as is now
           jobApp = {...jobApp, jobHuntId: jobHuntInfo[jobHuntInfo.length -1].id};
        }
       
        console.log('jobApp after', jobApp);
        dispatch({
            type: 'ADD_JOB_DETAILS',
            payload: jobApp
        });
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
                    <label htmlFor="jobEntryFields" className="form-label">Add Position Applied</label>
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
                        <option value="Round 1">Round 1</option>
                        <option value="Round 2">Round 2</option>
                        <option value="Round 3">Round 3</option>
                        <option value="Final Round">Final Round</option>
                    </select>
                    <div className="form-check form-switch">
                        <input name="offer" className="form-check-input" type="checkbox" id="offerSwitch" onClick={handleToggle} value={appDetails.offer}/>
                        <label className="form-check-label" htmlFor="offerSwitch">Offer Received</label>
                    </div>
                    {offer && 
                    <div className="form-check form-switch">
                        <input name="offerAccepted" className="form-check-input" type="checkbox" id="offerSwitch" onClick={handleAccepted} value={appDetails.offerAccepted}/>
                        <label className="form-check-label" htmlFor="offerSwitch">Offer Accepted?</label>
                    </div>
                    }
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
