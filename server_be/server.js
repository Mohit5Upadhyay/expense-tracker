require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/dbConnection");

const authRoutes = require("./routes/authRoutes")
const expenseRoutes = require("./routes/expenseRoutes")
const incomeRoutes = require("./routes/incomeRoutes")
const dashboardRoutes = require("./routes/dashboardRoutes")




const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// DB Connecttion here;
connectDB();


app.use("/api/v1/auth" , authRoutes)
app.use("/api/v1/expense" , expenseRoutes)
app.use("/api/v1/income" , incomeRoutes)
app.use("/api/v1/dashboard", dashboardRoutes)


//server upload folder for files 
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT: http://localhost:${PORT}`);
});
