import fs from "fs/promises";
import { MESSAGE_FILE } from "../config/messages";

const createMessageFileIfNotPresent = async () => {
  try {
    const fh = await fs.open(MESSAGE_FILE, "a");
    await fh.close();
  } catch (e) {
    console.error("Failed to create message file", e);
    throw e;
  }
};

export { createMessageFileIfNotPresent };
