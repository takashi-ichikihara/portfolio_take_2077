
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ezlfnoygcplyemaivgts.supabase.co'; // Substitua pela sua URL do Supabase
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6bGZub3lnY3BseWVtYWl2Z3RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMzg2OTgsImV4cCI6MjA2MTgxNDY5OH0.wkT0Umx0irP4z7H_HIActn0GbKQko6t9ri_NfEgMgRI'; // Substitua pela sua anon key do Supabase

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
