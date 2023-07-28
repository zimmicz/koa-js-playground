import type Koa from "koa";
import invariant from "tiny-invariant";
import { users } from "../config/users";
import { readMessageCount, writeMessage } from "../utils/file";

const messageHandler = async (ctx: Koa.Context) => {
  const { token } = ctx.request.headers;
  const { from, to, message } = ctx.request.body;

  invariant(token, "token is required");
  invariant(from, "from is required");
  invariant(to, "to is required");
  invariant(message, "message is required");

  if (!users.find((user) => user.token === token)) {
    ctx.status = 401;
    return;
  }

  try {
    const currentMessageCount = await readMessageCount();
    await writeMessage({
      lastMessage: { from, to, message },
      numberOfCalls: currentMessageCount + 1,
    });

    ctx.status = 200;
  } catch (e) {
    console.error(e);
    ctx.status = 400;
  }
};

export { messageHandler };
