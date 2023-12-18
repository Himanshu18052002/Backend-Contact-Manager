const express = require("express");
const connectDB = require("./config/dbConnection");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
app.use(express.json());
require("dotenv").config();

const port = process.env.PORT || 5001;
connectDB();

app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use(errorHandler);


app.listen(port, ()=>{
    console.log(`app listening on ${port}`);
})