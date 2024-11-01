import { addBookAction } from "@/app/actions/add-book";

import AddBookForm from "@/app/admin/components/books/add-book-form";
import { Message } from "@/components/form-message";
import { getErrorRedirect } from "@/utils/helpers";
import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();

  if (!user.user) {
    return encodedRedirect(
      "error",
      "/sign-in",
      "You must be signed in to view this page"
    );
  }

  try {
    if (user.user.user_metadata.is_admin !== true) {
      getErrorRedirect("/", "Error", "You must be an admin to view this page");
    }
  } catch (error) {
    getErrorRedirect("/", "Error", "You must be an admin to view this page");
  }
  return (
    <AddBookForm addBookAction={addBookAction}  />
  );
}
