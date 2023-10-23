"use client";
import "react-toastify/dist/ReactToastify.css";
import { signInWithEmail } from "./actions";
import { toast } from "react-toastify";
import { error } from "console";
// import { createClient } from "@supabase/supabase-js";
// import { redirect } from "next/dist/server/api-utils";

export default async function Form() {
  interface SignInResponse {
    error?: {
      message: string;
    };
  }

  async function clientAction(formData: FormData) {
    const res = (await signInWithEmail(formData)) as SignInResponse;
    if (res?.error) {
      toast(res.error.message);
    }
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form
        className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action={clientAction}
      >
        <input name="email" />
        <input type="password" name="password" />
        <button type="submit">signIn</button>
        {/* <button formAction={signInWithGoogle}>Sign in with google</button> */}
      </form>
    </div>
  );
}
