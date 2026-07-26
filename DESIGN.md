---
name: Susilodaya Dhamma School Design System
colors:
  primary: '#E8A317' # Saffron
  on-primary: '#FFFFFF'
  secondary: '#6B1D3A' # Deep Maroon
  on-secondary: '#FFFFFF'
  background: '#FFF8F0' # Warm Cream (All Portals and Public Site)
  on-background: '#1C1C1E' # Deep Charcoal
  surface: '#F0E6D6' # Light Sand (All Portals and Public Cards)
  on-surface: '#1C1C1E'
  success: '#2D6B4F' # Forest Green
  on-success: '#FFFFFF'
  error: '#C0392B'
  warning: '#D4890A'
  info: '#2B6CB0'
  lotus: '#C4728A' # Lotus Pink
  gold: '#F5D78E' # Soft Gold
typography:
  display-lg:
    fontFamily: Instrument Serif
    fontSize: 56px
    fontWeight: '400'
    lineHeight: '1.05'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Instrument Serif
    fontSize: 36px
    fontWeight: '400'
    lineHeight: '1.05'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Instrument Serif
    fontSize: 40px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Instrument Serif
    fontSize: 28px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Instrument Serif
    fontSize: 28px
    fontWeight: '400'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.5'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.08em
  button-text:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.02em
rounded:
  sm: 0px
  DEFAULT: 0px
  md: 0px
  lg: 0px
  xl: 0px
  full: 0px
spacing:
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 32px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
---

# DESIGN.md — Susilodaya Dhamma School Platform
## Overhauled on 2026-07-01 (Modern Editorial Styling)

This design system is tailored for a Buddhist educational institution, fusing traditional warm tones with clean editorial layout patterns inspired by primer.com.

## 1. Visual Direction & Style (Modern Editorial Aesthetic)
- **Aesthetic:** Clean, grid-based layout utilizing thin 1px dividers to separate sections. Serene, sharp, and scholarly.
- **Sharp Edges:** Zero roundness (`rounded-none` or `0px` border-radius) globally applied to all cards, buttons, tabs, input fields, and elements.
- **Visual Accent:** Mondrian-style solid blocks using saffron and deep maroon to create visual framing. No drop shadows.
- **Grids:** Asymmetrical column setups on desktop, 1-column on mobile.
- **Backgrounds:** Warm cream (#FFF8F0) background with light sand (#F0E6D6) card tiers.
- **Portal Unified Colors:** All portal dashboards (Admin, Teacher, and Student) share the warm cream background, light sand surfaces, and charcoal text.

## 2. Animation Guidelines & Scroll Triggers
- **Hero Title Reveal:** Sequential line slide-up. Individual lines of text slide up smoothly from a hidden mask, creating a clean print-style layout reveal on page load.
- **Grid Section & 1px Dividers:** Line-drawing dividers. As a section enters the viewport, its thin 1px border/divider line animate-draws across the screen first, followed by a quick, staggered opacity reveal of the text content inside.
- **Saturday Session Timeline:** Vertical thread drawing. The vertical timeline axis draws downward, and each class slot block slides in from the left sequentially as they enter the screen.
- **Grid Metrics Cards & Interactive Hover:** Saffron fill-wipe on hover. When hovering over buttons or card blocks, the background wipes/fills with solid saffron or maroon from left to right (flat color swap, no shadow lifts).
- **Transitions:** Page wipes and horizontal slide effects for wizards/steppers.
- **Exams Calendar Grid Entrance:** Sequential cell stagger. First, the calendar grid border outline is drawn (1px dividers extend), then the individual day cells fade in sequentially from top-left to bottom-right (simulating a calendar grid populating).
- **Exams Calendar Date Selection:** Draw border + slide-wipe. Clicking an exam date draws a bold 2px saffron border around the cell, and the right-hand details sidebar content slides in from the right with a clean crop reveal.
- **Exams Calendar List Items:** Staggered drift. When a date is selected, the list of exam details (Subject, Time, Grade) in the sidebar drifts slightly upwards (10px) and fades in sequentially.
- **Enrollment Stepper Transitions:** Horizontal slide wipe. When clicking 'Next' or 'Back', the current step slides out and the new step slides in horizontally (masked) in a single fluid animation.
- **Enrollment Stepper Late Warning:** Accordion dropdown. Toggling the "July Intake" exception warning slides the saffron alert banner open smoothly from top-to-bottom, expanding the form block layout naturally.
- **Enrollment Stepper Voucher Reveal:** Paper roll slide-up. The printable receipt voucher slides up from a masked divider line (resembling a receipt printing out of a paper register) and fades in, emphasizing the signature blocks.
- **Portal Sidebar Tab Transitions:** Saffron indicator slide. When a user clicks a different tab, the saffron highlight block slides vertically along the sidebar track to align with the active item. The main workspace slides 15px horizontally and fades in.
- **Portal Table Data & Stats Counters:** Ledger row stagger. Grid rows populate sequentially from top to bottom (like ink lines filling a ledger), and metrics numbers tick upward smoothly from zero.
