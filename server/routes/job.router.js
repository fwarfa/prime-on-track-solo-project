const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
// const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
// const userStrategy = require('../strategies/user.strategy');

const router = express.Router();
// FETCH_JOB_DETAILS
router.get('/jobsByHunt/:id', rejectUnauthenticated, (req, res) => {
  let huntId = req.params.id;
  const query = `
    SELECT * 
    FROM job_details
    WHERE job_hunt_id = $1;
  `;
  pool.query(query, [huntId])
    .then( result => {
      console.log('results by hunt id is ', result.rows);
      res.send(result.rows);
    })
    .catch(err => {
      console.log('Job Details by hunt GET failed', err);
      res.sendStatus(500)
    })
});

// FETCH_EDIT_DETAILS
router.get('/jobDetails/:id', (req, res) => {
  const id = req.params.id
  const query = `SELECT * FROM job_details WHERE id = $1`;
  pool.query(query, [id])
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('Get Job Details with ID failed', err);
      res.sendStatus(500)
    })
});

// FETCH_TOTALS
router.get('/totals/:id', (req, res) => {
  let huntId = req.params.id
  const query = `
  SELECT
  (SELECT COUNT(job_details.id) FROM "job_details" JOIN job_hunt ON job_hunt.id = job_details.job_hunt_id 
    WHERE job_hunt.id = $1) AS "applied",
    
  (SELECT COUNT(job_details.id) FROM "job_details" JOIN job_hunt ON job_hunt.id = job_details.job_hunt_id 
    WHERE job_hunt.id = $1 AND job_details."interview_stage" != 'Pending') AS "interviewed",
    
  (SELECT COUNT(job_details.id) FROM "job_details" JOIN job_hunt ON job_hunt.id = job_details.job_hunt_id 
    WHERE job_hunt.id = $1 AND job_details."application_status" = 'Rejected') AS "rejected",
    
  (SELECT COUNT(job_details.id) FROM "job_details" JOIN job_hunt ON job_hunt.id = job_details.job_hunt_id 
    WHERE job_hunt.id = $1 AND job_details."offer" = true) AS "offered";
    `;
  pool.query(query, [huntId])
    .then( result => {
      console.log('RESULTS', result.rows[0]);
      res.send(result.rows[0]);
    })
    .catch(err => {
      console.log('Job Details Totals GET failed', err);
      res.sendStatus(500)
    })
});

// FETCH_JOB_HUNT
router.get('/getHunt', (req, res) => {
  const query = `SELECT * FROM job_hunt`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('Job Hunt GET failed', err);
      res.sendStatus(500)
    })
});

