import Forms from "./login/form";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-green-500">
      <h1 className="text-4xl" onClick={() => console.log("asd")}>
        Welcome to your app
      </h1>
    </main>
  );
}
