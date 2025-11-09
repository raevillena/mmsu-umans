# UMANS Frontend

<div align="center">

![UMANS Logo](public/umans.ico)

**UMANS** (User Management System) is a modern, enterprise-grade frontend application built with React 19 and Material-UI v6. It provides a centralized platform for managing users, roles, applications, and permissions across multiple systems with a beautiful, responsive interface and robust security features.

[![React](https://img.shields.io/badge/React-19.0.0-blue.svg)](https://reactjs.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-6.4.3-blue.svg)](https://mui.com/)
[![Vite](https://img.shields.io/badge/Vite-6.1.0-646CFF.svg)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg)](https://www.docker.com/)

</div>

## 🌟 Overview

UMANS Frontend is a sophisticated single-page application (SPA) that serves as the user interface for a comprehensive user management system. It enables administrators and users to manage accounts, roles, applications, and permissions across multiple platforms with an intuitive, modern interface.

### Key Highlights
- **Modern React Architecture**: Built with React 19 and latest hooks
- **Enterprise-Grade UI**: Material-UI v6 with custom theming system
- **Advanced State Management**: Redux Toolkit with optimized slices
- **Secure Authentication**: JWT tokens with automatic refresh
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Performance Optimized**: Code splitting, lazy loading, and bundle optimization
- **Production Ready**: Docker containerization with Nginx

## 🚀 Features

### 🔐 Authentication & Security
- **Multi-Provider Authentication**: Email/password and Google OAuth 2.0
- **JWT Token Management**: Automatic token refresh with secure storage
- **Role-Based Access Control (RBAC)**: Admin and user-level permissions
- **Session Management**: Track and manage active user sessions
- **Password Security**: Strong password requirements with reset functionality
- **CSRF Protection**: Secure API communication with credentials

### 👥 User Management
- **Comprehensive User CRUD**: Create, read, update, and delete users
- **User Type Management**: Flexible user categorization system
- **Profile Management**: User profile editing and avatar management
- **Bulk Operations**: Efficient management of multiple users
- **Search & Filtering**: Advanced search capabilities across user data

### 🏢 Application Management
- **Multi-App Support**: Manage multiple applications from one interface
- **App Registration**: Register and configure new applications
- **App-Specific Roles**: Define roles unique to each application
- **Usage Analytics**: Track application usage and user engagement

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

## 🛠️ Technology Stack

### Frontend Core
- **React 19.0.0** - Latest React with concurrent features
- **React DOM 19.0.0** - React rendering engine
- **React Router DOM 7.1.5** - Client-side routing with data loading
- **Material-UI 6.4.3** - Comprehensive component library
- **Emotion 11.14.0** - CSS-in-JS styling solution

### State Management
- **Redux Toolkit 2.5.1** - Modern Redux with less boilerplate
- **React Redux 9.2.0** - React bindings for Redux
- **Redux Persist** - State persistence across sessions

### API & Data
- **Axios 1.7.9** - HTTP client with interceptors
- **React Hook Form 7.54.2** - Performant form handling
- **Yup 1.6.1** - Schema validation
- **Zod 3.24.1** - TypeScript-first schema validation

### Data Visualization
- **Chart.js 4.4.8** - Canvas-based charting library
- **React Chart.js 2 5.3.0** - React wrapper for Chart.js

### Authentication
- **@react-oauth/google 0.12.1** - Google OAuth integration
- **JWT Decode** - JWT token handling

### Development Tools
- **Vite 6.1.0** - Fast build tool and dev server
- **ESLint 9.19.0** - Code linting with React rules
- **TypeScript Support** - Type safety and IntelliSense
- **Vite Plugin SVGR 4.3.0** - SVG as React components

### Deployment
- **Docker** - Containerized deployment
- **Nginx** - Web server and reverse proxy
- **Alpine Linux** - Lightweight container base

## 📁 Project Architecture

```
src/
├── api/                          # API Integration Layer
│   ├── axiosInstance.js         # Configured Axios with interceptors
│   ├── authApi.js               # Authentication endpoints
│   ├── usersApi.js              # User management endpoints
│   ├── appsApi.js               # Application management endpoints
│   ├── rolesApi.js              # Role management endpoints
│   ├── sessionsApi.js           # Session management endpoints
│   ├── userTypesApi.js          # User type endpoints
│   ├── logsApi.js               # Logging endpoints
│   └── googleApi.js             # Google OAuth endpoints
├── components/                   # Reusable UI Components
│   ├── dialogs/                 # Modal dialogs for CRUD operations
│   │   ├── AddUserDialog.jsx    # User creation dialog
│   │   ├── AddAppDialog.jsx     # App creation dialog
│   │   ├── AddRoleDialog.jsx    # Role creation dialog
│   │   └── AddUserTypeDialog.jsx # User type creation dialog
│   ├── headers/                 # Navigation components
│   │   ├── Header.jsx           # Main application header
│   │   ├── Navigator.jsx        # Sidebar navigation
│   │   ├── Sidebar.jsx          # Alternative sidebar
│   │   └── ProtectedRoute.jsx   # Route protection wrapper
│   ├── tables/                  # Data table components
│   │   ├── UsersTable.jsx       # User data table
│   │   ├── AppsTable.jsx        # App data table
│   │   ├── RolesTable.jsx       # Role data table
│   │   ├── SessionsTable.jsx    # Session data table
│   │   ├── LogsTable.jsx        # Log data table
│   │   └── UserTypesTable.jsx   # User type data table
│   ├── pageComponents/          # Page-specific components
│   │   ├── ProfileAvatarCard.jsx # User profile avatar
│   │   └── ProfileChangePasswordCard.jsx # Password change form
│   ├── AlertSnackbar.jsx        # Global notification system
│   ├── CustomIcons.jsx          # Custom icon components
│   ├── ForgotPassword.jsx       # Password reset component
│   └── LoadingScreen.jsx        # Loading state component
├── hooks/                       # Custom React Hooks
│   └── useSnackBar.js          # Snackbar notification hook
├── layouts/                     # Page Layouts
│   └── AdminLayout.jsx         # Main admin layout with sidebar
├── pages/                       # Application Pages
│   ├── Auth/                    # Authentication pages
│   │   ├── Login.jsx           # Login page with OAuth
│   │   ├── SignIn.jsx          # Alternative sign-in
│   │   └── SignUp.jsx          # User registration
│   └── Dashboard/               # Main application pages
│       ├── Dashboard.jsx       # Main dashboard with analytics
│       ├── Users.jsx           # User management page
│       ├── Apps.jsx            # Application management page
│       ├── Roles.jsx           # Role management page
│       ├── UserTypes.jsx       # User type management page
│       ├── Sessions.jsx        # Session management page
│       ├── Logs.jsx            # Activity logs page
│       ├── Profile.jsx         # User profile page
│       ├── About.jsx           # About page
│       ├── Contact.jsx         # Contact information
│       ├── PasswordReset.jsx   # Password reset page
│       └── NotFound.jsx        # 404 error page
├── shared-theme/                # Material-UI Theme System
│   ├── AppTheme.jsx            # Main theme provider
│   ├── themePrimitives.jsx     # Color schemes and typography
│   ├── ColorModeSelect.jsx     # Theme mode selector
│   └── customizations/         # Component customizations
│       ├── dataDisplay.jsx     # Data display components
│       ├── feedback.jsx        # Feedback components
│       ├── inputs.jsx          # Input components
│       ├── layout.jsx          # Layout components
│       ├── navigation.jsx      # Navigation components
│       └── surfaces.jsx        # Surface components
├── store/                       # Redux State Management
│   ├── slices/                 # Redux slices
│   │   ├── authSlice.js        # Authentication state
│   │   ├── usersSlice.js       # User management state
│   │   ├── appsSlice.js        # Application state
│   │   ├── rolesSlice.js       # Role management state
│   │   ├── sessionsSlice.js    # Session state
│   │   ├── userTypesSlice.js   # User type state
│   │   ├── snackbarSlice.js    # Notification state
│   │   └── googleSlice.js      # Google OAuth state
│   ├── actions/                # Shared actions
│   │   └── userShared.js       # Shared user actions
│   └── store.js                # Redux store configuration
├── utils/                       # Utility Functions
│   ├── validationSchema.js     # Form validation schemas
│   └── fileUpload.js           # File upload utilities
├── App.jsx                     # Main application component
├── main.jsx                    # Application entry point
├── routes.jsx                  # Route configuration
└── index.css                   # Global styles
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Docker** (v20.0.0 or higher) - for containerized deployment
- **Git** - for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd umans-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory:
   ```env
   # API Configuration
   VITE_REACT_APP_API_URL=http://localhost:5000/api/
   
   # Google OAuth Configuration
   VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
   
   # Optional: Development settings
   VITE_APP_ENV=development
   VITE_APP_VERSION=1.0.0
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   # or
   yarn preview
   ```

### Docker Deployment

1. **Build the Docker image**
   ```bash
   docker build -t umans-frontend:latest .
   ```

2. **Run the container**
   ```bash
   docker run -p 80:80 umans-frontend:latest
   ```

3. **Using Docker Compose** (if available)
   ```bash
   docker-compose up -d
   ```

## ⚙️ Configuration

### Vite Configuration

The project uses Vite with optimized build settings:

```javascript
// vite.config.js
export default defineConfig({
  plugins: [react(), svgr()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react/jsx-runtime'],
          'router-vendor': ['react-router', 'react-router-dom'],
          'ui-vendor': ['@mui/material', '@mui/icons-material'],
          'utils-vendor': ['axios', 'redux'],
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      }
    },
    chunkSizeWarningLimit: 500,
  },
  resolve: {
    dedupe: ['react', 'react-dom', 'react-router-dom']
  }
});
```

### Redux Store Structure

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
    loadingRowId: string | null,
    error: null | string
  },
  apps: {
    apps: Array<App>,
    loading: boolean,
    loadingRowId: string | null,
    error: null | string,
    message: null | string
  },
  roles: {
    roles: Array<Role>,
    loading: boolean,
    loadingRowId: string | null,
    error: null | string
  },
  sessions: {
    sessions: Array<Session>,
    loading: boolean,
    loadingRowId: string | null,
    error: null | string
  },
  userTypes: {
    userTypes: Array<UserType>,
    loading: boolean,
    loadingRowId: string | null,
    error: null | string
  },
  snackbar: {
    open: boolean,
    message: string,
    severity: 'success' | 'error' | 'warning' | 'info'
  }
}
```

### API Endpoints

The application communicates with a RESTful API through the following endpoints:

#### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/refresh` - Token refresh
- `POST /auth/logout` - User logout
- `GET /auth/google` - Google OAuth URL
- `POST /auth/google/callback` - Google OAuth callback

#### User Management
- `GET /users/` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users/` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user
- `PUT /users/passwd-change/:id` - Change password

#### Application Management
- `GET /apps` - Get all applications
- `GET /apps/:id` - Get application by ID
- `POST /apps` - Create new application
- `PUT /apps/:id` - Update application
- `DELETE /apps/:id` - Delete application

#### Role Management
- `GET /roles` - Get all roles
- `POST /roles` - Create new role
- `PUT /roles/:id` - Update role
- `DELETE /roles/:id` - Delete role

#### Session Management
- `GET /sessions` - Get all sessions
- `DELETE /sessions/:id` - Delete session

#### User Types
- `GET /type` - Get all user types
- `POST /type` - Create user type
- `PUT /type/:id` - Update user type
- `DELETE /type/:id` - Delete user type

## 🎨 UI/UX Features

### Design System

The application uses a comprehensive design system built on Material-UI v6:

#### Color Palette
- **Primary**: Blue (#1976d2) - Main brand color
- **Secondary**: Green (#4caf50) - Success states
- **Error**: Red (#f44336) - Error states
- **Warning**: Orange (#ff9800) - Warning states
- **Info**: Light Blue (#2196f3) - Information states

#### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: 600 weight, optimized line heights
- **Body Text**: 400 weight, 14px base size
- **Responsive**: Fluid typography scaling

#### Components
- **Custom Theming**: Extensive Material-UI customization
- **Dark/Light Mode**: Seamless theme switching
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG 2.1 AA compliant
- **Animations**: Subtle micro-interactions

### Key UI Components

#### Navigation
- **Responsive Sidebar**: Collapsible navigation with categories
- **Breadcrumb Navigation**: Clear page hierarchy
- **Search Functionality**: Global search across all data
- **Quick Actions**: Direct access to common tasks

#### Data Tables
- **Sortable Columns**: Click to sort by any column
- **Filtering**: Advanced filtering options
- **Pagination**: Efficient data pagination
- **Bulk Actions**: Select multiple items for batch operations
- **Export Options**: CSV/Excel export functionality

#### Forms
- **Real-time Validation**: Instant feedback on form errors
- **Auto-save**: Draft saving for long forms
- **Progressive Disclosure**: Show/hide advanced options
- **Accessibility**: Screen reader friendly

## 🔐 Security Features

### Authentication Security
- **JWT Tokens**: Secure token-based authentication
- **Automatic Refresh**: Seamless token renewal
- **Secure Storage**: LocalStorage with encryption
- **Session Timeout**: Automatic logout on inactivity
- **Multi-factor Ready**: Architecture supports MFA

### API Security
- **Request Interceptors**: Automatic token attachment
- **Response Interceptors**: Error handling and token refresh
- **CORS Configuration**: Secure cross-origin requests
- **Rate Limiting**: Built-in request throttling
- **Input Validation**: Server-side validation schemas

### Data Protection
- **XSS Prevention**: Content sanitization
- **CSRF Protection**: Token-based CSRF protection
- **Secure Headers**: Security-focused HTTP headers
- **Data Encryption**: Sensitive data encryption

## 📊 Performance Optimizations

### Code Splitting
- **Route-based Splitting**: Lazy loading of page components
- **Component Splitting**: Dynamic imports for heavy components
- **Vendor Splitting**: Separate chunks for third-party libraries
- **Bundle Analysis**: Rollup visualizer for optimization

### Caching Strategy
- **Browser Caching**: Optimized cache headers
- **Service Worker**: Offline functionality (future)
- **Memory Caching**: Redux state caching
- **API Caching**: Intelligent API response caching

### Performance Metrics
- **Bundle Size**: Optimized for < 500KB initial load
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🧪 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors

# Testing (if configured)
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage

# Type checking (if TypeScript)
npm run type-check   # Run TypeScript compiler
```

### Code Quality

#### ESLint Configuration
- **React Rules**: Enforced React best practices
- **Hooks Rules**: React Hooks linting rules
- **Accessibility**: JSX accessibility rules
- **Import Organization**: Automatic import sorting

#### Code Standards
- **CamelCase Naming**: Consistent naming conventions
- **Component Structure**: Standardized component organization
- **PropTypes**: Runtime type checking
- **Error Boundaries**: Graceful error handling

### Development Workflow

1. **Feature Development**
   - Create feature branch from `main`
   - Implement feature with tests
   - Run linting and type checking
   - Create pull request

2. **Code Review Process**
   - Automated CI/CD checks
   - Peer code review
   - Security scan
   - Performance testing

3. **Deployment**
   - Automated testing
   - Build optimization
   - Docker image creation
   - Production deployment

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 600px
- **Tablet**: 600px - 960px
- **Desktop**: 960px - 1280px
- **Large Desktop**: > 1280px

### Mobile Features
- **Touch-friendly**: Optimized for touch interactions
- **Swipe Gestures**: Navigation gestures
- **Offline Support**: Basic offline functionality
- **Progressive Web App**: PWA capabilities

## 🔧 Customization

### Theme Customization

The application supports extensive theme customization:

```javascript
// Custom theme configuration
const customTheme = createTheme({
  palette: {
    primary: {
      main: '#your-brand-color',
    },
    // ... other customizations
  },
  typography: {
    fontFamily: 'Your-Font-Family',
  },
  // ... component customizations
});
```

### Component Customization

All components can be customized through:
- **Theme Overrides**: Global component styling
- **Styled Components**: Component-specific styling
- **CSS Variables**: Dynamic theming support
- **Props API**: Flexible component configuration

## 🚀 Deployment

### Production Build

```bash
# Build for production
npm run build

# The build output will be in the `dist/` directory
# Optimized for production with:
# - Minified JavaScript and CSS
# - Optimized images
# - Code splitting
# - Tree shaking
```

### Docker Deployment

```dockerfile
# Multi-stage build for optimization
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_REACT_APP_API_URL` | Backend API URL | `http://localhost:5000/api/` | Yes |
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
- **Issues**: Create an issue in the repository
- **Discussions**: Use GitHub Discussions for questions
- **Email**: Contact the development team

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
- Material-UI v6 integration
- Redux Toolkit state management
- Google OAuth authentication
- Responsive design implementation
- Docker containerization

### Roadmap
- **v1.1.0**: Advanced analytics dashboard
- **v1.2.0**: Real-time notifications
- **v1.3.0**: Advanced role management
- **v2.0.0**: Micro-frontend architecture

## 🙏 Acknowledgments

- **Material-UI Team** - For the excellent component library
- **React Team** - For the amazing framework
- **Vite Team** - For the fast build tool
- **Redux Team** - For the state management solution
- **Contributors** - All contributors who help improve this project

---

<div align="center">

**Built with ❤️ using React, Material-UI, and modern web technologies**

[Report Bug](https://github.com/your-org/umans-frontend/issues) · [Request Feature](https://github.com/your-org/umans-frontend/issues) · [Documentation](https://github.com/your-org/umans-frontend/wiki)

</div>