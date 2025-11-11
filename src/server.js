import express from 'express'
import fs from 'fs'
import productRoutes from '../routes/productRoutes.js'
import errorHandler from '../middleware/errorHandler.js'

const app = express();
app.use(express.json());

// Routes
app.use('/products', productRoutes);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use(errorHandler);

const PORT = 4545;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
