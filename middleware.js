export const logger = (req, res, next) => {
  const splitUrl = req.url.split("/");
  if (splitUrl.length > 2) {
    req.BLOG_SLUG = splitUrl[2];
  }
  console.log(`${req.method} ${req.url}`);
  next();
};

export const setHeaders = (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
};
