# Leaf Voting System

Leaf Voting System is a simple web application designed to facilitate voting sessions among friends or groups. It provides an easy-to-use interface for creating voting sessions, submitting votes, and viewing the results.

## Features

- **Session Creation:** Users can create voting sessions by providing a title and list of options.
- **Real-time Updates:** The system provides real-time updates on the remaining time for each session.
- **Secure Access:** Each session is assigned a unique Session ID (SID) which can be used to access the session securely.
- **Vote Submission:** Participants can submit their votes easily by selecting options and submitting.
- **Result Display:** Results are displayed in real-time, showing the current status of votes for each option.
- **Copy URL:** Users can easily copy the URL of the session to share it with others.

## Technologies Used

- **Frontend:** React.js with Next.js for server-side rendering and routing.
- **Styling:** Tailwind CSS for rapid UI development and styling.
- **Backend:** Node.js for server-side logic and handling API requests.
- **Database:** MongoDB for storing session data.

## Installation

**To run the application locally, follow these steps**

1. Clone this repository to your local machine.

2. Navigate to the project directory.

3. Install dependencies using npm install.

4. Create a .env.local file in the Root Diractory and add your MongoDB URI **(example: MONGODB_URI="mongodb+srv://<NAME>:<PASSWORD>@mongodb.net/")**

5. Start the development server using npm run dev.

6. Access the application in your browser at http://localhost:3000.

## Usage

1. **Creating a Session:** Click on the "Create Session" button and provide a title along with the voting options.

2. **Joining a Session:** Access a session by entering the Session ID (SID) in the search bar and clicking on "Search".

3. **Submitting Votes:** Select the desired options and click on "Submit Votes" to submit your votes.

4. **Viewing Results:** Results are displayed in real-time after votes are submitted, showing the current status of each option.

5. **Copying Session URL:** Click on "Copy URL" to copy the session URL and share it with others.

## Screenshots

Homepage:
<img src="/public/home.png" alt="Home Page Screenshot">

Session Creation:
<img src="/public/create.png" alt="Votes Creating">
<img src="/public/creating.png" alt="Votes Creating 2">

Search Votings:
<img src="/public/search.png" alt="Search Votes">

Voting Session:
<img src="/public/sidvotes.png" alt="Voting Sessions">
