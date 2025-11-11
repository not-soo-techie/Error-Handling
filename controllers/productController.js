import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFile = path.join(__dirname, '../data/products.json');

const readData = async () => {
  const data = await fs.readFile(dataFile, 'utf-8');
  return JSON.parse(data);
};

const writeData = async (data) => {
  await fs.writeFile(dataFile, JSON.stringify(data, null, 2));
};

// [To-Do 1] 👉 Read products from JSON file
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await readData();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

// [To-Do 3] 👉 Handle product not found scenario and get Product by Id
export const getProductById = async (req, res, next) => {
  try {
    const products = await readData();
    const product = products.find(p => p.id === parseInt(req.params.id));

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    next(err);
  }
};

// [To-Do 2] 👉 Handle Invalid product data scenario and create a new product
export const addProduct = async (req, res, next) => {
  try {
    const { name, price } = req.body;
    if (!name || typeof price !== 'number') {
      return res.status(400).json({ error: 'Invalid product data' });
    }

    const products = await readData();
    const newProduct = {
      id: products.length ? products[products.length - 1].id + 1 : 1,
      name,
      price
    };
    products.push(newProduct);
    await writeData(products);

    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { name, price } = req.body;

    if (!name || typeof price !== 'number') {
      return res.status(400).json({ error: 'Invalid product data' });
    }

    const products = await readData();
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }

    products[index] = { id, name, price };
    await writeData(products);

    res.json(products[index]);
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const products = await readData();

    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const deleted = products.splice(index, 1);
    await writeData(products);

    res.json(deleted[0]);
  } catch (err) {
    next(err);
  }
};
