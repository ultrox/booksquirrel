const express = require("express");
const passport = require("passport");

const router = express.Router();
const controller = require("./controllers/exampleController");
const { isLoggedIn } = require("./user");
const { catchErrors } = require("./handlers/errorHandlers");

const { FRONTEND_BASE_URL } = process.env;

router.get("/", (req, res) => {
  res.json({ name: "supercool app", version: 0.4 });
});

// catchErrors are only needed for async/await
router.get("/me", isLoggedIn(`${FRONTEND_BASE_URL}/login`), catchErrors(controller.me));

router.get("/login/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/return",
  passport.authenticate("google", { failureRedirect: `${FRONTEND_BASE_URL}/badLogin` }),
  (req, res) => {
    res.redirect(`${FRONTEND_BASE_URL}`);
  },
);

router.get("/logout", (req, res) => {
  req.logout();
  res.json({ message: "Logged Out" });
});

module.exports = router;
