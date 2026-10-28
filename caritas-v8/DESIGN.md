---
name: Caritas Africa v8
description: Header, mega menu, footer and shared components for the Caritas Africa Elementor site, on the Caritas Internationalis brand guide 2025.
colors:
  red: "#B11D23"
  red-700: "#931A1F"
  baie: "#8B2113"
  baie-deep: "#7A1D11"
  black: "#000000"
  ink: "#161616"
  ink-2: "#474747"
  muted: "#5E5E5E"
  stone-ink: "#6B655B"
  field-line: "#B9AFA2"
  line: "#DED8CE"
  sand: "#EBE3D7"
  sand-2: "#F5F1EA"
  white: "#FFFFFF"
  on-dark: "#F1D9D4"
  blue: "#60B4CD"
  orange: "#E68922"
  green: "#57B06D"
  stone: "#CAC5B8"
typography:
  display:
    fontFamily: "\"Helvetica Neue\", \"CA Heros\", Helvetica, Arial, sans-serif"
    fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "\"Helvetica Neue\", \"CA Heros\", Helvetica, Arial, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3.25rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  title:
    fontFamily: "\"Helvetica Neue\", \"CA Heros\", Helvetica, Arial, sans-serif"
    fontSize: "clamp(1.25rem, 2vw, 1.625rem)"
    fontWeight: 700
    lineHeight: 1.15
  lead:
    fontFamily: "\"Helvetica Neue\", \"CA Heros\", Helvetica, Arial, sans-serif"
    fontSize: "clamp(1.125rem, 1.6vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "\"Helvetica Neue\", \"CA Heros\", Helvetica, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  small:
    fontFamily: "\"Helvetica Neue\", \"CA Heros\", Helvetica, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "\"Helvetica Neue\", \"CA Heros\", Helvetica, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.04em"
  quote:
    fontFamily: "Georgia, \"Times New Roman\", serif"
    fontSize: "clamp(1.375rem, 2.4vw, 1.875rem)"
    fontWeight: 400
    lineHeight: 1.35
rounded:
  none: "0px"
spacing:
  gutter: "clamp(16px, 4vw, 48px)"
  container: "1240px"
  util-h: "38px"
  bar-h: "84px"
  section: "72px"
  block: "40px"
  card: "26px"
components:
  button-red:
    backgroundColor: "{colors.red}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "48px"
  button-red-hover:
    backgroundColor: "{colors.red-700}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.black}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "48px"
  button-line-hover:
    backgroundColor: "{colors.black}"
    textColor: "{colors.white}"
  button-white:
    backgroundColor: "{colors.white}"
    textColor: "{colors.red}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "48px"
  button-white-hover:
    backgroundColor: "{colors.sand}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "48px"
  button-ghost-hover:
    backgroundColor: "{colors.white}"
    textColor: "{colors.black}"
  button-disabled:
    backgroundColor: "{colors.sand}"
    textColor: "{colors.stone-ink}"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "10px 16px"
  chip-hover:
    backgroundColor: "{colors.black}"
    textColor: "{colors.white}"
  field-input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "12px 14px"
    height: "50px"
  card-news:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.none}"
    padding: "26px 26px 22px"
  card-action:
    backgroundColor: "{colors.sand-2}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.none}"
    padding: "20px 22px 24px"
  card-doc:
    backgroundColor: "{colors.sand-2}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.none}"
    padding: "20px"
  nav-item:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    padding: "0 clamp(10px, 1.1vw, 18px)"
    height: "84px"
  nav-item-active:
    textColor: "{colors.red}"
  mega-panel:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink-2}"
    padding: "40px 0 48px"
  footer:
    backgroundColor: "{colors.baie}"
    textColor: "{colors.white}"
    padding: "72px 0 56px"
  footer-bottom:
    backgroundColor: "{colors.baie-deep}"
    textColor: "{colors.on-dark}"
    padding: "16px 0"
---

# Design System: Caritas Africa v8

## Overview

**Creative North Star: "The Map of the Institution"**

The system is the Caritas Internationalis brand guide 2025 played straight, at the craft level of caritas.org: a white ground, black bold Helvetica set tight and often in capitals, Caritas red reserved for what you can act on and where you are, sand bands to group, and a Baie burgundy footer that closes every page. Nothing is rounded, nothing floats without reason; structure comes from a heavy 2px black rule over a list and hairline 1px sand-grey rules between its rows.

Density is editorial rather than dashboard: generous section rhythm (72px between guide sections, 40px between blocks), long readable lines capped by `ch` widths, and components that read as lists, ledgers and frames rather than as floating cards. The header is the signature: one white mega panel stays open as the pointer travels across the five sections, a 3px red indicator slides under the active item, and the panel morphs its height while its content slides in the direction of travel. Each panel says what the section is before listing its pages, then previews something real.

