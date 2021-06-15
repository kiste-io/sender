const express = require('express')

const router = express.Router()


const { isValidToken, createTemporaryAuthTokenFromRequest, AUTH_HEADER_KEY } = require('../src');


const verifyAuthTokenMiddleware = (req, res, next) => {  

  const bearerToken = req.headers && req.headers[AUTH_HEADER_KEY] && req.headers[AUTH_HEADER_KEY].split(' ')
  
  if (!bearerToken || bearerToken.length !== 2 || !isValidToken(bearerToken[1])) {
    res.status(401).send();
    return;
  }

  next();
};

router.post('/token', (_, res) => 
    createTemporaryAuthTokenFromRequest()
        .then(
            (token) => res.send(token))
        );


module.exports = {
    router,
    verifyAuthTokenMiddleware
}
