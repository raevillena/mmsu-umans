import cors from 'cors'
import { getAllowedOrigins } from '../services/corsService.js';

export const corsMiddleware = cors({
    origin: async (origin, callback) => {
      try {
        const allowedOrigins = await getAllowedOrigins();
  
        if (!origin || allowedOrigins.includes(origin)) {
          return callback(null, true);
        }
  
        return callback(new Error("Not allowed by CORS"));
      } catch (err) {
        console.error("CORS error:", err);
        return callback(err);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-user-id"],
  });