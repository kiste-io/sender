const express = require('express')
const cors = require('./cors')
const { 
	mailSender, 
	sendToObtainedAddress
} = require('@kiste/sender-mail')

const {
    accepetConfirmation
} = require('@kiste/sender-confirmation')

const mailMonitoring = require('@kiste/sender-mail/prometheus')
const {APP_PORT, DEBUG} = require('./config')
const nodeJsMonitoring = require('./prometheus')

const authRouter = require('@kiste/sender-simple-auth/express').router
const templateRouter = require('@kiste/sender-template/express').router
const confirmRouter = require('@kiste/sender-confirmation/express').router



var app = express()
app.use(express.json())
app.use(cors.middelware())
app.use('', templateRouter)
app.use('/', nodeJsMonitoring.expressRouter)
app.use('/mail', mailMonitoring.expressRouter)
app.use('/auth', authRouter)
app.use('/confirm', confirmRouter)

app.use(auth.verifyAuthTokenMiddleware)

app.post('/accepet/confirm', (req, res) => {


    const data = accepetConfirmation(req.body)

	mailSender(data, [
		[sendToObtainedAddress, 'confirmation']
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
