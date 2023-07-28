import Koa from "koa";
import Parser from "@koa/bodyparser";
import Router from "@koa/router";
import { loginHandler, logoutHandler, statsHandler } from "./routes";

const app = new Koa();
const router = new Router();

router.get("/stats", statsHandler);
router.post("/auth/login", loginHandler);
router.post("/auth/logout", logoutHandler);

app
  .use(Parser())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000);