const cors = require('cors')
const { ALLOWED_ORIGINS} = require('./config')

const allowlist = ALLOWED_ORIGINS.split(',')
var corsOptions = function (req, callback) {
	var corsOptions
	if (allowlist.indexOf(req.header('Origin')) !== -1) {
		corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
	} else {
		corsOptions = { origin: false } // disable CORS for this request
	}
	callback(null, corsOptions) // callback expects two parameters: error and options
}


module.exports = {
	middelware: () => cors(corsOptions)
}