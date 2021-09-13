import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

function DashboardPage() {
    const dispatch = useDispatch();
    const jobDetailInfo = useSelector(store => store.jobDetails);

    useEffect(() => {
        dispatch({
            type: 'FETCH_JOB_DETAILS'
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
        console.log('edit clicked for: ', id);
        dispatch({
            type: 'FETCH_EDIT_DETAILS',
            payload: id
        })
    }
    return (
        <div>
            <h4>Dashboard</h4>

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
                    {jobDetailInfo.map(job => (
                        <tr key={job.id}>
                            <th scope="row">{job.id}</th>
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
        </div>
    )
}

export default DashboardPage