Motion is sober and functional: one long ease-out curve for everything that moves, short colour fades for hover, short reveals on scroll, and everything collapses to near-instant under reduced motion.

**Key Characteristics:**
- White ground, black bold sans titles, red only for action and position.
- Square corners everywhere (0px), including buttons, fields, chips and cards.
- 2px black top rule plus 1px `line` row dividers as the default list and table structure.
- Sand (`sand`, `sand-2`) as banding and quiet card ground; Baie as the footer.
- Georgia appears only in quotations.
- Photos fill their frames, with a small credit pinned bottom-right.

## Colors

A brand-pinned palette: one red voice on lots of white, warm sand neutrals, a burgundy closing band, and four secondary hues held back for data and illustration.

### Primary
- **Rouge Caritas** (`red`): buttons (Faire un don), arrow links, inline links, the sliding nav indicator, active and hover nav text, focus outlines, checkbox checked state, error text, key figures and roles. Also the `::selection` ground.
- **Rouge Profond** (`red-700`): hover state of every red element (red button, arrow link, inline link, download tag).

### Secondary
- **Baie** (`baie`): the footer ground and the on-dark row of the button states table. Carries the white logo.
- **Baie Profond** (`baie-deep`): the footer's bottom legal strip, one step darker than Baie. Set as a literal in the CSS, not on `:root`; give it a kit variable when transposing.

### Tertiary
- **Bleu, Orange, Vert, Pierre** (`blue`, `orange`, `green`, `stone`): brand secondaries defined on `:root` and shown only as swatches and in the proportion bar. They have no UI role in the build; keep them for charts, maps and illustration, sparingly.

### Neutral
- **Noir** (`black`): display and heading text, the 2px structural rules, outline button border and hover fill, the dark "Signaler un abus" block.
- **Encre** (`ink`): body text and nav items.
- **Encre Seconde** (`ink-2`): descriptions, paragraph text inside components, utility bar text.
- **Gris Note** (`muted`): metadata, dates, captions, credits, contents-rail label.
- **Pierre Sombre** (`stone-ink`): disabled button text, placeholders, the "soon" language state, checkbox border. Literal in the CSS; promote to a variable.
- **Trait de Champ** (`field-line`): input, select and textarea borders; scrollbar thumb. Literal in the CSS.
- **Trait** (`line`): every 1px divider, card border, header bottom rule, swatch gutters, the inactive contents-rail square.
- **Sable** (`sand`): photo placeholder ground, quote block, white-button hover, disabled button ground.
- **Sable Clair** (`sand-2`): utility bar, action and document cards, form panel, icon-button hover.
- **Blanc** (`white`): page ground, header, mega panel, drawer, news and contact cards.
- **Rose sur Baie** (`on-dark`): secondary text on Baie (addresses, column headings, legal strip), footer icons.

### Named Rules
**The Red Means Act Rule.** Rouge Caritas marks something you can click or where you are (button, link, indicator, active item, focus, error). It is not used as decoration or as a large background, except the full-red appeal block that is itself a call to give.

**The White First Rule.** White is the dominant ground; sand bands group, Baie closes. A page never opens on a coloured ground.

## Typography

**Display Font:** Helvetica Neue (with CA Heros, a self-hosted TeX Gyre Heros Latin subset in 400 and 700, then Helvetica, Arial)
**Body Font:** the same stack
**Quote Font:** Georgia (with Times New Roman), standing in for Athelas

**Character:** One Swiss grotesque in two weights does all the work: bold, tight and uppercase for display and section titles, regular at a comfortable 17px for reading. Georgia enters only to give a quotation its human voice.

### Hierarchy
- **Display** (700, clamp 40–72px, line-height 0.92, -0.03em, uppercase): page titles and banner titles. The guide's own title runs larger (clamp 44–88px) with the same settings; banner titles use clamp 36–60px.
- **Headline** (700, clamp 32–52px, 0.95, -0.02em, uppercase): section titles; the appeal title is a smaller step (clamp 28–44px, 0.98).
- **Title** (700, clamp 20–26px, 1.15): block and card titles. Mega panel titles are a sentence-case variant (700, clamp 28–36px, 1.05, -0.015em).
- **Lead** (400, clamp 18–22px, 1.5): introductory paragraph under a page title, max 52ch.
- **Body** (400, 17px, 1.6): reading text, max 65ch.
- **Small** (400, 14px): notes and secondary text; metadata and dates at 13px in `muted`; credits at 12px.
- **Label** (700, 15px, +0.04em, uppercase): buttons. The download tag uses the same treatment at 13px; footer column headings use 13px, +0.08em, uppercase, in `on-dark`.
- **Quote** (Georgia 400, clamp 22–30px, 1.35): quotations, max 30ch, with the citation in 14px bold sans red.

