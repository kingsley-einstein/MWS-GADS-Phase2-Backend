export const cors = (origins = '*', headers = 'Authorization, Content-Type', methods = 'POST, GET, PATCH, DELETE, PUT') => {
  return async (req, res, next) => {
    res.header('Access-Control-Allow-Origins', origins);
    res.header('Access-Control-Allow-Headers', headers);
    res.header('Access-Control-Allow-Methods', methods);
    next();
  };
};
