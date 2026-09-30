---
name: Caritas Africa
description: The institutional NGO standard, played straight in white, ink and the Caritas red of the logo.
colors:
  caritas-red: "#7c0800"
  caritas-red-hover: "#650600"
  caritas-red-press: "#540500"
  red-wash: "#f8eeec"
  red-tint: "#efd6d2"
  red-on-night: "#f0a59b"
  ink: "#17181a"
  ink-soft: "#3a3c40"
  muted: "#5d6066"
  faint: "#8b8e93"
  line: "#e3e2de"
  line-strong: "#cfcdc8"
  stone: "#f3f2ef"
  stone-deep: "#e9e7e2"
  white: "#ffffff"
  night: "#17181a"
  night-raised: "#212226"
  night-line: "#35373c"
  night-muted: "#a9abb0"
  night-text: "#e4e5e7"
  error: "#b42318"
typography:
  display:
    fontFamily: "Libre Franklin, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(2.5rem, 1.2rem + 3.3vw, 4.1rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  page-title:
    fontFamily: "Libre Franklin, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.3rem, 1.5rem + 2.8vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.032em"
  headline:
    fontFamily: "Libre Franklin, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.8rem, 1.25rem + 1.7vw, 2.75rem)"
    fontWeight: 780
    lineHeight: 1.08
    letterSpacing: "-0.026em"
  title:
    fontFamily: "Libre Franklin, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.3rem"
    fontWeight: 760
    lineHeight: 1.25
    letterSpacing: "-0.012em"
  lead:
    fontFamily: "Libre Franklin, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.08rem, 1rem + 0.35vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Libre Franklin, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  quote:
    fontFamily: "Source Serif 4, Georgia, Times New Roman, serif"
    fontSize: "clamp(1.7rem, 1.2rem + 1.6vw, 2.6rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.012em"
  citation:
    fontFamily: "Libre Franklin, ui-sans-serif, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 700
    letterSpacing: "0.08em"
  label:
    fontFamily: "Libre Franklin, ui-sans-serif, system-ui, sans-serif"
    fontSize: "13.5px"
    fontWeight: 400
    lineHeight: 1.45
rounded:
  sharp: "2px"
  circle: "50%"
spacing:
  gutter: "clamp(16px, 4vw, 48px)"
  section: "clamp(64px, 8vw, 120px)"
  section-compact: "clamp(48px, 6vw, 88px)"
  section-head: "clamp(32px, 4vw, 52px)"
  row: "20px"
  action-gap: "12px"
components:
  button-primary:
    backgroundColor: "{colors.caritas-red}"
    textColor: "{colors.white}"
    rounded: "{rounded.sharp}"
    padding: "0 24px"
    height: "50px"
  button-primary-hover:
    backgroundColor: "{colors.caritas-red-hover}"
  button-primary-active:
    backgroundColor: "{colors.caritas-red-press}"
  button-secondary:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sharp}"
    padding: "0 24px"
    height: "50px"
  button-secondary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.sharp}"
    padding: "0 24px"
    height: "50px"
  button-on-red:
    backgroundColor: "{colors.white}"
    textColor: "{colors.caritas-red}"
    rounded: "{rounded.sharp}"
    padding: "0 24px"
    height: "50px"
  button-on-red-hover:
    backgroundColor: "{colors.red-wash}"
  button-small:
    rounded: "{rounded.sharp}"
    padding: "0 16px"
    height: "42px"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sharp}"
    padding: "12px 14px"
    height: "50px"
  file-link:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sharp}"
    padding: "0 11px"
    height: "34px"
  file-link-hover:
    textColor: "{colors.caritas-red}"
  nav-link:
    textColor: "{colors.ink}"
    padding: "0 14px"
    height: "84px"
  utility-bar:
    backgroundColor: "{colors.night}"
    textColor: "{colors.night-text}"
    height: "38px"
  footer:
    backgroundColor: "{colors.night}"
    textColor: "{colors.night-text}"
---

# Design System: Caritas Africa

## Overview

**Creative North Star: "The Public Record"**

Caritas Africa is presented the way the confederation's best members present themselves: as an accountable institution that keeps its papers in order. White paper, near-black ink, and a single Caritas red taken from the logo. Documentary photography carries the humanity; the type and the rules carry the credibility. Nothing is ornamental, nothing is costumed as religious décor; faith appears as scripture set plainly in a serif, cited like any other source.

