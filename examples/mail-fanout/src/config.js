require('dotenv').config()

const APP_PORT = process.env.APP_PORT || '8080';
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS || '';

module.exports = {
    APP_PORT,
    ALLOWED_ORIGINS
}
