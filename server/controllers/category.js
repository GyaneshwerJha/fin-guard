import mongoose from "mongoose";
import Category from "../models/category.js";
import moment from "moment-timezone";

const { ObjectId } = mongoose.Types;

/**
 * Creates a new category.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing status, message, and created category data.
 */
export const create = async (req, res) => {
    try {
        const { name, type } = req.body;

        const category = new Category({
            name,
            type,
            user: req.userId,
        });

        await category.save();

        return res.status(201).json({
            status: true,
            message: "Category created successfully",
            data: category,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: false, message: error.message });
    }
};

/**
 * Retrieves all categories for the logged-in user.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing status, message, and fetched categories data.
 */
export const get = async (req, res) => {
    try {
        const categories = await Category.find({
            user: req.userId,
            isDeleted: false,
        }).sort({ type: 1 });

        return res.status(200).json({
            status: true,
            message: "Categories fetched successfully",
            data: categories,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: error.message });
    }
};

/**
 * Retrieves donut chart data based on the specified account, fromDate, and toDate.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing status, message, and donut chart data.
 */
export const getDonutChartData = async (req, res) => {
    try {
        const { account, fromDate, toDate } = req.query;

        let values = [];
        let labels = [];

        const pipeline = [
            {
                $match: {
                    isDeleted: false,
                    user: new ObjectId(req.userId),
                    type: "EXPENSE",
                },
            },
            {
                $lookup: {
                    from: "transactions",
                    localField: "_id",
                    foreignField: "category",
                    as: "transactions",
                },
            },
            {
                $unwind: "$transactions",
            },
            {
                $match: {
                    "transactions.isDeleted": false,
                    ...(account && {
                        "transactions.account": new ObjectId(account),
                    }),
                    ...(fromDate && {
                        "transactions.date": {
                            $gte: new Date(moment(fromDate).startOf("day").toDate()),
                        },
                    }),
                    ...(toDate && {
                        "transactions.date": {
                            $lte: new Date(moment(toDate).endOf("day").toDate()),
                        },
                    }),
                },
            },
            {
                $group: {
                    _id: "$name",
                    amount: { $sum: "$transactions.amount" },
                },
            },
            {
                $project: {
                    _id: 0,
                    name: "$_id",
                    amount: 1,
                },
            },
        ];

        const data = await Category.aggregate(pipeline);

        data.forEach((item) => {
            values.push(item.amount);
            labels.push(item.name);
        });

        return res.status(200).json({
            status: true,
            message: "Categories fetched successfully",
            data: {
                labels,
                values,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: error.message });
    }
};

/**
 * Retrieves a single category by its ID for the logged-in user.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing status, message, and fetched category data.
 */
export const getById = async (req, res) => {
    try {
        const category = await Category.findOne({
            _id: req.params.id,
            user: req.userId,
            isDeleted: false
        });

        if (!category) {
            return res.status(404).json({
                status: false,
                message: "Category not found",
            });
        }

        return res.status(200).json({
            status: true,
            message: "Category fetched successfully",
            data: category,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: error.message });
    }
};

/**
 * Updates a category by its ID for the logged-in user.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing status, message, and updated category data.
 */
export const update = async (req, res) => {
    try {
        const category = await Category.findOne({
            _id: req.params.id,
            user: req.userId,
        });

        if (!category) {
            return res.status(404).json({
                status: false,
                message: "Category not found",
            });
        }

        category.name = req.body.name;
        category.type = req.body.type;

        await category.save();

        return res.status(200).json({
            status: true,
            message: "Category updated successfully",
            data: category,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: error.message });
    }
};

/**
 * Soft deletes a category by its ID for the logged-in user.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing status and message.
 */
export const remove = async (req, res) => {
    try {
        const category = await Category.findOne({
            _id: req.params.id,
            user: req.userId,
        });

        if (!category) {
            return res.status(404).json({
                status: false,
                message: "Category not found",
            });
        }

        category.isDeleted = true;

        await category.save();

        return res.status(200).json({
            status: true,
            message: "Category deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: error.message });
    }
};
