exports.me = async (req, res) => {
  res.json(req.user);
};
