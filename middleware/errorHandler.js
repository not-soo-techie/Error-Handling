const errorHandler = (err, req, res, next) => {
  // [To-Do 5] 👉 Implement global error handling logic here
  res.status(500).json({ error: 'Internal Server Error' });
};

export default errorHandler;

