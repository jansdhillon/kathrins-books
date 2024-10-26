"use server";;
import { getUserDataById } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/server";

const getUserDataAction = async (userId: string) => {
  const supabase = createClient();

  const { data: userData, error: authError } = await getUserDataById(supabase, userId);

  return { data: userData, error: authError };
};

export { getUserDataAction };
