import type Koa from "koa";
import { admin } from "../config/users";
import { readMessage } from "../utils/file";

const statsHandler = async (ctx: Koa.Context) => {
  const { token } = ctx.request.headers;

  // TODO find a better way to guard routes (with a route based middleware probably?)
  if (token !== admin.token) {
    ctx.status = 401;
    return;
  }

  ctx.status = 200;
  // TODO is this prone to a race condition?
  const message = await readMessage();
  ctx.response.body = message.length === 0 ? {} : JSON.parse(message);
};

export { statsHandler };
