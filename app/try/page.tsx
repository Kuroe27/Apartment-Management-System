"use client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Try() {
  const handleClick = () => {
    toast("Hello World!");
  };

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}
