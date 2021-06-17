const express = require('express')
const { 
    mailSender, 
    sendToPredefinedAddress, 
    sendToObtainedAddress
} = require('@kiste/sender-mail')

const mailMonitoring = require('@kiste/sender-mail/prometheus')
const {APP_PORT} = require('./config')
const nodeJsMonitoring = require('./prometheus')

const auth = require('@kiste/sender-simple-auth/express')
const template = require('@kiste/sender-template/express')

var app = express()
app.use(express.json());

app.use('/', nodeJsMonitoring.expressRouter)
app.use('/', template.router)
app.use('/mail', mailMonitoring.expressRouter)
app.use('/auth', auth.router)



app.use(auth.verifyAuthTokenMiddleware)


app.use('/mail/send', (req, res) => {

    mailSender(req.body, [
        [sendToPredefinedAddress, 'list'], 
        [sendToObtainedAddress, 'message']
    ])
    .then(([_, result]) => {
        res.send(result)
        mailMonitoring.success(result)
    })
    .catch(e => {
        console.error(e)
        res.status(500).send(e)
        mailMonitoring.failure()
    })

})

app.listen(APP_PORT)
