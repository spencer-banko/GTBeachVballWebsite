# Quick Start Guide

## 🚀 Get Running in 5 Minutes

### Option 1: Automated Setup (Recommended)

```bash
# Run the setup script
./setup.sh

# Edit the environment file
nano server/.env

# Seed the database
cd server && npm run seed

# Start the applications (in separate terminals)
cd server && npm run dev
cd client && npm run dev
```

### Option 2: Manual Setup

```bash
# Install dependencies
cd server && npm install
cd ../client && npm install

# Copy environment files
cp server/env.example server/.env
echo "VITE_API_BASE_URL=http://localhost:3001" > client/.env

# Edit server/.env with your configuration
nano server/.env

# Seed database
cd server && npm run seed

# Start applications
cd server && npm run dev
cd client && npm run dev
```

### Option 3: Docker (All-in-one)

```bash
# Start everything with Docker
docker-compose up -d

# View logs
docker-compose logs -f
```

## 🔧 Environment Configuration

Edit `server/.env`:

```env
MONGODB_URI=mongodb://localhost:27017/gt-volleyball
PORT=3001
JWT_SECRET=your-super-secret-jwt-key
ADMIN_USER=admin
ADMIN_PASS=password123
NODE_ENV=development
```

## 📊 Default Admin Credentials

- **Username**: `admin`
- **Password**: `password123`

## 🌐 Access Points

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **Admin Panel**: http://localhost:5173/admin
- **Health Check**: http://localhost:3001/health

## 📝 What's Included

✅ **Complete MERN Stack Application**
- React + TypeScript frontend
- Express + TypeScript backend
- MongoDB database
- JWT authentication

✅ **Georgia Tech Themed Design**
- Tech Gold (#B3A369) and Navy (#003057) colors
- Responsive design
- Modern UI components

✅ **Full Feature Set**
- Home page with team info and photos
- Executive board management
- Sponsor management
- Interest form with validation
- Admin dashboard
- SEO optimization

✅ **Production Ready**
- Docker configuration
- Environment management
- Error handling
- Security headers
- Rate limiting

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
brew services list | grep mongodb

# Start MongoDB (macOS)
brew services start mongodb-community

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in server/.env
```

### Port Already in Use
```bash
# Check what's using the port
lsof -i :3001
lsof -i :5173

# Kill the process
kill -9 <PID>
```

### Permission Issues
```bash
# Make setup script executable
chmod +x setup.sh
```

## 📚 Next Steps

1. **Replace placeholder images** in `client/public/images/`
2. **Customize content** for your specific club
3. **Set up production deployment**
4. **Configure email notifications**
5. **Add analytics tracking**

## 🆘 Need Help?

- Check the main README.md for detailed documentation
- Review the code comments for implementation details
- Contact the development team for support
