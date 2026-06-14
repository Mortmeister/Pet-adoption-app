## Pet Adoption App

This is my exam project, a responsive web app where people can browse pets that are available for adoption. There's also an admin side where logged in users can add, edit, and delete pet listings.

### What it does

#### For visitors

Browse a list of adoptable pets
Click on a pet to see more details (breed, age, size, colour, description)
Search for a specific pet
Share a link to a specific pet

#### For admins:

Register and log in
Add new pets to the list
Edit existing pet info
Delete pets

### Tech Stack

Framework: React
Styling: Tailwind
API:
Hosting: Netlify

### How to run

Clone the repo:

`git clone git@github.com:Mortmeister/Pet-adoption-app.git`

Go into the project folder:

`cd pet-adoption-app`

### Install dependencies:

`npm install`

Add your environment variables

Run the project:

`npm run dev`

API

....
Main endpoints used:

GET /pets – get all pets
GET /pets/:id – get one pet
POST /pets – add a pet (admin only)
PUT /pets/:id – edit a pet (admin only)
DELETE /pets/:id – delete a pet (admin only)
POST /auth/register – register as admin
POST /auth/login – log in as admin

Project Planning

Kanban board:
Roadmap / Gantt chart:

Design

Figma file:
