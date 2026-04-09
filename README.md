# ResolveHub - Issue Tracking & Resolution System

A professional, full-stack web application for managing and resolving user-reported issues. Built with **MERN Stack** (MongoDB, Express, React, Node.js) featuring comprehensive role-based access control, modern UI/UX, and production-ready deployment.

## 🎯 Key Features

### Core Functionality
✅ **Complete Ticket Management** - Create, track, assign, and resolve issues  
✅ **Real-time Communication** - Replies and updates with role distinction  
✅ **Priority & Categorization** - Organize issues by priority (low/medium/high/critical) and category  
✅ **Status Workflow** - Open → In Progress → Pending Info → Closed → Reopened  
✅ **Intelligent Assignment** - Support staff and admin ticket assignment  

### Role-Based Access Control (RBAC)
👤 **Clients** - Create and manage their own tickets  
👨‍💼 **Support Staff** - Handle assigned tickets and provide resolutions  
👨‍💻 **Admins** - Full system control, user management, reporting  

### Professional Features
🎨 **Modern UI/UX** - Custom design system with CSS variables  
📱 **Fully Responsive** - Desktop, tablet, mobile optimization  
🔐 **Enterprise Security** - JWT auth, bcrypt hashing, input validation  
📊 **Smart Dashboards** - Role-specific views with statistics  
🔄 **Redux State Management** - Centralized, predictable state  
💾 **MongoDB Atlas** - Scalable cloud database with indexing  
🌙 **Theme Ready** - CSS variables for dark mode support  

## 🏗️ Complete Architecture

### Backend Stack
- **Express.js 5.x** - Modern web framework
- **MongoDB + Mongoose** - Document database with schema validation
- **JWT (Access + Refresh Tokens)** - Secure authentication
- **Bcrypt** - Password hashing with salt rounds
- **Nodemailer** - Email notifications
- **Joi** - Server-side data validation
- **Helmet** - Security headers
- **CORS** - Cross-origin configuration

### Frontend Stack
- **React 19.x** - Latest UI library
- **Redux Toolkit** - State management
- **React Router v6** - Client-side routing
- **Bootstrap 5** - Component library
- **Axios** - HTTP client
- **Custom CSS** - Professional design system

### Deployment Infrastructure
- **Heroku** - Application hosting
- **MongoDB Atlas** - Database hosting
- **GitHub** - Version control & CI/CD
- **.me Domain** - Custom domain via GitHub Student Pack

## 📁 Project Structure

```
ResolveHub/
├── client-api/                  # Backend (Node.js/Express)
│   ├── src/
│   │   ├── helpers/             # Utils: JWT, bcrypt, email
│   │   ├── middlewares/         # Auth, validation, RBAC
│   │   ├── model/               # Database models & queries
│   │   │   ├── user/
│   │   │   ├── ticket/
│   │   │   └── resetPin/
│   │   ├── routers/             # API endpoints
│   │   │   ├── user.router.js   # User & auth routes
│   │   │   ├── ticket.router.js # Ticket CRUD routes
│   │   │   └── tokens.router.js # Token refresh
│   │   └── utils/               # Error handlers
│   ├── app.js                   # Express server
│   ├── package.json
│   └── .env.example
├── frontend/                    # Frontend (React)
│   ├── src/
│   │   ├── api/                 # API integration layer
│   │   ├── assets/              # Images, icons
│   │   ├── components/          # Reusable components
│   │   │   ├── login/
│   │   │   ├── ticket-table/
│   │   │   ├── add-ticket-form/
│   │   │   └── private-route/
│   │   ├── layout/              # Layout wrapper
│   │   │   └── partials/        # Header, Footer
│   │   ├── page/                # Page components
│   │   │   ├── dashboard/
│   │   │   ├── ticket-list/
│   │   │   ├── ticket/
│   │   │   └── registration/
│   │   ├── styles/              # CSS stylesheets
│   │   │   ├── global.css       # Design system
│   │   │   ├── dashboard.css    # Dashboard styles
│   │   │   └── forms.css        # Form styles
│   │   ├── App.js               # Main app component
│   │   ├── store.js             # Redux store
│   │   └── index.js             # Entry point
│   ├── build/                   # Production build
│   ├── package.json
│   └── .env.example
├── Procfile                     # Heroku deployment config
├── DEPLOYMENT.md                # Complete deployment guide
└── README.md                    # This file
```

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 16+ (LTS recommended)
- MongoDB (local or Atlas cluster)
- Git
- Code editor (VS Code recommended)

