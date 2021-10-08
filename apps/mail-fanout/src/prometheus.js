const client = require('prom-client');
const express = require('express')
const expressRouter = express.Router();

// Create a Registry which registers the metrics
const register = new client.Registry()

// Add a default label which is added to all metrics
register.setDefaultLabels({
  app: 'kiste_mail_fanout'
})

// Enable the collection of default metrics
client.collectDefaultMetrics({ register })

expressRouter.get('/metrics', async (_, res) => {
    res.set('Content-Type', register.contentType)
    const metrics = await register.metrics()
    res.send(metrics)
})

module.exports = {
    expressRouter
}
