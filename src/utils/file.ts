import fs from "fs/promises";
import { MESSAGE_FILE } from "../config/messages";

type Message = {
  lastMessage: { from: string; to: string; message: string };
  numberOfCalls: number;
};

const writeMessage = async (message: Message) => {
  await fs.writeFile(MESSAGE_FILE, JSON.stringify(message), "utf8");
};

const readMessage = async (): Promise<string> => {
  return await fs.readFile(MESSAGE_FILE, "utf8");
};

const readMessageCount = async () => {
  const message = await readMessage();

  if (message.length === 0) {
    return 0;
  }

  const { numberOfCalls } = JSON.parse(message);

  return parseInt(numberOfCalls);
};

export { readMessage, writeMessage, readMessageCount };
