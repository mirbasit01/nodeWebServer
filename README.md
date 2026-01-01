# Node.js Express MongoDB Backend API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

A complete RESTful backend API built using **Node.js**, **Express.js**, and **MongoDB** (Mongoose). This project demonstrates a full transition from file-based storage (JSON) to a MongoDB database, including CRUD operations, middleware, and logging.

Perfect for beginners learning backend development! 🚀

## 📌 Features

- ✅ Express.js REST API
- ✅ MongoDB integration using Mongoose
- ✅ User CRUD operations (Create, Read, Update, Delete)
- ✅ Request logging using middleware
- ✅ HTML rendering for users list
- ✅ JSON API endpoints
- ✅ Schema validation with Mongoose
- ✅ Timestamps enabled (createdAt, updatedAt)

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime environment |
| **Express.js** | Web application framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB object modeling tool |
| **fs (File System)** | Request logging |

## 📂 Project Structure

```
node-web-server/
│
├── access.log              # Request logs
├── index.js                # Main application file
├── package.json            # Project dependencies
├── package-lock.json       # Locked dependencies
└── README.md              # Documentation
```

## ⚙️ Installation & Setup

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### 1️⃣ Clone the repository

```bash
git clone https://github.com/mirbasit01/nodeWebServer.git
cd nodeWebServer
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start MongoDB

Make sure MongoDB is running locally:

**Windows:**
- Check if MongoDB Service is running in Services

**Mac/Linux:**
```bash
mongod
```

**Or use MongoDB Atlas:**
- Update the connection string in `index.js` to your MongoDB Atlas URI

### 4️⃣ Start the server

```bash
node index.js
```

Server will run on: **http://localhost:3000**

You should see:
```
MongoDB Connected
Server running on http://localhost:3000
```

## 🔌 MongoDB Connection

```javascript
mongoose.connect('mongodb://127.0.0.1:27017/nodeWebServer')
```

**Database Name:** `nodeWebServer`

## 🧩 User Schema (Mongoose)

```javascript
{
  firstName: String,      // Required
  lastName: String,
  email: String,         // Required, Unique
  jobTitle: String,
  gender: String,
  createdAt: Date,       // Auto-generated
  updatedAt: Date        // Auto-generated
}
```

## 📡 API Endpoints

### 🔹 Get All Users (HTML)
```http
GET /users
```
Returns an HTML list of all users

### 🔹 Get All Users (JSON)
```http
GET /api/users
```
Returns JSON array of all users

### 🔹 Get User by ID
```http
GET /api/users/:id
```

**Example:**
```http
GET /api/users/507f1f77bcf86cd799439011
```

### 🔹 Create User
```http
POST /api/users
Content-Type: application/json
```

**Request Body:**
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "gender": "Male",
  "job_title": "Developer"
}
```

**Response (201 Created):**
```json
{
  "message": "Success",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "gender": "Male",
    "jobTitle": "Developer",
    "createdAt": "2025-01-02T10:30:00.000Z",
    "updatedAt": "2025-01-02T10:30:00.000Z"
  }
}
```

### 🔹 Update User
```http
PATCH /api/users/:id
Content-Type: application/json
```

**Request Body:**
```json
{
  "jobTitle": "Senior Developer"
}
```

### 🔹 Delete User
```http
DELETE /api/users/:id
```

## 🧾 Middleware (Logging)

All requests are logged into `access.log`:

```
2025-01-02T12:00:00.000Z - ::1 GET - /api/users
2025-01-02T12:01:15.000Z - ::1 POST - /api/users
2025-01-02T12:02:30.000Z - ::1 PATCH - /api/users/507f1f77bcf86cd799439011
```

## 🧪 Testing

You can test APIs using:

### Using cURL
```bash
# Get all users
curl http://localhost:3000/api/users

# Create a user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"first_name":"Jane","last_name":"Smith","email":"jane@example.com","gender":"Female","job_title":"Designer"}'

# Get user by ID
curl http://localhost:3000/api/users/507f1f77bcf86cd799439011

# Update user
curl -X PATCH http://localhost:3000/api/users/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"jobTitle":"Lead Designer"}'

# Delete user
curl -X DELETE http://localhost:3000/api/users/507f1f77bcf86cd799439011
```

### Using Postman or Thunder Client
1. Import the API endpoints
2. Set the Content-Type header to `application/json`
3. Send requests with appropriate JSON bodies

## 🔍 Key Concepts Explained

### Async/Await Pattern
We use `async/await` for handling asynchronous database operations, making code more readable:

```javascript
app.get('/api/users', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});
```

### Mongoose Methods
- `find({})` - Retrieves all documents
- `findById(id)` - Retrieves a single document by ID
- `create(data)` - Creates a new document
- `findByIdAndUpdate(id, data)` - Updates a document
- `findByIdAndDelete(id)` - Deletes a document

## ⚠️ Common Errors & Solutions

### Error: Cannot connect to MongoDB
**Solution:** Ensure MongoDB service is running. Check the connection string.

### Error: E11000 duplicate key error
**Solution:** You're trying to create a user with an email that already exists. Email must be unique.

### Error: ValidationError
**Solution:** Check that you're providing all required fields (firstName and email) in your request.

## ✅ Best Practices

1. **Error Handling:** Always wrap async operations in try-catch blocks
2. **Environment Variables:** Use `dotenv` for sensitive data
3. **Input Validation:** Validate and sanitize user input
4. **Status Codes:** Use appropriate HTTP status codes
   - 200 OK
   - 201 Created
   - 400 Bad Request
   - 404 Not Found
   - 500 Internal Server Error

## 🚧 Future Improvements

- [ ] Authentication (JWT)
- [ ] Password hashing (bcrypt)
- [ ] Environment variables (dotenv)
- [ ] Pagination & filtering
- [ ] Role-based access control
- [ ] Error handling middleware
- [ ] API rate limiting
- [ ] Input validation with Joi/express-validator
- [ ] Unit and integration tests
- [ ] API documentation with Swagger

## 📚 Resources

- [Express.js Documentation](https://expressjs.com)
- [Mongoose Documentation](https://mongoosejs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Node.js Documentation](https://nodejs.org/docs)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

 
## 👨‍💻 Author

**Mir Basit**
- GitHub: [@mirbasit01](https://github.com/mirbasit01)

## ⭐ Show your support

Give a ⭐️ if this project helped you learn something new!

---

**Happy Coding! 🚀**
