"use client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { redirect } from "next/navigation";
import { signInWithEmail } from "@/lib/actions";

export default function Form() {
  async function signinUser(formData: FormData) {
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

    console.log(data.session?.user.role);
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form
        className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action={signinUser}
      >
        <input name="email" />
        <input type="password" name="password" />
        <button type="submit">signIn</button>
      </form>
    </div>
  );
}
