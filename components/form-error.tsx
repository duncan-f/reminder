import { XCircle } from "lucide-react";

export default function FormError({
  message,
}: {
  message: string | undefined;
}) {
  if (!message) return null;

  return (
    <div className="p-4 rounded-lg bg-red-500/15 text-red-900 font-bold border border-red-200">
      <div className="flex items-center gap-4">
        <XCircle />
        {message}
      </div>
    </div>
  );
}
