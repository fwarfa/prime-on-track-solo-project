import React from 'react'

function JobEntry() {
    return (
        <div>
            <h1>Enter A Job!</h1>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default JobEntry