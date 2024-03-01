"use server";

import prisma from "@/lib/db";

export const getRemindersByUserId = async (userId: string) => {
  try {
    const reminder = await prisma.rdv.findMany({
      where: { userId },
      orderBy: { dateRdv: "asc" },
    });

    return reminder;
  } catch {
    return null;
  }
};
