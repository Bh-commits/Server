import compression from 'compression';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env.js';
import { adminRoutes } from './routes/adminRoutes.js';
import { authRoutes } from './routes/authRoutes.js';
import { careerRoutes } from './routes/careerRoutes.js';
import { leadRoutes } from './routes/leadRoutes.js';
import { publicRoutes } from './routes/publicRoutes.js';
import { seoRoutes } from './routes/seoRoutes.js';
import { errorHandler, notFound } from './middleware/error.js';
import { robots } from './controllers/seoController.js';

const app = express();
const allowedOrigins = env.clientUrl.split(',').map((origin) => origin.trim());

app.set('trust proxy', 1);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }
  })
);
app.use(compression());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error('Not allowed by CORS'));
    },
    credentials: true
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));

app.use(
  '/api',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 150,
    standardHeaders: true,
    legacyHeaders: false
  })
);

app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'IdeaClap India API is running'
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'IdeaClap India API',
    timestamp: new Date().toISOString()
  });
});

app.get('/robots.txt', robots);
app.use('/api', seoRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/admin', adminRoutes);

app.use(notFound);
app.use(errorHandler);

export { app };

