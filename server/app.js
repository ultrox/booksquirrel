const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const routes = require("./app-router");
const errorHandlers = require("./handlers/errorHandlers");

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 48,
    },
  }),
);
// Hooking Passport with the app
require("./handlers/passport")(app);

/* serves up static files from the public folder. Anything in public/ will just
   be served up as the file it is
*/
app.use(express.static(path.join(__dirname, "public")));

// Takes the raw requests and turns them into usable properties on req.body
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

// populates req.cookies with any cookies that came along with the request
app.use(cookieParser());

app.use(cors({ origin: process.env.FRONTEND_BASE_URL, credentials: true }));

// finally handle our own routes!
app.use("/api", routes);

// If that above routes didn't work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// dev only errors
if (app.get("env") === "development") {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);

module.exports = app;
