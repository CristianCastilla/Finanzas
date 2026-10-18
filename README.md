# 💰 Mis Finanzas — Panel privado de inversión

Panel web para seguir tu cartera (**MSCI World**, **MSCI Emerging**, **Bitcoin** y **Renta Fija**) con precio de mercado actualizado a diario.

- 🔐 **Login privado**: solo tú, con tu email y contraseña.
- ➕ **Aportaciones y retiradas**: registras lo que metes o sacas; la cantidad se acumula.
- 📈 **Rentabilidad real**: valor actual, ganancia/pérdida (€ y %) y variación del día.
- 🍩 **Distribución (%)** de cada activo.
- 📉 **Gráfica de evolución** de la cartera en el tiempo.
- ⬇️ **Exportar a CSV**.

---

## 🧱 Archivos del proyecto

| Archivo | Qué es |
|---|---|
| `index.html` | La aplicación (el panel). |
| `config.js` | Tus claves de Supabase. |
| `supabase-setup.sql` | Crea la base de datos y la seguridad. Se pega en Supabase. |
| `scripts/update-prices.mjs` | Descarga los precios de los fondos. |
| `.github/workflows/update-prices.yml` | Los actualiza **cada día** automáticamente. |
| `data/prices.json` | Precios diarios (lo genera el Action). |

---

## 🏦 Activos que sigue

| Activo | ISIN | Símbolo usado |
|---|---|---|
| MSCI World | `IE000ZYRH0Q7` | `0P0001XF40.F` |
| MSCI Emerging | `IE000QAZP7L2` | `0P0001XF3Z.F` |
| Bitcoin (ETP) | `GB00BJYDH287` | `WBTC.PA` |
| Renta Fija (monetario) | `FR0000989626` | `0P00000LRT.F` |

---

## 🚀 Puesta en marcha

### 1. Base de datos en Supabase
1. Entra en **https://supabase.com** (ya tienes el proyecto creado).
2. **SQL Editor → New query** → pega `supabase-setup.sql` → **Run**.
   (Crea la tabla `movimientos`. Es seguro re-ejecutarlo.)

### 2. Claves
En **Project Settings → API** copia **Project URL** y la **anon key** y pégalas en `config.js`.

### 3. Publicar
Sube `index.html`, `config.js`, `supabase-setup.sql`, la carpeta `scripts/` y `.github/` al repo.
GitHub Pages ya está activo en la rama `main`.

---

## 🔄 Cómo se actualizan los precios

El workflow `.github/workflows/update-prices.yml` se ejecuta **cada día laborable** y descarga
los precios de Yahoo Finance a `data/prices.json`.

- Para actualizarlos **a mano** en cualquier momento: repo → **Actions** → *Actualizar precios* → **Run workflow**.
- La web muestra en el pie la fecha de la última actualización.

---

## 🧭 Cómo se usa

1. Inicia sesión.
2. Rellena **Fecha**, elige el **Activo**, pulsa **➕ Aportar** o **➖ Retirar** e introduce el **Importe**. → **Guardar movimiento**.
3. La app calcula sola las participaciones, el valor de hoy y la rentabilidad.
4. Repite cada vez que inviertas o saques dinero.

> 💡 El valor actual = participaciones acumuladas × precio de hoy.
> La ganancia = valor actual − dinero neto invertido.

---

## 🔒 Privacidad

Los datos solo los ve quien inicie sesión con **tu cuenta**. El aislamiento lo garantizan
las políticas **RLS** de Supabase. (Opcional: se puede añadir **Cloudflare Access** por delante
para que ni la web se abra sin tu email.)
