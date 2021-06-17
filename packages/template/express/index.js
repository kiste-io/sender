const express = require('express')
const {
    EMAIL_IMAGES_URL_PATH,
    EMAIL_TEMPLATES_IMAGES_DIR_PATH
} = require('../src/config')
const router = express.Router()
const fs = require('fs')


router.get(`${EMAIL_IMAGES_URL_PATH}/:image`, (req, res) => {
    const {image} = req.params
    const path = `${EMAIL_TEMPLATES_IMAGES_DIR_PATH}/${image}`
    fs.exists(path, (exists) => {
        if(!exists) {
            res.status(404)
            res.send(`can not read file by id: ${entity_uuid}`)
        }else {
            res.sendFile(path)
        }
    })    
})


module.exports = {
    router
}
