-- SQL: crear tabla `admins` y ejemplo de inserción
-- Ejecutar en Supabase SQL editor

-- 1) Crear tabla admins que referencia a auth.users
CREATE TABLE IF NOT EXISTS public.admins (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE
);

-- 2) Opcional: insertar un admin manualmente (reemplaza <USER_UUID>)
-- INSERT INTO public.admins (user_id) VALUES ('<USER_UUID>');

-- 3) Comprobar
-- SELECT * FROM public.admins;
