# User Management API

A RESTful API for managing user information and handling image uploads, built with Node.js, Express, and MongoDB.

## Overview

This project implements a secure RESTful API that allows:
- Creating users with validation
- Updating user details
- Retrieving all users
- Uploading user images (with format validation)
- Deleting users

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **bcrypt** - Password hashing
- **multer** - File upload handling
- **validator** - Input validation

## API Documentation

API documentation is available on SwaggerHub:
[User Management API Documentation](https://app.swaggerhub.com/apis/chandrashekarreddyku/UserManagementAPI/1.0.0)

## Setup Instructions

### Prerequisites
- Node.js and npm installed
- MongoDB installed and running

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/ChandraShekar2905/WebDesign_UserExperience_Engineering/tree/master/Assignment%208
   cd user-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   PORT=8000
   MONGODB_URI=mongodb://localhost:27017/user-api
   ```

4. Create the images directory:
   ```
   mkdir images
   ```

5. Start the server:
   ```
   npm run dev
   ```

The server should now be running at `http://localhost:8000`.

## API Endpoints

### Create User
- **URL**: POST /user
- **Body**: JSON with fullName, email, and password
- **Response**: 201 Created on success

### Update User
- **URL**: PUT /user/edit
- **Body**: JSON with email (required), fullName (optional), and password (optional)
- **Response**: 200 OK on success

### Get All Users
- **URL**: GET /getUser
- **Response**: 200 OK with list of users

### Upload Image
- **URL**: POST /user/uploadImage
- **Body**: Form data with email and image file
- **Response**: 201 Created on success with file path

### Delete User
- **URL**: DELETE /user/{email}
- **Response**: 200 OK on success

## Testing with Postman

1. Import the Postman collection from the repository
2. Update the collection variables if needed (e.g., base URL)
3. Use the collection to test all API endpoints

## Validation Rules

- **Full Name**: Only alphabetic characters
- **Email**: Valid email format
- **Password**: At least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character
- **Image**: Only JPEG, PNG, and GIF formats accepted

## Security Features

- Password hashing using bcrypt
- File type validation for uploads
- Input validation for all fields