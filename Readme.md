## Social Media App API

### **Overview**
This project is a backend application for a social media platform, designed to handle user interactions such as creating posts, adding comments, and real-time notifications. It also includes a basic real-time chat feature using WebSockets. Built with the **MERN stack**, it leverages **MongoDB**, **Express.js**, **React.js**, and **Node.js**, alongside **Socket.io** for WebSocket communication.

### **Features**
- **User Authentication & Authorization**: Secure user sign-up and login using JWT.
- **Post Management**: Create, read, and paginate posts.
- **Commenting System**: Add comments to posts with real-time notifications.
- **Real-Time Chat**: Simple real-time chat feature with Socket.io.
- **Database**: MongoDB schema for Users, Posts, and Comments.
- **Pagination**: Fetch paginated posts for optimized performance.

---

### **Technologies Used**
- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for handling routes and middleware.
- **MongoDB**: NoSQL database for storing users, posts, and comments.
- **Socket.io**: Real-time communication for chat and notifications.
- **Mongoose**: MongoDB object modeling for Node.js.

---

### **Instructions to Run Locally**

#### **Prerequisites**
- [Node.js](https://nodejs.org/) installed (v14+ recommended).
- [MongoDB](https://www.mongodb.com/) installed and running, or a MongoDB Atlas cluster.

#### **1. Clone the Repository**
```bash
git clone https://github.com/ChefnCoder/Social-Media-Api-Backend.git
cd social-media-app-api
```

#### **2. Install Dependencies**
```bash
npm install
```

#### **3. Set Up Environment Variables**
Create a `.env` file in the root directory with the following content:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

#### **4. Start the Server**
```bash
npm run dev
```
The server will start at `http://localhost:5000`.

#### **5. Test the Endpoints**
Use tools like [Postman](https://www.postman.com/) to interact with the API.

---

### **API Documentation**

#### **1. Authentication**

| Method | Endpoint              | Description              | Request Body                             |
|--------|-----------------------|--------------------------|------------------------------------------|
| `POST` | `/api/auth/signup`    | Register a new user      | `{ "name": "John", "email": "john@example.com", "password": "123456" }` |
| `POST` | `/api/auth/login`     | Login and get a token    | `{ "email": "john@example.com", "password": "123456" }` |

#### **2. Posts**

| Method | Endpoint              | Description                  | Request Body                             |
|--------|-----------------------|------------------------------|------------------------------------------|
| `POST` | `/api/posts`          | Create a new post (Auth)     | `{ "text": "Hello World", "media": "https://image.url" }` |
| `GET`  | `/api/posts`          | List all posts with pagination | `?page=1&limit=10` (Query Parameters)   |

#### **3. Comments**

| Method | Endpoint              | Description                  | Request Body                             |
|--------|-----------------------|------------------------------|------------------------------------------|
| `POST` | `/api/comments`       | Add a comment to a post (Auth) | `{ "postId": "post_id_here", "text": "Nice post!" }` |

#### **4. Real-Time Chat**
- **WebSocket Endpoint**: Connect to WebSocket server at `ws://localhost:5000/`.
- **Events**:
  - `sendMessage`: Send a message `{ "user": "User1", "message": "Hello" }`.
  - `receiveMessage`: Receive messages broadcast by the server.

#### **5. Real-Time Notifications**
- Notifications for new comments are sent as WebSocket events:
  - Event: `newComment`
  - Payload: `{ "postId": "post_id_here", "text": "New comment text" }`

---

### **Database Schema**

#### **User**
```javascript
{
  name: String,
  email: String,
  password: String,
  createdAt: Date,
}
```

#### **Post**
```javascript
{
  text: String,
  media: String,
  user: ObjectId (ref: "User"),
  createdAt: Date,
}
```

#### **Comment**
```javascript
{
  text: String,
  user: ObjectId (ref: "User"),
  post: ObjectId (ref: "Post"),
  createdAt: Date,
}
```

---

### **Deployment**
- Live Link: https://social-media-api-backend-38so.onrender.com
