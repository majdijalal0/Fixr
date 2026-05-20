#  Fixr (Premium Local Service Platform)

Fixr is a high-fidelity, premium web application designed to seamlessly connect skilled local trade professionals (plumbers, electricians, painters, carpenters, etc.) with customers in their area. Designed with responsive layouts, fluid micro-animations, and glassmorphic designs, Fixr provides a luxurious user experience for managing service requests, bookings, and worker portfolios.

---


###  For Customers
- **Service Search & Filter**: Easily find vetted local trade experts in plumbing, electrical, carpentry, painting, and more.
- **Dynamic Booking Form**: Easily request services on specific dates, specify addresses, and provide special details or instructions.
- **Booking Progress Tracking**: Track requests from "Pending" through "Accepted," "Completed," or "Cancelled."
- **Professional Reviews**: Share verified feedback and detailed ratings to build trust in the local trades community.

###  For Professionals
- **Guided Onboarding**: Upload credentials and proof of licensure/ID to apply for professional status.
- **Dynamic Profile & Portfolio**: Manage personal bios, adjust hourly rates, specify years of experience, upload avatar images, and showcase recent works in a beautifully animated gallery.
- **Incoming Job Dashboard**: Manage request pipelines with one-click accepting, declining, or marking tasks as completed.

---

##  Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | React (v19), Vite, TailwindCSS, Framer Motion, Lucide Icons, React Router DOM (v7) |
| **Backend** | Node.js, Express.js (v5), Mongoose / MongoDB Atlas |
| **Security & Auth** | JSON Web Tokens (JWT), BcryptJS (password hashing), Security Route Protection |
| **Storage & Uploads** | Cloudinary API, Multer, Multer Storage Cloudinary |

---

##  Folder Structure

```text
Fixr/
├── backend/                  # Express.js REST API Server
│   ├── config/               # Database and Cloudinary integrations
│   ├── controllers/          # Business logic handlers (auth, bookings, workers)
│   ├── middleware/           # Protect routes and handle file uploads
│   ├── models/               # MongoDB/Mongoose schemas (User, Booking, Review)
│   ├── routes/               # REST API Endpoints
│   ├── .env.example          # Server environment templates
│   └── server.js             # Entry Point File
│
├── handy_man/                # React (Vite) Frontend App
│   ├── public/               # Static public assets
│   ├── src/
│   │   ├── components/       # Reusable React components (Modals, Navbars, Forms)
│   │   ├── pages/            # Page layouts (WorkerProfile, Dashboard, About, Home)
│   │   ├── App.jsx           # App routes and shell
│   │   └── main.jsx          # DOM rendering entrypoint
│   └── package.json          # Node modules and scripts
```

---

##  Local Development Setup

Follow these simple steps to run Fixr locally on your machine.

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher)
- **MongoDB Atlas Database** (or local MongoDB server instance)
- **Cloudinary Account** (for portfolio images and certification uploads)

---

### 2. Backend Server Setup

1. Open your terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install all dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` directory and configure your connection strings:
   ```bash
   cp .env.example .env
   ```
4. Fill in your secrets inside `backend/.env`:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   JWT_SECRET=your_secure_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```
5. Spin up the local development server:
   ```bash
   npm run dev
   ```
   The backend should log `Mongo db connected` and run on `http://localhost:5000`.

---

### 3. Frontend App Setup

1. Open a new terminal window and navigate to the frontend folder:
   ```bash
   cd handy_man
   ```
2. Install all dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `handy_man/` directory:
   ```env
   VITE_API_URL=http://localhost:5000
   ```
4. Start the frontend local Vite development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173`.

---

##  Security Best Practices & Deployment Checklist

- [x] **Zero Credential Leaking**: Ensure that `.env` files are ignored by git in our global `.gitignore`.
- [x] **Secure Cancellations**: Strict authorization checks verify that only the customer who booked the service can trigger booking cancellations.
- [x] **Review Validation**: Prevent workers from rating themselves or manipulating their own scores.
- [x] **Configurable API Endpoint**: Frontend uses Vite environment variables, facilitating seamless transitions from local staging to production host environments.
- [x] **Proper Entrypoint Scripts**: Fixed package.json scripts ensuring cloud deployments boot `server.js` directly.
