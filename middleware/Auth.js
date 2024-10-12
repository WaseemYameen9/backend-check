const jwt = require('jsonwebtoken');

let SecretKey = '1c279d2dcdb8aac5259c1d5b474d558289f2cba9551b4e8293a39430ecbae97f';

const authMiddleware = (req, res, next) => {

    // Get the token from cookies
    const token = req.cookies.token; // Replace 'token' with the name of your cookie if different

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, SecretKey);
        // req.user = decoded; // Attach the decoded user info to the request
        next(); // Call the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
