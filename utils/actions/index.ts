"use server";
import { createClient } from "@/utils/supabase/middleware";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export async function signInWithEmail(formData: FormData) {
  const supabase = await createSupabaseServerClient(cookies());
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
  const supabase = await createSupabaseServerClient(cookies());

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
  const supabase = await createSupabaseServerClient(cookies());
  const { error } = await supabase.from("apartment").delete().eq("id", id);
  if (!error) {
    revalidatePath("/apartments");
  }
}

export async function editAparment(formData: FormData) {
  const supabase = await createSupabaseServerClient(cookies());
  const id = Number(formData.get("apartmentId"));
  const apartment_name = String(formData.get("apartmentNames"));
  const apartment_description = String(formData.get("apartmentDescs"));

  await supabase
    .from("apartment")
    .update({
      apartment_name,
      apartment_description,
    })
    .eq("id", id);
  revalidatePath("/apartments");
}
export async function fetchApartment() {
  const supabase = await createSupabaseServerClient(cookies());

  const { data: apartments, error } = await supabase
    .from("apartment")
    .select("*")
    .order("id")
    .range(0, 20);
  return apartments;
}

export async function handleUserSignout() {
  const supabase = await createSupabaseServerClient(cookies());
  await supabase.auth.signOut();
  redirect("/login");
}
