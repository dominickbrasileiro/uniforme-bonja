module.exports = (req, res, next) => {
  if (!req.isAdmin) {
    return res.status(401).json({ statusCode: 401, error: 'Unauthorized' });
  }

  return next();
};
