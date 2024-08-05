import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import DB from './config/DB.js';


// Routes
import userRoutes from './routes/user.js';
import accountRoutes from './routes/account.js';
import categoryRoutes from './routes/category.js';
import transactionRoutes from './routes/transaction.js';

// configure environment variables
dotenv.config();

// connect to the database
DB();

const app = express();
/* These lines of code are setting up middleware for the Express application: */
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        status: true,
        message: "Welcome the the finance"
    })
})

// Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/account', accountRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/transaction', transactionRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);  // Log the server is running on the specified port.
});