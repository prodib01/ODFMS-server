const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
  
    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'No token provided'
      });
    }
  
    jwt.verify(token, "Antonia", (err, user) => {
      if (err) {
        console.error('Invalid token:', err);
        return res.sendStatus(403); // Invalid token
      }
      req.user = user;
      next();
    });
  };
   module.exports = authenticateToken;