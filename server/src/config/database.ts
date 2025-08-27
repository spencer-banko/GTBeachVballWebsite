import mongoose from 'mongoose';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    // If we have a cached connection, return it
    if (cached.conn) {
      console.log('✅ Using cached MongoDB connection');
      return;
    }

    // If we have a pending connection promise, wait for it
    if (cached.promise) {
      console.log('⏳ Waiting for existing MongoDB connection...');
      await cached.promise;
      return;
    }

    // Create new connection with optimized settings for serverless
    cached.promise = mongoose.connect(mongoURI, {
      bufferCommands: false,
      maxPoolSize: 1,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
      retryWrites: true,
      w: 'majority'
    });

    cached.conn = await cached.promise;
    
    console.log('✅ MongoDB connected successfully');
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
      cached.conn = null;
      cached.promise = null;
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected');
      cached.conn = null;
      cached.promise = null;
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('🔄 MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
    cached.conn = null;
    cached.promise = null;
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
    throw error;
  }
};
