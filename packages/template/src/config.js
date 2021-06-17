require('dotenv').config()


const EMAIL_TEMPLATES_DIR_PATH = process.env.EMAIL_TEMPLATES_DIR_PATH || './templates/mail'
const EMAIL_TEMPLATES_IMAGES_DIR_PATH = process.env.EMAIL_TEMPLATES_IMAGES_DIR_PATH || './templates/mail/imgs'
const EMAIL_IMAGES_HOST = process.env.EMAIL_IMAGES_HOST || 'http://localhost:8080'
const EMAIL_IMAGES_URL_PATH = process.env.EMAIL_IMAGES_URL_PATH || '/templates/images'



module.exports = {
    
    EMAIL_TEMPLATES_DIR_PATH,
    EMAIL_TEMPLATES_IMAGES_DIR_PATH,
    EMAIL_IMAGES_HOST,
    EMAIL_IMAGES_URL_PATH
    
}