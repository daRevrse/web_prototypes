---
name: 228 Villa
description: Villas à louer à Lomé; the category standard for property rental, played straight.
colors:
  ink: "#14181f"
  ink-2: "#3a4049"
  muted: "#5f6670"
  faint: "#8b919a"
  line: "#e3e5e2"
  line-2: "#d3d6d2"
  band: "#f4f5f3"
  band-2: "#eceeeb"
  white: "#ffffff"
  green: "#0b7a44"
  green-hover: "#08693a"
  green-press: "#075c33"
  green-50: "#eaf4ee"
  green-100: "#d2e9da"
  heart: "#e0364f"
  danger: "#b42318"
  night: "#14181f"
  night-2: "#1d222a"
  night-line: "#323843"
  night-muted: "#aab0b9"
typography:
  display:
    fontFamily: "Figtree, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(2.6rem, 1.6rem + 2.6vw, 3.85rem)"
    fontWeight: 750
    lineHeight: 1.02
    letterSpacing: "-0.038em"
  headline:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 1.25rem + 1.55vw, 2.6rem)"
    fontWeight: 720
    lineHeight: 1.08
    letterSpacing: "-0.028em"
  title:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.3rem"
    fontWeight: 680
    lineHeight: 1.12
    letterSpacing: "-0.015em"
  card-title:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 680
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  price:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 750
    lineHeight: 1.3
    letterSpacing: "-0.01em"
    fontFeature: "tnum"
  lead:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.05rem, 0.98rem + 0.3vw, 1.2rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0"
rounded:
  field: "12px"
  photo: "14px"
  card: "20px"
  floating: "24px"
  pill: "999px"
spacing:
  gutter: "clamp(16px, 4vw, 40px)"
  container: "1320px"
  header-h: "72px"
  section: "clamp(64px, 8vw, 120px)"
  section-tight: "clamp(48px, 6vw, 88px)"
  card-grid-gap: "44px 24px"
components:
  button-primary:
    backgroundColor: "{colors.green}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.green-hover}"
  button-primary-active:
    backgroundColor: "{colors.green-press}"
  button-secondary:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "48px"
  button-soft:
    backgroundColor: "{colors.green-50}"
    textColor: "{colors.green}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "48px"
  button-soft-hover:
    backgroundColor: "{colors.green-100}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 12px"
  button-ghost-hover:
    backgroundColor: "{colors.band}"
  chip-filter:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "42px"
  chip-filter-active:
    backgroundColor: "{colors.band}"
    textColor: "{colors.ink}"
  tag:
    backgroundColor: "{colors.band}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.pill}"
    padding: "5px 10px"
  tag-green:
    backgroundColor: "{colors.green-50}"
    textColor: "{colors.green}"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "12px 14px"
    height: "50px"
  listing-photo:
    backgroundColor: "{colors.band}"
    rounded: "{rounded.photo}"
  panel:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.card}"
    padding: "22px"
  panel-soft:
    backgroundColor: "{colors.band}"
    rounded: "{rounded.card}"
    padding: "22px"
  toast:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "12px 18px"
---

# Design System: 228 Villa

## Overview

**Creative North Star: "The Straight Listing"**

228 Villa plays the category standard for property rental with no novelty identity: a white ground, deep ink type, real phone photographs of the houses, and one green that only ever means "act here" or "this is live". The references are Airbnb and Plum Guide for photo-first listings and an obvious booking path, SeLoger and Rightmove for filters up front and plain, comparable numbers. Everything is in French, light theme only.

Density is moderate and task-first. The house is the proof, so photographs lead every card and page, and facts (monthly price in F CFA, bedrooms, bathrooms, furnishing, utilities) sit directly under them in one sans family with tabular numerals. Surfaces are flat and separated by 1px hairlines or the soft neutral band; shadow is reserved for things that genuinely float above the page.

Motion is quiet and physical: a single ease-out curve, 160ms press feedback at scale 0.97, and one authored load moment (the hero collage revealing top-down by clip-path). Reduced motion keeps only opacity.

**Key Characteristics:**
- White ground, ink text, a single action green; no second brand colour.
- Figtree alone, weights 400 to 780, tabular numerals on every price and count.
- Photos at a gentle 14px radius; controls are pills; containers at 20px.
- Flat by default: hairlines and the neutral band carry structure, shadows only on floating surfaces.
- Authored line icons at 1.75 stroke, inline SVG sprite.
- One dark band (owners) as the only inverted surface on light pages.

## Colors

A near-monochrome neutral system of warm-leaning greys around one saturated, trustworthy green.

### Primary
- **Agent Green** (`green`): every primary action (search submit with live count, "Planifier la visite", form submits), focus rings, text caret, checked icons in chips, success marks, and "best value" highlights in the comparison table. Hover deepens to **Green Hover** (`green-hover`), press to **Green Press** (`green-press`).
- **Green Mist** (`green-50`) and **Green Wash** (`green-100`): the soft tint behind the WhatsApp button, green tags, icon tiles in floating cards, the "ready" booking summary, and text selection.

