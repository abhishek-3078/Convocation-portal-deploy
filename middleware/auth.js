const jwt = require("jsonwebtoken");

module.exports.isAuth = async (req, res, next) => {
    try {
<<<<<<< HEAD
      const decode = jwt.verify(req.headers.authorization , process.env.JWT_SECRET);
      console.log(decode);
=======
      console.log(req.headers.authorization);
      const decode = jwt.verify(req.headers.authorization , process.env.JWT_SECRET)
>>>>>>> d3df84c5304b2b0866b89373d4fd5e3d2a7b3b01
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
  