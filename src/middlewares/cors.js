export const cors = (origins = '*', headers = 'Authorization, Content-Type, X-Requested-With, Origin, Accept', methods = 'POST, GET, PATCH, DELETE, PUT, OPTIONS') => {
  return async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', origins);
    res.header('Access-Control-Allow-Headers', headers);
    res.header('Access-Control-Allow-Methods', methods);
    next();
  };
};
