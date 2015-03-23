exports.index = function (req, res) {
  res.json(true);
};

exports.redirect = function (req, res) {
  res.redirect('/');
};