# 🏠 Airbnb Clone

A clone of the Airbnb web application, created using the MERN stack (MongoDB, Express.js, React.js, and Node.js).

## 🚀 Live Demo

Check out the live application here: [Airbnb Clone](https://airbnb-zeta-ten.vercel.app/)

## ✨ Features

- 🔒 User authentication (login and registration)
- 🏡 Browse listings
- 📝 View detailed information about listings
- 📅 Book listings
- 📱 Responsive design

## 🛠️ Tech Stack

- **Frontend:** React.js, CSS, Bootstrap, Tailwind
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Hosting:** Vercel (Frontend), Render (Backend)

## ⚙️ Installation

To run this project locally, follow these steps:

### Prerequisites

- Node.js and npm installed on your machine
- MongoDB installed and running

### 📥 Clone the Repository

```bash
git clone https://github.com/Yash1Hingu/airbnb.git
cd airbnb
```

### 📦 Install Dependencies

#### For the Backend

```bash
cd backend
npm install
```

#### For the Frontend

```bash
cd frontend
npm install
```

### 🛠️ Setup Environment Variables

Create a `.env` file in the `backend` directory and add the following environment variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### ▶️ Start the Application

#### Backend

```bash
cd backend
npm start
```

The backend server will start on `http://localhost:5000`.

#### Frontend

```bash
cd frontend
npm start
```

The frontend application will start on `http://localhost:3000`.

## Frontend Routes

The frontend routing in this application is managed using `react-router-dom`. Here's an overview of each route and its corresponding functionality:

### Route: `/`

- **Element:** `<Layout />`
- **Description:** The root route of the application, rendering the main layout component.

  - **Child Route: `/`**
    - **Element:** `<IndexPage />`
    - **Description:** Displays the index page of the application.

  - **Child Route: `/login`**
    - **Element:** `<LoginPage />`
    - **Description:** Renders the login page for user authentication.

  - **Child Route: `/register`**
    - **Element:** `<RegisterPage />`
    - **Description:** Displays the registration page for new users.

  - **Child Route: `/account`**
    - **Element:** `<AccountLayout />`
    - **Description:** Handles account-related pages and layouts.

      - **Nested Route: `/`**
        - **Element:** `<ProfilePage />`
        - **Description:** Shows the user's profile information.

      - **Nested Route: `/bookings`**
        - **Element:** `<BookingsPage />`
        - **Description:** Lists all bookings made by the user.

      - **Nested Route: `/places`**
        - **Element:** `<PlacesPage />`
        - **Description:** Displays the user's listed places and related actions.

        - **Dynamic Nested Route: `/places/:action`**
          - **Element:** `<PlacesPage />`
          - **Description:** Handles different actions (e.g., add, edit) related to user's places.

        - **Dynamic Nested Route: `/places/:action/:id`**
          - **Element:** `<PlacesPage />`
          - **Description:** Manages actions with specific IDs for user's places.

### Route: `/place/:id`

- **Element:** `<PlacePage />`
- **Description:** Renders detailed information about a specific place based on its ID.

### Route: `/account/bookings/:id`

- **Element:** `<BookingPage />`
- **Description:** Displays detailed information about a specific booking based on its ID.

For a deeper understanding of each component's functionality, refer to the respective component files in the `src/components/pages` directory.


## 📝 Backend Details

The backend of this application is built using Node.js and Express.js. Below are the key components and their functionalities:

### Middleware and Configuration

- **dotenv:** Loads environment variables from a `.env` file.
- **express:** Web framework for Node.js.
- **cors:** Enables Cross-Origin Resource Sharing.
- **mongoose:** ODM for MongoDB.
- **bcryptjs:** Library for hashing passwords.
- **jsonwebtoken:** Library to sign and verify JSON Web Tokens.
- **cookie-parser:** Middleware to parse cookies.
- **image-downloader:** Utility to download images.
- **multer:** Middleware for handling multipart/form-data (file uploads).
- **fs (file system):** Module to work with the file system.
- **imgbb-uploader:** Utility to upload images to ImgBB.

### Models

- **User:** Defines user schema and handles user data.
- **Place:** Defines place schema and handles listing data.
- **Booking:** Defines booking schema and handles booking data.

### Routes

#### User Routes

- **POST /register:** Registers a new user.
- **POST /login:** Authenticates a user and returns a JWT token.
- **GET /profile:** Retrieves the profile information of the logged-in user.
- **GET /logout:** Logs out the user by clearing the JWT token.

#### Places Routes

- **POST /places:** Creates a new place listing.
- **GET /places:** Retrieves all places owned by the logged-in user.
- **GET /edit/:id:** Retrieves details of a specific place for editing.
- **PUT /places:** Updates an existing place listing.
- **GET /indexplaces:** Retrieves a list of all places (limited to 20).
- **GET /place/:id:** Retrieves details of a specific place by ID.

#### Booking Routes

- **POST /bookings:** Creates a new booking.
- **GET /booking:** Retrieves all bookings made by the logged-in user.
- **GET /booking/:id:** Retrieves details of a specific booking by ID.

#### File Upload Routes

- **POST /upload-by-link:** Uploads an image by URL.
- **POST /upload:** Uploads images using Multer.

### Helper Functions

- **getUserDataFromToken:** Extracts user data from the JWT token.

### Server Initialization

The server runs on port 4000, and CORS is enabled for the client URL specified in the environment variables.

```javascript
app.listen(4000, () => {
    console.log("Server Running on port 4000");
});
```

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## 📧 Contact

If you have any questions or feedback, feel free to contact me at yash23hingu@gmail.com.