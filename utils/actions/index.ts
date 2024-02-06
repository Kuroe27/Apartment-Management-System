"use server";
import { createClient } from "@/utils/supabase/client";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { revalidatePath, revalidateTag } from "next/cache";
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
  const files = formData.getAll("file");
  const timestamp = new Date().getTime();

  const { data: insertData, error: insertError } = await supabase
    .from("apartment")
    .insert([
      {
        apartment_name,
        apartment_description,
      },
    ])
    .select();

  if (insertError) {
    throw insertError;
  }

  const apartmentId = insertData[0]?.id;

  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    const filename = `${apartmentId}/${timestamp}-${index}`;
    const { error: uploadError } = await supabase.storage
      .from("room")
      .upload(filename, file, {
        contentType: "image/jpeg",
      });

    if (uploadError) {
      throw uploadError;
    }
  }

  revalidateTag("apartments");
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
export async function fetchApartment(query: string, currentPage: number) {
  const supabase = await createClient();
  const perPage = 10;
  const offset = (currentPage - 1) * perPage;
  const {
    data: apartments,
    count,
    error,
  } = await supabase
    .from("apartment")
    .select("*", { count: "exact" })
    .order("id")
    .range(offset, offset + perPage + 1)

    .or(
      `apartment_description.ilike.%${query}%,apartment_description.ilike.%${query}%`
    );
  return { apartments, count };
}

export async function getApartmentImages({ id }: { id: number }) {
  const supabase = await createClient();
  const { data, error } = await supabase.storage.from(`room`).list(`${id}`);
  return { data };
}

export async function handleUserSignout() {
  const supabase = await createSupabaseServerClient(cookies());
  await supabase.auth.signOut();
  redirect("/login");
}

export async function getApartment() {
  const supabase = await createClient();
  const { data: apartments, error } = await supabase
    .from("apartment")
    .select("*");
  return { apartments };
}

// rooms
export async function editRoom(formData: FormData) {
  const supabase = await createSupabaseServerClient(cookies());
  const id = Number(formData.get("roomId"));
  const rent = String(formData.get("roomRent"));
  const status = String(formData.get("status"));

  await supabase
    .from("rooms")
    .update({
      rent,
      status,
    })
    .eq("id", id);
  revalidatePath("/rooms");
}

export async function addRoom(formData: FormData) {
  const supabase = await createSupabaseServerClient(cookies());

  const rent = String(formData.get("rent"));
  const status = String(formData.get("status"));
  const apartment_id = String(formData.get("aptId"));

  const { data, error } = await supabase
    .from("rooms")
    .insert([
      {
        rent,
        status,
        apartment_id,
      },
    ])
    .select();
  revalidatePath("/rooms");
}

export async function deleteRoom({ id }: { id: number }) {
  const supabase = await createSupabaseServerClient(cookies());
  const { error } = await supabase.from("rooms").delete().eq("id", id);
  if (!error) {
    revalidatePath("/rooms");
  }
}

export async function getRooms() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("rooms").select("*");
  return { data };
}

export async function fetchRoom(query: string, currentPage: number) {
  const supabase = await createClient();
  const perPage = 10;
  const offset = (currentPage - 1) * perPage;
  const { data, count, error } = await supabase
    .from("rooms")
    .select("*", { count: "exact" })
    .order("id")
    .range(offset, offset + perPage + 1);

  console.log(data);
  return { data, count };
}
