import fs from "fs/promises";
import type Koa from "koa";
import { admin } from "../config/users";
import { MESSAGE_FILE } from "../config/messages";

const statsHandler = async (ctx: Koa.Context) => {
  const { token } = ctx.request.headers;

  if (token !== admin.token) {
    ctx.status = 401;
    return;
  }

  ctx.status = 200;
  ctx.response.body = JSON.parse(await readFile());
};

const readFile = async () => {
  return await fs.readFile(MESSAGE_FILE, "utf8");
};

export { statsHandler };
