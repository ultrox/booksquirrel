exports.processGoogleProfile = (profile) => {
  const res = {
    provider: profile.provider,
    providerId: profile.id,
    firstName: profile.name.givenName,
    lastName: profile.name.familyName,
  };

  if (profile.emails && profile.emails.length > 0) {
    res.email = profile.emails[0].value;
  }

  if (profile.photos && profile.photos.length > 0) {
    res.profilePhoto = profile.photos[0].value.replace("sz=50", "sz=200");
  }

  return res;
};

/**
 *
 * @param {object} usrOptions
 * @returns void
 * @description allow next middleware if user logged in, or redirect to given url or /login
 */
exports.isLoggedIn = (usrOptions) => {
  let options = usrOptions || {};

  if (typeof options === "string") {
    options = { redirectTo: options };
  }

  const url = options.redirectTo || "/login";

  return (req, res, next) => {
    const userAuthenticated =
      typeof req.isAuthenticated === "function" ? req.isAuthenticated() : false;

    if (userAuthenticated) {
      return next();
    }

    return res.status(401).json({ message: "Authentication invalid" });
  };
};
