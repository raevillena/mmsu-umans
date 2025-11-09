# UMANS - User Management & Authentication System

<div align="center">

![UMANS Logo](frontend/public/umans.ico)

**UMANS** (User Management System) is a comprehensive, enterprise-grade full-stack application for managing users, roles, applications, and permissions across multiple systems. Built with React 19 frontend and Node.js/Express backend, it provides a robust, secure, and scalable solution for user management.

[![React](https://img.shields.io/badge/React-19.0.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.21.2-black.svg)](https://expressjs.com/)
[![Material-UI](https://img.shields.io/badge/Material--UI-6.4.3-blue.svg)](https://mui.com/)
[![Sequelize](https://img.shields.io/badge/Sequelize-7.0.0-52B0E7.svg)](https://sequelize.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg)](https://www.docker.com/)

</div>

## 🌟 Overview

UMANS is a full-stack user management and authentication system that combines a modern React frontend with a robust Node.js backend. It enables administrators and users to manage accounts, roles, applications, and permissions across multiple platforms with an intuitive, modern interface and enterprise-grade security.

### Key Highlights
- **Full-Stack Architecture**: React 19 frontend with Node.js/Express backend
- **Enterprise-Grade Security**: JWT authentication, RBAC, and comprehensive audit logging
- **Modern UI/UX**: Material-UI v6 with custom theming and responsive design
- **Multi-Application Support**: Manage multiple applications from a single platform
- **Production Ready**: Docker containerization for both frontend and backend
- **Comprehensive API**: RESTful API with Swagger documentation

## 🚀 Features

### 🔐 Authentication & Security
- **Multi-Provider Authentication**: Email/password and Google OAuth 2.0
- **JWT Token Management**: Access and refresh tokens with automatic renewal
- **Role-Based Access Control (RBAC)**: Admin and user-level permissions
- **Session Management**: Track and manage active user sessions with Redis
- **Password Security**: Strong password requirements with reset functionality
- **CSRF Protection**: Secure API communication with credentials
- **Comprehensive Audit Logging**: All actions logged with IP tracking

### 👥 User Management
- **Comprehensive User CRUD**: Create, read, update, and delete users
- **User Type Management**: Flexible user categorization system
- **Profile Management**: User profile editing and avatar management
- **Bulk Operations**: Efficient management of multiple users
- **Search & Filtering**: Advanced search capabilities across user data
- **Account Activation/Deactivation**: Control user access

### 🏢 Application Management
- **Multi-App Support**: Manage multiple applications from one interface
- **App Registration**: Register and configure new applications
- **App-Specific Roles**: Define roles unique to each application
- **Usage Analytics**: Track application usage and user engagement
- **Office-based Organization**: Organize applications by office

### 🎭 Role & Permission System
- **Dynamic Role Creation**: Create custom roles for different applications
- **Permission Assignment**: Granular permission control
- **Role Inheritance**: Hierarchical role structures
- **Access Control**: Route and component-level protection

### 📊 Dashboard & Analytics
- **Real-time Statistics**: Live user, app, and role counts
- **Interactive Charts**: Chart.js integration for data visualization
- **User Growth Tracking**: Monitor user registration trends
- **App Usage Analytics**: Track application usage patterns
- **Quick Actions**: Direct navigation to key management functions

### 📝 Logging & Monitoring
- **Activity Logs**: Comprehensive audit trail
- **Session Tracking**: Monitor user sessions and activities
- **Error Logging**: Detailed error tracking and reporting
- **Performance Metrics**: Application performance monitoring
- **IP Address Tracking**: Security monitoring

### 🔧 Additional Features
- **MQTT User Management**: IoT integrations support
- **Email Service**: Integration for notifications and password resets
- **Swagger API Documentation**: Interactive API docs with OpenAPI 3.0
- **Redis Integration**: Caching and session management
- **Docker Support**: Containerized deployment for both frontend and backend

## 🏗️ Project Structure

```
mmsu-umans/
├── frontend/                    # React Frontend Application
│   ├── src/
│   │   ├── api/                # API Integration Layer
│   │   ├── components/         # Reusable UI Components
│   │   ├── pages/              # Application Pages
│   │   ├── store/              # Redux State Management
│   │   ├── layouts/            # Page Layouts
│   │   ├── shared-theme/       # Material-UI Theme System
│   │   └── utils/              # Utility Functions
│   ├── public/                 # Static Assets
│   ├── Dockerfile              # Frontend Docker Configuration
│   ├── nginx.conf              # Nginx Configuration
│   └── package.json
│
├── backend/                     # Node.js Backend Application
│   ├── config/                 # Configuration files
│   ├── controllers/            # Business logic controllers
│   ├── middleware/             # Custom middleware
│   ├── models/                 # Database models
│   ├── routes/                 # API routes
│   ├── services/               # Business services
│   ├── migrations/             # Database migrations
│   ├── seeders/                # Database seeders
│   ├── docs/                   # API documentation
│   ├── Dockerfile              # Backend Docker Configuration
│   └── package.json
│
└── README.md                    # This file
```

## 🛠️ Technology Stack

### Frontend
- **React 19.0.0** - Latest React with concurrent features
- **React Router DOM 7.1.5** - Client-side routing
- **Material-UI 6.4.3** - Comprehensive component library
- **Redux Toolkit 2.5.1** - Modern Redux state management
- **Axios 1.7.9** - HTTP client with interceptors
- **Chart.js 4.4.8** - Data visualization
- **Vite 6.1.0** - Fast build tool and dev server
- **TypeScript Support** - Type safety and IntelliSense

### Backend
- **Node.js 22+** - Runtime environment
- **Express.js 4.21.2** - Web framework
- **Sequelize 7.0.0** - ORM with MariaDB dialect
- **MariaDB** - Primary database
- **Redis 4.7.0** - Caching and session storage
- **bcrypt 5.1.1** - Password hashing
- **google-auth-library 9.15.1** - Google OAuth
- **express-validator 7.2.1** - Input validation
- **swagger-jsdoc 6.2.8** - API documentation
- **nodemailer 6.10.0** - Email service

### DevOps & Deployment
- **Docker** - Containerization
- **Nginx** - Web server and reverse proxy (frontend)
- **Alpine Linux** - Lightweight container base

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v22.0.0 or higher)
- **npm** (v8.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **MariaDB/MySQL** database
- **Redis** server
- **Docker** (v20.0.0 or higher) - for containerized deployment
- **Git** - for version control
- **Google OAuth credentials** (optional, for Google login)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mmsu-umans
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Configuration**

   **Backend** - Create a `.env` file in the `backend/` directory:
   ```env
   # Database Configuration
   DB_USER=root
   DB_PASS=your_password
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=umans_db

   # Server Configuration
   PORT=3001
   API_URL=localhost
   DEBUG=true

   # CORS Configuration
   ALLOWED_ORIGINS_DEV=http://localhost:5173
   ALLOWED_ORIGINS_PROD=https://yourdomain.com

   # JWT Configuration
   JWT_SECRET=your_jwt_secret
   PASSWD_RESET_TOKEN_EXPIRY=3600000

   # Email Configuration
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password

   # Google OAuth (Optional)
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_REDIRECT_URI=http://localhost:3001/api/auth/google/callback

   # Redis Configuration
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_PASSWORD=your_redis_password
   ```

   **Frontend** - Create a `.env` file in the `frontend/` directory:
   ```env
   # API Configuration
   VITE_REACT_APP_API_URL=http://localhost:3001/api/

   # Google OAuth Configuration
   VITE_GOOGLE_CLIENT_ID=your_google_client_id_here

   # Optional: Development settings
   VITE_APP_ENV=development
   VITE_APP_VERSION=1.0.0
   ```

5. **Database Setup**
   ```bash
   # Create database
   mysql -u root -p
   CREATE DATABASE umans_db;
   EXIT;
   ```

6. **Start the applications**

   **Backend** (from `backend/` directory):
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

   **Frontend** (from `frontend/` directory):
   ```bash
   # Development server
   npm run dev

   # Build for production
   npm run build

   # Preview production build
   npm run preview
   ```

### Docker Deployment

#### Backend Docker

1. **Build the Docker image**
   ```bash
   cd backend
   docker build -t umans-api:latest .
   ```

2. **Run the container**
   ```bash
   docker run -p 3001:3001 umans-api:latest
   ```

#### Frontend Docker

1. **Build the Docker image**
   ```bash
   cd frontend
   docker build -t umans-frontend:latest .
   ```

2. **Run the container**
   ```bash
   docker run -p 80:80 umans-frontend:latest
   ```

#### Docker Compose (Full Stack)

Create a `docker-compose.yml` in the root directory:

```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "3001:3001"
    environment:
      - DB_HOST=mariadb
      - REDIS_HOST=redis
    depends_on:
      - mariadb
      - redis

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

  mariadb:
    image: mariadb:latest
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: umans_db
    ports:
      - "3306:3306"
    volumes:
      - mariadb_data:/var/lib/mysql

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  mariadb_data:
  redis_data:
```

Run with:
```bash
docker-compose up -d
```

## 📚 API Documentation

### Base URL
```
http://localhost:3001/api
```

### Authentication Endpoints

#### Public Routes
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/superLogin` - Admin login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/isAuthenticated` - Validate session
- `POST /api/auth/request-passwd-reset` - Request password reset
- `POST /api/auth/reset-passwd` - Reset password

#### Google OAuth Routes
- `GET /api/auth/google/url` - Get Google OAuth URL
- `GET /api/auth/google/callback` - OAuth callback
- `POST /api/auth/google/regislog` - Register/Login with Google
- `POST /api/auth/google/logout` - Google logout

### Protected Routes

#### User Management (Admin Only)
- `GET /api/users` - Get all users
- `GET /api/users/:email` - Get user by email
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `PUT /api/users/passwd-change/:id` - Change password
- `DELETE /api/users/:id` - Delete user

#### Application Management
- `GET /api/apps` - Get all applications
- `GET /api/apps/:id` - Get application by ID
- `POST /api/apps` - Create application
- `PUT /api/apps/:id` - Update application
- `DELETE /api/apps/:id` - Delete application

#### Role Management
- `GET /api/roles` - Get all roles
- `POST /api/roles` - Assign role to user
- `PUT /api/roles/:id` - Update role
- `DELETE /api/roles/:id` - Remove role

#### Session Management
- `GET /api/sessions` - Get all sessions
- `DELETE /api/sessions/:id` - Delete session

#### User Types
- `GET /api/type` - Get all user types
- `POST /api/type` - Create user type
- `PUT /api/type/:id` - Update user type
- `DELETE /api/type/:id` - Delete user type

### Interactive API Documentation
Swagger documentation is available at:
```
http://localhost:3001/api-docs
```

## 🗄️ Database Schema

### Core Models
- **Users**: Primary user information with authentication data
- **Apps**: Registered applications in the system
- **Roles**: Many-to-many relationship between users and apps
- **RefreshTokens**: JWT refresh token storage
- **GoogleUsers**: Google OAuth user data
- **UserTypes**: Custom user type definitions
- **MqttUsers**: MQTT client management
- **ActionLog**: Comprehensive audit logging

### Key Relationships
- Users ↔ Apps (Many-to-Many through Roles)
- Users ↔ GoogleUsers (One-to-One)
- Users ↔ MqttUsers (One-to-One)
- Users → ActionLog (One-to-Many)

## 🔐 Security Features

### Authentication Security
- **JWT Tokens**: Secure token-based authentication with short-lived access tokens (15 min) and long-lived refresh tokens (7 days)
- **Automatic Refresh**: Seamless token renewal
- **Secure Storage**: LocalStorage with encryption (frontend)
- **Session Management**: Redis-based token storage (backend)
- **Password Hashing**: bcrypt with salt rounds
- **Multi-factor Ready**: Architecture supports MFA

### API Security
- **Request Interceptors**: Automatic token attachment
- **Response Interceptors**: Error handling and token refresh
- **CORS Configuration**: Environment-specific origin validation
- **Input Validation**: Server-side validation with express-validator
- **Rate Limiting**: Built-in request throttling
- **Audit Logging**: All actions logged with IP tracking

### Data Protection
- **XSS Prevention**: Content sanitization
- **CSRF Protection**: Token-based CSRF protection
- **Secure Headers**: Security-focused HTTP headers
- **Data Encryption**: Sensitive data encryption

## 🎨 Frontend Architecture

### State Management (Redux)
```javascript
{
  auth: {
    user: null | UserObject,
    accessToken: null | string,
    refreshToken: null | string,
    loading: boolean,
    error: null | string,
    isAuthenticated: boolean
  },
  users: {
    users: Array<User>,
    admins: Array<Admin>,
    types: Array<UserType>,
    loading: boolean,
    error: null | string
  },
  apps: {
    apps: Array<App>,
    loading: boolean,
    error: null | string
  },
  roles: {
    roles: Array<Role>,
    loading: boolean,
    error: null | string
  },
  sessions: {
    sessions: Array<Session>,
    loading: boolean,
    error: null | string
  },
  snackbar: {
    open: boolean,
    message: string,
    severity: 'success' | 'error' | 'warning' | 'info'
  }
}
```

### UI/UX Features
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Dark/Light Mode**: Seamless theme switching
- **Custom Theming**: Extensive Material-UI customization
- **Accessibility**: WCAG 2.1 AA compliant
- **Performance Optimized**: Code splitting, lazy loading, and bundle optimization

## 📊 Performance Optimizations

### Frontend
- **Code Splitting**: Route-based and component-based splitting
- **Bundle Optimization**: Vendor chunk separation
- **Caching Strategy**: Browser caching and Redux state persistence
- **Performance Metrics**: Optimized for < 500KB initial load

### Backend
- **Redis Caching**: Session and data caching
- **Database Optimization**: Indexed queries and efficient relationships
- **Connection Pooling**: Sequelize connection management

## 🧪 Development

### Available Scripts

#### Backend
```bash
npm run dev          # Start development server with nodemon
npm start            # Start production server
npm test             # Run tests (if configured)
```

#### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
```

### Code Quality
- **ESLint**: Code linting with React and Node.js rules
- **TypeScript Support**: Type safety and IntelliSense
- **Error Boundaries**: Graceful error handling
- **Code Standards**: Consistent naming conventions and structure

## 📝 Environment Variables

### Backend

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `DB_USER` | Database username | `root` | Yes |
| `DB_PASS` | Database password | - | Yes |
| `DB_HOST` | Database host | `localhost` | Yes |
| `DB_PORT` | Database port | `3306` | Yes |
| `DB_NAME` | Database name | `umans_db` | Yes |
| `PORT` | Server port | `3001` | Yes |
| `JWT_SECRET` | JWT secret key | - | Yes |
| `REDIS_HOST` | Redis host | `localhost` | Yes |
| `REDIS_PORT` | Redis port | `6379` | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | - | No |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | - | No |
| `EMAIL_USER` | Email service username | - | No |
| `EMAIL_PASS` | Email service password | - | No |

### Frontend

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_REACT_APP_API_URL` | Backend API URL | `http://localhost:3001/api/` | Yes |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth Client ID | - | Yes |
| `VITE_APP_ENV` | Environment | `development` | No |
| `VITE_APP_VERSION` | App version | `1.0.0` | No |

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Getting Started
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Add tests if applicable
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Standards
- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed
- Write tests for new features

### Pull Request Process
1. Ensure all tests pass
2. Update documentation
3. Request review from maintainers
4. Address feedback promptly
5. Merge after approval

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Getting Help
- **Documentation**: Check this README and inline code comments
- **API Documentation**: Visit `/api-docs` for interactive API documentation
- **Issues**: Create an issue in the repository
- **Discussions**: Use GitHub Discussions for questions

### Reporting Bugs
When reporting bugs, please include:
- **Environment**: OS, Node.js version, browser
- **Steps to Reproduce**: Detailed reproduction steps
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Screenshots**: If applicable
- **Console Logs**: Any error messages

### Feature Requests
For feature requests, please include:
- **Use Case**: Why this feature is needed
- **Proposed Solution**: How you envision it working
- **Alternatives**: Other solutions you've considered
- **Additional Context**: Any other relevant information

## 🔄 Version History

### v1.0.0 (Current)
- Initial release with core user management features
- React 19 frontend with Material-UI v6
- Node.js/Express backend with Sequelize ORM
- JWT authentication with Redis session management
- Google OAuth integration
- Multi-application support
- Comprehensive audit logging
- Docker containerization
- Swagger API documentation

### Roadmap
- **v1.1.0**: Advanced analytics dashboard
- **v1.2.0**: Real-time notifications
- **v1.3.0**: Advanced role management
- **v2.0.0**: Micro-frontend architecture

## 🙏 Acknowledgments

- **Material-UI Team** - For the excellent component library
- **React Team** - For the amazing framework
- **Express.js Team** - For the robust backend framework
- **Sequelize Team** - For the powerful ORM
- **Vite Team** - For the fast build tool
- **Redux Team** - For the state management solution
- **Contributors** - All contributors who help improve this project

---

<div align="center">

**Built with ❤️ using React, Node.js, Express, and modern web technologies**

[Report Bug](https://github.com/your-org/mmsu-umans/issues) · [Request Feature](https://github.com/your-org/mmsu-umans/issues) · [Documentation](https://github.com/your-org/mmsu-umans/wiki)

</div>

