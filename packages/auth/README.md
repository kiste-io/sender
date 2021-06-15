# `@kiste/sender-simple-auth`


## Usage

integration with [express.js](https://expressjs.com/)
```
const auth = require('@kiste/sender-simple-auth/express');

... express initialisation

app.use('/auth', auth.router)
app.use(auth.verifyAuthTokenMiddleware)


```


Take a look at a production ready example in [mail-fanout example](https://github.com/kiste-io/sender/tree/main/examples/mail-fanout)
