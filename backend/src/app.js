import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { Sendmail } from "./utils/nodemailer.js"; // Import Sendmail function

dotenv.config(); // Load environment variables

const app = express();

app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Student routes
import studentRouter from "./routes/student.routes.js";
app.use("/api/student", studentRouter);

// Teacher routes
import teacherRouter from "./routes/teacher.routes.js";
app.use("/api/teacher", teacherRouter);

// Course routes
import courseRouter from "./routes/course.routes.js";
app.use("/api/course", courseRouter);

// Admin routes
import adminRouter from "./routes/admin.routes.js";
app.use("/api/admin", adminRouter);

// Payment routes
import paymentRouter from "./routes/payment.routes.js";
app.use("/api/payment", paymentRouter);

// User routes
import userRouter from "./routes/userRoutes.js"; // Import user routes
app.use("/api/user", userRouter); // Use user routes

// Test route for sending email
app.get('/test-email', async (req, res) => {
  try {
    const emailResponse = await Sendmail('your-email@gmail.com', 'Test Subject', '<h1>Test Message</h1>');
    res.status(200).send(emailResponse);
  } catch (error) {
    res.status(500).send({ error: 'Error sending test email' });
  }
});

export { app };
