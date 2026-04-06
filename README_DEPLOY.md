# Nexo DG landing

## Rutas disponibles
- `/` → landing de desarrollo web
- `/agencia` → landing de agencia / soluciones digitales

## Levantar en local
```bash
npm install
npm run dev
```

o con pnpm:
```bash
pnpm install
pnpm dev
```

Abrir en navegador:
- http://localhost:3000
- http://localhost:3000/agencia

## Deploy recomendado
Este proyecto está hecho en Next.js, así que la opción más prolija es Vercel.

### Pasos
1. Subir el proyecto a GitHub
2. Importar el repositorio en Vercel
3. Deploy automático
4. Conectar dominio o subdominio

## Archivos agregados / modificados
- `app/agencia/page.tsx`
- `components/sections/Navbar.tsx`
- `components/sections/Footer.tsx`
