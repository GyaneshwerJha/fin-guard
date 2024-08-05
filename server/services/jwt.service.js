import jwt from 'jsonwebtoken';

/**
 * Generates an access token for the given user ID.
 * 
 * @param {string} userId - The user ID to include in the token payload.
 * @returns {string} - The generated JWT.
 */
export const generateAccessToken = (userId) => {
    const payload = { userId };
    const options = { expiresIn: process.env.JWT_EXPIRE_IN };
    const token = jwt.sign(payload, process.env.JWT_SECRET, options);
    return token;
};

/**
 * Verifies the given JWT and returns the decoded payload.
 * 
 * @param {string} token - The JWT to verify.
 * @returns {object} - The decoded token payload.
 * @throws {Error} - If the token is invalid or expired.
 */
export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};
