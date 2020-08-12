//custom middleware

module.exports = () => {
  return (req, res, next) => {
    const time = new Date().toISOString();
    const method = req.method;
    const host = req.ip;

    console.log(time, method, host);

    next();
  };
};
