# Daily Expenses Sharing Application

This project implements a backend for a **Daily Expenses Sharing Application** that allows users to add expenses and split them using three different methods: exact amounts, percentages, and equal splits. The backend is built using **Node.js**, **Express**, and **MongoDB**.

## Features

- User management: Add, view, and manage users.
- Expense management: Add expenses and split them among participants using three methods:
  1. Equal Split
  2. Exact Amounts
  3. Percentage Split
- Expense calculation and balance sheet generation.
- Downloadable balance sheet for users.

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- **Node.js** (v14+)
- **npm** or **yarn** package manager
- **MongoDB** (either installed locally or use MongoDB Atlas)

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/daily-expenses-sharing-app.git
cd daily-expenses-sharing-app
```
### 2. Install Dependencies
Make sure you are in the root directory of the project. Install the required dependencies by running:

```bash
npm install
```
### 3. Setup Environment Variables
Create a .env file in the root directory of the project and add the following environment variables:

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/expenses-app # or your MongoDB Atlas URI
JWT_SECRET=your_jwt_secret_key
```

### 4. Start the MongoDB Server
If you are using a local MongoDB instance, make sure the MongoDB server is running. Use the following command to start MongoDB:
```bash
mongod
```
Alternatively, if you are using MongoDB Atlas, ensure you have the correct connection string in your .env file.

### 5. Start the Server
Run the server using the following command:

```bash
npm start
```
The backend server should now be running on ```http://localhost:5000```.

API Endpoints
-------------

### User Endpoints

1.  **Create a New User**

    -   **URL**: `/api/users`
    -   **Method**: POST
    -   **Description**: Creates a new user with name, email, and mobile number.
    -   **Request Body**:

       ``` json
        {
          "name": "John Doe",
          "email": "john@example.com",
          "mobile": "1234567890"
        }

       ```

    -   **Response**:

       ``` json
        {
          "message": "User created successfully",
          "user": { "id": "USER_ID", "name": "John Doe", "email": "john@example.com", "mobile": "1234567890" }
        }
       ```

2.  **Get User Details**

    -   **URL**: `/api/users/:id`
    -   **Method**: GET
    -   **Description**: Retrieves details of a specific user by ID.
    -   **Response**:

       ``` json
        {
          "id": "USER_ID",
          "name": "John Doe",
          "email": "john@example.com",
          "mobile": "1234567890"
        }
       ```

### Expense Endpoints

1.  **Add an Expense**

    -   **URL**: `/api/expenses`
    -   **Method**: POST
    -   **Description**: Adds a new expense and splits it using one of three methods (equal, exact, percentage).
    -   **Request Body** (Equal Split Example):

       ``` json
        {
          "title": "Dinner",
          "amount": 3000,
          "participants": ["USER_ID_1", "USER_ID_2"],
          "splitMethod": "equal"
        }

       ```

    -   **Response**:

        ```json

        {
          "message": "Expense added successfully",
          "expense": { "id": "EXPENSE_ID", "title": "Dinner", "amount": 3000, "splitMethod": "equal", "participants": [...] }
        }
        ```

2.  **Get User's Expenses**

    -   **URL**: `/api/expenses/user/:userId`
    -   **Method**: GET
    -   **Description**: Retrieves all expenses associated with a specific user.
    -   **Response**:

        ```json

        [
          {
            "id": "EXPENSE_ID",
            "title": "Dinner",
            "amount": 3000,
            "splitMethod": "equal",
            "participants": [...]
          }
        ]
        ```

3.  **Get Overall Expenses**

    -   **URL**: `/api/expenses`
    -   **Method**: GET
    -   **Description**: Retrieves all expenses across all users.
    -   **Response**:

        ```json

        [
          {
            "id": "EXPENSE_ID",
            "title": "Dinner",
            "amount": 3000,
            "splitMethod": "equal",
            "participants": [...]
          }
        ]
        ```

4.  **Download Balance Sheet**

    -   **URL**: `/api/expenses/download`
    -   **Method**: GET
    -   **Description**: Downloads a balance sheet of all user expenses in CSV format.

Authentication and Authorization (Bonus)
----------------------------------------

-   JWT-based user authentication is implemented.
-   Include the JWT token in the `Authorization` header of requests to protected routes.

**Example**:

```bash


`Authorization: Bearer YOUR_JWT_TOKEN`

```

Testing with Thunder Client or Postman
--------------------------------------

1.  **Login/Sign Up a User**:

    -   Use the **Create a New User** endpoint to register a user.
    -   You will get the user's details in the response.
2.  **Authenticate User**:

    -   If user authentication is implemented, login to obtain a JWT token.
3.  **Add Expenses**:

    -   Use the token to make authenticated requests to the expense endpoints.

Error Handling
--------------

The application provides proper error handling and validation checks:

-   User input validation for creating users and expenses.
-   Validation to ensure percentages add up to 100% when using percentage split.

Project Structure
-----------------

```bash


├── controllers         # Contains the logic for handling HTTP requests and sending responses.
│   ├── userController.js      # Handles user-related operations like creating a user, fetching user details, etc.
│   └── expenseController.js   # Handles expense-related operations like adding expenses, fetching expenses, and generating balance sheets.

├── models              # Contains Mongoose models representing the database schemas for MongoDB.
│   ├── User.js               # Defines the User schema (name, email, mobile) for storing user information.
│   └── Expense.js            # Defines the Expense schema (title, amount, participants, split method) for managing expense data.

├── routes              # Defines the API endpoints and associates them with the corresponding controller methods.
│   ├── userRoutes.js          # Defines the user-related routes (e.g., create user, get user details).
│   └── expenseRoutes.js       # Defines the expense-related routes (e.g., add expense, get expenses, download balance sheet).

├── services            # Contains the core logic for non-controller functionality, such as calculations or file generation.
│   └── balanceSheetService.js # Implements the logic for generating the balance sheet as a CSV file.

├── app.js              # Sets up the Express.js application, configures middleware, and connects routes.
│                       # This is the main entry point for the application.

├── config              # Contains configuration-related files for setting up external services and databases.
│   └── db.js                # Manages the MongoDB connection setup using Mongoose.

├── middleware          # Contains middleware functions for tasks like authentication and input validation.
│   └── auth.js              # Implements JWT-based authentication middleware to protect certain routes.

└── .env                # Contains environment-specific variables like the database URL, port number, and JWT secret.


```

License
-------

This project is licensed under the MIT License - see the LICENSE file for details.