The system is the NGO category standard, deliberately. Density is that of a well-edited annual report: generous section spacing, tight heavy headings, long readable measures, and information laid out in ruled lists and definition grids rather than in cards. Depth is almost entirely absent; structure comes from hairlines, a heavier 3px rule over lists and data groups, and tonal bands (stone, night, red). The page is framed by dark ink at top (utility bar) and bottom (footer), and donation and safeguarding stay reachable on every page.

Light theme only. Copy is French and must tolerate the longer strings of the EN and PT publications.

**Key Characteristics:**
- White ground, ink text, one red for brand, primary action and state.
- Libre Franklin for all structure at 680 to 800 weight with negative tracking; Source Serif 4 reserved for scripture, statutes and institutional quotes.
- Near-square geometry: 2px corners on controls, photographs never rounded.
- Hairlines and 3px rules instead of cards and shadows.
- Documentary photographs, always credited on a dark caption tab.
- Authored line icons at 1.75 stroke, never glyphs or emoji.

## Colors

A restrained institutional palette: warm-neutral paper and ink, lifted by exactly one saturated voice, the Caritas red.

### Primary
- **Caritas Red** (#7c0800): the logo's red. Primary buttons ("Faire un don", "S'abonner"), the full-bleed donation band, the active marker under nav links and tabs, the dropdown's top edge, the active TOC entry, focus outlines, icon accents in lists and file links, scripture citations, and hover color for links. Hover deepens to **Caritas Red Hover** (#650600), press to **Caritas Red Press** (#540500).
- **Red Wash** (#f8eeec) and **Red Tint** (#efd6d2): the red at paper strength. Wash backs the safeguarding shield disc and the hover of white-on-red buttons; Tint is the text selection color.
- **Red on Night** (#f0a59b): the red translated for dark surfaces, used for the alert icon in the utility bar and focus on footer inputs. The donation band's body text uses a paler rose (#f6dcd8) on red.

### Neutral
- **Ink** (#17181a): headings, body text, secondary button outline and its hover fill, the ink button ("Signaler un abus"), and the 3px rule above lists and data groups.
- **Ink Soft** (#3a3c40): lead paragraphs, long prose, descriptions under titles.
- **Muted** (#5d6066): metadata, `dt` labels, breadcrumbs, counts, inactive tabs.
- **Faint** (#8b8e93): lowest-priority text only; never body copy.
- **Line** (#e3e2de): default hairline between list rows, header bottom border.
- **Line Strong** (#cfcdc8): field and file-link borders, the stronger hairline framing mission/vision and purposes.
- **Stone** (#f3f2ef): alternate section band, inner-page title band, statute block, empty state, hover fill in menus and tabs.
- **Stone Deep** (#e9e7e2): image placeholders behind photos and publication covers.
- **White** (#ffffff): the page.
- **Night** (#17181a), **Night Raised** (#212226), **Night Line** (#35373c), **Night Muted** (#a9abb0), **Night Text** (#e4e5e7): the dark frame (utility bar, footer, programme panel). Night shares Ink's value on purpose; it is named separately because it is a surface, not text.
- **Error** (#b42318): field error text and border on light ground (#ff9e92 on night).

### Named Rules
**The One Red Rule.** Caritas Red is the only chromatic color in the interface. It marks brand, the primary action, and "you are here"; if an element is red it is either clickable, current, or the logo's voice. No second accent, no gradients.

**The Band Rule.** Surfaces change by whole-width bands (white, stone, night, red), never by floating tinted boxes. The red band is reserved for the donation appeal.

## Typography

**Display Font:** Libre Franklin (with ui-sans-serif, system-ui, Segoe UI fallback)
**Body Font:** Libre Franklin
**Scripture / Quote Font:** Source Serif 4 (with Georgia, Times New Roman fallback)

**Character:** A sober American grotesque set heavy and tight for headings, reading like a well-set report cover; a transitional serif in italic carries the voice of scripture and the statutes, so faith reads as a quoted source rather than decoration.

### Hierarchy
- **Display** (800, clamp(2.5rem, 1.2rem + 3.3vw, 4.1rem), 1.02, -0.035em): the home hero tagline only; drops to 2.2rem at 480px and below.
- **Page Title** (800, clamp(2.3rem, 1.5rem + 2.8vw, 3.75rem), 1.04): the h1 of inner pages in the stone title band.
- **Headline** (780, clamp(1.8rem, 1.25rem + 1.7vw, 2.75rem), 1.08, -0.026em): section heads. Document sections and featured publications use a slightly smaller step (clamp(1.6 to 1.7rem ... 2.3rem)).
- **Title** (720 to 760, 1.05 to 1.3rem, 1.25): sub-heads, list heads, zone and value names, publication titles.
- **Lead** (400, clamp(1.08rem, 1rem + 0.35vw, 1.25rem), 1.55, Ink Soft): one sentence under a display or page title, max 40 to 62ch.
- **Body** (400, 17px, 1.6; 16.5px under 720px): prose at 18px in reading sections, max 58 to 72ch.
- **Quote** (Source Serif 4 italic 500, clamp(1.7rem ... 2.6rem), 1.15): mission and vision statements, max 30ch.
- **Citation** (700, 13px, 0.08em, uppercase, Caritas Red): the scripture reference under a quote ("Actes 1:8"). It is a citation, attached to a quote; not a label above headings.
- **Label** (400, 13.5px, Muted): `dt` labels in data grids, footnotes, metadata; numbers set with tabular lining figures.

### Named Rules
**The Serif Is Scripture Rule.** Source Serif 4 appears only for scripture, the statutes, institutional quotes and publication subtitles. Headings, UI and data are always Franklin.

**The Heavy-and-Tight Rule.** Headings run 700 to 800 with negative tracking (-0.01em to -0.035em) and `text-wrap: balance`. Light or wide-tracked headings break the voice.

## Layout

A 1280px container with a fluid gutter (clamp(16px, 4vw, 48px)). Sections breathe at clamp(64px, 8vw, 120px) vertically; section heads sit clamp(32px, 4vw, 52px) above their content, with an optional "more" link aligned to the right edge of the head.

Composition is asymmetric two-column grids with fractional weights (1.15fr / 0.85fr hero, 1.05fr / 1fr intro, 1.25fr / 1fr featured publication, 1.2fr / 1fr donation band), collapsing to one column at 1040px. Grids of data (facts, programme figures, governance, contact, knowledge links) are divided by vertical hairlines between cells rather than gaps; the first cell loses its left padding so text aligns with the container edge.

The hero photograph bleeds to the right viewport edge while the copy aligns to the container edge. The facts strip closes the hero within the first viewport. Inner pages use a stone title band, then a 250px sticky table of contents beside the document body; the TOC becomes a horizontal tab row under 1040px.

Breakpoints: 1200px (tighter nav, 2-up publications), 1040px (drawer navigation, single-column grids, hero photo moves above copy at 4:3), 720px (header 68px, everything single column, filters go full-width), 480px (display at 2.2rem).

### Named Rules
**The Ruled Ledger Rule.** Lists and data are laid out as ruled rows (1px Line between items, 3px Ink over the group), not as cards.

## Elevation & Depth

Flat by default. Depth is conveyed by tonal bands and rules; content never floats. Shadows exist only for things that are physically on top of the page or physically an object.

### Shadow Vocabulary
- **Pop** (`box-shadow: 0 2px 4px rgb(23 24 26 / 0.06), 0 18px 40px -12px rgb(23 24 26 / 0.28)`): overlays only, the nav dropdown and the toast.
- **Cover** (`box-shadow: 0 1px 2px rgb(23 24 26 / 0.08), 0 20px 40px -20px rgb(23 24 26 / 0.35)`): the featured publication cover, a printed document resting on the page.

### Named Rules
**The Overlays-Only Rule.** A shadow means "this sits above the page": menus, toasts, a printed cover. Sections, panels, list items and cards stay flat.

## Shapes

Near-square. Buttons, fields, file links, segmented filters, menu items, the toast and social links take a 2px corner. Photographs, banners, publication frames and bands are square-cornered. The only circles are functional: the safeguarding shield disc (64px) and timeline nodes (12px, 2px red ring on white). The recurring line forms are the 1px hairline, the 3px rule (ink over groups; red as the active marker under nav, tabs, dropdown top and TOC), and the 2px red focus outline at 3px offset.

## Components

### Buttons
Firm, square, and plain; the press is felt, not decorated.
- **Shape:** squared (2px), 50px tall, 24px horizontal padding, Franklin 680 at 15.5px, 1.5px border.
- **Primary:** Caritas Red with white text; hover Caritas Red Hover, active Caritas Red Press.
- **Secondary:** white with a 1.5px Ink border; hover fills Ink with white text.
- **Ink:** Ink fill with white text, for the safeguarding action.
- **On red / on night:** white with red text (hover Red Wash), and a transparent variant with a 75% white border.
- **Small:** 42px tall, 16px padding, 14.5px.
- **Motion:** every button scales to 0.97 on press over 160ms with the ease-out curve; hover changes only apply on fine pointers.

### Text links ("more")
Franklin 680 with a 1.5px Line Strong underline at 6px offset and a trailing arrow; on hover the text and underline turn red and the arrow nudges 3px right.

### File links
The document download chip: 34px tall (46px large), 1px Line Strong border, 2px corner, a red download icon and the language abbreviation (FR / EN / PT); hover turns border and text red, press scales to 0.96.

### Inputs / Fields
- **Style:** white, 1.5px Line Strong border, 2px corner, 50px tall (43px in the library bar), 16px text.
- **Focus:** border turns Caritas Red with a 3px halo at 16% red; on night, the border turns Red on Night.
- **Error:** border and a 13.5px message in Error red. Selects use the same stroke with a chevron icon; search puts a muted icon at the left.

### Segmented filter
A 1.5px Ink outline holding radio labels; an Ink thumb slides (240ms) behind the checked label, which turns white. Becomes a two-column grid on mobile.

### Navigation
- **Utility bar:** Night, 38px, 13.5px; holds "Signaler un abus" (with a Red on Night shield), jobs and tenders, contact and the FR/EN/PT switch.
- **Header:** sticky white, 84px (68px mobile), 1px Line bottom border; logo left, five links in Franklin 600 at 15.5px, red "Faire un don" right.
- **States:** a 3px red underline scales in from the left (220ms) on hover, current page and open dropdown.
- **Dropdown:** white panel with a 3px red top edge and the Pop shadow, items with a muted description line, hover Stone; opens in 180ms from its trigger.
- **Mobile:** below 1040px a right-side drawer (max 420px, 280ms slide) with ruled 19px links, plus a persistent red donate button in the header.

### Network explorer (signature)
Zone tabs across a Line Strong baseline, each with a bold code and a muted subtitle; a single 3px red rule slides to the selected tab (240ms). The panel shows the zone name at clamp(2.2rem ... 3.4rem) 800 beside a white coordinator block of `dt`/`dd` pairs, crossfading on change.

### Publication library (signature)
Publication tiles with a 4:3 Stone Deep frame (cover contained, 1.025 zoom on hover), a Franklin title and the file-link row. A sticky filter bar holds the segmented type filter, a language select, search and a live count; tiles rise in with a 40ms stagger.

### Photo credit
Every photograph carries a credit tab at the bottom right: 12.5px light text on 72% Night.

## Do's and Don'ts

### Do:
- **Do** keep Caritas Red for brand, primary action, and current-state markers, on white or as the one full-width donation band.
- **Do** set headings in Libre Franklin 700 to 800 with negative tracking, and reserve Source Serif 4 for scripture, statutes and institutional quotes.
- **Do** build lists and data as ruled rows: 1px Line between rows, a 3px Ink rule over the group, vertical hairlines between grid cells.
- **Do** use 2px corners on every control and leave photographs square.
- **Do** credit every photograph on its dark caption tab.
- **Do** use the ease-out curve (cubic-bezier(0.23, 1, 0.32, 1)), 160ms presses at 0.97, and reduce motion to opacity when the user asks.
- **Do** keep "Faire un don" and "Signaler un abus" reachable from every page's header or utility bar.

### Don't:
- **Don't** introduce a second accent color, gradients, or tints of red as decorative fills.
- **Don't** put content in shadowed cards; shadows are for overlays and the printed cover only.
- **Don't** round photographs or use pill-shaped buttons.
- **Don't** use religious ornament (crosses, halos, stained-glass textures) as decoration; the logo is the only emblem.
- **Don't** use emoji or text glyphs as icons; use the 1.75-stroke line set.
- **Don't** place small uppercase labels above headings; uppercase red is for the scripture citation beneath a quote.
