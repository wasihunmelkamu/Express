import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";


import taskRoutes from './routes/tasks.js'
// CREATE EXPRESS APP
const app = express();
// middleware to pars  incoming JSON bodies
app.use(express.json());
// connect to MonogoDB*
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("connnected to MonogDB"))
  .catch((err) => console.error("DB connection error :", err));
// Import  and use  task routes

app.use("/api/tasks", taskRoutes);
//  start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running  on port  ${PORT}`);
});
  