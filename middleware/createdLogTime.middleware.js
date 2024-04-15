exports.createUserLogTimeMiidleWare = (req, res, next) => {
  console.log(
    `${new Date().toLocaleString()} and access method's ${
      req.method
    } and it's route is ${req.url}`
  );
  next();
};
