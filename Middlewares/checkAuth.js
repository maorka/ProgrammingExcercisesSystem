const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env' });

const checkAuth = (req, res, next) => {
  //console.log(token);
  try {
    let token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_KEY);
    next();
    console.log("Action successful bs Authentication successful");

  } catch (error) {
    res.status(401).json({
      message: `Authentication Failed because: ${error}`
    })
    console.log("Action failed because bad Authentication");
  }

}

module.exports = checkAuth;


