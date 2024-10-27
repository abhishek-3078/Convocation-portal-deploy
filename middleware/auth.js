const jwt = require("jsonwebtoken");

module.exports.isAuth = async (req, res, next) => {
    try {
      console.log(req.headers.authorization);
      const decode = jwt.verify(req.headers.authorization , process.env.JWT_SECRET)
      req.user = decode;
      next();
    } catch (err) {
      console.log("error",err.message);
      return res.json({
        success : false ,
        error : err
      })
    }
  };
  