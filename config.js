/* ============================================================
   CONFIGURACIÓN DE SUPABASE
   ------------------------------------------------------------
   1. Crea tu proyecto gratuito en https://supabase.com
   2. Ve a:  Project Settings  ->  API
   3. Copia los dos valores y pégalos entre las comillas de abajo.
      - "Project URL"        -> SUPABASE_URL
      - "anon public" key    -> SUPABASE_ANON_KEY

   ¿Es seguro que se vean estas claves?  SÍ.
   La "anon key" está pensada para el navegador: no da acceso a nada
   porque tus datos están protegidos por las políticas de seguridad
   (RLS) + tu propio login. Solo tu cuenta puede leer tus filas.
   ============================================================ */

window.FINANZAS_CONFIG = {
  SUPABASE_URL: "https://vwnybtgemanvhbkstuib.supabase.co",
  SUPABASE_ANON_KEY: "sb_publishable_6Ot7QSd4D8gDfI4N-gLr8g_txQv6hqw"
};
