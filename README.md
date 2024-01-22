# Support Ticket Entry System

## Overview

The Support Ticket Entry System is a web application built using the MERN stack (MongoDB, Express.js, React with Vite, and Node.js) and is entirely TypeScript-based. This system allows users to create support tickets and efficiently assign agents using a round-robin logic.

## Live

https://jenish-support-ticket-app.vercel.app/

## Features

- **Ticket Creation and Assignment:** Users can create support tickets and assign agents to them. The assignment of agents is handled using a round-robin logic, ensuring a fair distribution of workload among available agents.

- **Round-Robin Assignment:** The application implements a round-robin logic that handles concurrent requests with ease, ensuring atomicity during the assignment of agents. Even in situations with multiple simultaneous requests, different agents are efficiently assigned to each request/ticket.

- **Data-Validation:** The server handles proper validation using Joi package, ensuring that the request data is valid as per specified rules, if validation fails, proper error handling is done for better user experience. In the frontend, custom form validations will prevent invalid data submission.

- **Filtering, Sorting, and Pagination:**

  - _Backend-side:_ The application implements server-side filtering, sorting, and pagination for efficient handling of data.
  - _Frontend:_
    - **Filtering:** While filtering data, debounce technique is used to optimize API calls during filtering, enhancing performance.
    - **Pagination:** Implements offset and limit pagination to manage and display a controlled number of records on each page.

- **Styling:** Frontend components are styled using Tailwind CSS, providing a clean and responsive user interface.

## Getting Started

1. **Clone the Repository:**

   ##### (Note: Here I am using SSH for clonning the Repository)

   ```bash
   git clone git@github.com:jenishVadodaria/support-ticket-system.git
   cd support-ticket-system

   ```

2. **Install Dependencies:**

   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install

   ```

3. **Configure Environment Variables:**

- Create a .env file in the root directory for both frontend and backend and set the necessary environment variables from the provided env.sample file.

4. **Create a MongoDB Cluster:**

- Create a MongoDB cluster from mongodb cloud or you can also create a local cluster using mongodb-compass. Copy the Mongo-URI and paste it in .env file.

5. **Run the Application:**

- Frontend: npm run dev
- Backend: npm run start
