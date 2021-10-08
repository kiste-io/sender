const connector = require('@kiste/backend-mongo-connector')


const mongoURI = `${process.env.MONGO_URI}`

// Database Name
const dbName = `${process.env.MONGO_DB_NAME}`
const connection = connector(mongoURI, dbName)





const adknowledgeToken = (token) => new Promise((resolve, reject) => {

	reject({})
})

const accepetConfirmation = (payload) => new Promise((resolve, reject) => {

	resolve(payload)
})

module.exports = {
	adknowledgeToken,
	accepetConfirmation
}

