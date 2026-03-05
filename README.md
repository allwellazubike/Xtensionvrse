# 🌺 Xtensionsvrse

A premium, open-source e-commerce platform dedicated to high-quality hair extensions, including Braids, Twists, and Locs. Built with a focus on modern design aesthetics, smooth animations, and a seamless shopping experience.

## ✨ Features

- **Modern & Premium UI/UX**: Designed with glassmorphism, responsive layouts, and smooth micro-animations.
- **Secure Authentication**: Full user registration and login flow utilizing JWT (JSON Web Tokens) and Bcrypt password hashing.
- **Product Catalog**: Browse, filter, and search through various categories of extensions.
- **Shopping Cart**: Persistent cart management state.
- **User Dashboard**: A personalized, protected routing space for authenticated shoppers.
- **Dark Mode**: Integrated dark/light theme toggle for accessibility and style.
- **Admin Panel**: Base routes set up for product and order management.

## 🛠️ Tech Stack

### Frontend

- React (bootstrapped with Vite)
- Tailwind CSS (for styling and animations)
- React Router (for client-side routing)
- Axios (for API requests)

### Backend

- Node.js & Express.js
- PostgreSQL
- JWT & Bcrypt (Authentication)

---

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL installed and running

### 1. Clone the repository

```bash
git clone https://github.com/your-username/xtensionsvrse.git
cd xtensionsvrse
```

### 2. Frontend Setup

Open a terminal in the root directory:

```bash
npm install
npm run dev
```

The frontend will typically run on `http://localhost:5173`.

### 3. Backend Setup

Open a second terminal and navigate to the backend folder:

```bash
cd backend
npm install
```

**Environment Variables**

Create a `.env` file inside the `backend/` directory and add the following context (adjust parameters to match your local PostgreSQL setup):

```env
PG_USER="postgres"
PG_HOST="localhost"
PG_DATABASE="Xtension"
PG_PASSWORD="your_db_password"
PG_PORT="5432"

CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

JWT_SECRET="secret_key"
```

**Start the Server**

```bash
npm run dev
# or
nodemon server.js
```

The backend will run on `http://localhost:3000`.

---

## 🤝 Contributing

We welcome contributions! Xtensionsvrse is an open-source project, and we'd love your help making it even better.

Please see our [CONTRIBUTING.md](./CONTRIBUTING.md) file for detailed guidelines on how to get started, report bugs, and submit pull requests.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
