const helpers = require("./user.helpers");

const addGoogleUser =
  (User) =>
  ({ googleId, email, firstName, lastName, profilePhoto, provider }) => {
    const user = new User({
      googleId,
      firstName,
      lastName,
      email,
      profilePhoto,
      provider,
    });
    // handle duplicated unique emails
    return user.save();
  };

const getUsers = (User) => () => User.find({});

const findByGId = (User) => async (id) => User.findOne({ googleId: id });
const findById = (User) => async (id) => User.findOne({ _id: id });
const getUserByEmail = (User) => async (email) => User.findOne({ email });

module.exports = (User) => ({
  isLoggedIn: helpers.isLoggedIn,
  processGoogleProfile: helpers.processGoogleProfile,
  addGoogleUser: addGoogleUser(User),
  findUserByGId: findByGId(User),
  findUserById: findById(User),
  getUsers: getUsers(User),
  getUserByEmail: getUserByEmail(User),
});