### Named Rules
**The Two Weights Rule.** Only 400 and 700 exist (the self-hosted fallback ships only those two). Emphasis is bold, never an intermediate weight.

**The Caps Are For Titles Rule.** Uppercase belongs to display and headline titles and to button labels. Body, links, nav items and mega panel titles stay in sentence case.

**The Georgia Is A Voice Rule.** The serif is used for quotations only, never for headings or UI.

## Layout

Content sits in a centred container of 1240px plus a fluid gutter (`gutter`, clamp 16–48px) on each side. The header is two rows: a 38px sand utility bar (40px on mobile) and an 84px main bar (68px on mobile) that shrinks to 72px once scrolled; the sticky header hides the utility bar on scroll by offsetting its top by the utility height.

The mega menu is a full-width panel under the bar, laid on a three-column grid (4fr intro, 5fr page list, 3.4fr preview) with a clamp 32–64px gap and 40px/48px vertical padding. The guide body pairs a 220px sticky contents rail with the content column (gap clamp 40–96px). Cards sit on a 12-column grid with a 24px gap: news, action and document cards span 4, contact and publication blocks span 6. The footer is a 1.4fr brand column plus three link columns.

Spacing rhythm: 72px between sections, 40px between blocks, 26px inside cards, 16–24px inside rows. Breakpoints: 1279px (nav tightens, cards go to two-up), 1179px (desktop nav and mega menu give way to the burger and drawer), 1023px (rail hidden, footer two columns, appeal stacks), 767px (single column, compact header, search icon hidden).

## Elevation & Depth

The system is flat at rest. Depth comes from rules and tonal bands, and shadows appear only for something that genuinely lies over the page or lifts on hover.

### Shadow Vocabulary
- **Panel** (`box-shadow: 0 28px 48px -28px rgba(22, 22, 22, .34)`, token `--shadow-panel`): the open mega panel, a long soft drop under its bottom edge.
- **Scrolled header** (`box-shadow: 0 10px 28px -18px rgba(22, 22, 22, .35)`): the sticky header once the page has scrolled.
- **Card lift** (`box-shadow: 0 22px 36px -26px rgba(22, 22, 22, .45)` with `translateY(-3px)`): news card hover only.
- **Printed cover** (`box-shadow: 0 12px 24px -14px rgba(0, 0, 0, .45)`, and close variants): publication covers, so they read as physical reports; they lift further on hover.
- **Scrim** (`rgba(22, 22, 22, .34)`): page dimming behind the open mega menu.

### Named Rules
**The Flat Until It Floats Rule.** A surface gets a shadow only if it overlays content (mega panel, sticky header) or responds to the pointer (news card, covers). Bands, cards at rest and blocks stay flat.

## Shapes

Icons are inline SVG line icons (20px default, 1.9 stroke, round caps and joins, `currentColor`), sized down to 16–18px inside buttons and links. Every corner is square (0px): buttons, chips, fields, checkboxes, cards, panels, photo frames, social squares. Form language is built from rules: a 2px black top border opens every list, table, ledger and contact card; 1px `line` borders divide rows and frame quiet cards; a 3px red bar marks the active nav item. Small square markers (7px squares in the contents rail, 10px legend squares) stand in for bullets. Photos are clipped to their frame with `object-fit: cover` at fixed ratios (4:3 in the mega panel, 3:2 in cards and photo rules).

## Components

### Buttons
Confident blocks of colour with uppercase labels.
- **Shape:** square (0px), 2px border slot, min height 48px, 24px side padding, 10px icon gap.
- **Red:** red ground, white label; hover goes to `red-700`. Used for Faire un don and primary actions.
- **Line:** transparent with a 2px black border; hover fills black with white text.
- **White:** for red or dark grounds: white ground, red label; hover goes to sand.
- **Ghost:** on photos and dark blocks: 2px white border at 75% opacity; hover fills white with black text.
- **Disabled:** sand ground, `stone-ink` text, no border, not-allowed cursor.
- **Focus / Active:** 3px red outline offset 3px (white on dark grounds); pressing nudges the button down 1px. Colour transitions run 180ms.

### Arrow link and inline link
- **Arrow link:** bold red text with an 18px arrow icon; hover draws a 2px underline from the left (260ms, ease-out), darkens to `red-700` and nudges the arrow 4px right.
- **Inline link (in prose):** red, 1px underline offset 3px; hover darkens and thickens the underline to 2px.

### Chips
- **Style:** square, 1px black border, 15px bold, 10px 16px padding; hover fills black with white text. The search panel's quick links are a lighter variant: 1px `line` border, 14px bold, hover turns the border and text red.

