
const jwt = require('jsonwebtoken');
const JWT_SECRET="M72JGNgJpX"
const authenticateMiddleware = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }
    const token = authorizationHeader.split(' ')[1]
    const decodedToken = jwt.verify(token, JWT_SECRET);

    req.user = decodedToken.email;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = authenticateMiddleware;
