import { createMessageFileIfNotPresent } from "./setup";
import { createServer } from "./server";

createMessageFileIfNotPresent()
  .then(createServer)
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
