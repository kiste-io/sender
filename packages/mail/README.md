# `@kiste/sender-mail`

## Usage

```

const { mailSender, sendToPredefinedAddress } = require('@kiste/sender-mail')


// send email
mailSender(req.body, [[sendToPredefinedAddress, 'list']])
```

Take a look at a production ready example in [mail-fanout example](https://github.com/kiste-io/sender/tree/main/examples/mail-fanout)