### Tertiary
- **Favourite Red** (`heart`): the filled heart on saved listings and the saved state of the fiche's save action. Nothing else.
- **Error Red** (`danger`): invalid field borders and error text on light surfaces.

### Neutral
- **Deep Ink** (`ink`): headings, body, prices, selected day/slot chips (filled ink), toasts, agent avatars.
- **Graphite** (`ink-2`): nav links, lead paragraphs, descriptions, secondary body.
- **Slate Muted** (`muted`): meta lines, locations, captions, units after prices ("/ mois"), icons in fact rows.
- **Faint Grey** (`faint`): separator dots, input hover border, struck-through amenity lines, row-card hover border.
- **Hairline** (`line`) and **Hairline Strong** (`line-2`): dividers, card and panel borders (`line`); control borders for secondary buttons, pill selects, inputs, day chips (`line-2`).
- **Soft Band** (`band`) and **Band Deep** (`band-2`): alternating section band, footer, image placeholders, active nav and filter fill, tags, soft panels.
- **Paper White** (`white`): page ground and every floating surface.
- **Night** (`night`, `night-2`, `night-line`, `night-muted`): the owners band only; `night-2` fills its form card, `night-line` its borders, `night-muted` its secondary text.

### Named Rules
**The One Green Rule.** Green marks an action or a live state, never decoration, section fills, or headings. If it isn't clickable, focused, selected, or confirming something, it isn't green.

**The Neutral Ground Rule.** Structure comes from white, the soft band, and hairlines. No tinted section backgrounds beyond `band` and the single night band.

## Typography

**Display Font:** Figtree (with ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif)
**Body Font:** Figtree (same stack)

**Character:** One friendly geometric-humanist sans doing all the work, from tight, heavy headlines to plain listing facts. Hierarchy comes from weight and negative tracking, never from a second family.

### Hierarchy
- **Display** (750, clamp(2.6rem, 1.6rem + 2.6vw, 3.85rem); on narrow screens clamp(2.35rem, 1.3rem + 5.2vw, 3rem), line-height 1.02, -0.038em): the home hero headline only.
- **Page title** (750, clamp(2rem to 3rem) on the list page, clamp(1.9rem to 2.8rem) on the fiche, -0.03em): one h1 per page.
- **Headline** (720, clamp(1.75rem, 1.25rem + 1.55vw, 2.6rem), 1.08, -0.028em): section heads on the home page.
- **Title** (680 to 720, 1.1rem to 1.45rem, -0.015em to -0.02em): fiche section heads, panels, row-card titles, sheet and dialog heads.
- **Card title / price** (680 / 750, 17px, -0.01em): listing cards; prices use tabular numerals, the unit drops to 450 in muted.
- **Big price** (780, 1.45rem to 1.75rem, -0.02em to -0.025em, tabular): row-card foot and the booking card.
- **Lead** (400, clamp(1.05rem to 1.2rem), 1.5, Graphite): one subline under a headline, 36 to 44ch.
- **Body** (400, 16px, 1.55): long description at 16.5px / 1.65, max 68ch.
- **Label** (700, 13 to 14px, no tracking, sentence case): search field labels, booking block labels, footer column heads (15px / 700).

### Named Rules
**The Tabular Rule.** Every price, count, date, slot and reference uses tabular numerals so figures line up across cards and the comparison table.

**The Sentence Case Rule.** Labels are sentence case at normal tracking; no uppercase tracked micro-labels.

## Layout

A 1320px container with a fluid gutter (clamp(16px, 4vw, 40px)) and a 72px sticky white header (64px under 760px) that gains a hairline once scrolled. Sections breathe at clamp(64px, 8vw, 120px) vertically, tight sections at clamp(48px, 6vw, 88px).

- **Home hero:** 5/12 copy with the search panel, 7/12 three-photo collage (one wide over two); collapses to one column at 1024px and to a horizontal snap scroller at 82% tile width under 760px.
- **Listing grid:** three columns with 44px row / 24px column gaps, two at 1024px, one under 760px.
- **List page:** sticky filter bar under the header (static on mobile, where filters become a two-column grid), results column plus a 340px sticky aside (drops below at 1180px).
- **Fiche:** photo mosaic (2fr 1fr 1fr, adapts to 1 to 4 photos), then content column plus a 400px sticky booking card (360px at 1180px, inline under 1024px with a fixed bottom price bar).
- **Breakpoints:** 1180px, 1024px, 760px.

Internal rhythm runs on 4px multiples with 6, 10, 14 and 18px used freely for optical fit.

## Elevation & Depth

Flat by default. Pages are layered by tone (white over the soft band) and 1px hairlines; cards on the grid carry no shadow at all, just the photo and its text. Shadows are soft, ink-tinted, negatively spread, and appear only where a surface physically floats: the hero search panel, the sticky booking card, chips sitting on photos, floating agent/visit cards, the compare tray, dialogs and toasts.

