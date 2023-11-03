"use client";
import { deleteApartment, handleUserSignout } from "@/utils/actions";
import { useTransition } from "react";
import { useFormStatus } from "react-dom";

type SubmitProps = {
  pending: boolean;
  pendingText?: string;
  text: string;
};

export default function SignOutBtn() {
  return <button onClick={() => handleUserSignout()}>SignOut</button>;
}

export function Submit({ pending, pendingText, text }: SubmitProps) {
  const { pending: isPending } = useFormStatus();
  return (
    <button type="submit" disabled={isPending}>
      {isPending ? pendingText : text}
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
