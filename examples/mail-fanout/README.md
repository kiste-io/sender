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

### Prometheus

Prometheus in this setup is running in docker. In oder to be able to scrap your node.js running on a host, please provide an intranet ip of your host.

````yaml
- job_name: 'app_nodejs'
    ...
    - targets: ['<intranet_ip>:8080']

  - job_name: 'app_mail'
    ...
    - targets: ['<intranet_ip>:8080']
```






