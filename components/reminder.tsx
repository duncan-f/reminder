"use client";

import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Rdv } from "@prisma/client";
import { startTransition } from "react";
import { remove } from "@/actions/reminder";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Reminder = ({ reminder }: { reminder: Rdv }) => {
  const { refresh } = useRouter();

  const onDelete = () => {
    remove(reminder)
      .then((data) => {
        if (data.success) {
          toast.success(data.success);
          refresh();
        }
        if (data.error) toast.error(data.error);
      })
      .catch(() => toast.error("Une erreur est survenue!"));
  };

  return (
    <Card className="my-1">
      <CardHeader>
        <CardTitle>Dr. {reminder.name}</CardTitle>
      </CardHeader>
      <CardContent>
        {reminder.comment ? (
          `${reminder.comment}`
        ) : (
          <span className="text-sm text-muted-foreground">
            Pas de commentaires!
          </span>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {new Date(reminder.dateRdv).toLocaleDateString("fr-FR", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="icon" variant="destructive" type="button">
              <Trash className="w-4 h-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Etes-vous sûr de vouloir supprimer?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Cette action est irréversible. Vous devez être sûr!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction
                className={buttonVariants({ variant: "destructive" })}
                onClick={() => startTransition(onDelete)}
              >
                Supprimer quand-même
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default Reminder;
