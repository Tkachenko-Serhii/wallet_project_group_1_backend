const balance = async (req, res) => {
  const { balance } = req.user;
  res.json(balance);
};

module.exports = balance;
