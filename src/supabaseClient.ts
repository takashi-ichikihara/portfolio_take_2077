
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = '#URL DO SUPABASE'; // Substitua pela sua URL do Supabase
const supabaseAnonKey = '#SEU ANON KEY AQUI'; // Substitua pela sua anon key do Supabase

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
