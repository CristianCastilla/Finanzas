# 💰 Mis Finanzas — Panel privado de inversión

Panel web para llevar tu cartera (**MSCI World**, **MSCI Emerging**, **Bitcoin** y **Renta Fija**) con:

- 🔐 **Login privado**: solo tú, con tu email y contraseña.
- 📈 **Gráfica de evolución** de la cartera en el tiempo.
- 🍩 **Distribución (%)** de cada activo.
- ✏️ **Editable**: añade, actualiza o borra registros.
- ☁️ **Sincronizado**: los cambios se ven desde el móvil y el ordenador.
- ⬇️ **Exportar a CSV**.

---

## 🧱 Partes del proyecto

| Archivo | Qué es |
|---|---|
| `index.html` | La aplicación (todo el panel). |
| `config.js` | Aquí van tus claves de Supabase. |
| `supabase-setup.sql` | Crea la base de datos y la seguridad. Se pega en Supabase. |

---

## 🚀 Puesta en marcha (10 minutos)

### 1. Crear el proyecto en Supabase (gratis)
1. Entra en **https://supabase.com** y crea una cuenta.
2. Pulsa **New project**. Ponle un nombre (ej. `finanzas`), elige una contraseña de base de datos y la región más cercana (ej. *West EU*). Espera ~2 minutos a que se cree.

### 2. Crear la tabla y la seguridad
1. En el menú lateral, abre **SQL Editor** → **New query**.
2. Copia **todo** el contenido de `supabase-setup.sql` y pégalo.
3. Pulsa **Run**. Debe decir *Success*.

### 3. Copiar tus claves
1. Ve a **Project Settings** (⚙️) → **API**.
2. Copia:
   - **Project URL** → p. ej. `https://abcdefgh.supabase.co`
   - **anon public** (en *Project API keys*).
3. Abre `config.js` y pégalas:
   ```js
   window.FINANZAS_CONFIG = {
     SUPABASE_URL: "https://abcdefgh.supabase.co",
     SUPABASE_ANON_KEY: "eyJhbGciOi........."
   };
   ```

> 💡 La *anon key* **puede** estar en el navegador: no expone tus datos.
> El aislamiento lo garantizan las políticas **RLS** (paso 2) + tu login.

### 4. (Opcional pero recomendado) Facilitar el registro
Por defecto Supabase pide **confirmar el email** al registrarte.
- Si quieres entrar directamente sin confirmar, ve a **Authentication → Providers → Email** y **desactiva** *Confirm email*.
- Si lo dejas activado: crea la cuenta, confirma desde el correo y luego entra.

### 5. Publicar en GitHub Pages
1. Crea un repositorio nuevo (por ejemplo **`Finanzas`**).
2. Sube los 3 archivos (`index.html`, `config.js`, `supabase-setup.sql`).
3. Ve a **Settings → Pages** → *Source*: **Deploy from a branch** → **main** / **/ (root)** → **Save**.
4. En 1–2 minutos tendrás tu URL: `https://TU-USUARIO.github.io/Finanzas/`

---

## 🔒 ¿Es de verdad privado?

- Los **datos** solo los ve quien inicie sesión con **tu cuenta**: cualquiera que abra la web ve solo la pantalla de login.
- Si además quieres que **ni siquiera se abra la página** sin ti, se puede poner **Cloudflare Access** por delante (gratis) con tu email. Pídemelo y lo montamos.

---

## 🧭 Cómo se usa

1. Inicia sesión.
2. Rellena la **fecha** y el **valor actual en euros** de cada activo → **Guardar registro**.
3. Repite cada vez que quieras (semana, mes...). Instagram de tu cartera se dibuja sola.
4. Si repites la misma fecha, se **actualiza** ese registro en vez de duplicarlo.
