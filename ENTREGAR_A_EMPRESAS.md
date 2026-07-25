# Cómo entregar FlowOps AI a una empresa (y a la siguiente, sin que se toquen)

## La idea de fondo

Tienes **un solo backend** (el que ya desplegaste en Render) y **un solo frontend**. Todas las empresas usan exactamente esa misma instalación — lo que las separa no es tener copias distintas, es que cada empresa es un registro aislado en la base de datos (`companyId`), algo que ya está construido y probado: un gerente nunca ve ni puede tocar los datos de otra empresa, aunque lo intente.

Así que "entregar el proyecto" a una empresa nueva no es mandarle un archivo — es darle una **cuenta** dentro de tu sistema.

## Paso 0 (una sola vez): aloja también el frontend con un enlace, no un archivo

Ahora mismo `flowops-ai.html` es un archivo que hay que abrir a mano. Para dar una experiencia seria, cuélgalo también en Render como sitio estático gratuito:

1. Sube la carpeta `flowops-frontend/` (te la adjunto) a un repositorio nuevo de GitHub, igual que hiciste con el backend.
2. En Render: "New" → "Static Site" (o "Blueprint" si detecta el `render.yaml` incluido) → conecta ese repositorio.
3. Publish directory: `.` (deja el resto por defecto). Deploy.
4. Te da una URL fija, ej. `https://flowops-ai-frontend.onrender.com`. **Esa es la única URL que le compartes a cualquier empresa**, presente o futura.

A partir de ahora, si mejoras la app, subes el cambio a ese repositorio y se actualiza sola para todo el mundo — nadie tiene que volver a descargar nada.

## Dar de alta una empresa nueva (checklist repetible, ~3 minutos)

1. Entra tú como admin en esa URL.
2. Panel admin → Empresas → "+ Nueva empresa".
3. Panel admin → Usuarios → crea el usuario **gerente** de esa empresa: nombre, email real de la empresa, y una contraseña provisional.
4. Envíale a la empresa un mensaje con:
   - El enlace de la app (el del paso 0)
   - Su email
   - Su contraseña provisional
   - Un aviso de que la cambien en cuanto entren (icono de engranaje → Mi cuenta)
5. Ellos entran, y desde ahí ya son autónomos: crean sus propios técnicos, sus propios pedidos, y si quieres que paguen, entran en "Facturación" y eligen plan.

Repite esto exactamente igual para la siguiente empresa. No hay paso 6 en el que tengas que preocuparte de si se van a cruzar — está garantizado por diseño y ya lo hemos probado con peticiones reales (dos empresas, cada una viendo solo lo suyo, intentos de forzar acceso cruzado bloqueados).

## Lo único que sí es compartido entre todas (y es intencionado)

- **Tú como admin**: ves el "Resumen" de todas las empresas, y puedes entrar en cualquiera. Es tu panel de control como dueño del producto, no algo que ellas vean.
- **El propio backend/servidor**: es normal y correcto que todas las empresas corran sobre la misma infraestructura — así funciona cualquier SaaS. Lo que nunca comparten es *información* entre ellas.

## Si en el futuro alguna empresa pide "quiero mi propia instalación aparte"

Eso ya no es aislamiento de datos (que ya tienes) sino aislamiento de infraestructura — normalmente solo lo piden clientes muy grandes o con requisitos legales concretos. Si llega ese caso, se trataría como un backend adicional solo para ellos (misma carpeta `flowops-backend`, desplegada otra vez con otro nombre). No hace falta prepararlo ahora.
