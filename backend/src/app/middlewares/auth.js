const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const { secret } = require('../../config/auth');

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'Token not provided' });
    }

    const [, token] = authHeader.split(' ');

    try {
      const decoded = await promisify(jwt.verify)(token, secret);

      req.userId = decoded.id;
      req.isAdmin = decoded.admin;

      return next();
    } catch (error) {
      return res.status(401).json({ error: 'Token is invalid' });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ errorm: error, statusCode: 500, error: 'Internal Server Error' });
  }
};
