require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");
const router = require("./routes/router");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3001;
const ADMIN_FRONTEND_URL = process.env.ADMIN_FRONTEND_URL;
const CLIENT_FRONTEND_URL = process.env.CLIENT_FRONTEND_URL;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: [ADMIN_FRONTEND_URL, CLIENT_FRONTEND_URL],
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Explicitly handle preflight requests


// Static file serving
app.use("/carimages", express.static(path.join(__dirname, "../shared-assets/public/carimages")));
app.use("/userprofilepics", express.static(path.join(__dirname, "../shared-assets/public/userprofilepics")));

app.use("/", router);

connectDB();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
