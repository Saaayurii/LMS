import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";

import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";

// ✅ Новые маршруты
import learningTaskRoutes from "./routes/learningTask.routes.js";
import taskSubmissionRoutes from "./routes/taskSubmission.routes.js";
import courseMaterialRoutes from "./routes/courseMaterial.routes.js";
import quizRoutes from "./routes/quiz.routes.js";
import quizResultRoutes from "./routes/quizResult.routes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// ✅ Существующие API
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);

// ✅ Новые API
app.use("/api/v1/tasks", learningTaskRoutes);
app.use("/api/v1/submissions", taskSubmissionRoutes);
app.use("/api/v1/materials", courseMaterialRoutes);
app.use("/api/v1/quizzes", quizRoutes);
app.use("/api/v1/quiz-results", quizResultRoutes);

app.listen(PORT, () => {
    console.log(`Сервер прослушивание на порту ${PORT}`);
});
