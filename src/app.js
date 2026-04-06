import express from "express";
import authRoutes from "./routes/auth.routes.js";
import recordRoutes from "./routes/record.routes.js";

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/records", recordRoutes);
app.get("/", (req, res) => {
  res.send("Finance API is running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});