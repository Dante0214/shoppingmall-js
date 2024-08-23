import { supabase } from "./supabaseClient";

//로그인
export async function signInWithEmail(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(`Error signing in: ${error.message}`);
  }

  return data;
}

//회원가입

export async function signUpWithEmail(email, password, displayname) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        user_name: displayname,
      },
    },
  });

  if (error) {
    throw new Error(`Error signing up: ${error.message}`);
  }

  return data;
}
// 로그아웃

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(`Error signing out: ${error.message}`);
  }
}
