# Finance Tracker Backend

This is the backend application for a Finance Tracker. It provides APIs for managing accounts, categories, transactions, users, and generating financial reports.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
  - [User Endpoints](#user-endpoints)
    - [Register User](#register-user)
    - [Login User](#login-user)
  - [Account Endpoints](#account-endpoints)
    - [Create Account](#create-account)
    - [Get Accounts](#get-accounts)
    - [Update Account](#update-account)
    - [Delete Account](#delete-account)
  - [Category Endpoints](#category-endpoints)
    - [Create Category](#create-category)
    - [Get Categories](#get-categories)
    - [Update Category](#update-category)
    - [Delete Category](#delete-category)
  - [Transaction Endpoints](#transaction-endpoints)
    - [Create Transaction](#create-transaction)
    - [Get Transactions](#get-transactions)
    - [Get Transaction By ID](#get-transaction-by-id)
    - [Update Transaction](#update-transaction)
    - [Delete Transaction](#delete-transaction)
    - [Get Info Cards](#get-info-cards)
    - [Get Area Chart Data](#get-area-chart-data)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Management**: Register and authenticate users.
- **Account Management**: Create and manage accounts with balance tracking.
- **Category Management**: Define income and expense categories.
- **Transaction Management**: Create, update, delete, and fetch transactions.
- **Reporting**: Generate financial reports such as total income, expenses, and balance.

## Technology Stack

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling tool
- **Moment.js**: Date manipulation library
- **dotenv**: Environment variable management

## Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/yourusername/finance-tracker-backend.git
    cd finance-tracker-backend
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set up environment variables**:
   
   Create a `.env` file in the root directory and add the following variables:

    ```env
    MONGO_URI=your_mongo_db_connection_string
    PORT=your_port_number
    JWT_SECRET=your_jwt_secret
    ```

4. **Start the application**:

    ```bash
    npm start
    ```

## Configuration

Ensure that you have a MongoDB instance running and properly configured in your `.env` file.

## API Endpoints

### User Endpoints

#### Register User

- **URL**: `/api/users/register`
- **Method**: `POST`
- **Description**: Register a new user.
- **Request Body**:

    ```json
    {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "password": "password123"
    }
    ```

- **Response**:

    ```json
    {
        "status": true,
        "message": "User registered successfully",
        "data": { ...user_details }
    }
    ```

#### Login User

- **URL**: `/api/users/login`
- **Method**: `POST`
- **Description**: Authenticate a user and get a JWT token.
- **Request Body**:

    ```json
    {
        "email": "john.doe@example.com",
        "password": "password123"
    }
    ```

- **Response**:

    ```json
    {
        "status": true,
        "message": "User logged in successfully",
        "data": { "token": "jwt_token" }
    }
    ```

### Account Endpoints

#### Create Account

- **URL**: `/api/accounts`
- **Method**: `POST`
- **Description**: Create a new account.
- **Request Body**:

    ```json
    {
        "name": "Savings Account",
        "balance": 1000
    }
    ```

- **Response**:

    ```json
    {
        "status": true,
        "message": "Account created successfully",
        "data": { ...account_details }
    }
    ```

#### Get Accounts

- **URL**: `/api/accounts`
- **Method**: `GET`
- **Description**: Fetch all accounts.
- **Response**:

    ```json
    {
        "status": true,
        "message": "Accounts fetched successfully",
        "data": [ ...accounts ]
    }
    ```

#### Update Account

- **URL**: `/api/accounts/:id`
- **Method**: `PUT`
- **Description**: Update an existing account.
- **Request Body**:

    ```json
    {
        "name": "Updated Account Name",
        "balance": 1500
    }
    ```

- **Response**:

    ```json
    {
        "status": true,
        "message": "Account updated successfully",
        "data": { ...account_details }
    }
    ```

#### Delete Account

- **URL**: `/api/accounts/:id`
- **Method**: `DELETE`
- **Description**: Delete an account.
- **Response**:

    ```json
    {
        "status": true,
        "message": "Account deleted successfully"
    }
    ```

### Category Endpoints

#### Create Category

- **URL**: `/api/categories`
- **Method**: `POST`
- **Description**: Create a new category.
- **Request Body**:

    ```json
    {
        "name": "Groceries",
        "type": "EXPENSE"
    }
    ```

- **Response**:

    ```json
    {
        "status": true,
        "message": "Category created successfully",
        "data": { ...category_details }
    }
    ```

#### Get Categories

- **URL**: `/api/categories`
- **Method**: `GET`
- **Description**: Fetch all categories.
- **Response**:

    ```json
    {
        "status": true,
        "message": "Categories fetched successfully",
        "data": [ ...categories ]
    }
    ```

#### Update Category

- **URL**: `/api/categories/:id`
- **Method**: `PUT`
- **Description**: Update an existing category.
- **Request Body**:

    ```json
    {
        "name": "Updated Category Name",
        "type": "INCOME"
    }
    ```

- **Response**:

    ```json
    {
        "status": true,
        "message": "Category updated successfully",
        "data": { ...category_details }
    }
    ```

#### Delete Category

- **URL**: `/api/categories/:id`
- **Method**: `DELETE`
- **Description**: Delete a category.
- **Response**:

    ```json
    {
        "status": true,
        "message": "Category deleted successfully"
    }
    ```

### Transaction Endpoints

#### Create Transaction

- **URL**: `/api/transactions`
- **Method**: `POST`
- **Description**: Create a new transaction.
- **Request Body**:

    ```json
    {
        "date": "2023-01-01",
        "account": "account_id",
        "category": "category_id",
        "payee": "John Doe",
        "amount": 100,
        "notes": "Grocery shopping"
    }
    ```

- **Response**:

    ```json
    {
        "status": true,
        "message": "Transaction created successfully",
        "data": { ...transaction_details }
    }
    ```

#### Get Transactions

- **URL**: `/api/transactions`
- **Method**: `GET`
- **Description**: Fetch transactions based on query parameters.
- **Query Parameters**:

    - `account`: Account ID
    - `fromDate`: Start date
    - `toDate`: End date

- **Response**:

    ```json
    {
        "status": true,
        "message": "Transactions fetched successfully",
        "data": [ ...transactions ]
    }
    ```

#### Get Transaction By ID

- **URL**: `/api/transactions/:id`
- **Method**: `GET`
- **Description**: Fetch a transaction by its ID.
- **Response**:

    ```json
    {
        "status": true,
        "message": "Transaction fetched successfully",
        "data": { ...transaction_details }
    }
    ```

#### Update Transaction

- **URL**: `/api/transactions/:id`
- **Method**: `PUT`
- **Description**: Update an existing transaction.
- **Request Body**:

    ```json
    {
        "date": "2023-01-01",
        "account": "account_id",
        "category": "category_id",
        "payee": "John Doe",
        "amount": 100,
        "notes": "Grocery shopping"
    }
    ```

- **Response**:

    ```json
    {
        "status": true,
        "message": "Transaction updated successfully",
        "data": { ...transaction_details }
    }
    ```

#### Delete Transaction

- **URL**: `/api/transactions/:id`
- **Method**: `DELETE`
- **Description**: Soft delete a transaction.
- **Response**:

    ```json
    {
        "status": true,
        "message": "Transaction deleted successfully"
    }
    ```

#### Get Info Cards

- **URL**: `/api/transactions/info-cards`
- **Method**: `GET`
- **Description**: Get info cards data for remaining balance, total income, and total expenses.
- **Query Parameters**:

    - `account`: Account ID
    - `fromDate`: Start date
    - `toDate`: End date

- **Response**:

    ```json
    {
        "status": true,
        "message": "Info cards fetched successfully",
        "data": {
            "remaining": 1000,
            "income": 5000,
            "expense": 4000
        }
    }
    ```

#### Get Area Chart Data

- **URL**: `/api/transactions/area-chart`
- **Method**: `GET`
- **Description**: Get area chart data for income and expenses over time.
- **Query Parameters**:

    - `account`: Account ID
    - `fromDate`: Start date
    - `toDate`: End date

- **Response**:

    ```json
    {
        "status": true,
        "message": "Transactions fetched successfully",
        "data": {
            "income": [[timestamp, amount], ...],
            "expense": [[timestamp, amount], ...]
        }
    }
    ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any bugs or enhancements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
