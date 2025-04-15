require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const session = require("express-session");

app.use(
  session({
    secret: "12345",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false,
      maxAge: 24 * 60 * 60 * 1000
     },
  })
);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Routes
const homeRoutes = require("./routes/home");
const authRoutes = require("./routes/auth");
const udRoutes = require("./routes/userAnalytics");
const dbmRoutes = require("./routes/dbm");
const genreRoutes = require("./routes/genre");
const movieRoutes = require("./routes/movie");
const peopleRoutes = require('./routes/people');

app.use("/", homeRoutes);
app.use("/", authRoutes);
app.use("/", udRoutes);
app.use("/", dbmRoutes);
app.use("/genres", genreRoutes);
app.use("/", movieRoutes);
app.use('/people', peopleRoutes);

const PORT = process.env.X_ZOHO_CATALYST_LISTEN_PORT||3005
app.listen(PORT, () =>
  console.log(`Admin panel running at: http://localhost:${PORT}`) //web @ https://appsail-50025756072.development.catalystappsail.in
);
