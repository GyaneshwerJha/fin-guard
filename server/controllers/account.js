import Account from '../models/account.js';
import mongoose from 'mongoose';

/**
 * Creates a new account for the authenticated user.
 *
 * @param {Object} req - Express request object.
 * @param {Object} req.body - Request body containing account details.
 * @param {string} req.body.name - Name of the account.
 * @param {string} req.body.type - Type of the account.
 * @param {number} req.body.balance - Initial balance of the account.
 * @param {string} req.userId - User ID extracted from the request (e.g., from JWT).
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
export const createAccount = async (req, res) => {
    try {
        const { name, type, balance } = req.body;

        const newAccount = new Account({
            name,
            type,
            balance,
            user: req.userId,
        });

        await newAccount.save();

        return res.status(201).json({
            status: true,
            message: "Account created successfully",
            data: newAccount,
        });
    } catch (error) {
        console.error('Failed to create account:', error);
        return res.status(500).json({
            status: false,
            message: "Failed to create account: " + error.message,
        });
    }
};

/**
 * Retrieves all accounts for the authenticated user.
 *
 * @param {Object} req - Express request object.
 * @param {string} req.userId - User ID extracted from the request (e.g., from JWT).
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
export const getAllAccounts = async (req, res) => {
    try {
        const accounts = await Account.find({
            user: new mongoose.Types.ObjectId(req.userId),
            isDeleted: false,
        });

        return res.status(200).json({
            status: true,
            message: "Accounts fetched successfully",
            data: accounts,
        });
    } catch (error) {
        console.error('Failed to fetch accounts:', error);
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};

/**
 * Retrieves a specific account by ID for the authenticated user.
 *
 * @param {Object} req - Express request object.
 * @param {string} req.params.id - Account ID.
 * @param {string} req.userId - User ID extracted from the request (e.g., from JWT).
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
export const getAccountById = async (req, res) => {
    try {
        const account = await Account.findOne({
            _id: req.params.id,
            user: req.userId,
            isDeleted: false,
        });

        if (!account) {
            return res.status(404).json({
                status: false,
                message: "Account not found",
            });
        }

        return res.status(200).json({
            status: true,
            message: "Account fetched successfully",
            data: account,
        });
    } catch (error) {
        console.error('Failed to fetch account:', error);
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};

/**
 * Updates an existing account for the authenticated user.
 *
 * @param {Object} req - Express request object.
 * @param {Object} req.body - Request body containing updated account details.
 * @param {string} req.body.name - Updated name of the account.
 * @param {string} req.body.type - Updated type of the account.
 * @param {number} req.body.balance - Updated balance of the account.
 * @param {string} req.params.id - Account ID.
 * @param {string} req.userId - User ID extracted from the request (e.g., from JWT).
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
export const updateAccount = async (req, res) => {
    try {
        const account = await Account.findOne({
            _id: req.params.id,
            user: req.userId,
        });

        if (!account) {
            return res.status(404).json({
                status: false,
                message: "Account not found",
            });
        }

        const { name, type, balance } = req.body;
        account.name = name;
        account.type = type;
        account.balance = balance;
        await account.save();

        return res.status(200).json({
            status: true,
            message: "Account updated successfully",
            data: account,
        });
    } catch (error) {
        console.error('Failed to update account:', error);
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};

/**
 * Deletes an account for the authenticated user by marking it as deleted.
 *
 * @param {Object} req - Express request object.
 * @param {string} req.params.id - Account ID.
 * @param {string} req.userId - User ID extracted from the request (e.g., from JWT).
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
export const deleteAccount = async (req, res) => {
    try {
        const account = await Account.findOne({
            _id: req.params.id,
            user: req.userId,
        });

        if (!account) {
            return res.status(404).json({
                status: false,
                message: "Account not found",
            });
        }

        account.isDeleted = true;
        await account.save();

        return res.status(200).json({
            status: true,
            message: "Account deleted successfully",
        });
    } catch (error) {
        console.error('Failed to delete account:', error);
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};
