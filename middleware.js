export const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

export const setJsonHeader = (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
};
