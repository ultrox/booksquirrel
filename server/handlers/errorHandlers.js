/*
  Catch Errors Handler
  With async/await, you need some way to catch errors Instead of using try{}
  catch(e) {} in each controller, we wrap the function in catchErrors(), catch
  and errors they throw, and pass it along to our express middleware with
  next()
*/
exports.catchErrors = (fn) => (req, res, next) => fn(req, res, next).catch(next);

/*
  Not Found Error Handler If we hit a route that is not found, we mark it as
  404 and pass it along to the next error handler to display
*/
exports.notFound = (req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
};

/*
  Development Error Handler In development we show good error messages so if we
  hit a syntax error or any other previously un-handled error, we can show good
  info on what happened
*/
exports.developmentErrors = (err, req, res) => {
  // eslint-disable-next-line no-param-reassign
  err.stack = err.stack || "";
  const errorDetails = {
    message: err.message,
    status: err.status,
    stackHighlighted: err.stack,
  };
  res.status(err.status).json(errorDetails); // Ajax call, send JSON back
};

/*
  Production Error Handler
  No stacktrace are leaked to user
*/
exports.productionErrors = (err, req, res) => {
  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
};
