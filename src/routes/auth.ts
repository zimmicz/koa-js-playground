import type Koa from "koa";
import invariant from "tiny-invariant";
import { users } from "../users";

const loginHandler = async (ctx: Koa.Context) => {
  const { username, password } = ctx.request.body;

  invariant(username, "username is required");
  invariant(password, "username is required");

  const authenticatedUser = users.find(
    (user) => user.password === password && user.username === username
  );

  invariant(authenticatedUser, "user not found");

  ctx.status = 201;
  ctx.response.body = { authToken: authenticatedUser.token };
};

const logoutHandler = (ctx: Koa.Context) => {
  const { username, authToken } = ctx.request.body;

  invariant(username, "username is required");
  invariant(authToken, "authToken is required");

  const authenticatedUser = users.find(
    (user) => user.token === authToken && user.username === username
  );

  invariant(authenticatedUser, "user not found");

  ctx.status = 200;
};

export { loginHandler, logoutHandler };
