"use client";
import { Submit } from "@/components/Buttons";
import { signInWithEmail } from "@/lib/actions";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const initialState = {
  message: null,
};
export default function Form() {
  async function signIn(formData: FormData) {
    const { data, error } = await signInWithEmail(formData);

    if (error) {
      setTimeout(() => {
        toast.error(error.message);
      });
    } else {
      setTimeout(() => {
        toast.success("Success");
      });
      redirect("/dashboard");
    }
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form
        className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action={signIn}
      >
        <input name="email" />
        <input type="password" name="password" />
        <Submit />
      </form>
    </div>
  );
}
