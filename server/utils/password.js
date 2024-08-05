import bcrypt from 'bcryptjs';

/**
 * Hashes the given password using bcrypt.
 * 
 * @param {string} password - The plaintext password to hash.
 * @returns {Promise<string>} - The hashed password.
 * @throws {Error} - If an error occurs during hashing.
 */
export const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        return hashed;
    } catch (error) {
        throw new Error('Error generating hashed password');
    }
};

/**
 * Compares a plaintext password with a hashed password.
 * 
 * @param {string} password - The plaintext password to compare.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @returns {Promise<boolean>} - True if the passwords match, otherwise false.
 * @throws {Error} - If an error occurs during comparison.
 */
export const comparePasswords = async (password, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (error) {
        throw new Error('Error comparing passwords');
    }
};
