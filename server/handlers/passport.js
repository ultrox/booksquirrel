const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");

const UserService = require("../user");

// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      // In this example, the user's Facebook profile is supplied as the user
      // record.  In a production-quality application, the Facebook profile should
      // be associated with a user record in the application's database, which
      // allows for account linking and authentication with other identity
      // providers.

      const currentUser = await UserService.findUserByGId(profile.id);
      if (currentUser) {
        // already have the user -> return (login)
        currentUser.lastVisited = new Date();
        return done(null, currentUser);
      }
      // register user and return
      // done(err)
      const gprofile = UserService.processGoogleProfile(profile);
      const newUser = await UserService.addGoogleUser(gprofile);
      return done(null, newUser);
    },
  ),
);

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser((user, done) => {
  // user.id here is my system id
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const currentUser = await UserService.findUserById(id);
  done(null, currentUser);
});

module.exports = (app) => {
  // Initialize Passport and restore authentication state, if any, from the
  // session.
  app.use(passport.initialize());
  app.use(passport.session());
};
