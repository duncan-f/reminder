import { CheckCircle2 } from "lucide-react";

export default function FormSuccess({
  message,
}: {
  message: string | undefined;
}) {
  if (!message) return null;

  return (
    <div className="p-4 rounded-lg bg-emerald-500/15 text-emerald-900 border border-emerald-200">
      <div className="flex items-center gap-4">
        <CheckCircle2 />
        {message}
      </div>
    </div>
  );
}