// ADD_JOB_DETAILS
router.post('/addDetails', (req, res) => {
    console.log('user id is ', req.user.id);

    const company = req.body.company;
    const applicationUrl = req.body.applicationUrl;
    const position = req.body.position;
    const appStatus = req.body.appStatus;
    const interviewStage = req.body.interviewStage;
    const offer = req.body.offer;
    const offerAccepted = req.body.offerAccepted;
    const contactName = req.body.contactName;
    const contactEmail = req.body.contactEmail;
    const contactNumber = req.body.contactNumber;
    const userId = req.user.id;
    const huntTitle = req.body.huntTitle;

    console.log('jobHuntId', req.body.jobHuntId);
    
    // Validation to see if job hunt already exists
    // if it does we skip firt query and set jobhuntid
    // otherwise we run both first and second queries
    // and get the jobHuntId from the first query
    if (req.body.jobHuntId) {
      // SKIP 1ST QUERY 
      const jobHuntId = req.body.jobHuntId;
      const insertJobDetailQuery = `
        INSERT INTO "job_details" 
            (company_name, application_url, position_title, application_status, 
            interview_stage, contact_name, contact_email, contact_phone_number, offer, offer_accepted, user_id, job_hunt_id)
        VALUES 
            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING job_hunt_id;
        `;
      pool.query(insertJobDetailQuery, [company, applicationUrl, position, appStatus, interviewStage, contactName, contactEmail, contactNumber, offer, offerAccepted, userId, jobHuntId])
        .then(result => {
            res.send({jobHuntId: result.rows[0].job_hunt_id});
            // res.sendStatus(200);
        }).catch(err => {
          // catch for second query
          console.log('Job Details POST failed: ',err);
          res.sendStatus(500)
        })
        return;
    }

    const insertJobHuntQuery = `
        INSERT INTO "job_hunt" 
            (job_hunt_title)
        VALUES 
            ($1) 
        RETURNING "id"`;
    pool.query(insertJobHuntQuery, [huntTitle])
        .then((result) => {
            console.log('id of job detail is, ', result.rows[0].id);
            const createJobDetailId = result.rows[0].id;

            const insertJobDetailQuery = `
              INSERT INTO "job_details" 
                  (company_name, application_url, position_title, application_status, 
                  interview_stage, contact_name, contact_email, contact_phone_number, offer, offer_accepted, user_id, job_hunt_id)
              VALUES 
                  ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
              RETURNING job_hunt_id;
               `;
            pool.query(insertJobDetailQuery, [company, applicationUrl, position, appStatus, interviewStage, contactName, contactEmail, contactNumber, offer, offerAccepted, userId, createJobDetailId])
              .then(result => {
                // res.sendStatus(200);
                res.send({jobHuntId: result.rows[0].job_hunt_id});
              }).catch(err => {
                // catch for second query
                console.log('Job Details POST failed: ',err);
                res.sendStatus(500)
              })
        }).catch(err => {
        console.log('Job Hunt POST failed: ', err);
        res.sendStatus(500);
        })
});

// DELETE_JOB_DETAILS
router.delete('/deleteDetails/:id', (req, res) => {
  let id = req.params.id;
  console.log('id is ', id);
  
  const query = `
  DELETE FROM job_details WHERE id = $1
  RETURNING "job_hunt_id";
  `;
  pool.query(query, [id])
    .then( result => {
      // res.sendStatus(200);
      res.send({jobHuntId: result.rows[0].job_hunt_id});
    })
    .catch(err => {
      console.log('Job Details DELETE failed', err);
      res.sendStatus(500)
    })
});

// END_JOB_HUNT
router.put('/endHunt/:id', (req,res) => {
  let id = req.params.id;
  console.log('id is ', id);
  
  const query = `
  UPDATE "job_hunt"
  SET 
    end_date = CURRENT_DATE
  WHERE id = $1;
  `;
  pool.query(query, [id])
    .then( result => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('Job Hunt PUT failed', err);
      res.sendStatus(500)
    })
});

// UPDATE_JOB_DETAILS
router.put('/updateDetails', (req, res) => {
  const company = req.body.company;
  const applicationUrl = req.body.applicationUrl;
  const position = req.body.position;
  const appStatus = req.body.appStatus;
  const interviewStage = req.body.interviewStage;
  const offer = req.body.offer;
  const offerAccepted = req.body.offerAccepted;
  const contactName = req.body.contactName;
  const contactEmail = req.body.contactEmail;
  const contactNumber = req.body.contactNumber;
  const userId = req.user.id;
  const jobHuntId = req.body.jobHuntId;
  const id = req.body.id;
  
  console.log('job id is', id);
  
  
  const query = `
    UPDATE job_details
    SET 
      company_name = $1, 
      application_url = $2, 
      position_title = $3,
      application_status = $4,
      interview_stage = $5,
      contact_name = $6,
      contact_email = $7,
      contact_phone_number = $8,
      offer = $9,
      offer_accepted = $10,
      user_id = $11,
      job_hunt_id = $12
    WHERE id = $13;
    `;
  pool.query(query, [company, applicationUrl, position, appStatus, interviewStage, contactName, contactEmail, contactNumber, offer, offerAccepted, userId, jobHuntId, id])
    .then( result => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('Job Details PUT failed', err);
      res.sendStatus(500)
    })
});

module.exports = router;