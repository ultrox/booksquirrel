const helpers = require("./user.helpers");

const addGoogleUser =
  (User) =>
  ({ providerId, email, firstName, lastName, profilePhoto, provider }) => {
    const user = new User({
      providerId,
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

/**
 *
 * @description Find user by provider id
 */
const findByPId = (User) => async (id) => User.findOne({ providerId: id });
const findById = (User) => async (id) => User.findOne({ _id: id });
const getUserByEmail = (User) => async (email) => User.findOne({ email });

module.exports = (User) => ({
  isLoggedIn: helpers.isLoggedIn,
  processGoogleProfile: helpers.processGoogleProfile,
  addGoogleUser: addGoogleUser(User),
  findUserByPId: findByPId(User),
  findUserById: findById(User),
  getUsers: getUsers(User),
  getUserByEmail: getUserByEmail(User),
});
