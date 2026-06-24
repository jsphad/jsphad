import { useMemo, useState } from 'react';

type Workspace = 'customer' | 'web' | 'retailer' | 'delivery' | 'admin' | 'regulator';

type ScreenSpec = {
  title: string;
  subtitle: string;
  items: string[];
  badge?: string;
};

const talukas = [
  'Panvel',
  'Alibag',
  'Pen',
  'Uran',
  'Khalapur / Khopoli',
  'Karjat',
  'Roha',
  'Mahad',
  'Mangaon',
  'Murud',
  'Shrivardhan',
  'Mhasla',
  'Tala',
  'Sudhagad',
  'Poladpur'
];

const complianceMessages = [
  'Prescription required',
  'Verified licensed retailer',
  'Pharmacist approval mandatory',
  'Restricted medicines are not available through this pilot',
  'Your prescription is shared only with authorised pharmacist/retailer',
  'Delivery partner cannot view prescription details',
  'Invoice will be issued by the selected medical retailer'
];

const customerScreens: ScreenSpec[] = [
  {
    title: 'Splash + Language',
    subtitle: 'MahaMediConnect / Maha Aushadh Seva',
    badge: 'मराठी first',
    items: [
      'Local Licensed Medical Stores. Safe Home Delivery.',
      'स्थानिक परवानाधारक औषध दुकाने. सुरक्षित घरपोच सेवा.',
      'Large language buttons: Marathi, English, Hindi optional'
    ]
  },
  {
    title: 'Login, Consent + Location',
    subtitle: 'Mobile OTP with guest browsing and prescription privacy consent',
    badge: 'Low friction',
    items: [
      'Detect location, enter pincode, or select district / taluka / city',
      'Panvel, Alibag, Pen, Uran, Khalapur, Roha, Mahad, Mangaon quick chips',
      'Nearby licensed medical stores available message'
    ]
  },
  {
    title: 'Citizen Home',
    subtitle: 'Trust-before-transaction healthcare access dashboard',
    badge: 'Home',
    items: [
      'Search medicines, health products, cosmetics…',
      'Upload Prescription, Reorder Medicines, Nearby Medical Stores',
      'OTC, Cosmetics, Baby Care, Elderly Care, Diabetes Care, Medical Devices, Wellness',
      'Emergency Pharmacy Locator, Chronic Medicine Refill, restrained offers',
      'Trust banner: Orders fulfilled only by licensed medical retailers'
    ]
  },
  {
    title: 'Search + Product Detail',
    subtitle: 'Availability, safety badges, and pharmacist-led substitution',
    badge: 'Safety',
    items: [
      'Search by medicine, salt, brand, manufacturer, and category',
      'Filters: nearby, fast delivery, price, rating, prescription required, OTC only',
      'Product detail: manufacturer, pack size, MRP, retailer price, delivery estimate',
      'Prescription required warning and Upload prescription CTA when needed',
      'Report issue and safety note visible without alarming the user'
    ]
  },
  {
    title: 'Nearby Retailers',
    subtitle: 'Map-like local store discovery with licence confidence',
    badge: 'Local',
    items: [
      'Store name, licence verified badge, distance, open / closed status',
      'Delivery available, average delivery time, rating, call store',
      'View products and select retailer actions'
    ]
  },
  {
    title: 'Prescription Upload',
    subtitle: 'Image/PDF upload, camera capture, patient profile, notes, consent',
    badge: 'Private',
    items: [
      'Pending pharmacist verification status',
      'Prescription will be viewed only by authorised pharmacist/retailer',
      'Clear consent notice and patient selector'
    ]
  },
  {
    title: 'Cart + Checkout',
    subtitle: 'Clean fees, prescription status, consent, and payment clarity',
    badge: 'Checkout',
    items: [
      'Products grouped by retailer with delivery fee, convenience fee, total amount',
      'Allow pharmacist to suggest equivalent substitute checkbox',
      'Address, delivery slot, UPI, card, net banking, COD if allowed',
      'Consent confirmation before Place order'
    ]
  },
  {
    title: 'Tracking + History',
    subtitle: 'Transparent delivery timeline and repeat care support',
    badge: 'Timeline',
    items: [
      'Order placed, retailer accepted, prescription under review, pharmacist approved',
      'Packed, picked up, out for delivery, delivered, OTP confirmation',
      'Past orders, prescription orders, OTC/cosmetic orders, invoices, reorder'
    ]
  },
  {
    title: 'Chronic Refill + Family Health',
    subtitle: 'Monthly medicine refill for parents and senior citizens',
    badge: 'Elderly care',
    items: [
      'Add monthly medicine, upload prescription, frequency, reminder notification',
      'Family profiles: self, parents, spouse, children, elderly member',
      'Medicine history, allergy note, prescription storage consent'
    ]
  },
  {
    title: 'Emergency + Support + Settings',
    subtitle: 'Urgent pharmacy access and citizen protection tools',
    badge: 'Emergency',
    items: [
      'Nearby open and 24x7 stores, call, navigate, fever, first aid, ORS, diabetes, BP',
      'Tourist: find nearby pharmacy around beach, fort, hotel or homestay',
      'Complaints: late delivery, wrong/damaged product, prescription issue, refund, unsafe product',
      'Language, addresses, privacy settings, prescription data consent, delete data request'
    ]
  }
];

