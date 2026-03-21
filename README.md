# Personal Performance App

A mobile-first TypeScript monorepo for a personal performance operating system. This foundation prepares a React Native mobile client, a Node.js API, a Prisma/PostgreSQL data layer, and shared validation/types for future multi-user growth.

## Workspace layout

- `apps/mobile` — Expo Router mobile application shell
- `apps/api` — Node.js API starter with modular service layout
- `packages/shared` — shared domain types and validation helpers
- `prisma` — starter Prisma schema for users and profiles
- `docs` — product and architecture notes

## Getting started

1. Install pnpm 10+
2. Run `pnpm install`
3. Copy environment templates from each app
4. Use `pnpm dev:mobile` or `pnpm dev:api`

## Included foundations

- pnpm workspace configuration
- centralized TypeScript base config
- Expo Router starter app structure
- Node API starter with auth/profile modules
- Prisma schema for `User` and `Profile`
- shared Zod schemas and TypeScript types
- lint, test, and typecheck scripts wired per package
