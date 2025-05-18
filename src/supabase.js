import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yvcnvprnezqgzdzalcsk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2Y252cHJuZXpxZ3pkemFsY3NrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1MDcyNDcsImV4cCI6MjA2MzA4MzI0N30.2GE5MTocJjO9vNSbLA4r313hwbwdwf3BSupa_JGYXck'; // ⬅️ Clé "anon public" visible dans ton dashboard Supabase

export const supabase = createClient(supabaseUrl, supabaseKey);

