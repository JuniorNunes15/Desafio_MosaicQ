import express from "express";
import dotenv from "dotenv";
import taskRoutes from "./routes/tasks";
import { setupDatabase } from "./database/knex";

dotenv.config();
const app = express();
app.use(express.json());
app.use("/tasks", taskRoutes);

setupDatabase();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
