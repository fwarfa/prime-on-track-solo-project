import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function NewJobEntryPage() {
    const jobHuntInfo = useSelector(store => store.jobHunt);
    const dispatch = useDispatch();
    const history = useHistory(); 

    useEffect(() => {
        // dispatch({
        //     type: 'FETCH_JOB_HUNT'
        // });
    }, [])

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

    // let openHunt;
    // if (jobHuntInfo.length > 0) {
    //     for (let hunt of jobHuntInfo) {
    //         openHunt = hunt;
    //         if (hunt.end_date === null) {
    //             openHunt = hunt;
    //             appDetails.jobHuntId = hunt.id;
    //             // I want to stop the loop if it's null
    //             // but when I use return the page stops working
    //         }
    //     }
    // }
    // console.log('openHunt', openHunt);
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

    return (
        <div>
            <h1>Job Entry</h1>
            <form onSubmit={handleSubmit}>
                {(( jobHuntInfo.length === 0 || jobHuntInfo[0].end_date !== null)) &&
                <div>
                    <label htmlFor="huntTitle">Title Of New Job Hunt</label>
                    <input name="huntTitle" type="text" placeholder="Position Desired" onChange={handleChange} value={appDetails.huntTitle}/>
                </div>
                } 
                <div className="mb-3">
                    <label>Add Position Applied</label>
                    <input name="company" type="text" placeholder="company" onChange={handleChange} value={appDetails.company} />
                    <input name="applicationUrl" type="text" placeholder="application url" onChange={handleChange} value={appDetails.applicationUrl}/>
                    <input name="position" type="text" placeholder="position titile" onChange={handleChange} value={appDetails.position}/>
                    <select name="appStatus" onChange={handleChange} value={appDetails.appStatus}>
                        <option selected>Application Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Reviewed">Reviewed</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                    <select name="interviewStage" onChange={handleChange} value={appDetails.interviewStage}>
                        <option selected>Interview Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Round 1">Round 1</option>
                        <option value="Round 2">Round 2</option>
                        <option value="Round 3">Round 3</option>
                        <option value="Final Round">Final Round</option>
                    </select>
                    <div>
                        <input name="offer" type="checkbox" id="offerSwitch" onClick={handleToggle} value={appDetails.offer}/>
                        <label htmlFor="offerSwitch">Offer Received</label>
                    </div>
                    {offer && 
                    <div>
                        <input name="offerAccepted" type="checkbox" id="offerAcceptedSwitch" onClick={handleAccepted} value={appDetails.offerAccepted}/>
                        <label htmlFor="offerAcceptedSwitch">Offer Accepted?</label>
                    </div>
                    }
                    <input name="contactName" type="text" placeholder="contact name" onChange={handleChange} value={appDetails.contactName}/>
                    <input name="contactEmail" type="email" placeholder="contact email" onChange={handleChange} value={appDetails.contactEmail}/>
                    <input name="contactNumber" type="text" placeholder="contact phone #" onChange={handleChange} value={appDetails.contactNumber}/>
                </div>
                <button onClick={handleCancel}>Cancel</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default NewJobEntryPage
