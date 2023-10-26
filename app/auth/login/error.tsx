"use client";

import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Error({ error }: { error: Error }) {
  useEffect(() => {}, [error]);
}
