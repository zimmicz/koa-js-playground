import type Koa from "koa";
import { admin } from "../users";

const statsHandler = async (ctx: Koa.Context) => {
  const { token } = ctx.request.headers;

  if (token !== admin.token) {
    ctx.status = 401;
    return;
  }

  ctx.status = 200;
  ctx.response.body = {
    numberOfCalls: 5,
    lastMessage: "hello world",
  };
};

export { statsHandler };
