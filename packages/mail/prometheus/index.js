const client = require('prom-client');
const express = require('express')
const expressRouter = express.Router();

const {
    SEND_OBTAINED_EMAIL_LABEL, 
    SEND_PREDEFINED_EMAIL_LABEL
} = require('../src')



// Create a Registry which registers the metrics
const register = new client.Registry()

// Add a default label which is added to all metrics
register.setDefaultLabels({
  app: 'kiste_sender_mail'
})



const obtainedCounter = new client.Counter({
    name: `${SEND_OBTAINED_EMAIL_LABEL}_counter`,
    help: 'email sended by obtaining an address',
    registers: [register],
  });
  
const predefinedCounter = new client.Counter({
    name: `${SEND_PREDEFINED_EMAIL_LABEL}_counter`,
    help: 'email sended to predefined address',
    registers: [register],
});


const failedRequestsCounter = new client.Counter({
    name: `request_failed_counter`,
    help: 'not sucessful requests counter',
    registers: [register],
  });

expressRouter.get('/metrics', async (_, res) => {
    res.set('Content-Type', register.contentType)
    const metrics = await register.metrics()
    res.send(metrics)
})

module.exports = {
    
    expressRouter,

    success: (result) => {
        result.forEach(({label, result}) => {

            switch (`${label}_counter`) {

                case obtainedCounter.name:
                    obtainedCounter.inc()
                break;
                case predefinedCounter.name:
                    predefinedCounter.inc()
                break;

            }
            
            
        });
    },

    failure: () => {
        failedRequestsCounter.inc()
    }

}