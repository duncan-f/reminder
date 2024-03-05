import schedule from "node-schedule";
import { getRemindersByUserId } from "@/data/reminders";
import { sendNotification } from "./send-notification";

const scheduleNotifications = async (userId: string) => {
  const reminders = await getRemindersByUserId(userId);

  if (!reminders) return null;

  reminders?.map(async (reminder) => {
    const daterdv = reminder.dateRdv;

    // Schedule notifications to be sent at a given time
    const task = schedule.scheduleJob(daterdv, async () => {
      try {
        const message = `Rendez-vous chez le docteur ${
          reminder.name
        }\nPour le ${new Date(reminder.dateRdv).toLocaleString("fr-FR", {
          weekday: "short",
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        })}`;

        await sendNotification(message);

        console.log("Notification sent successfully");
      } catch (error) {
        console.error("Failed to send notification:", error);
      }
    });
  });
};

export default scheduleNotifications;
