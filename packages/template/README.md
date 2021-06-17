# `@kiste/sender-template`


## Usage

provide first your path to templates over `.env` variable `EMAIL_TEMPLATES_DIR_PATH`

If you want to use media files in your templates, most likely you will also need to put them somewhere in internet, for this case you will need to define following `.env` variables:
-  EMAIL_MEDIA_HOST 
in case you still want to ship them out of node.js app
-  EMAIL_TEMPLATES_MEDIA_DIR_PATH
-  EMAIL_MEDIA_URL_PATH

 
```
const templater = require('@kiste/sender-template');

const html = templater(templateName, payload).compile()
```


## Implemented template engines

- [handlebars](http://handlebarsjs.com/)
