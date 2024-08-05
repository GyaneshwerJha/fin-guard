import User from '../models/user.js';
import * as jwtService from '../services/jwt.service.js';
import { hashPassword, comparePasswords } from '../utils/password.js';
import { z } from 'zod';

/**
 * Zod schema for validating user registration input.
 */
const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

/**
 * Registers a new user.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} req.body - Request body containing user registration data.
 * @param {string} req.body.name - User's name.
 * @param {string} req.body.email - User's email.
 * @param {string} req.body.password - User's password.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
export const register = async (req, res) => {
    try {
        const result = registerSchema.parse(req.body);
        const { name, email, password } = result;

        const existingUser = await User.findOne({ email, isDeleted: false });
        if (existingUser) {
            return res.status(400).json({ message: "User already registered" });
        }

        const hashedPassword = await hashPassword(password);
        const newUser = new User({ name, email, password: hashedPassword });

        await newUser.save();
        const token = await jwtService.generateAccessToken(newUser._id);

        return res.status(201).json({
            message: "User created successfully",
            data: {
                user: {
                    token,
                    name: newUser.name,
                    email: newUser.email,
                },
            },
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: error.errors,
            });
        }
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Logs in a user.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} req.body - Request body containing user login data.
 * @param {string} req.body.email - User's email.
 * @param {string} req.body.password - User's password.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, isDeleted: false });

        if (!user) {
            return res.status(400).json({ status: false, message: "Invalid email" });
        }

        const isPasswordValid = await comparePasswords(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ status: false, message: "Invalid password" });
        }

        const token = await jwtService.generateAccessToken(user._id);
        return res.status(200).json({
            status: true,
            message: "User logged in successfully",
            data: {
                token,
                user: {
                    name: user.name,
                    email: user.email,
                },
            },
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            status: false,
            message: "Internal server error",
        });
    }
};
/**
 * Retrieves user information by user ID.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.userId - User ID extracted from request (e.g., from JWT).
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
export const get = async (req, res) => {
    try {
        const user = await User.findById(req.userId, { password: 0 });
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

        return res.status(200).json({
            status: true,
            message: "User retrieved successfully",
            data: user,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};

/**
 * Updates user information.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} req.body - Request body containing user data to update.
 * @param {string} req.body.name - New user name.
 * @param {string} req.userId - User ID extracted from request (e.g., from JWT).
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
export const update = async (req, res) => {
    try {
        const user = await User.findById(req.userId, { password: 0 });
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

        user.name = req.body.name;
        await user.save();

        return res.status(200).json({
            status: true,
            message: "User updated successfully",
            data: {
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};

/**
 * Changes user's password.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} req.body - Request body containing password data.
 * @param {string} req.body.password - Current password.
 * @param {string} req.body.newPassword - New password.
 * @param {string} req.userId - User ID extracted from request (e.g., from JWT).
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
export const changePassword = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

        const isPasswordMatch = await comparePasswords(req.body.password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ status: false, message: "Invalid current password" });
        }

        const hashedPassword = await hashPassword(req.body.newPassword);
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({
            status: true,
            message: "Password updated successfully",
        });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};