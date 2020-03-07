# google-home-notifier-api

[![CircleCI](https://circleci.com/gh/inouetakuya/google-home-notifier-api.svg?style=svg)](https://circleci.com/gh/inouetakuya/google-home-notifier-api)

Web API for Send notifications to Google Home

## Setup

```shell
npm install
```

```shell
cp .env.example .env
```

- Set your Google Home IP address to `.env`
- Sign up ngrok and set your token to `.env` so that your tunnels don't time out

## Development

```shell
npm run dev
```

```shell
curl -X POST -H "Accept: application/json" -H 'Content-Type: application/json' -d '{"text":"Hello world"}' http://localhost:3000/notifications
```

```shell
curl -X POST -H "Accept: application/json" -H 'Content-Type: application/json' -d '{"text":"日本語でおk"}' http://localhost:3000/notifications
```

## Testing

```shell
npm run test
```

## Production

```shell
npm run build
npm run start NODE_ENV=production 
```

copy your ngrok url from stdout.

```
Forwarding: https://xxxxxxxx.ngrok.io
-> http://localhost:3000
```

```shell
curl -X POST -H "Accept: application/json" -H 'Content-Type: application/json' -d '{"text":"Hello world"}' https://xxxxxxxx.ngrok.io/notifications
```

### Fix URL with AWS API Gateway (optional)

- Create AWS API Gateway
- Set your AWS API Gateway info to `.env`

```shell
npm run build
npm run start NODE_ENV=production 
```

copy your AWS API Gateway url from stdout.

```
HttpProxy: https://xxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/prod/notifications
-> https://0812016c.jp.ngrok.io/notifications
-> http://localhost:3000/notifications
```

```shell
curl -X POST -H "Accept: application/json" -H 'Content-Type: application/json' -d '{"text":"Hello world"}' https://xxxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/prod/notifications
```

## License

See [LICENSE](./LICENSE)
