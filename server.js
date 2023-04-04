import "express-async-errors";
import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser"

// DB and authenticate user
import connectDB from "./db/connect.js";

// routes
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobsRoutes.js";

// middleware
import errorHandleMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";
import authenticateUser from "./middleware/auth.js";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const __dirname = dirname(fileURLToPath(import.meta.url))

// only when ready to deploy
app.use(express.static(path.resolve(__dirname, "./frontend/build")));

app.use(express.json());
app.use(cookieParser())
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

app.get("*",(req,res)=>{
  res.sendFile(path.resolve(__dirname, "./frontend/build", "index.html"))
})


app.use(notFoundMiddleware);
app.use(errorHandleMiddleware);
const port = process.env.PORT || 5000;

// mongoDB  connect
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server is listening on port ${port}!`));
  } catch (error) {}
};

start();
