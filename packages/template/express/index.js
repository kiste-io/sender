const express = require('express')
const {
    EMAIL_MEDIA_URL_PATH,
    EMAIL_TEMPLATES_MEDIA_DIR_PATH
} = require('../src/config')
const router = express.Router()
const fs = require('fs')


router.get(`${EMAIL_MEDIA_URL_PATH}/:image`, (req, res) => {
    const {image} = req.params
    const path = `${EMAIL_TEMPLATES_MEDIA_DIR_PATH}/${image}`
    console.log('path', path)
    fs.exists(path, (exists) => {
        if(!exists) {
            res.status(404)
            console.error(`can not read file ${path}`)
            res.send()
        }else {
            res.sendFile(path)
        }
    })    
})


module.exports = {
    router
}
