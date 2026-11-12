# Orientación · Recursos

Web estática (sin compilación). Estructura:

- `index.html`: portada con los bloques de recursos. Para añadir recursos, edita la lista `BLOQUES`.
- `gestion-emocional/rosco-emociones/`: el rosco de las emociones. Alumnado: esa dirección. Profesorado: la misma dirección terminada en `#profe`.
- `apps-script/rosco-emociones.gs`: el pequeño servidor que comparte resultados entre iPads (Google Apps Script).

## Poner en marcha el rosco (una sola vez, unos 5 minutos)

1. Entra en script.google.com con tu cuenta del colegio y crea un **proyecto nuevo**.
2. Borra lo que haya y pega el contenido de `apps-script/rosco-emociones.gs`. Cambia `CLAVE` por la clave que usaréis el profesorado.
3. **Implementar → Nueva implementación → Aplicación web**. Ejecutar como: **Yo**. Quién tiene acceso: **Cualquier usuario**. Autoriza los permisos.
4. Copia la URL que termina en `/exec` y pégala en `gestion-emocional/rosco-emociones/index.html`, en la línea `const API_URL = "PEGA_AQUI_LA_URL";`.
5. Sube la carpeta a Vercel (proyecto nuevo «orientacion-recursos»: arrastrar la carpeta o enlazar un repositorio de GitHub).

Si cambias el script más adelante: Implementar → Gestionar implementaciones → editar → Versión nueva (así la URL no cambia).

## En clase

1. Profesora: abre `…/gestion-emocional/rosco-emociones/#profe` en el proyector → Preparar la partida → nº de equipos y tiempo → Abrir la sala.
2. Aparece un **código de 4 cifras**. Cada equipo abre `…/gestion-emocional/rosco-emociones/` en su iPad, escribe el código, elige equipo y apunta sus nombres.
3. Cuando todos estén, pulsa **¡Empezar el rosco!**. Ranking en directo en la pizarra y en los iPads.
4. Al acabar el tiempo: clasificación final y **Rosco resuelto · Puesta en común**, con una pregunta de reflexión por emoción.

Cada partida tiene su propio código, así que otras clases pueden usarlo a la vez. Las partidas se borran solas a las 12 horas.
