const jwt = require("jsonwebtoken");
require('dotenv').config();

const auth = async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).send({ msg: 'Please Login' }); 
  
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (decoded) {
          req.headers.userid = decoded.userid; 
          next();
        } else {
          res.status(401).send({ msg: 'Invalid token', err });
        }
      });
    } catch (error) {
      res.status(500).send({ msg: "You are not authorized to enter this route" });
    }
  };
  

module.exports = {
    auth
}