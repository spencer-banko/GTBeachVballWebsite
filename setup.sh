#!/bin/bash

echo "🏐 Setting up Georgia Tech Beach Volleyball Club Website"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install server dependencies"
    exit 1
fi
cd ..

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install client dependencies"
    exit 1
fi
cd ..

# Create environment file for server
echo "⚙️ Setting up environment configuration..."
if [ ! -f server/.env ]; then
    cp server/env.example server/.env
    echo "✅ Created server/.env file"
    echo "⚠️  Please edit server/.env with your configuration"
else
    echo "✅ server/.env already exists"
fi

# Create environment file for client
if [ ! -f client/.env ]; then
    echo "VITE_API_BASE_URL=http://localhost:3001" > client/.env
    echo "✅ Created client/.env file"
else
    echo "✅ client/.env already exists"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit server/.env with your MongoDB connection and admin credentials"
echo "2. Start MongoDB (if running locally)"
echo "3. Run the seed script: cd server && npm run seed"
echo "4. Start the server: cd server && npm run dev"
echo "5. Start the client: cd client && npm run dev"
echo ""
echo "Or use Docker: docker-compose up -d"
echo ""
echo "🌐 Frontend: http://localhost:5173"
echo "🔧 Backend: http://localhost:3001"
echo "🔐 Admin: http://localhost:5173/admin"
