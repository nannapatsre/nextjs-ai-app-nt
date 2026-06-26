<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## development Guidelines
For TypeScript code style and best practices: @docs/typescript-guidelines.md

## Commands

- `npm run dev` — dev server
- `npm run build` — production build
- `npm run lint` — ESLint (no typecheck or test scripts exist)
- No test framework is configured

## Architecture

- **App Router** under `src/`. Route groups: `(front)` (public pages), `(auth)` (login/signup). Each group has its own `<html>` layout — do not merge them.
- **Auth**: better-auth. Server config in `src/lib/auth.ts`, client in `src/lib/auth-client.ts`. Catch-all API route at `src/app/api/auth/[...all]/route.ts`.
- **Prisma 7**: uses `prisma.config.ts` and MariaDB driver adapter. Generate client with `npx prisma generate` (output: `../generated/prisma`, gitignored). Prisma CLI needs `DATABASE_URL` in `.env`.
- **shadcn/ui**: radix-luma style, Remix Icons, RSC enabled, `@/components/ui/` alias.
- **Tailwind v4**: CSS-first config via `@theme` directive in `globals.css`. No `tailwind.config`. PostCSS uses `@tailwindcss/postcss`.
- **Design System**: QuestUI (fantasy/RPG style). Follow `docs/questui-DESIGN.md` for colors, typography (Cinzel/Spectral), and ornate styling.
- **State**: Zustand cart store with `persist` middleware (localStorage key: `skill-cart`). See `src/lib/cart-store.ts`.
- **Docker**: multi-stage build with `node:24-alpine`, standalone output (`output: "standalone"` assumed), runs `npx prisma generate` during build.
