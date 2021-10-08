const express = require('express')

const router = express.Router()

const {
	adknowledgeToken
} = require('../src')


router.get('/token/:key', (req, res) => {

	const {key} = req.params
	adknowledgeToken(key)
		.then((token) => res.send(token))
		.catch((reason) => res.status(400).send(reason))
        
})

    


module.exports = {
	router
}