### Shadow Vocabulary
- **Chip** (`box-shadow: 0 1px 2px rgb(20 24 31 / 0.08), 0 4px 14px -4px rgb(20 24 31 / 0.18)`): price chips and badges on photos, carousel arrows, icon tiles.
- **Panel** (`box-shadow: 0 1px 3px rgb(20 24 31 / 0.08), 0 14px 36px -10px rgb(20 24 31 / 0.2)`): the search panel and the sticky booking card.
- **Float** (`box-shadow: 0 1px 2px rgb(20 24 31 / 0.05), 0 12px 32px -8px rgb(20 24 31 / 0.16)`): declared in the root tokens but not applied anywhere in the build; reserve it for mid-level floating surfaces rather than inventing a new value.
- **Pop** (`box-shadow: 0 2px 6px rgb(20 24 31 / 0.06), 0 22px 48px -12px rgb(20 24 31 / 0.28)`): floating cards over photos, compare tray, comparison sheet, toast.

### Named Rules
**The Only-What-Floats Rule.** A shadow means the surface sits above the page. Inline cards, panels and sections never get one; on mobile the booking card itself drops its shadow for a hairline once it stops floating.

## Shapes

Soft, consistent rounding in four steps: fields at 12px, photographs at 14px, containers (panels, row cards, gallery mosaic, key-facts grid, owner form) at 20px, and the two primary floating surfaces (search panel, booking card) plus the comparison sheet at 24px. Every button, filter, tag, badge and toast is a full pill; icon buttons, avatars, step numbers and the heart are circles. Day and slot pickers are small rounded rectangles (14px / 10px) so they read as choices rather than actions. Borders are always 1px; the empty state is the only dashed outline.

## Components

### Buttons
Confident, rounded, quiet until pressed.
- **Shape:** full pill; 48px tall by default, 56px large, 44px in headers, rows and trays.
- **Primary:** Agent Green with white text at weight 650; the search submit is a 56px, 18px-radius full-width bar reading the live result count.
- **Hover / Focus:** hover (fine pointers only) deepens the green; press scales to 0.97 over 160ms on the ease-out curve; focus is a 2px green outline offset 2px.
- **Secondary:** white with a Hairline Strong border that turns ink on hover.
- **Soft:** Green Mist fill with green text (the WhatsApp action).
- **Ghost:** transparent, tight padding, band fill on hover.
- **Arrow link:** bold text with a pale underline that darkens on hover while its arrow nudges 3px right.

### Chips
- **Filter pills / toggles:** white, Hairline Strong border, 42px; active state is ink border on band fill at 650 with a check icon.
- **Segmented control:** band track with a white sliding thumb (240ms ease-out).
- **Tags:** band pills in Graphite; green tags (Mist on green) for positive facts.
- **Photo chips:** white pill with the Chip shadow, bold place name, dot separator, price.

### Cards / Containers
- **Listing card:** no container; a 4:3 photo at 14px with swipeable track, dots, hover arrows, heart and white badge, then title, reference, location, facts and price below. The whole card is one link via the title.
- **Row card (list page):** 1px Hairline border at 20px, 14px padding, photo left 320px, price foot above a hairline; hover darkens the border only.
- **Panel:** white with Hairline border or soft band fill, 20px radius, 22px padding.

### Inputs / Fields
- **Style:** 50px, 1px Hairline Strong border, 12px radius, white fill, 16px text.
- **Focus:** green border plus a 3px green halo at 18% alpha; hover lifts the border to Faint Grey.
- **Error:** Error Red border and 13.5px message beneath.
- **Search panel fields:** borderless, label over value, divided by internal hairlines, band fill on hover or focus.

### Navigation
White sticky header: logo left, pill links in Graphite at 550 that fill with band on hover and when current, WhatsApp soft button right. Under 1024px the links collapse into a full-screen white menu with large 22px rows separated by hairlines.

### Visit Composer (signature)
The sticky booking card on the fiche: big tabular price, in-person / video segmented control, horizontally scrolling day chips (weekday, date, month), a four-column slot grid, a live summary sentence that turns Green Mist when complete, then fields and the green action. Selected day and slot chips fill solid ink.

## Do's and Don'ts

### Do:
- **Do** lead every listing and page with a real photograph at 14px radius before any copy.
- **Do** keep green for actions, focus and live states; everything else is ink, grey, white or band.
- **Do** set prices, counts and slots in tabular numerals, the unit ("/ mois") in muted at 450.
- **Do** separate content with 1px hairlines (`line`) and the soft band instead of shadows.
- **Do** gate hover effects behind `(hover: hover) and (pointer: fine)` and give every pressable a 0.97 press scale on the ease-out curve.
- **Do** use the inline line-icon sprite at 1.75 stroke, 16 / 20 / 24px.

### Don't:
- **Don't** introduce a second typeface or a serif display; Figtree carries every role.
- **Don't** put shadows on inline cards, grids or sections; only floating surfaces get one.
- **Don't** use green as a background for sections, headings or decorative fills.
- **Don't** add uppercase tracked labels above headings; headings stand alone.
- **Don't** add dark themes or tinted section bands beyond `band` and the single night band.