### Cards / Containers
- **Corner Style:** square (0px).
- **News card:** white with a 1px `line` border, 26px padding, bold 19px title, a bottom meta row over a 1px rule with the type in red and the date in `muted`. Hover: border turns black, card lifts 3px with the card-lift shadow.
- **Action card:** `sand-2` ground, a 3:2 photo with credit on top, title and text in 20px 22px 24px padding; hover slowly zooms the photo to 1.04.
- **Document card:** `sand-2`, cover thumbnail with printed-cover shadow, title, meta, and a red uppercase download tag that darkens on hover.
- **Contact card:** white with a 2px black top rule and an inset 1px `line` frame, role in red, icon links in bold ink turning red on hover.
- **Shadow Strategy:** flat at rest; see Elevation.

### Inputs / Fields
- **Style:** white ground, 1px `field-line` border, square, min height 50px, 12px 14px padding, 16px text; labels 15px bold black, optional hints regular `muted`. Selects carry a red chevron. Forms sit on a `sand-2` panel.
- **Hover / Focus:** hover darkens the border to `ink-2`; focus sets a black border with a 3px red halo (`rgba(177, 29, 35, .28)`).
- **Error:** 2px red border and a bold red message with a 16px alert icon.
- **Checkbox:** 22px square, `stone-ink` border, fills red with a white tick when checked.
- **Search field:** borderless 64px input in large bold black with a red caret over a 2px black bottom rule that turns red on focus.

### Navigation
- **Utility bar:** `sand-2`, 13px `ink-2`; membership note left, links right, "Signaler un abus" always red bold with a shield icon, FR/EN/PT switcher behind a 1px divider (unavailable languages in `stone-ink`).
- **Main bar:** colour logo left (48px tall, 44px scrolled), five sections in one line at 16px bold `ink` with a 16px chevron, search icon button and red Faire un don on the right. Hover and open state turn the item red and flip the chevron; a 3px red indicator slides under the active item (320ms ease-out).
- **Mega menu:** opens instantly on hover, closes after a 200ms grace delay. One panel per section: intro column (title, description at max 34ch, arrow link), a page list under a 2px black rule where each row is a bold title plus a one-line description and a red arrow that slides in on hover, and a preview column (photo with credit and a red key figure, the six zones list, latest declarations, or publication covers). The panel height morphs (320ms) and its content slides 28px in the direction of travel. The search panel shares the same frame.
- **Mobile drawer (below 1180px):** burger replaces the nav; a full-height white drawer under the header with accordion sections (20px bold, red chevron), sub-links indented behind a 1px left rule that turns red on hover, a full-width red donate button, and utility links.
- **Contents rail:** sticky, 15px `ink-2` links with a 7px square marker; the current item goes bold black with a red, slightly enlarged square.

### Footer
Baie ground, white logo (150px), address in `on-dark`, bold contact links with icons, 42px square social buttons with a translucent white border that fill white on hover. Three link columns headed by 13px uppercase spaced labels over a translucent rule. A safeguarding strip, then the `baie-deep` legal strip at 13px.

### Content blocks
- **Banner:** full-bleed photo under a left-to-right black gradient, breadcrumb at the top, uppercase display title and text in white at the bottom left, credit bottom right.
- **Key figures:** four columns under a 2px black rule, large bold numbers (clamp 28–40px) that count up on reveal, 14px `ink-2` descriptions, 1px `line` column dividers.
- **Quote block:** sand ground with a Georgia quote.
- **Safeguarding block:** black ground, white title with shield icon, light text, red and ghost buttons.
- **Appeal:** red ground split with a photo, uppercase white headline, white button.

### Photo credit
A small 12px white label on 55% black, pinned to the bottom-right corner of every photo frame.

## Do's and Don'ts

### Do:
- **Do** keep Rouge Caritas for action and position: buttons, links, the nav indicator, active items, focus and errors.
- **Do** open every list, table and ledger with a 2px black top rule and divide its rows with 1px `line` rules.
- **Do** keep every corner square (0px), including fields and chips.
- **Do** set display and section titles in bold uppercase with tight leading (0.92–0.98) and negative tracking.
- **Do** put a small credit on every photo, bottom right.
- **Do** use the single ease-out curve (`cubic-bezier(.16, 1, .3, 1)`) for movement and plain 160–180ms fades for hover colour; honour reduced motion.
- **Do** show a visible 3px focus outline (red on light, white on Baie and dark blocks).
- **Do** make every mega panel describe its section before listing pages, each page with a one-line description.

### Don't:
- **Don't** round corners or use pill buttons.
- **Don't** use red as a decorative fill or for large backgrounds, apart from the appeal block.
- **Don't** use Georgia outside quotations, or weights other than 400 and 700.
- **Don't** add shadows to surfaces at rest; only overlays and pointer-lifted items get one.
- **Don't** give the secondary blue, orange, green or stone a UI role; they are for data and illustration.
- **Don't** alter the logo: colour on light grounds, white on Baie and dark, at least 100px wide.
