# Client Discovery & Intake Specification Template
*Universal Project Requirements & Boundary Specification*

<style>
  /* Print Optimization Stylesheet */
  @media print {
    body {
      font-family: "Georgia", "Times New Roman", serif;
      color: #1a1a1a;
      line-height: 1.6;
      font-size: 11pt;
      margin: 1.5cm;
    }
    .page-break {
      display: block;
      page-break-after: always;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 15px;
      margin-bottom: 25px;
      page-break-inside: avoid;
    }
    th, td {
      border: 1px solid #7a7a7a;
      padding: 10px;
      vertical-align: top;
    }
    th {
      background-color: #f2f2f2 !important;
      font-weight: bold;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    h1, h2, h3 {
      font-family: "Georgia", serif;
      color: #6b1d3a !important;
      page-break-after: avoid;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    h1 {
      font-size: 20pt;
      border-bottom: 2px solid #6b1d3a;
      padding-bottom: 5px;
    }
    h2 {
      font-size: 14pt;
      margin-top: 20px;
      border-bottom: 1px solid #ccc;
      padding-bottom: 3px;
    }
    h3 {
      font-size: 11pt;
    }
    .helper-text {
      font-size: 9pt;
      color: #555 !important;
      font-style: italic;
    }
    .input-line {
      border-bottom: 1px solid #1a1a1a;
      display: inline-block;
      width: 250px;
    }
    .checkbox-box {
      border: 1px solid #1a1a1a;
      width: 12px;
      height: 12px;
      display: inline-block;
      margin-right: 5px;
    }
  }
</style>

---

## 1. Project Overview & Stakeholders
*Please record the high-level identity of the project.*

| Intake Question | Client Response / Input |
|---|---|
| **Official Project Name:** | __________________________________________________ |
| **Client Organization / Company:** | __________________________________________________ |
| **Core Project Objective (1-2 sentences):** | __________________________________________________________________________________________________________________ |
| **Primary Project Contact (Name & Title):** | __________________________________________________ |

---

## 2. Target Users & Access Control
*Identify every user role/persona that will log in or interact with the system.*  
*Helper Note: This section prevents the "Ad-Hoc Scope Expansion" pattern (e.g., adding undocumented roles or dashboard portals mid-project) by freezing access personas before database and architecture design.*

| Checked | User Role / Persona | Primary Objectives in the Application | Portal / Dashboard Required? |
| :---: | :--- | :--- | :---: |
| [ ] | **Anonymous Guest / Public** | View marketing copy, browse public landing page, register account | No |
| [ ] | **Standard Authenticated User** | Access personal profile, view user data, perform core features | [ ] Yes  [ ] No |
| [ ] | **Manager / Staff Member** | Moderate content, approve registrations, generate reports | [ ] Yes  [ ] No |
| [ ] | **System Administrator** | Manage users, view server audits, configure global app settings | [ ] Yes  [ ] No |
| [ ] | **[Custom Role]:** ______________ | __________________________________________________ | [ ] Yes  [ ] No |
| [ ] | **[Custom Role]:** ______________ | __________________________________________________ | [ ] Yes  [ ] No |

<div class="page-break"></div>

## 3. Core Features & Screen/Page Inventory
*Define the specific pages or screens that will exist as separate routes.*  
*Helper Note: This section prevents "Missing Screens Discovered Late" by forcing a comprehensive page checklist, avoiding the need to code unplanned routes ad hoc.*

| Screen Type | Checked | Target Route / Route Name | Core Features & Interactive Elements |
|---| :---: |---|---|
| **Public Views** | [ ] | Home / Landing Page (`/`) | Hero section, features grid, product grids. |
| | [ ] | About / Information (`/about`) | Team bios, history, mission details. |
| | [ ] | Contact / Forms (`/contact`) | Interactive contact form, map location container. |
| | [ ] | Registration / Signup (`/signup`) | Account onboarding steps, form validation. |
| **Core Portal** | [ ] | Dashboard Home (`/dashboard`) | Summary cards, metric graphs, quick action links. |
| | [ ] | Search / Catalog Grid (`/browse`) | Filters sidebar, paginated grids, sorting toggles. |
| | [ ] | Detail View (`/item/:id`) | Detailed text descriptions, images, related items. |
| | [ ] | Multi-Step Wizard (`/checkout` or `/wizard`) | Multi-step form flow, checkout progress indicators. |
| **Settings** | [ ] | User Profile (`/settings/profile`) | Password resets, account info, theme choices. |
| | [ ] | Billing / Subscriptions (`/settings/billing`) | Invoice downloads table, tier selection cards. |
| **Admin Panel** | [ ] | System Manager (`/admin`) | User management table, CMS content editors. |

---

## 4. UI/UX & Design System Tokens
*Enforces the visual boundaries of the user interface.*  
*Helper Note: This section prevents the "UI Overhaul Loop" (such as retroactively changing layouts and border roundness across all pages) by locking visual design tokens before code generation.*

### A. Design System Base Tokens
* **Brand Primary Accent Color (HEX):** _________________________________________
* **Brand Secondary Accent Color (HEX):** _________________________________________
* **Base Canvas Background Color (HEX):** _________________________________________
* **Typography Pairing (Display/Header Font + Body Font):** _________________________________________

### B. Element Geometry & Custom Layout Constraints
* **Global Border Radius Rule (Select one):**  
  [ ] **Sharp Edges (0px)** - No rounded corners on buttons, cards, or inputs (Modern/Editorial look).  
  [ ] **Soft Rounding (4px - 8px)** - Standard modern UI rounding.  
  [ ] **Rounded Pills (9999px)** - Circular accents on badges, buttons, or navigation.
* **Specify any exceptions to this rounding rule (e.g., floating nav bar is rounded pill):**  
  __________________________________________________________________________________________________________________

### C. UI Component State Inventory
Before coding starts, mockups must display the layout for the following states:
* [ ] **Default State:** The standard view when data is loaded.
* [ ] **Empty State:** Layout shown when a table or list has zero records.
* [ ] **Loading State:** Skeletons or spinners shown while data is fetching.
* [ ] **Error State:** Visual alerts shown when form submissions or database queries fail.
* [ ] **Success State:** Panels or confirmation modals shown on successful action (e.g., transaction complete).

<div class="page-break"></div>

## 5. Database, Authentication, & File Storage Specs
*Specify where data lives, how users authenticate, and local testing configurations.*  
*Helper Note: This section prevents the "Auth Schema Neglect" pattern (where local credentials logins fail because the private auth.users schema was forgotten) by requiring a complete DB integration plan.*

### A. Database Model & Type
* **Database Type:** [ ] SQL (PostgreSQL, MySQL, SQLite) | [ ] NoSQL (MongoDB, DynamoDB) | [ ] Other: _________
* **Key Data Entities / Tables (e.g., Users, Transactions, Products, Logs):**  
  __________________________________________________________________________________________________________________

### B. Authentication & Local Seed Strategy
* **Auth Provider:** [ ] Supabase Auth (SSR Cookie-based) | [ ] Clerk | [ ] NextAuth | [ ] Firebase Auth | [ ] Other: _____
* **Credential Format:**
  * Login Identifier: [ ] Standard Email | [ ] Custom Username | [ ] Account ID
  * *If using custom Usernames/Account IDs, state how they map to email endpoints in the backend:*  
    __________________________________________________________________________________________________________________
* **Local Auth Seeding Requirements:**
  * To support local credentials verification, the database seed script MUST clean and populate both the public schemas and the internal authentication schemas (e.g. Supabase `auth.users` and `auth.identities` tables) using standard bcrypt hashes with cost factor 10.

### C. File Storage & Upload Constraints
* **Storage Provider (e.g. Supabase Storage buckets, AWS S3):** _________________________________________
* **Buckets Needed (e.g. "avatars", "invoices", "gallery"):** _________________________________________
* **Upload File Constraints (e.g. PDF only, JPG/PNG only, max 5MB):** _________________________________________
* **Asset Transformation Policy:**
  * Are uploaded images processed on the server? [ ] Yes | [ ] No
  * *Helper warning: If applying server-side image desaturation (grayscale), client-side color-hover animations will not work. Confirmed desaturation approach:*  
    __________________________________________________________________________________________________________________

---

## 6. Integrations & Performance Budgets
*Document all external services and non-functional requirements.*  
*Helper Note: This section prevents "Silent Feature Regressions" (such as silently swapping an optimized Canvas Map for a heavy Google Maps iframe) by locking performance goals and map details.*

### A. Third-Party Integrations
* **Map / Location Service:** [ ] Custom HTML5 Canvas Map | [ ] Google Maps iframe | [ ] Mapbox | [ ] N/A
* **Email / Notification Service (e.g., Resend, SendGrid, Twilio):** _________________________________________
* **Payment Gateway (e.g., Stripe, PayPal, Lemon Squeezy):** _________________________________________
* **Other Integration (e.g., CRM, Webhooks, Analytics):** _________________________________________

### B. Performance & Accessibility Targets
* **Lighthouse Performance Score Budget:** [ ] >= 90 | [ ] >= 95 | [ ] N/A
* **Largest Contentful Paint (LCP) Budget:** <= _________ seconds (Target: <= 2.5s)
* **Cumulative Layout Shift (CLS) Budget:** <= _________ (Target: <= 0.1)
* **Accessibility Standard:** [ ] WCAG 2.2 AA (Standard) | [ ] WCAG 2.2 AAA (High contrast)
* **Maximum JS bundle size per route:** [ ] <= 200KB | [ ] <= 500KB

<div class="page-break"></div>

## 7. Sign-Off & Change Management Governance
*Note: This section establishes strict governance, eliminating informal mid-build changes and ensuring named accountability.*

### A. Designated Approvers
To avoid conflicting feedback or delay cycles, the client designates a single named approver for requirements and a single named approver for UI designs.

| Role | Designated Individual (Name) | Signature | Date |
|---|---|---|---|
| **Requirements Approver:** | ___________________________________ | ____________________ | ____________ |
| **UI/UX Design Approver:** | ___________________________________ | ____________________ | ____________ |

### B. Governance Rules
1. **Mockup Sign-Off Gate:** The development agent will not generate code for any layout or page until the named UI/UX Approver has signed off on the mockups and state designs.
2. **Requirements Freeze:** Upon signing this document, the features, user roles, and design tokens are frozen. Development will proceed strictly according to these specifications.
3. **Formal Change Request Protocol:** Any alterations to database columns, color palettes, user roles, or page routes requested after sign-off must go through a formal Change Request process:
   * A **Change Request Form** must be submitted detailing the request.
   * The developer/agent will trace the impact on database migrations, backend actions, and frontend layouts.
   * Both Named Approvers must sign off on the Change Request.
   * Context files (`PROJECT.md` and `DESIGN.md`) must be updated in git *before* any code is altered.

---

### Project Acceptance Sign-Off

*By signing below, all parties agree that this document defines the complete and locked scope of work for the Project.*

**Client Representative:**  
Name: _______________________________ Title: _______________________________  
Signature: ____________________________ Date: _______________________________  

**Technical Program Director:**  
Name: _______________________________ Title: _______________________________  
Signature: ____________________________ Date: _______________________________  
