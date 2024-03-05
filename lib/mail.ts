import { getRemindersByUserId } from "@/data/reminders";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendNotificationEmail = async (userId: string, email: string) => {
  const reminders = await getRemindersByUserId(userId);

  if (!reminders) return { error: "No reminder is expected" };

  reminders.map(async (reminder) => {
    if (reminder.dateRdv === new Date()) {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Notification pour le RDV médical",
        html: `<h2>Rendez-vous</h2><p>Vous avez un rendez-vous aujourd'hui le ${new Date(
          reminder.dateRdv,
        ).toLocaleDateString("fr-FR")} avec docteur ${reminder.name}.</p>`,
      });
    }
  });
};
