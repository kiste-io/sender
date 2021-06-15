require('dotenv').config()

const SESSION_TOKEN_DURATION = parseInt(process.env.SESSION_TOKEN_DURATION) || 60

const CRYPTO_ALGORITHM = process.env.CRYPTO_ALGORITHM || "aes-256-ctr"
const CRYPTO_SECRET_KEY = process.env.CRYPTO_SECRET_KEY || "testtesttesttesttesttesttesttest"
const CRYPTO_RANDOM_BYTES = parseInt(process.env.CRYPTO_RANDOM_BYTES) || 16


module.exports = {

    SESSION_TOKEN_DURATION,

    CRYPTO_ALGORITHM,
    CRYPTO_SECRET_KEY,
    CRYPTO_RANDOM_BYTES, 
};
