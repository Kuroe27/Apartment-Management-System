"use server";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";
export async function signInWithEmail(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const email = formData.get("email");
  const password = formData.get("password");

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email as string,
    password: password as string,
  });

  revalidatePath("/dashboard");
  return { data, error };
}

export async function addApartment(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  const apartment_name = String(formData.get("apartmentName"));
  const apartment_description = String(formData.get("apartmentDesc"));

  const { data, error } = await supabase
    .from("apartment")
    .insert([
      {
        apartment_name,
        apartment_description,
      },
    ])
    .select();
  revalidatePath("/apartments");
}

export async function deleteApartment({ id }: { id: number }) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("apartment").delete().eq("id", id);
  if (!error) {
    revalidatePath("/apartments");
  }
}
