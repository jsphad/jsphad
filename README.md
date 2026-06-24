# MahaMediConnect / Maha Aushadh Seva Prototype

A compliance-first, multilingual UI prototype for a Maharashtra-level hyperlocal medical retailer marketplace, focused on the Raigad district pilot.

The product connects citizens with nearby licensed medical retailers for medicines, OTC products, cosmetics, wellness, devices, baby care, elderly care, diabetes care, and local home delivery. The interface is designed as a trusted healthcare access platform rather than an aggressive discount marketplace.

## Prototype scope

- **Customer mobile app wireframes:** onboarding, language, OTP login, location, home, search, product details, retailer listing, prescription upload, cart, checkout, tracking, history, chronic refill, family profile, emergency locator, complaints, and settings.
- **Customer web portal:** responsive homepage, search, retailer page, prescription upload, cart/checkout, order tracking, and health content.
- **Retailer dashboard:** licence-aware login, order handling, pharmacist prescription verification, stock updates, settlements, compliance, and support.
- **Delivery app:** pickup OTP, routing, delivery OTP, status updates, and privacy guardrails.
- **Admin dashboard:** Raigad overview, retailer approvals, order management, prescription compliance, catalogue, complaints, analytics, audit logs, and settings.
- **Optional regulator concept:** aggregated authorised compliance views without exposing personal prescription data.
- **Design system and flows:** accessible colours, Devanagari-friendly typography, trust badges, prescription status labels, user journey diagrams, and responsive layout rules.

## Workspace layout

- `apps/web` — React + Vite clickable prototype
- `apps/mobile` — Expo starter workspace
- `apps/api` — TypeScript API starter workspace
- `backend` — FastAPI starter services retained from the original scaffold
- `docs/maha-medi-connect-design.md` — product blueprint and design system notes
- `docs/architecture.md` — original technical architecture notes

## Development

```bash
pnpm install
pnpm dev:web
```

## Validation

```bash
pnpm --filter @office/web typecheck
pnpm --filter @office/web build
```
