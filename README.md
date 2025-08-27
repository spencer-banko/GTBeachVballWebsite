# Georgia Tech Beach Volleyball Club Website

A modern, responsive website for the Georgia Tech Beach Volleyball Club built with the MERN stack (MongoDB, Express, React, Node.js) and TypeScript.

## 🏐 Features

- **Modern Design**: Georgia Tech themed with Tech Gold (#B3A369) and Navy (#003057)
- **Responsive Layout**: Mobile-first design that works on all devices
- **Content Management**: Admin panel to manage executives and sponsors
- **Interest Form**: Collect and store potential member submissions
- **SEO Optimized**: Meta tags, OpenGraph, and accessibility features
- **TypeScript**: Full type safety across frontend and backend

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- MongoDB (local installation or MongoDB Atlas)
- Git

### Installation

1. **Clone and install dependencies:**
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

2. **Environment Setup:**
   ```bash
   # Copy server environment file
   cd ../server
   cp env.example .env
   
   # Edit .env with your configuration
   # MONGODB_URI=mongodb://localhost:27017/gt-volleyball
   # JWT_SECRET=your-secret-key
   # ADMIN_USER=admin
   # ADMIN_PASS=password123
   ```

3. **Seed the database:**
   ```bash
   cd ../server
   npm run seed
   ```

4. **Start the applications:**
   ```bash
   # Terminal 1 - Start the server
   cd server
   npm run dev

   # Terminal 2 - Start the client
   cd client
   npm run dev
   ```

5. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001
   - Admin Panel: http://localhost:5173/admin

## 📁 Project Structure

```
gt-volleyball/
├── client/                 # React frontend (Vite + TypeScript)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── types/         # TypeScript type definitions
│   │   └── utils/         # Utility functions
│   ├── public/
│   │   └── images/        # Static images
│   └── package.json
├── server/                 # Express backend (TypeScript)
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Custom middleware
│   │   └── utils/         # Utility functions
│   └── package.json
└── README.md
```

## 🎨 Design System

### Colors
- **Tech Gold**: #B3A369 (Primary)
- **Navy**: #003057 (Headers, links, buttons)
- **White**: #FFFFFF (Background)
- **Accent Gold**: #EAAA00 (Highlights)
- **Neutral Gray**: #F5F6F7 (Secondary background)

### Typography
- Modern, clean fonts with proper hierarchy
- Responsive text sizing
- Accessible contrast ratios

## 🔧 Available Scripts

### Client (`/client`)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format with Prettier

### Server (`/server`)
- `npm run dev` - Start development server with hot reload
- `npm run start` - Start production server
- `npm run build` - Build TypeScript
- `npm run seed` - Seed database with sample data
- `npm run lint` - Run ESLint
- `npm run format` - Format with Prettier

## 📊 Database Models

### Executive
- Name, role, bio, photo URL
- Email and LinkedIn (optional)
- Visibility toggle and sort order

### Sponsor
- Name, logo URL, website URL, blurb
- Active status (only one active at a time)

### InterestSubmission
- Contact information and GT affiliation
- Experience level and notes
- Timestamp

## 🔐 Admin Access

Default admin credentials (change in .env):
- Username: `admin`
- Password: `password123`

Access the admin panel at `/admin` to:
- Manage executive board members
- Control sponsor displays
- View interest form submissions

## 🌐 API Endpoints

### Public Routes
- `GET /api/execs` - Get visible executives
- `GET /api/sponsors/active` - Get active sponsor
- `POST /api/interest` - Submit interest form
- `POST /api/sponsors/inquiry` - Submit sponsor inquiry

### Protected Routes (Admin)
- `POST /api/auth/login` - Admin authentication
- `GET /api/admin/interest` - Get interest submissions
- CRUD operations for executives and sponsors

## 🚀 Deployment

### Environment Variables

#### Server (.env)
```env
MONGODB_URI=mongodb://localhost:27017/gt-volleyball
PORT=3001
JWT_SECRET=your-secret-key
ADMIN_USER=admin
ADMIN_PASS=password123
NODE_ENV=development
```

#### Client (.env)
```env
VITE_API_BASE_URL=http://localhost:3001
```

### Production Build
```bash
# Build client
cd client
npm run build

# Build server
cd ../server
npm run build
npm start
```

### Docker Deployment
```bash
# Start all services with Docker
docker-compose up -d

# View logs
docker-compose logs -f
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting and tests
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For questions or issues, please contact the development team or create an issue in the repository.
