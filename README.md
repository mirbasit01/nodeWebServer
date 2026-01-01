Node.js Express MongoDB Backend API

This project is a RESTful backend API built using Node.js, Express.js, and MongoDB (Mongoose).
It demonstrates a complete transition from file-based storage (JSON) to a MongoDB database, including CRUD operations, middleware, and logging.

📌 Features

Express.js REST API

MongoDB integration using Mongoose

User CRUD operations (Create, Read, Update, Delete)

Request logging using middleware

HTML rendering for users list

JSON API endpoints

Schema validation with Mongoose

Timestamps enabled (createdAt, updatedAt)

🛠️ Tech Stack

Node.js

Express.js

MongoDB

Mongoose

fs (File System)

PowerShell / Terminal

📂 Project Structure
node-web-server/
│
├── access.log
├── index.js
├── package.json
├── package-lock.json
└── README.md

⚙️ Installation & Setup
1️⃣ Clone the repository
git clone <your-repo-url>
cd node-web-server

2️⃣ Install dependencies
npm install

3️⃣ Start MongoDB

Make sure MongoDB is running locally:

mongod


Or ensure MongoDB Service is running on Windows.

4️⃣ Start the server
node index.js


Server will run on:

http://localhost:3000

🔌 MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/nodeWebServer')


Database Name:

nodeWebServer

🧩 User Schema (Mongoose)
{
  firstName: String,
  lastName: String,
  email: String,
  jobTitle: String,
  gender: String
}


email is unique

firstName and email are required

timestamps enabled

📡 API Endpoints
🔹 Get All Users (HTML)
GET /users

🔹 Get All Users (JSON)
GET /api/users

🔹 Get User by ID
GET /api/users/:id

🔹 Create User
POST /api/users


Request Body

{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "gender": "Male",
  "job_title": "Developer"
}

🔹 Update User
PATCH /api/users/:id

🔹 Delete User
DELETE /api/users/:id

🧾 Middleware (Logging)

All requests are logged into access.log:

2025-01-01T12:00:00.000Z - ::1 GET - /api/users

🧪 Testing

You can test APIs using:

Postman

Thunder Client (VS Code)

curl

🚧 Future Improvements

Authentication (JWT)

Password hashing (bcrypt)

Environment variables (dotenv)

Pagination & filtering

Role-based access control

Error handling middleware

👨‍💻 Author

Muhammad Zubair
Frontend & Backend Developer
Express.js | MongoDB | React | Web3

📄 License

This project is licensed under the MIT License.
