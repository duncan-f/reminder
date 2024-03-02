"use server";

import * as z from "zod";
import prisma from "@/lib/db";
import { RdvSchema } from "@/schemas";
import { currentUser } from "@clerk/nextjs";
import { Rdv } from "@prisma/client";

export async function create(data: z.infer<typeof RdvSchema>) {
  const validated = RdvSchema.safeParse(data);

  const user = await currentUser();

  if (!validated.success) return { error: "Invalid fields!" };

  if (!user) return { error: "User not found!" };

  const { daterdv, name, comment } = validated.data;

  await prisma.rdv.create({
    data: {
      dateRdv: daterdv,
      userId: user?.id,
      name,
      comment: comment as string,
    },
  });

  return { success: "Entrée ajoutée avec succé!" };
}

export const remove = async (reminder: Rdv) => {
  const user = await currentUser();

  if (!user) return { error: "User not found!" };

  if (user.id !== reminder.userId) return { error: "Unauthorized!" };

  await prisma.rdv.delete({ where: { id: reminder.id, userId: user.id } });

  return { success: "Rendez-vous supprimé!" };
};

export const update = async (reminder: Rdv) => {
  const user = await currentUser();

  if (!user) return { error: "User not found!" };

  if (user.id !== reminder.userId) return { error: "Unauthorized!" };

  await prisma.rdv.update({
    where: { id: reminder.id, userId: user.id },
    data: {
      name: reminder.name,
      comment: reminder.comment,
      dateRdv: reminder.dateRdv,
    },
  });

  return { success: "Rendez-vous modifié!" };
};
