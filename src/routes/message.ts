import type Koa from "koa";
import invariant from "tiny-invariant";
import { users } from "../users";

const messageHandler = (ctx: Koa.Context) => {
  const { token } = ctx.request.headers;
  const { from, to, message } = ctx.request.body;

  invariant(token, "token is required");
  invariant(from, "from is required");
  invariant(to, "to is required");
  invariant(message, "to is required");

  if (!users.find((user) => user.token === token)) {
    ctx.status = 401;
    return;
  }

  ctx.status = 200;
};

export { messageHandler };
