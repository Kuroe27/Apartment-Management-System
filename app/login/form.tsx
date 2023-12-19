import { signInWithEmail } from "@/utils/actions";

export default async function () {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form
        className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action={signInWithEmail}
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
