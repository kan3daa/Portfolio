import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://iqtkeqiimhhnipvzfgwf.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxdGtlcWlpbWhobmlwdnpmZ3dmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0Nzg5MjAsImV4cCI6MjA5MDA1NDkyMH0.wdBXtjcM8GK4SsdNfkeGpxatWtdh_CmjLJjlaK7tmBo'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
