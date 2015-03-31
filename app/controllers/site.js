exports.index = function (req, res) {
  res.json('index');
};

exports.redirect = function (req, res) {
  res.redirect('/');
};