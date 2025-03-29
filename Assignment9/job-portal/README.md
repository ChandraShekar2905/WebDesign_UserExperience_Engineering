# React Job Portal

A comprehensive job portal application built with React, Material UI, and Axios.

## Features

- User authentication (login/logout)
- Job listings with search functionality
- Company showcase with image gallery
- Contact form for inquiries
- Responsive design using Material UI

## Project Setup

### Prerequisites

- Node.js (v14 or higher)
- NPM (v6 or higher)

### Installation

1. Clone the repository:
git clone https://github.com/your-username/react-job-portal.git
cd react-job-portal
Copy
2. Install dependencies:
npm install
Copy
3. Start the development server:
npm start
Copy
4. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

### Backend Connection

This project connects to a Node.js backend from a previous assignment. Make sure your backend server is running on port 3001 or update the API_URL in `src/services/api.js` to match your backend URL.

## Folder Structure
react-job-portal/
├── public/
├── src/
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # Reusable components
│   │   ├── Navigation/  # Navigation components
│   │   └── UI/          # UI components
│   ├── context/         # Context providers
│   ├── pages/           # Page components
│   │   ├── Home/
│   │   ├── About/
│   │   ├── Jobs/
│   │   ├── Contact/
│   │   ├── Companies/
│   │   └── Auth/
│   ├── services/        # API services
│   ├── utils/           # Utility functions
│   ├── App.js           # Main App component
│   ├── index.js         # Entry point
│   └── data.js          # Mock data
└── package.json
Copy
## Navigation

The application includes the following routes:

- `/` - Home page
- `/about` - About page
- `/jobs` - Job Listings page
- `/companies` - Company Showcase page
- `/contact` - Contact page
- `/login` - Login page

## Key Functionalities

### Authentication

- Login using credentials from previous assignment
- Protected routes that redirect to login if not authenticated
- JWT token storage in localStorage
- Session management with token expiration handling

### Job Listings

- Display of job listings with detailed information
- Search functionality to filter jobs by title, description, or skills
- Responsive card layout for job posts

### Company Showcase

- Gallery view of partner companies
- Images fetched from backend API
- Responsive grid layout for company cards

### Contact Form

- Form validation for required fields
- Success feedback for form submission
- Company contact information display

## Technologies Used

- React.js
- Material UI
- React Router
- Axios for API requests
- JWT for authentication