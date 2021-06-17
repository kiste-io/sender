# mail-fanout

node.js app for sending multiple mails to different resipients

## Usage

to bootsrap the app

```
cd examples/mail-fanout
cp .env.example .env
docker-compose up -d
npm run dev
```

please don't forget to pass variables in `.env` that suites to your case best

then obtain a token
```curl
curl --location --request POST 'localhost:8080/auth/token'
```

and start sending mails
```curl
curl --location --request POST 'localhost:8080/mail/send' \
--header 'Authorization: Bearer <auth_token>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "some@existing.mail",
    "model": "xl"
}'

```


### Schema validation

put your json schema to the folder and point to them by  `.env` variable  `PAYLOAD_SCHEMAS_DIR_PATH`, by default it will look in your `<project_root>/schemas` directory. 
The name of json schema file, should be equal to template name key. For example for template name `list.handlebars.html` json schema file have to be named as `list.json`


### Prometheus

Prometheus in this setup is running in docker. In oder to be able to scrap your node.js running on a host, please provide an intranet ip of your host.

````yaml
- job_name: 'app_nodejs'
    ...
    - targets: ['<intranet_ip>:8080']

  - job_name: 'app_mail'
    ...
    - targets: ['<intranet_ip>:8080']
````


You can check prometheus metrics on `http://localhost:9090`