const webScreens: ScreenSpec[] = [
  {
    title: 'Responsive Web Homepage',
    subtitle: 'Header, location, search, login, cart, hero, categories, trust',
    items: [
      'Hero: Order from verified local medical stores near you',
      'Prescription upload CTA, category grid, nearby retailers, chronic refill banner',
      'Emergency pharmacy locator, trust and compliance, Raigad pilot coverage'
    ]
  },
  {
    title: 'Search, Retailer, Prescription, Cart',
    subtitle: 'Desktop-friendly flows with advanced filters and clear prescription states',
    items: [
      'Product search: store availability, prescription tags, price comparison, estimate',
      'Retailer page: profile, licence badge, products, timings, radius, contact, ratings',
      'Prescription upload: document, medicine list, choose retailer or auto-assign, consent',
      'Cart and checkout: clean status, delivery, payment, selected retailer invoice'
    ]
  },
  {
    title: 'Order Tracking + Health Content',
    subtitle: 'Timeline, support, invoice, and safe-medicine education',
    items: [
      'Timeline design with invoice download and support option',
      'Safe medicine use, prescription medicines, chronic reminders',
      'Cosmetics safety and elderly medicine care awareness pages'
    ]
  }
];

const retailerScreens: ScreenSpec[] = [
  {
    title: 'Retailer Login + Dashboard',
    subtitle: 'Licensed store operating console for local chemists and pharmacists',
    items: [
      'Mobile/OTP login with licence verification pending/approved status',
      'Cards: new orders, pending prescription review, orders to pack, out for delivery',
      'Completed orders, today revenue, customer ratings, stock update reminders'
    ]
  },
  {
    title: 'Order Detail + Prescription Review',
    subtitle: 'Pharmacist-led accept, reject, clarify, substitute, and invoice workflow',
    items: [
      'Customer, products, prescription image if required, accept/reject/need clarification',
      'Mark unavailable, suggest substitute, generate/upload invoice, mark packed',
      'Viewer: patient name, visible doctor details, medicine list, quantity, compliance note'
    ]
  },
  {
    title: 'Stock, Settlement, Compliance, Support',
    subtitle: 'Simple inventory controls and audit-ready licence governance',
    items: [
      'Search medicine master, available/low stock/out of stock, price, optional batch/expiry',
      'Completed orders, commission deducted, payable amount, settlement date, statement',
      'Licence details, pharmacist details, expiry alert, prescription audit log, undertaking',
      'App issue, payment issue, order dispute, complaint, training videos'
    ]
  }
];

const deliveryScreens: ScreenSpec[] = [
  {
    title: 'Delivery Partner App',
    subtitle: 'Minimal pickup-to-delivery flow with prescription privacy',
    items: [
      'Login, assigned orders, pickup store name/address/package ID/pickup OTP',
      'Customer address, route map, call customer, delivery OTP',
      'Picked up, reached customer, delivered, failed delivery status updates',
      'Privacy rule: delivery partner should not see prescription details unless necessary'
    ]
  }
];

