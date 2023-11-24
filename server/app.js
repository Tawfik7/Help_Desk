const express = require("express");
//const jwt = require("jsonwebtoken");
const cookieParser=require('cookie-parser')
const app = express();
const mongoose = require("mongoose");
const ticketRouter = require("./Routes/Tickets");
const workflowRouter = require("./Routes/Workflow");
const userRouter = require("./Routes/Users");
const FAQ = require("./Routes/FAQ");
const Reports = require("./Routes/Reports");
const Communication = require("./Routes/Communication");

require('dotenv').config();

//const authenticationMiddleware = require("./Middleware/authenticationMiddleware");
//const authorizatonMiddleware = require("./Middleware/authorizationMiddleware");
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/Tickets", ticketRouter);
app.use("/Workflow", workflowRouter);
app.use("/users", userRouter);
app.use("/FAQ", FAQ);
app.use("/Communication", Communication);
app.use("/Reports", Reports);
app.use(cookieParser())
app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS,HEAD");
//   res.setHeader(
//     "Access-Control-Expose-Headers",
//     "*"
//   );

//   next();
// });

//app.use(authenticationMiddleware);
//app.use(authorizatonMiddleware);


const db_name = process.env.DB_NAME;

const db_url = `${process.env.DB_URL}/${db_name}`; // if it gives error try to change the localhost to 127.0.0.1


const connectionOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

mongoose
  .connect(db_url, connectionOptions)
  .then(() => console.log("mongoDB connected"))
  .catch((e) => {
    console.log(e);
  });

app.use(function (req, res, next) {
  return res.status(404).send("404");
});
app.listen(process.env.PORT, () => console.log("server started"));