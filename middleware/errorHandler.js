const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);
  if (err.code === 'ENOENT') {
    return res.status(500).json({ error: 'File not found or unreadable' });
  }
  res.status(500).json({ error: 'Internal Server Error' });
};

export default errorHandler;