const adminScreens: ScreenSpec[] = [
  {
    title: 'Raigad District Overview',
    subtitle: 'Operational dashboard for platform administrators',
    items: [
      'Retailers onboarded, active retailers, orders today, prescription orders, OTC orders',
      'Delivery success rate, complaints, revenue, failed orders, taluka-wise performance'
    ]
  },
  {
    title: 'Management Consoles',
    subtitle: 'Retailer, order, product, complaint, and settings administration',
    items: [
      'Retailer approvals, licence verification, expiry alerts, store status, suspend/block',
      'All/failed/delayed orders, prescription pending, refund cases',
      'Medicine master, OTC, cosmetics, wellness, devices, restricted category marking',
      'Customer complaints, retailer complaints, delivery issues, unsafe product reports',
      'District configuration, delivery radius, commission rate, category permissions, language'
    ]
  },
  {
    title: 'Compliance + Analytics',
    subtitle: 'Audit-ready prescription and data access governance',
    items: [
      'Pending/approved/rejected prescription reviews, suspicious repeats, restricted alerts',
      'Taluka heatmap, category orders, repeat users, chronic refill adoption, delivery time',
      'Prescription access log, user data access log, retailer action log, admin action log'
    ]
  }
];

const regulatorScreens: ScreenSpec[] = [
  {
    title: 'Authorised Regulator Dashboard',
    subtitle: 'Aggregated compliance visibility without personal prescription exposure',
    items: [
      'District compliance overview and licensed retailer participation',
      'Prescription category analytics, complaint heatmap, unsafe product reports',
      'Repeated violation indicators and taluka-wise medicine demand patterns',
      'Disaster/monsoon essential medicine availability dashboard',
      'Personal prescription details hidden unless legally permitted'
    ]
  }
];

const screenMap: Record<Workspace, ScreenSpec[]> = {
  customer: customerScreens,
  web: webScreens,
  retailer: retailerScreens,
  delivery: deliveryScreens,
  admin: adminScreens,
  regulator: regulatorScreens
};

const workspaceLabels: Record<Workspace, string> = {
  customer: 'Customer mobile',
  web: 'Web portal',
  retailer: 'Retailer console',
  delivery: 'Delivery app',
  admin: 'Admin dashboard',
  regulator: 'Regulator view'
};

const categoryCards = [
  'Upload Prescription',
  'Reorder Medicines',
  'Nearby Stores',
  'OTC Medicines',
  'Cosmetics',
  'Baby Care',
  'Elderly Care',
  'Diabetes Care',
  'Medical Devices',
  'Wellness',
  'Emergency Locator',
  'Chronic Refill'
];

const userFlows = [
  ['OTC order', 'Search / category', 'Select verified retailer', 'Add to cart', 'Checkout', 'Retailer packs', 'Delivered with OTP'],
  ['Prescription order', 'Upload Rx', 'Add items', 'Pharmacist review', 'Approve / clarify', 'Invoice by retailer', 'Delivered'],
  ['Retailer acceptance', 'New order', 'Check stock', 'Review prescription', 'Accept / reject / substitute', 'Pack', 'Handover'],
  ['Delivery flow', 'Assigned order', 'Pickup OTP', 'Route to customer', 'Delivery OTP', 'Delivered / failed'],
  ['Complaint flow', 'Select issue', 'Attach evidence', 'Triage', 'Retailer/admin response', 'Refund/replacement/closure']
];

