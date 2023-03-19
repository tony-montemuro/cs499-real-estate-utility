/* ===== IMPORTS ===== */
import { createClient } from "@supabase/supabase-js";

/* ===== VARIABLES ===== */
const API_URL = process.env.REACT_APP_SUPABASE_URL;
const API_KEY = process.env.REACT_APP_SUPABASE_KEY;

/* ===== EXPORTS ===== */
export const supabase = createClient(API_URL, API_KEY);