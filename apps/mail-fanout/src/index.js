const express = require('express')
const cors = require('./cors')
const { 
	mailSender, 
	sendToPredefinedAddress, 
	sendToObtainedAddress
} = require('@kiste/sender-mail')

const mailMonitoring = require('@kiste/sender-mail/prometheus')
const {APP_PORT, DEBUG} = require('./config')
const nodeJsMonitoring = require('./prometheus')

const auth = require('@kiste/sender-simple-auth/express')
const template = require('@kiste/sender-template/express')



var app = express()
app.use(express.json())
app.use(cors.middelware())
app.use('', template.router)
app.use('/', nodeJsMonitoring.expressRouter)
app.use('/mail', mailMonitoring.expressRouter)
app.use('/auth', auth.router)
app.use(auth.verifyAuthTokenMiddleware)
app.use('/mail/send', (req, res) => {

	mailSender(req.body, [
		[sendToPredefinedAddress, 'list'], 
		[sendToObtainedAddress, 'message']
	])
		.then(([_, result]) => {
			res.send(DEBUG && result || '')
			mailMonitoring.success(result)
		})
		.catch(e => {
			console.error(e)        
			res.status(e.status || 500).send()
			mailMonitoring.failure()
		})
})

app.listen(APP_PORT, () => console.log(`mail-fanout is running on local port ${APP_PORT}`))