### Local Development Setup

#### 1. Clone Repository
```bash
git clone https://github.com/Sweeti2004/ResolveHub-Issue-Tracking-Resolution-System.git
cd ResolveHub
```

#### 2. Backend Setup
```bash
cd client-api

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# MONGO_URL=your_mongodb_connection_string
# JWT_ACCESS_SECRET=your_secret_key
# etc.

# Start server (runs on port 5000)
npm start
```

#### 3. Frontend Setup (new terminal)
```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with API URL
# REACT_APP_API_URL=http://localhost:5000/v1

# Start development server (runs on port 3000)
npm start
```

## 🔑 API Endpoints

### User & Authentication
```
POST   /v1/user                    - Register new user
POST   /v1/user/login              - Login user
GET    /v1/user/profile            - Get user profile
GET    /v1/user/all                - Get all users (admin)
POST   /v1/user/create-staff       - Create support staff (admin)
PATCH  /v1/user/:id/role           - Update user role (admin)
POST   /v1/user/reset-password     - Request password reset
PATCH  /v1/user/reset-password     - Reset password with PIN
DELETE /v1/user/logout             - Logout user
```

### Tickets
```
POST   /v1/ticket                  - Create ticket (clients)
GET    /v1/ticket                  - Get tickets (role-based)
GET    /v1/ticket/:id              - Get single ticket
PUT    /v1/ticket/:id              - Add reply to ticket
PATCH  /v1/ticket/:id/status       - Update status (support)
PATCH  /v1/ticket/:id/close        - Close ticket
PATCH  /v1/ticket/:id/assign       - Assign ticket (admin)
DELETE /v1/ticket/:id              - Delete ticket (admin)
```

## 👥 User Roles & Permissions

### Client Role
- ✅ Create tickets to report issues
- ✅ View their own tickets
- ✅ Reply to their tickets
- ✅ Close resolved tickets
- ❌ Cannot view other users' tickets
- ❌ Cannot change ticket status

### Support Staff Role
- ✅ View all tickets
- ✅ Reply to assigned tickets
- ✅ Update ticket status
- ✅ Add internal notes
- ❌ Cannot delete tickets
- ❌ Cannot manage users

### Admin Role
- ✅ Full system access
- ✅ Create/manage users and staff
- ✅ Assign tickets to staff
- ✅ View all tickets and reports
- ✅ Update system settings
- ✅ Delete any ticket

## 🔐 Security Implementation

### Authentication & Authorization
- **JWT Tokens** - Access (15m) + Refresh (7d) token architecture
- **Bcrypt Hashing** - 10 salt rounds for passwords
- **Role-Based Middleware** - Endpoint protection with role validation
- **Token Blacklisting** - Redis for logout token invalidation

### Input & Data Protection
- **Joi Validation** - Server-side validation on all endpoints
- **Mongoose Schema** - Database-level validation
- **CORS** - Cross-origin resource filtering
- **Helmet** - Security headers (CSP, XSS, etc.)
- **Email Verification** - OTP-based password reset

### Database Security
- **Indexed Queries** - Optimized search performance
- **Reference Integrity** - ObjectId relations
- **Timestamps** - Audit trail with createdAt/updatedAt
- **MongoDB Atlas** - Encrypted connections, IP whitelisting

## 🎨 UI/UX Design System

### Color Palette
- Primary: `#0056b3` (Professional blue)
- Success: `#28a745` (Green)
- Danger: `#dc3545` (Red)
- Warning: `#ffc107` (Yellow)
- Info: `#17a2b8` (Cyan)

