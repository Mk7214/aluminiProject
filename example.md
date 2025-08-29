This document contains the complete code for a basic Node.js backend using TypeScript, Express, Prisma, Zod, and JWT, following the specified file structure. It now includes a "like" feature for comments.

---

### **1. Root Directory Files**

#### **`package.json`**

```json
{
  "name": "ts-backend-project",
  "version": "1.0.0",
  "description": "A TypeScript backend project",
  "main": "dist/server.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/server.js",
    "dev": "nodemon src/server.ts",
    "db:push": "prisma db push"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@prisma/client": "^5.15.0",
    "bcryptjs": "^2.4.3",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.6",
    "@types/express": "^4.17.21",
    "@types/jsonwebtoken": "^9.0.6",
    "@types/node": "^20.14.2",
    "nodemon": "^3.1.2",
    "prisma": "^5.15.0",
    "ts-node": "^10.9.2",
    "typescript": "^5.4.5"
  }
}
tsconfig.json{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}
.envDATABASE_URL="mongodb+srv://<user>:<password>@cluster0.mongodb.net/mydatabase"
JWT_SECRET="your-super-secret-key-that-is-long-and-random"
.gitignore# Dependencies
/node_modules
/dist

# Environment variables
.env
2. Prisma Schemaprisma/schema.prismaUpdated with Comment and Like models.generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

model User {
  id        String    @id @default(auto()) @map("_id") @db.ObjectId
  email     String    @unique
  name      String
  password  String
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  comments  Comment[]
  likes     Like[]
}

model Comment {
  id             String   @id @default(auto()) @map("_id") @db.ObjectId
  commentMessage String
  createdAt      DateTime @default(now())
  authorId       String   @db.ObjectId
  author         User     @relation(fields: [authorId], references: [id])
  upvotes        Like[]
}

model Like {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  createdAt DateTime @default(now())
  userId    String   @db.ObjectId
  user      User     @relation(fields: [userId], references: [id])
  commentId String   @db.ObjectId
  comment   Comment  @relation(fields: [commentId], references: [id])

  @@unique([userId, commentId])
}
3. src Directory: The Application Codesrc/server.tsimport app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
src/app.tsimport express, { Application, Request, Response } from 'express';
import apiRouter from './api';

const app: Application = express();

app.use(express.json());
app.use('/api', apiRouter);

app.get('/health', (req: Request, res: Response) => {
  res.status(200).send('OK');
});

export default app;
src/config/index.tsimport dotenv from 'dotenv';
dotenv.config();

const config = {
  jwtSecret: process.env.JWT_SECRET as string,
};

export default config;
4. src/api/ Directory: Features & Logicsrc/api/index.ts (Main Router)Updated to include comment and like routes.import { Router } from 'express';
import authRouter from './auth/auth.route';
import commentRouter from './comments/comment.route';
import likeRouter from './likes/like.route';

const router = Router();

router.use('/auth', authRouter);
router.use('/comments', commentRouter);
router.use('/likes', likeRouter);

export default router;
src/api/auth/**(No changes to auth files: auth.route.ts, auth.controller.ts, auth.service.ts, auth.validation.ts)5. NEW FEATURE: Commentssrc/api/comments/comment.validation.tsimport { z } from 'zod';

export const createCommentSchema = z.object({
  body: z.object({
    commentMessage: z.string().min(1, 'Comment message cannot be empty'),
  }),
});
src/api/comments/comment.route.tsimport { Router } from 'express';
import * as commentController from './comment.controller';
import { validate } from '../../middlewares/validation.middleware';
import { createCommentSchema } from './comment.validation';
import { protect } from '../../middlewares/auth.middleware';

const router = Router();

// All comment routes are protected
router.use(protect);

router.post('/', validate(createCommentSchema), commentController.createComment);
router.get('/:id', commentController.getCommentById);

export default router;
src/api/comments/comment.controller.tsimport { Response } from 'express';
import * as commentService from './comment.service';
import { AuthRequest } from '../../middlewares/auth.middleware';

export const createComment = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id; // We know user exists because of `protect` middleware
    const comment = await commentService.createComment(req.body, userId);
    res.status(201).json(comment);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getCommentById = async (req: AuthRequest, res: Response) => {
    try {
        const comment = await commentService.getCommentWithUpvoteCount(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json(comment);
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
src/api/comments/comment.service.tsimport { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createComment = async (commentData: { commentMessage: string }, authorId: string) => {
  const { commentMessage } = commentData;
  return prisma.comment.create({
    data: {
      commentMessage,
      authorId,
    },
  });
};

export const getCommentWithUpvoteCount = async (commentId: string) => {
    return prisma.comment.findUnique({
        where: { id: commentId },
        include: {
            author: { select: { name: true } },
            _count: {
                select: { upvotes: true },
            },
        },
    });
};
6. NEW FEATURE: Likessrc/api/likes/like.route.tsimport { Router } from 'express';
import * as likeController from './like.controller';
import { protect } from '../../middlewares/auth.middleware';

const router = Router();

// All like routes are protected
router.use(protect);

router.post('/:commentId', likeController.toggleLike);

export default router;
src/api/likes/like.controller.tsimport { Response } from 'express';
import * as likeService from './like.service';
import { AuthRequest } from '../../middlewares/auth.middleware';

export const toggleLike = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { commentId } = req.params;
    const result = await likeService.toggleLike(userId, commentId);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
src/api/likes/like.service.tsimport { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const toggleLike = async (userId: string, commentId: string) => {
  // Check if the like already exists
  const existingLike = await prisma.like.findUnique({
    where: {
      userId_commentId: {
        userId,
        commentId,
      },
    },
  });

  if (existingLike) {
    // If it exists, unlike it (delete the record)
    await prisma.like.delete({
      where: {
        id: existingLike.id,
      },
    });
    return { message: 'Comment unliked successfully' };
  } else {
    // If it doesn't exist, like it (create the record)
    await prisma.like.create({
      data: {
        userId,
        commentId,
      },
    });
    return { message: 'Comment liked successfully' };
  }
};
7. src/middlewares/ Directorysrc/middlewares/validation.middleware.ts(No changes to this file)src/middlewares/auth.middleware.ts (New)This middleware protects routes by verifying the JWT.import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Extend the Express Request type to include the user property
export interface AuthRequest extends Request {
  user?: { id: string };
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, config.jwtSecret) as { userId: string };

      // Get user from the token and attach to request object
      req.user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: { id: true },
      });

      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