export function App() {
  const [workspace, setWorkspace] = useState<Workspace>('customer');
  const activeScreens = useMemo(() => screenMap[workspace], [workspace]);

  return (
    <main className="shell">
      <header className="hero">
        <nav className="topbar" aria-label="Prototype sections">
          <div className="brandmark" aria-label="MahaMediConnect logo">
            <span className="brand-icon">✚</span>
            <span>
              <strong>MahaMediConnect</strong>
              <small>Maha Aushadh Seva · Raigad Pilot</small>
            </span>
          </div>
          <div className="top-actions">
            <button className="ghost-button">मराठी</button>
            <button className="primary-button">Upload Prescription</button>
          </div>
        </nav>

        <section className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Compliance-first hyperlocal healthcare marketplace</p>
            <h1>Order from verified local medical stores near you.</h1>
            <p className="lead">
              A mobile-first, Marathi + English interface for safe medicine ordering, licensed retailer
              empowerment, prescription verification, chronic refills, and emergency pharmacy access.
            </p>
            <div className="hero-ctas">
              <button className="primary-button large">Find nearby licensed stores</button>
              <button className="secondary-button large">View prototype modules</button>
            </div>
            <div className="trust-strip">
              <span>Verified licensed retailer</span>
              <span>Pharmacist approval mandatory</span>
              <span>Delivery partner privacy protected</span>
            </div>
          </div>

          <div className="phone-frame" aria-label="Customer mobile home wireframe">
            <div className="phone-status">Raigad · Panvel <span>4G</span></div>
            <div className="search-pill">Search medicines, health products, cosmetics…</div>
            <div className="rx-card">
              <strong>Upload Prescription</strong>
              <span>Authorised pharmacist review only</span>
            </div>
            <div className="category-grid compact">
              {categoryCards.slice(0, 8).map((category) => (
                <button key={category} className="category-tile">{category}</button>
              ))}
            </div>
            <div className="store-card">
              <strong>Shree Sai Medical</strong>
              <span>Licence verified · 1.2 km · 28 min</span>
              <button>Select retailer</button>
            </div>
          </div>
        </section>
      </header>

      <section className="section-card monsoon">
        <div>
          <p className="eyebrow">Monsoon mode · Raigad</p>
          <h2>Due to heavy rain or road conditions, delivery may be delayed.</h2>
          <p>Select nearest pickup point if needed. Routes can be labelled quick delivery, same-day, scheduled, or monsoon-affected.</p>
        </div>
        <button className="secondary-button">Find pickup point</button>
      </section>

      <section className="module-tabs" aria-label="Workspace selector">
        {(Object.keys(workspaceLabels) as Workspace[]).map((key) => (
          <button
            key={key}
            className={workspace === key ? 'active' : ''}
            onClick={() => setWorkspace(key)}
          >
            {workspaceLabels[key]}
          </button>
        ))}
      </section>

      <section className="wireframe-grid">
        {activeScreens.map((screen) => (
          <article className="wire-card" key={screen.title}>
            <div className="wire-header">
              <div>
                <h3>{screen.title}</h3>
                <p>{screen.subtitle}</p>
              </div>
              {screen.badge ? <span className="badge">{screen.badge}</span> : null}
            </div>
            <ul>
              {screen.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="dashboard-preview">
        <div className="section-heading">
          <p className="eyebrow">Admin + regulator analytics</p>
          <h2>Raigad pilot command centre</h2>
        </div>
        <div className="metric-grid">
          {['Retailers onboarded', 'Orders today', 'Prescription orders', 'Delivery success', 'Complaints', 'Failed orders'].map((metric, index) => (
            <div className="metric-card" key={metric}>
              <span>{metric}</span>
              <strong>{[248, 1260, 412, '94%', 18, 27][index]}</strong>
            </div>
          ))}
        </div>
        <div className="heatmap" aria-label="Taluka-wise performance heatmap">
          {talukas.map((taluka, index) => (
            <span key={taluka} className={`heat heat-${(index % 4) + 1}`}>{taluka}</span>
          ))}
        </div>
      </section>

      <section className="system-grid">
        <article className="section-card">
          <p className="eyebrow">Design system</p>
          <h2>Soft healthcare colours, readable Devanagari, and accessible components</h2>
          <div className="swatches">
            <span className="swatch primary">Primary</span>
            <span className="swatch blue">Blue</span>
            <span className="swatch saffron">Saffron</span>
            <span className="swatch alert">Alert</span>
            <span className="swatch success">Success</span>
          </div>
          <div className="component-row">
            <button className="primary-button">Primary CTA</button>
            <button className="secondary-button">Secondary CTA</button>
            <span className="badge rx">Prescription required</span>
            <span className="badge verified">Licence verified</span>
          </div>
          <p>
            Typography uses Inter/system UI with Noto Sans Devanagari fallback, 44px touch targets,
            rounded cards, soft shadows, clear form fields, status labels, badges, icons, timelines,
            charts, and map-based discovery patterns.
          </p>
        </article>

        <article className="section-card">
          <p className="eyebrow">Compliance UX copy</p>
          <h2>Visible, reassuring, non-frightening safeguards</h2>
          <ul className="message-list">
            {complianceMessages.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="section-card flows">
        <p className="eyebrow">User flow diagrams</p>
        <h2>End-to-end healthcare commerce journeys</h2>
        <div className="flow-grid">
          {userFlows.map(([title, ...steps]) => (
            <div className="flow" key={title}>
              <strong>{title}</strong>
              <div>
                {steps.map((step) => (
                  <span key={step}>{step}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer-note">
        Prototype output: complete mobile app wireframes, responsive web portal, retailer console,
        delivery app, admin dashboard, regulator concept, component library, responsive strategy, and
        clickable workspace navigation suitable for a Raigad district pilot.
      </footer>
    </main>
  );
}
