"use client";

import { create } from "@/actions/reminder";
import { RdvSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SheetClose } from "./ui/sheet";
import { TimePicker } from "./time-picker";

const ReminderForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof RdvSchema>>({
    resolver: zodResolver(RdvSchema),
    defaultValues: {
      daterdv: new Date(),
      name: "",
      comment: "",
    },
  });

  function submit(data: z.infer<typeof RdvSchema>) {
    setError("");
    setSuccess("");

    startTransition(() => {
      create(data).then((res: any) => {
        if (res.success) {
          setSuccess(res.success);
          toast.success("Rendez-vous ajouté!");
          router.refresh();
        }

        if (res.error) {
          setError(res.error);
          toast.error("Une erreur est survenu!");
        }
      });
    });
  }

  return (
    <div className="py-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
          <FormField
            control={form.control}
            name="daterdv"
            disabled={isPending}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date du RDV</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP à HH:mm", { locale: fr })
                        ) : (
                          <span>Date du RDV</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                    />
                    <div className="p-3 border-t border-border">
                      <TimePicker setDate={field.onChange} date={field.value} />
                    </div>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom du médecin</FormLabel>
                <FormControl>
                  <Input placeholder="Nom du médecin" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="comment"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Obsérvations</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Indiquez une obsérvation au sujet du rendez-vous!"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={error} />
          <FormSuccess message={success} />
          <SheetClose asChild>
            <Button disabled={isPending} className="w-full" type="submit">
              Ajoutez un RDV
            </Button>
          </SheetClose>
        </form>
      </Form>
    </div>
  );
};

export default ReminderForm;
