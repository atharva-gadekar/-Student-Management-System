# Student Management System - README

## Introduction
The Student Management System is a platform that manages student data, tasks, and administrative functionalities. Built on a Node.js backend using the Express framework,  enhanced by TypeScript, the system provides separate functionalities for students and admins, secured with JWT (JSON Web Tokens) for authentication and authorization.

The platform has two main sections:

1. Admin Section: For teachers and staff. It lets them easily add students, give tasks, and make new admin accounts.

2. Student Section: For students. They can see their tasks, change their profile details, and update task progress.

## Features
1. **Admin Features**
    - Login
    - Create a new Admin
    - Add a student
    - Assign tasks to students

2. **Student Features**
    - Login
    - View assigned tasks
    - Update task status

## Directory Structure
```
- controllers/
  - admin.ts       # Admin related functionalities
  - student.ts     # Student related functionalities

- middleware/
  - auth.middleware.ts  # JWT-based authentication & authorization

- models/
  - task.model.ts       # Schema & Model for Tasks
  - user.model.ts       # Schema & Model for Users (Admins & Students)

- routes/
  - v1/
    - admin/
      - admin.routes.ts    # Routes related to Admin actions
    - student/
      - student.routes.ts  # Routes related to Student actions
    - index.ts            # Central route file importing all versioned routes

- utils/
  - responseCodes.ts     # Utility to handle HTTP responses
```

## APIs Overview

### Admin

1. **Login**: `POST /api/v1/admin/login`
    - **Description**: This endpoint allows administrators to log in by providing their credentials. Upon successful validation, a session or JWT token is returned.
    - **Payload**: 
        ```json
        {
          "email": "admin@example.com",
          "password": "adminpassword"
        }
        ```

2. **Add Student**: `POST /api/v1/admin/add`
    - **Description**: Administrators can use this endpoint to add new students to the system. The provided data will be stored securely, and the student will be able to access the system using the given email and password.
    - **Payload**: 
        ```json
        {
          "name": "John Doe",
          "email": "john@example.com",
          "department": "Engineering",
          "password": "johnpassword"
        }
        ```

3. **Assign Task to Student**: `POST /api/v1/admin/assign`
    - **Description**: Admins can assign specific tasks to students. Each task has a title, description, and due date. Once assigned, the student can view the task and update its status.
    - **Payload**: 
        ```json
        {
          "studentId": "5f9a3234238dc10f834b23cd",
          "taskName": "Assignment 1",
          "dueDate": "2023-11-20",
          "description": "Complete the assignment on calculus."
        }
        ```

4. **Create New Admin**: `POST /api/v1/admin/createAdmin`
    - **Description**: In cases where more than one administrator is required, this endpoint enables the creation of additional admin accounts. The new admin can then access the system using the given credentials.
    - **Payload**: 
        ```json
        {
          "name": "Admin2",
          "email": "admin2@example.com",
          "department": "Admin",
          "password": "adminpassword2"
        }
        ```

### Student

1. **Login**: `POST /api/v1/student/login`
    - **Description**: Students can log into the system using this endpoint. Upon successful authentication, they are granted access to their dashboard and can view their tasks.
    - **Payload**: 
        ```json
        {
          "email": "john@example.com",
          "password": "johnpassword"
        }
        ```

2. **Get Tasks**: `GET /api/v1/student/tasks/:id`
    - **Description**: This endpoint retrieves all the tasks assigned to a particular student. By providing the student's ID, the system will return a list of all associated tasks.
    - `:id` - ID of the student for whom the tasks need to be fetched.

3. **Update Task Status**: `PATCH /api/v1/student/update/:taskId`
    - **Description**: Students can update the status of their tasks, indicating their progress or completion. The task status is updated in real-time for administrators to monitor.
    - `:taskId` - ID of the task to be updated
    - **Payload**: 
        ```json
        {
          "status": "completed"
        }
        ```



## Middlewares
1. **verifyUser**: Middleware to verify and authenticate a user (student) based on the provided JWT token.
2. **verifyAdmin**: Middleware to verify, authenticate, and authorize an admin based on the provided JWT token.

## Models
1. **Task Model**: Represents tasks with properties such as title, description, due date, and status.
2. **User Model**: Represents users (students and admins) with properties like name, email, password, department, role (admin/student), and tasks.

## Installation & Setup
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Set up environment variables as per the `.env.sample` file given by the user.
4. Run the server using `nodemon`.
5. Access the APIs using tools like Postman.

## All the API details can be read using the following postman link.

[https://documenter.getpostman.com/view/25553200/2s9Y5SVkcB](https://documenter.getpostman.com/view/25553200/2s9Y5SVkcB)

## API hosted at.

[https://social-app-api-fvee.onrender.com](https://social-app-api-fvee.onrender.com)



