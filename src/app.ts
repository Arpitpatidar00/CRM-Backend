import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import routes from "./routes";
import { errorHandler } from "./middlewares/error.middleware";
import { ApiError } from "./utils/ApiError";
import { env } from "./config/env";

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  credentials: true,
  origin: true,
}));
app.use(helmet());
app.use(morgan("dev"));

// Session configuration
app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: env.MONGODB_URI,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: parseInt(env.SESSION_MAX_AGE),
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
    },
  })
);

// Routes
app.use("/api/v1", routes);

// 404 handler
app.use((req, res, next) => {
  next(new ApiError(404, "Route not found"));
});

// Global error handler
app.use(errorHandler);

export default app;
