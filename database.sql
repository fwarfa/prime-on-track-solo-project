
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "bio" VARCHAR(1000),
    "email" VARCHAR(1000)NOT NULL
);

CREATE TABLE "job_hunt" (
    "id" SERIAL PRIMARY KEY,
    "job_hunt_title" VARCHAR(255) NOT NULL,
    "end_date" DATE
);

CREATE TABLE "job_details" (
    "id" SERIAL PRIMARY KEY,
    "company_name" VARCHAR (80) NOT NULL,
    "application_url" VARCHAR (1000),
    "position_title" VARCHAR(255) NOT NULL,
    "application_status" VARCHAR(255) NOT NULL,
    "interview_stage" VARCHAR(1000),
    "contact_name" VARCHAR(255),
    "contact_email" VARCHAR(255),
    "contact_phone_number" VARCHAR(255),
    "offer" BOOLEAN DEFAULT FALSE,
    "offer_accepted" BOOLEAN DEFAULT FALSE,
	"user_id" INT REFERENCES "user",
	"job_hunt_id" INT REFERENCES "job_hunt"
);


DROP table "job_details";

DROP table "job_hunt";

DROP table "user";