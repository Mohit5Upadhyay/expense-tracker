# Expense Tracker

## Overview
Expense Tracker is a simple application designed to help users manage their personal finances. It allows users to track their income and expenses, categorize transactions, and perform analysis over it in order to make good financial management. This project is ideal for anyone looking to improve their financial awareness and budgeting skills.

## Features
- Add, edit, and delete income and expense entries.
- Categorize transactions for better organization.
- View detailed summaries and reports of your financial data.
- User-friendly interface for seamless navigation.

## Setup Instructions
Follow these steps to set up the project on your local machine:

1. **Clone the Repository**  
    Open your terminal and run:
    ```bash
    git clone <repository-url>
    cd expenseTracker
    ```

2. **Install Dependencies**  
    Ensure you have [Node.js](https://nodejs.org/) installed. Then, run:
    ```bash
    npm install
    ```

3. **Set Up Environment Variables**  
    Create a `.env` file in the root directory and configure the necessary environment variables. Example:
    ```
    PORT=8000
    MONGODB_URI=mongodb+srv://<YOUR-USER-NAME>:<YOUR-DB-NAME>@<YOUR-DB-PASSWORD-without-special-character>.5dgbfjz.mongodb.net/

    JWT_SECRET=your-secret-string

    CLIENT_URL=http://localhost:5173
    ```

4. **Run the Application**  
    Start the development server:
    ```bash
    npm run dev (for Frontend)
    npm run dev (for Backend)
    ```

    The Frontend will available at `http://localhost:5173`

    The backend server will be available at `http://localhost:8000`.

5. **Build for Production**  
    To create a production build, run:
    ```bash
    npm run build
    ```

## Contributing
Contributions are welcome! Feel free to submit issues or pull requests to improve the project.

## License
This project is licensed under the [MIT License](#).
