
# EDA Project 
This version uses React, Redux, Express, Passport, and PostgreSQL (a full list of dependencies can be found in `package.json`).

We **STRONGLY** recommend following these instructions carefully. It's a lot, and will take some time to set up, but your life will be much easier this way in the long run.

## Use the Template for This Repository (Don't Clone)

- Don't Fork or Clone. Instead, click the `Use this Template` button, and make a copy to your personal account.


## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and table

Create a new database called `prime_app` and create a `user` table:

```SQL
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);
```

If you would like to name your database something else, you will need to change `prime_app` to the name of your new database name in `server/modules/pool.js`

## Development Setup Instructions

- Run `npm install`
- Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=superDuperSecret
  ```
  While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`

## Debugging

To debug, you will need to run the client-side separately from the server. Start the client by running the command `npm run client`. Start the debugging server by selecting the Debug button.

![VSCode Toolbar](documentation/images/vscode-toolbar.png)

Then make sure `Launch Program` is selected from the dropdown, then click the green play arrow.

![VSCode Debug Bar](documentation/images/vscode-debug-bar.png)

## Testing Routes with Postman

To use Postman with this repo, you will need to set up requests in Postman to register a user and login a user at a minimum.

Keep in mind that once you using the login route, Postman will manage your session cookie for you just like a browser, ensuring it is sent with each subsequent request. If you delete the `localhost` cookie in Postman, it will effectively log you out.

1. Start the server - `npm run server`
2. Import the sample routes JSON file [v2](./PostmanPrimeSoloRoutesv2.json) by clicking `Import` in Postman. Select the file.
3. Click `Collections` and `Send` the following three calls in order:
   1. `POST /api/user/register` registers a new user, see body to change username/password
   2. `POST /api/user/login` will login a user, see body to change username/password
   3. `GET /api/user` will get user information, by default it's not very much

After running the login route above, you can try any other route you've created that requires a logged in user!

## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

- Start postgres if not running already by using `brew services start postgresql`
- Run `npm start`
- Navigate to `localhost:5000`

## Lay of the Land

There are a few videos linked below that show a walkthrough the client and sever setup to help acclimatize to the boilerplate. Please take some time to watch the videos in order to get a better understanding of what the boilerplate is like.

- [Initial Set](https://vimeo.com/453297271)
- [Server Walkthrough](https://vimeo.com/453297212)
- [Client Walkthrough](https://vimeo.com/453297124)

Directory Structure:

- `src/` contains the React application
- `public/` contains static assets for the client-side
- `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
- `server/` contains the Express App

This code is also heavily commented. We recommend reading through the comments, getting a lay of the land, and becoming comfortable with how the code works before you start making too many changes. If you're wondering where to start, consider reading through component file comments in the following order:

- src/components
  - App/App
  - Footer/Footer
  - Nav/Nav
  - AboutPage/AboutPage
  - InfoPage/InfoPage
  - UserPage/UserPage
  - LoginPage/LoginPage
  - RegisterPage/RegisterPage
  - LogOutButton/LogOutButton
  - ProtectedRoute/ProtectedRoute

## Deployment

1. Create a new Heroku project
1. Link the Heroku project to the project GitHub Repo
1. Create an Heroku Postgres database
1. Connect to the Heroku Postgres database from Postico
1. Create the necessary tables
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security
1. In the deploy section, select manual deploy

## Update Documentation

Customize this ReadMe and the code comments in this project to read less like a starter repo and more like a project. Here is an example: https://gist.github.com/PurpleBooth/109311bb0361f32d87a2

TODO LIST

Setup

  [x] npm installs
    [x] do install
    [x] add missing necessary dependancies
  [x] read through files/understand template
  [x] update existing components names to match project
    [x] add routes/paths for new pages to nav
  [x] add more inputs to registration form
    [x] add, fist/last name, email
    [x] edit corresponding data and endpoint to match
  [x] Create saga for job details and add to root saga
  [x] Create Reducer for job details
  [x] Create job router file and add to server.js
  [] Create Database
    [] add necessary tables
    [x] match db name to modules/pool
    [] update database file with new tables

---------- Pages --------------
[x] Login

[x] Registration Page
  [x] add input fields to registration page
    [x] add first name, last name, email, bio

[] Home Page
  [] Add Profile Info
    [x] use user reducer to get info
    [x] edit profile button
      [x] history push to take you profile page
    [] style profile info to be on left side of page with a divider
  [x] add new job hunt button
    [x] history push should take you to NewJobEntryPage
  [] Display Previous job hunts by title
    [] use mapping to display each job hunt
    [] reach out to brad about how the sql table and how it will look (hunt title)
    [] ^ create hunt title on job details that reference hunt title table
    [] display time stamp of when job hunt was completed
    [] add view button 
      [] view button will take you to details about that previous job hunt

[] Profile Page
  [x] display current demographic
  [] add input fields 
    [] first name, last name, bio, email
    [] username, password
    [] change profile picture button
      [] input from bootstrap to get image from desktop
  [] cancel button to take you to home page
  [] save button update info
    [] initiate dipatch to user saga
    [] build put function with payload to user router
      [] once server put sends back response, will call put/dispatch to get load  data
    [] build put endpoint to update user
    [] save button will take you to home page where update info will 

[] View previous search page
  [] setup same as dashboard without edit or delete
  [] job title and item loaded and map will be the clicked hunt (by id/key)
 
[] New Job Entry Page
  [x] create input fields 
    [] style them 
  [x] create local state to capture values
  [x] send local state object as payload to saga
  [x] build saga generator function (post)
  [] set up put function that makes 
        get saga function call
        and rerenders data on dashboard
  [x] build post end point in router to insert data to db table
  [] add additional job button
    [] button should have collapse functionality
    [] button should show another set of inputs to add job
  [] cancel button that takes you to home page
  [] submit button 
    [x] submit will initiate dipatch function
    [] submit should take you to dashboard page

[] Dashboard Page
  [] create table to hold all current jobs
    [x] map through data for each job item
      [x] display in table
      [] each job item should include an edit button icon
        [] edit button will take you edit job page and display job clicked(by id/key)
        [] edit button will initiate a dispatch
        [] build saga function (put)
        [] build put endpoint that updates database
      [] each job item should include delete button
        [] delete button will initiate delete saga
        [] build saga function (delete)
          [] call get function that rerenders and refreshes dashboard
  [] add additional job button takes you to job entry page
  [] home button takes you to home page
  [] progress tracker
    [] total applied
      [] count of job items on table
    [] total interview
      [] count of total job items that arent 'pending'
    [] total rejections
      [] count of total job items that are 'rejected
    [] total offers
      [] count of total 'true' booleans for offer
    [] display in chart js

[] Edit job Page
  [] set up like inputs from job entry page 
  [] data from job item clicked (by id/key) will be populated within inputs 
  [] rest of setup will be like new job entry page/job entry page/ add job page

[] add job page
  [] setup like new job entry page without job title

*****
[] Congradulatory Page (Dashboard with pop up)
  [] update offer to yes (true)
    [] additional field will show (accepted) 
      [] if answered yes (true)
        [] generate pop up message
        [] save search to home page
  [] add pop message 
    [] okay takes you to home page
    [] cancel keeps you on dashboard

**** most challenging


  