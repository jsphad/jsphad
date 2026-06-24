# MahaMediConnect / Maha Aushadh Seva UI Blueprint

This design package converts the Raigad pilot brief into a clickable React prototype and a scalable product blueprint. The experience is intentionally positioned as a trusted healthcare access system, not a discount-led medicine marketplace.

## Product principles

1. Trust before transaction.
2. Local licensed retailer empowerment.
3. Prescription safety with pharmacist verification.
4. Elderly-friendly, low-cognitive-load ordering.
5. Marathi-first bilingual usability with English support.
6. Visible compliance messages without frightening users.
7. Fast chronic medicine refill and family profile support.
8. Transparent delivery and OTP confirmation.
9. Emergency pharmacy discovery for residents and tourists.
10. Aggregated, authorised dashboards for administrators and regulators.

## Prototype coverage

- Customer mobile wireframes: splash, language, OTP login, location, home, search, product detail, retailer listing, prescription upload, cart, checkout, order tracking, order history, chronic refill, family profile, emergency locator, complaints, settings.
- Customer web portal: homepage, product search, retailer page, prescription upload, checkout, tracking, and health content sections.
- Retailer app/dashboard: login, dashboard, order detail, prescription verification, stock, settlement, compliance, support.
- Delivery app: assigned orders, pickup OTP, customer route, delivery OTP, status updates, prescription privacy rule.
- Admin dashboard: Raigad overview, retailer management, order management, prescription compliance, catalogue, complaints, analytics, audit logs, settings.
- Optional regulator dashboard: aggregated district compliance, retailer participation, prescription category analytics, complaint heatmap, unsafe reports, repeated violation indicators, taluka demand, and monsoon essential medicine availability.

## Raigad pilot elements

Taluka support includes Panvel, Alibag, Pen, Uran, Khalapur/Khopoli, Karjat, Roha, Mahad, Mangaon, Murud, Shrivardhan, Mhasla, Tala, Sudhagad, and Poladpur.

Delivery zone labels include quick delivery zone, same-day delivery zone, scheduled delivery zone, and monsoon-affected route.

Monsoon mode copy: “Due to heavy rain or road conditions, delivery may be delayed. Select nearest pickup point if needed.”

Tourist emergency copy: “Find nearby pharmacy around beach, fort, hotel or homestay.”

Elderly care priority copy: “Monthly medicine refill for parents and senior citizens.”

## Compliance UX messages

- “Prescription required”
- “Verified licensed retailer”
- “Pharmacist approval mandatory”
- “Restricted medicines are not available through this pilot”
- “Your prescription is shared only with authorised pharmacist/retailer”
- “Delivery partner cannot view prescription details”
- “Invoice will be issued by the selected medical retailer”

## Design system

- Primary green: `#0f8f73` for trusted health actions.
- Secondary blue: `#1877b8` for information and navigation.
- Saffron accent: `#f0a33a` for careful attention, monsoon mode, and restrained highlights.
- Alert red: `#cf3f31` for restricted or unsafe situations.
- Success green: `#1f9d55` for completion and approval.
- Background: `#f4f8f7` with white cards and soft healthcare shadows.
- Typography: Inter/system UI with `Noto Sans Devanagari` and `Nirmala UI` fallbacks.
- Components: rounded cards, large 44px+ touch targets, search pill, trust strip, prescription badges, licence badges, status labels, timeline steps, metric cards, taluka heatmap chips, and tabbed workspace navigation.

## Responsive strategy

- Mobile: single-column cards, large buttons, sticky workspace tabs, phone-first information hierarchy.
- Tablet: two-column wireframe and dashboard grids.
- Desktop: three-column wireframe grid, hero + mobile preview, six-metric dashboard, five-column taluka heatmap.

## User flows

### OTC order
Search or category → Select verified retailer → Add to cart → Checkout → Retailer packs → Delivered with OTP.

### Prescription order
Upload prescription → Add items → Pharmacist review → Approve or clarify → Invoice by retailer → Delivered.

### Retailer acceptance
New order → Check stock → Review prescription → Accept, reject, or suggest substitute → Pack → Handover.

### Delivery flow
Assigned order → Pickup OTP → Route to customer → Delivery OTP → Delivered or failed delivery.

### Complaint flow
Select issue → Attach evidence → Triage → Retailer/admin response → Refund, replacement, safety action, or closure.
