"use client";
import { Submit } from "@/components/Buttons";
import FormInput from "@/components/FormInput";
import { signInWithEmail } from "@/utils/actions";
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
        method="post"
      >
        <FormInput type={"email"} placeholder={"Email"} name={"email"} />

        <FormInput
          type={"password"}
          placeholder={"Password"}
          name={"password"}
        />

        <Submit text={"Add"} pendingText="Adding ..." />
      </form>
    </div>
  );
}
