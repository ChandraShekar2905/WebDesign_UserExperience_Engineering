// Middleware to check if user is an admin
const isAdmin = (req, res, next) => {
    // req.user is set by the auth middleware
    if (req.user && req.user.type === 'admin') {
      return next();
    }
    return res.status(403).json({ message: 'Access denied: Admins only' });
  };
  
  module.exports = { isAdmin };