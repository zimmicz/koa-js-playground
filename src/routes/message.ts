import fs from "fs/promises";
import type Koa from "koa";
import invariant from "tiny-invariant";
import { users } from "../config/users";
import { MESSAGE_FILE } from "../config/messages";

const messageHandler = async (ctx: Koa.Context) => {
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

  try {
    const currentMessageCount = await readMessageCount();
    await writeMesage({
      lastMessage: { from, to, message },
      numberOfCalls: currentMessageCount + 1,
    });

    ctx.status = 200;
  } catch (e) {
    console.error(e);
    ctx.status = 400;
  }
};

const readMessageCount = async () => {
  const content = await fs.readFile(MESSAGE_FILE, "utf8");

  if (content.length === 0) {
    return 0;
  }

  const { numberOfCalls } = JSON.parse(content);

  return parseInt(numberOfCalls);
};

const writeMesage = async (message: {
  lastMessage: { from: string; to: string; message: string };
  numberOfCalls: number;
}) => {
  await fs.writeFile(MESSAGE_FILE, JSON.stringify(message), "utf8");
};

export { messageHandler };