### Typography Scale
```
H1: 2rem (bold)
H2: 1.5rem (bold)
H3: 1.25rem (bold)
Body: 1rem (normal)
Small: 0.875rem
```

### Spacing System
```
xs: 0.25rem
sm: 0.5rem
md: 1rem
lg: 1.5rem
xl: 2rem
2xl: 3rem
```

### Status Indicators
- 🟢 Closed - Green (#28a745)
- 🔵 Open - Blue (#0056b3)
- 🟠 In Progress - Cyan (#17a2b8)
- 🟡 Pending - Yellow (#ffc107)
- 🔴 Reopened - Red (#dc3545)

## 📊 Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String(maxlength: 50),
  email: String(maxlength: 100, unique),
  password: String(hashed),
  role: Enum(['client', 'support', 'admin']) = 'client',
  company: String(maxlength: 50),
  department: String(maxlength: 50),
  phone: String(maxlength: 15),
  address: String(maxlength: 100),
  isActive: Boolean = true,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date,
  refreshJWT: {
    token: String,
    addedAt: Date
  }
}
```

### Ticket Collection
```javascript
{
  _id: ObjectId,
  clientId: ObjectId(ref: User),
  subject: String(maxlength: 150),
  status: Enum(['Open', 'In Progress', 'Pending Info', 'Closed', 'Reopened']),
  priority: Enum(['low', 'medium', 'high', 'critical']) = 'medium',
  category: String(maxlength: 50),
  assignedTo: ObjectId(ref: User),
  tags: Array(String),
  conversations: [{
    senderId: ObjectId(ref: User),
    sender: String,
    role: Enum(['client', 'support']),
    message: String(maxlength: 2000),
    msgAt: Date
  }],
  openAt: Date,
  closedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 🧪 Testing & Validation

### Test User Accounts (Development)
```
Client:
- Email: client@example.com
- Password: Client@123

Support:
- Email: support@example.com
- Password: Support@123

Admin:
- Email: admin@example.com
- Password: Admin@123
```

### API Testing (Postman/REST Client)
```bash
# Health check
GET http://localhost:5000/api/health

# Register user
POST http://localhost:5000/v1/user
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "company": "Acme Corp"
}
```

## 📦 Production Deployment

### Prerequisites
- Heroku account (free tier available)
- MongoDB Atlas cluster
- GitHub account
- Custom domain (optional)

### Quick Deploy to Heroku
```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set MONGO_URL="your_mongo_url"
heroku config:set JWT_ACCESS_SECRET="random_secret"

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

**See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive deployment guide.**

## 🐛 Troubleshooting

### Backend Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check MongoDB connection
# Verify MONGO_URL in .env

# View server logs
npm start
```

### Frontend Issues
```bash
# Port 3000 already in use
npm start -- --port 3001

# Clear cache
npm start -- --reset-cache

# Build issues
npm run build
```

### Deployment Issues
```bash
# Check Heroku logs
heroku logs --tail -a app-name

# Rebuild on Heroku
git push heroku main --force

# Reset Heroku build cache
heroku builds:cache:purge -a app-name
```

## 📚 Documentation

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Step-by-step deployment guide
- **[Backend README](./client-api/README.md)** - API documentation
- **[Frontend README](./frontend/README.md)** - Frontend setup

## 🔄 Git Workflow & Phase Commits

Complete rebuild executed in 6 phases with Git tracking:

1. **Phase 1** - Database schemas with RBAC & ticket fields
2. **Phase 2** - Role-based authorization & middleware
3. **Phase 3** - Backend environment configuration
4. **Phase 4** - Professional UI/CSS design system
5. **Phase 5** - Role-based navigation & dashboards
6. **Phase 6** - Production build & Heroku setup

View commits: `git log --oneline`

## 🎓 Learning Outcomes

This project demonstrates:
- ✅ Full-stack MERN development
- ✅ Role-based access control (RBAC)
- ✅ JWT authentication with refresh tokens
- ✅ Professional UI/UX design
- ✅ Database schema design & indexing
- ✅ RESTful API architecture
- ✅ State management with Redux
- ✅ Production deployment & DevOps

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=production
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/db
JWT_ACCESS_SECRET=your_secret_key
JWT_REFRESH_SECRET=your_refresh_secret
EMAIL_USER=your_email@gmail.com
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/v1
REACT_APP_ENV=development
```

## 🤝 Contributing

Want to improve ResolveHub?

1. Fork the repository
2. Create feature branch (`git checkout -b feature/NewFeature`)
3. Commit changes (`git commit -m 'Add NewFeature'`)
4. Push to branch (`git push origin feature/NewFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 👨‍💻 Author

**Sweeti Acharya**
- GitHub: [@Sweeti2004](https://github.com/Sweeti2004)
- Project: [ResolveHub](https://github.com/Sweeti2004/ResolveHub-Issue-Tracking-Resolution-System)

## 🗺️ Future Roadmap

- 🔜 Advanced analytics & reporting
- 🔜 File attachments support
- 🔜 Email notifications
- 🔜 SLA management
- 🔜 Knowledge base system
- 🔜 Multi-language support
- 🔜 SMS notifications
- 🔜 API rate limiting
- 🔜 Audit logging

## 📞 Support & Issues

- 🐛 Found a bug? [Open an issue](https://github.com/Sweeti2004/ResolveHub-Issue-Tracking-Resolution-System/issues)
- 💡 Have a suggestion? [Start a discussion](https://github.com/Sweeti2004/ResolveHub-Issue-Tracking-Resolution-System/discussions)
- 📧 Questions? Check the [Documentation](./DEPLOYMENT.md)

---

**Version**: 1.0.0  
**Status**: ✅ Production Ready  
**Last Updated**: April 9, 2026



## 📸 Screenshots
![Login](https://github.com/user-attachments/assets/b4b6c623-56f3-4158-a908-c5b1247c838d)

![Dashboard](https://github.com/user-attachments/assets/712b99fc-d7e8-449d-b46d-7eee9db136c3)

![Ticket listing](https://github.com/user-attachments/assets/8f4b47ca-332c-4777-b9e5-bea03034d55b)

![Add New Tickt](https://github.com/user-attachments/assets/23ad0924-51c5-4115-9ee3-2724cd4e04de)

![Reply Ticket](https://github.com/user-attachments/assets/c8e5527a-65a7-4de7-9693-fdd170493ce5)

![Forgot Password](https://github.com/user-attachments/assets/44da07db-ba70-4201-b16b-4c0cc4f5c948)

![OTP verification & Password Reset](https://github.com/user-attachments/assets/de339bea-5c8d-4592-95e1-54de83debc21)



---

## 📂 Folder Structure
FRONTEND-

![image](https://github.com/user-attachments/assets/0309fdc6-05db-4ec4-9339-45f7ecbbe49d)


BACKEND-

![image](https://github.com/user-attachments/assets/dc1d5702-f1aa-4c5d-a20b-255e96ad623c)


## ⚙️ How to Run the Project

### 🧩 Prerequisites
- Node.js
- MongoDB
- Redis
- npm

---
### 🔧 Setup

# Backend

- cd client-api
- npm install
- node app.js

# Frontend

- cd frontend
- npm install
- npm start
### 🔧 Setup

---

### Future Enhancements
🔔 Real-time Notifications using Socket.IO for instant ticket updates, replies, and escalations.

📊 Analytics Dashboard to show charts and metrics like ticket resolution time, ticket count by category, and user activity.

🧠 AI-based Ticket Tagging using NLP to auto-categorize tickets by content.

🎯 SLA Management to set ticket response/resolution deadlines and track SLA violations.

🌐 Multi-role Access Control with distinct views and permissions for Admin, Staff, and Users.

📁 File Attachment Support so users can upload screenshots or logs with their issue.


---
### Developer

- Sweeti Kumari
- 📧 sweeti754940@gmail.com
- 🔗 https://www.linkedin.com/in/sweeti-kumari-254850259/
