const jwt = require('jsonwebtoken');

// Middleware function to authenticate JWT token
exports.authenticateToken = (req, res, next) => {
    // Get the token from the request headers, query string, or cookies
    const token = req.headers?.authorization || req.headers?.token || req.cookies?.token;

    if (!token) {
        return res.status(401).json({ message: 'Authentication token not found' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, 'process.env.JWT_SECRET');

        // Attach the decoded payload to the request object
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
