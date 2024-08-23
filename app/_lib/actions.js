"use server";

import { auth, signIn, signOut } from "@/app/_lib/auth";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuest(formData) {
  const session = await auth();
  // here we use throw error instead of handler error because error.js will take care of this
  if (!session) throw new Error("You muse be logged in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationalID, nationality, countryFlag };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }

  revalidatePath("/account/profile");
}

// Reservation related to Booking

export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("You muse be logged in");

  const newBooking = {
    ...bookingData,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations"),
    guestId: session.user.guestId,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) throw new Error("Booking could not be created");

  revalidatePath(`/cabins/${bookingData.cabinId}`)
  redirect("/cabins/thankyou")
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You muse be logged in");

  // Must checking if bookingId that will deleted is includes of guests Booking
  const guestBooking = await getBookings(session.user.guestId);
  const bookingIds = guestBooking.map((booking) => booking.id);

  if (!bookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("account/reservation");
}

export async function updateReservation(formData) {
  const bookingId = Number(formData.get("bookingId"));
  // 1) Authentication
  const session = await auth();
  if (!session) throw new Error("You muse be logged in");

  // 2) Authorization
  const guestBooking = await getBookings(session.user.guestId);
  const bookingIds = guestBooking.map((booking) => booking.id);
  if (!bookingIds.includes(bookingId))
    throw new Error("Booking could not be Updated");

  // 3) Mutation
  const updateBooking = {
    numGuests: Number(formData.get("numGuests")),
    // To make sure guest not enter more than 1000 chars
    observations: formData.get("observations").slice(0, 1000),
  };

  const { error } = await supabase
    .from("bookings")
    .update(updateBooking)
    .eq("id", bookingId)
    .select()
    .single();

  // 4) Handling Error
  if (error) throw new Error("Booking could not be updated");
  // 5) Revalidating
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath(`/account/reservations`);

  // 6) Redirecting
  redirect("/account/reservations");
}
