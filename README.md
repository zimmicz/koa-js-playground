## How to run

```
npm i --no-audit
npm run serve
```

## Improvements before going live

- write tests
- add logging
- set up precommit checks
- set up CI/CD

## Challenge rules

- For this challenge please create a public repo on GitHub that you can share with us.
- You should not spend more than 3 hours on the challenge. (Preferably spend around 2)
- Focus on implementing functionality which has been asked for below
- Note in code comments any changes required to make this production ready

## Challenge Details:

Create a new REST API application using Koa (https://github.com/koajs/koa) and modern Javascript (ES6) with 2 end points.

```
- POST /message
  {
  "from": string,
  "to": string,
  "message": string
  }
- GET /stats
  {
  "numberOfCalls": Number,
  "lastMessage": Object
  }
```

The application will preserve in a json file the number of time `/message` is called along with the last message.

Include /login and /logout end points for 2 hard-coded users:

- admin/secret
- user/secret

Any users can invoke the `POST /message` but only `admin` can invoke `GET /stats`
