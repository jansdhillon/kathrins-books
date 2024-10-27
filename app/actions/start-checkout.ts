"use server";
import { createClient } from "@/utils/supabase/server";
import { getOrCreateCart } from "@/utils/supabase/queries";
import { encodedRedirect } from "@/utils/utils";

export const startCheckoutAction = async () => {
  const supabase = createClient();

  const { data: user } = await supabase.auth.getUser();

  if (!user.user) {
    return encodedRedirect(
      "error",
      "/sign-in",
      "You must be signed in to view this page"
    );
  }

  const { data: cartDetails, error: cartError } = await getOrCreateCart(
    supabase,
    user?.user?.id
  );

  if (cartError) {
    console.error("Error fetching cart details:", cartError.message);
    return encodedRedirect("error", "/", "Error fetching cart details");
  }

  return {
    amount: cartDetails.total,
    cartDetails: cartDetails.cart_items,
  };
};
