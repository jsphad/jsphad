# Architecture Notes

## Monorepo goals

- Keep mobile, API, and shared contracts aligned.
- Start single-user friendly while preserving `userId`-centric multi-user design.
- Support offline-first mobile workflows with a clean sync boundary.

## Package boundaries

- Mobile consumes shared validation and API contract types.
- API owns orchestration, persistence, and environment configuration.
- Shared package holds cross-app DTOs and validation schemas.
- Prisma schema models account ownership from day one.
