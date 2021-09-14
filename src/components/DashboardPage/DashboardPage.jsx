import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';

function DashboardPage() {
    const dispatch = useDispatch();
    const jobDetailInfo = useSelector(store => store.jobDetails);
    const totals = useSelector(store => store.jobTotals);
    const history = useHistory();

    
    let isOfferAccepted= false;
    for (let job of jobDetailInfo) {
        if (job.offer_accepted === true) {
            isOfferAccepted = true;
            let id = job.job_hunt_id;
            console.log('jobs been found for' , id);
            dispatch({
                type: 'END_JOB_HUNT',
                payload: id
            })
        }
    }

    useEffect(() => {
        dispatch({
            type: 'FETCH_JOB_DETAILS'
        });
        dispatch({
            type: 'FETCH_TOTALS'
        });
    }, [])

    const handleDelete = (id) => {
        console.log('delete clicked for: ', id);
        dispatch({
            type: 'DELETE_JOB_DETAILS',
            payload: id
        })
    }

    const handleEdit = (id) => {
        let jobToEdit;
        for (let job of jobDetailInfo) {
            if (job.id === id) {
                jobToEdit = {
                    company: job.company_name,
                    applicationUrl: job.application_url,
                    position: job.position_title,
                    appStatus: job.application_status,
                    interviewStage: job.interview_stage,
                    offer: job.offer,
                    contactName: job.contact_name,
                    contactEmail: job.contact_email,
                    contactNumber: job.contact_phone_number,
                    jobHuntId: job.job_hunt_id,
                    id: job.id
                }
            }
        }

        console.log('job to edit ', jobToEdit);
        dispatch({
            type: 'SET_JOB',
            payload: jobToEdit
        });

        history.push('/editJobEntry');
    }

    const handleModalOkay = () => {
        history.push('/home');
    }

    const test = () => {
        console.log('isOfferAccepted', isOfferAccepted);
    }

    const onAddJob = () => {
        history.push('/newJobEntry');
    }

    return (
        <div>
            <h4 onClick={test}>Dashboard</h4>
            <button onClick={onAddJob}>Add Additional Job</button>

            { isOfferAccepted && 
            <h1>Congradulations!</h1>
            }

            

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Company</th>
                        <th scope="col">Contact Name</th>
                        <th scope="col">Contact #</th>
                        <th scope="col">Contact Email</th>
                        <th scope="col">Application Link</th>
                        <th scope="col">Position</th>
                        <th scope="col">Application Status</th>
                        <th scope="col">Interview Stage</th>
                        <th scope="col">Offer</th>
                        <th scope="col">Offer Taken</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                {jobDetailInfo.map((job, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td><button onClick={() => handleEdit(job.id)}>edit</button></td>
                        <td>{job.company_name}</td>
                        <td>{job.contact_name}</td>
                        <td>{job.contact_phone_number}</td>
                        <td>{job.contact_email}</td>
                        <td>{job.application_url}</td>
                        <td>{job.position_title}</td>
                        <td>{job.application_status}</td>
                        <td>{job.interview_stage}</td>
                        <td>{job.offer ? <p>yes</p> : <p>no</p>}</td>
                        <td>{job.offer_accepted ? <p>yes</p> : <p>no</p>}</td>
                        <td><button onClick={() => handleDelete(job.id)}>delete</button></td>   
                    </tr>

                ))}
                </tbody>
            </table>
            <div>
                <p>Progress Tracker</p>
                <ul>
                    <li>Total Applied: {totals.applied}</li>
                    <li>Total Interviews: {totals.interviewed}</li>
                    <li>Total Rejections: {totals.rejected}</li>
                    <li>Total Offers: {totals.offered}</li>
                </ul>
            </div>
        </div>
    )
}

export default DashboardPage
