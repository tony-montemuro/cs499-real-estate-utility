/* ===== IMPORTS ===== */
import { createClient } from "@supabase/supabase-js";

/* ===== VARIABLES ===== */
const API_URL = process.env.NEXT_PUBLIC_REACT_APP_SUPABASE_URL as string
const API_KEY = process.env.NEXT_PUBLIC_REACT_APP_SUPABASE_KEY as string

/* ===== EXPORTS ===== */
export const supabase = createClient(API_URL, API_KEY);
