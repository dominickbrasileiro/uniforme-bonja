module.exports = (req, res, next) => {
  if (req.isAdmin) {
    return next();
  }

  return res.status(401).json({ error: 'Unauthorized' });
};
