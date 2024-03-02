"use client";

import { Trash2 } from "lucide-react";
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
import { startTransition, useState } from "react";
import { remove, update } from "@/actions/reminder";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Reminder = ({ reminder }: { reminder: Rdv }) => {
  const { refresh } = useRouter();

  const [isInputEdit, setIsInputEdit] = useState(false);
  const [isTextEdit, setIsTextEdit] = useState(false);
  const [name, setName] = useState<string>(reminder.name);
  const [comment, setComment] = useState<string | null>(reminder.comment);

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

  const handleUpdate = () => {
    reminder.name = name;
    reminder.comment = comment;

    update(reminder)
      .then((data) => {
        if (data.success) {
          toast.success(data.success);
          refresh();
        }
        if (data.error) toast.error(data.error);
      })
      .catch(() => toast.error("Une erreur est survenue!"));

    setIsInputEdit(false);
    setIsTextEdit(false);
  };

  return (
    <Card className="my-1">
      <CardHeader>
        {isInputEdit ? (
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleUpdate}
            onKeyDown={(e) => {
              e.key === "Enter" ? handleUpdate : null;
            }}
            autoFocus
          />
        ) : (
          <CardTitle onClick={() => setIsInputEdit(true)}>
            Dr. {reminder.name}
          </CardTitle>
        )}
      </CardHeader>
      <CardContent onClick={() => setIsTextEdit(true)}>
        {isTextEdit ? (
          <Textarea
            value={comment as string}
            onChange={(e) => setComment(e.target.value)}
            onBlur={handleUpdate}
            onKeyDown={(e) => {
              e.key === "Enter" ? handleUpdate : null;
            }}
            autoFocus
          />
        ) : reminder.comment ? (
          `${reminder.comment}`
        ) : (
          <span className="text-sm text-muted-foreground">
            Pas d&apos;obsérvations!
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
            hour: "numeric",
            minute: "numeric",
          })}
        </span>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="icon" variant="destructive" type="button">
              <Trash2 className="w-4 h-4" />
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
