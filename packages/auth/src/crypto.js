const crypto = require('crypto');
const { 
    CRYPTO_ALGORITHM,
    CRYPTO_SECRET_KEY,
    CRYPTO_RANDOM_BYTES
} = require('./config');


const algorithm = CRYPTO_ALGORITHM;
const secretKey = CRYPTO_SECRET_KEY;
const iv = crypto.randomBytes(parseInt(CRYPTO_RANDOM_BYTES));

const encrypt = (text) => {

    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
};

const decrypt = (hash) => {

    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));

    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

    return decrpyted.toString();
};

module.exports = {
    encrypt,
    decrypt
};
