# `@kiste/sender-template`


## Usage

provide first your path to templates over `.env` variable `EMAIL_TEMPLATES_DIR_PATH`

```
const templater = require('@kiste/sender-template');

const html = templater(templateName, payload).compile()
```


## Implemented template engines

- [handlebars](http://handlebarsjs.com/)
