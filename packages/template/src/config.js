require('dotenv').config()


const EMAIL_TEMPLATES_DIR_PATH = process.env.EMAIL_TEMPLATES_DIR_PATH || './templates/mail'
const EMAIL_TEMPLATES_MEDIA_DIR_PATH = process.env.EMAIL_TEMPLATES_MEDIA_DIR_PATH || './templates/mail/media'
const EMAIL_MEDIA_HOST = process.env.EMAIL_MEDIA_HOST || 'http://localhost:8080'
const EMAIL_MEDIA_URL_PATH = process.env.EMAIL_MEDIA_URL_PATH || '/templates/media'



module.exports = {
    
    EMAIL_TEMPLATES_DIR_PATH,
    EMAIL_TEMPLATES_MEDIA_DIR_PATH,
    EMAIL_MEDIA_HOST,
    EMAIL_MEDIA_URL_PATH
    
}