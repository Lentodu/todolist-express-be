const logger = (req, res, next) => {
  const date = new Date().toISOString();
  const { method, originalUrl } = req;

  console.log(date, method, originalUrl);
  next();
};

export default logger;
