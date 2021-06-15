const {encrypt, decrypt} = require('./crypto')
const {getCurrentTimestamptInSeconds} = require('./time')
const { 
    SESSION_TOKEN_DURATION
} = require('./config');

const createTemporarySessionToken = () => {

    const data = encrypt(JSON.stringify({
        expirationTime: getCurrentTimestamptInSeconds() + SESSION_TOKEN_DURATION
    }))

    return Buffer.from(JSON.stringify(data)).toString('base64')    
}


const createTemporaryAuthTokenFromRequest = () => new Promise((resolve, ) => {

    // TODO handle rejection conditions
    //  put in memory storage: 
    // - for ip(with client agent, etc), that already got a token and reject it, if tries to obtain a new one in less then a sec or smth. like that
    // - for sum of currently valid token, i would say if it goes over 100, then it kind of strange i will reject everything over it.

    
    resolve(createTemporarySessionToken())
})
    

const isValidToken = (token) => {

    const data = Buffer.from(token, 'base64').toString('ascii');    

    const payload = JSON.parse(data);
    const decryptedToken = JSON.parse(decrypt(payload)) || {};
   
    if (!decryptedToken.expirationTime) {
      return false;
    }

    const currentTimestamp = getCurrentTimestamptInSeconds();

    return decryptedToken.expirationTime> currentTimestamp;
}




module.exports = {
    AUTH_HEADER_KEY: 'authorization',
    isValidToken,
    createTemporaryAuthTokenFromRequest
}