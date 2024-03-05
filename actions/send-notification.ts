import { makePostRequest } from "@/lib/make-post-request";

const telegramBotKey = process.env.TELEGRAM_BOT_API_KEY as string;
const chat_id = process.env.TELEGRAM_USER_ID as string;

export const sendNotification = async (text: string) => {
  const endpoint = `https://api.telegram.org/bot${telegramBotKey}/sendMessage`;
  await makePostRequest(endpoint, {
    text,
    chat_id,
  });
};
