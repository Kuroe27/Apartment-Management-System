"use client";
import { deleteApartment } from "@/lib/actions";
import { handleUserSignout } from "@/lib/supabase-server";
import { useTransition } from "react";
import { useFormStatus } from "react-dom";

export default function SignOutBtn() {
  return <button onClick={() => handleUserSignout()}>SignOut</button>;
}

export function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Signing in ..." : "signin"}
    </button>
  );
}

export function DeleteButton({ id }: { id: number }) {
  let [ispending, startTransition] = useTransition();

  return (
    <button onClick={() => startTransition(() => deleteApartment({ id }))}>
      Delete
    </button>
  );
}
