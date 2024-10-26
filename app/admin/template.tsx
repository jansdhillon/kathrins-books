
import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";

export default async function Template({
  children,
}: {
  children: React.ReactNode;
}) {


  const supabase = createClient();


  const { data: user } = await supabase.auth.getUser();


  if (!user.user || user.user.role !== "admin") {
    return encodedRedirect("error", "/sign-in", "You must be signed in to view this page");
  }


  return <div className="container mx-auto space-y-6 ">{children}</div>;
}
