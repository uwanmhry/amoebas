import { supabase } from './supabaseClient';
import { writable } from 'svelte/store';

// Store untuk state user dan admin
export const user = writable(null);
export const isAdmin = writable(false);

// List email admin
const adminEmails = ['amoebasarchery20@gmail.com', 'uwanmhry@gmail.com'];

// Cek status admin
const checkIsAdmin = (email) => adminEmails.includes(email);

// Subscribe ke perubahan auth state
supabase.auth.onAuthStateChange(async (_event, session) => {
  if (session?.user) {
    user.set(session.user);
    isAdmin.set(checkIsAdmin(session.user.email));
  } else {
    user.set(null);
    isAdmin.set(false);
  }
});

// Login function
export const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  if (error) throw error;
  return data.user;
};

// Logout function
export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// Get current session
export const getSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  return session;
};

// Initialize auth saat app pertama kali load
export const initAuth = async () => {
  const session = await getSession();
  if (session?.user) {
    user.set(session.user);
    isAdmin.set(checkIsAdmin(session.user.email));
  }
};
