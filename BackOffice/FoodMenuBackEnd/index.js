//import
const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const corsOptions = require("./config/corsOption");
const credentials = require("./middlewares/credentials");
//init
const db = require("./models");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000', // Replace with the origin of your client-side code
  methods: ['GET', 'POST','DELETE','PUT'], // Specify the allowed HTTP methods
  // Specify the allowed headers
}));

app.use("/images",express.static("./images"));

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

//logger
app.use(morgan("dev"));
process.on("uncaughtException", (ex) => {
  console.error(ex.message, ex);
  process.exit(1);
});
process.on("unhandledRejection", (ex) => {
  console.error(ex.message, ex);
  process.exit(1);
});

//this helps us to add 'Access-Control-Allow-Origin = true'
app.use(credentials);

//cors
app.use(cors(corsOptions));

//routes
require("./startUp/routes.js")(app);

//remove { force: true }
db.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`connecting to server on port ${PORT}....`);
    });
  })
  .catch((err) => {
    console.error(err);
  });

/*
POST    /restaurant
GET     /restaurant
GET     /restaurant/{id}
PUT   /restaurant/{id}
DELETE   /restaurant/{id}
*/
