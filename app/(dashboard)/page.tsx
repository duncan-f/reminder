import Reminder from "@/components/reminder";
import ReminderForm from "@/components/reminder-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getRemindersByUserId } from "@/data/reminders";
import { currentUser } from "@clerk/nextjs";
import { AlertTriangle } from "lucide-react";

export default async function Home() {
  const user = await currentUser();

  if (!user) return null;

  const reminders = await getRemindersByUserId(user?.id as string);

  return (
    <div className="max-w-xs md:max-w-md mx-auto h-screen py-8">
      <div className="text-3xl font-bold py-4">
        Bienvenue, {user?.firstName} {user?.lastName}
      </div>
      <Sheet>
        <SheetTrigger className="w-full" asChild>
          <Button className="mb-8">Noveau rappel</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Ajouter un nouveau rendez-vous</SheetTitle>
            <SheetDescription>
              Donnez la date du rendez-vous et vous serrez notifié au moment
              voulu
            </SheetDescription>
          </SheetHeader>
          <ReminderForm />
        </SheetContent>
      </Sheet>
      {reminders?.length === 0 ? (
        <Alert>
          <AlertTriangle className="w-4 h-4" />
          <AlertTitle>Liste vide!</AlertTitle>
          <AlertDescription>Ajoutez un rendez-vous.</AlertDescription>
        </Alert>
      ) : (
        reminders?.map((reminder, index) => (
          <Reminder reminder={reminder} key={index} />
        ))
      )}
    </div>
  );
}
