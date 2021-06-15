# Sender
node.js packages for sending mails like a charm


## Developement

```
npm run bootstrap
```


## Examples

for example to start `mail-fanout` app just execute the following steps

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

