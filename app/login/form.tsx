import { Database } from "@/types/database.type";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export default async function () {
  async function signInWithEmail(formData: FormData) {
    "use server";
    const supabase = createServerActionClient<Database>({ cookies });

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });
    console.log({ data, error });
    revalidatePath("/");
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form
        className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action="/auth/sign-in"
        method="post"
      >
        <input type="email" name="email" />
        <input type="password" name="password" />
        <button type="submit" className=" bg-black">
          signIn
        </button>
      </form>
    </div>
  );
}
