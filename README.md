# Pet Adoption App

This is my exam project in Frontend development year 2. The Pet Adoption App is a responsive web application where users can browse pets available for adoption. Registered users can create and manage their own pet listings by adding, editing, deleting, and updating adoption status.

**Link to the live website:** [https://pet-adoption-firm.netlify.app/](https://pet-adoption-firm.netlify.app/)

## What the app does

### For visitors

- Browse pets on the home page
- Search and filter by species, size and availability
- View pet details
- Share a link to a specific pet
- Express interest in adopting a pet

### For logged-in users

- Register and log in
- Create a profile with avatar and banner
- Add new pets
- Edit and delete your own pets
- Mark pets as adopted or available again

## Tech stack

- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Lucide React**
- **Noroff API**
- **Netlify**

## How to run the project locally

### 1. Clone the repo

```bash
git clone git@github.com:Mortmeister/Pet-adoption-app.git
cd Pet-adoption-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add environment variables

Create a `.env` file in the root folder:

```env
VITE_NOROFF_BASE_URL=your_api_base_url
VITE_NOROFF_API_KEY=your_api_key
```

### 4. Start the dev server

```bash
npm run dev
```

Open the URL shown in the terminal (`http://localhost`).

### Other useful commands

```bash
npm run build
npm run preview
npm run lint
```

## AI Assistance

AI tools, primarily ChatGPT, were used throughout the project as a learning resource. It was used to clarify concepts, discuss implementation approaches, debugging, and provide general guidance during development.

Examples of AI-assisted tasks include:

- Clarifying React, TypeScript, and Tailwind concepts
- Debugging
- Discussing structures, state management, and code organisation
- Brainstorming UI/UX ideas
- Reviewing accessibility considerations
- Explaining React concepts when encountering unfamiliar behaviour
- Assisting with documentation and pull request descriptions
- Generating generic text used in the design

AI was used as a support rather than a code generation tool. All decisions, implementation, testing, and final code were completed independently. A detailed record of AI usage is included in the reflection report.
