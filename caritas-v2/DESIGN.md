---
name: Caritas Africa (v2)
description: The international-NGO campaign standard, with full-bleed documentary photographs, condensed heavy Archivo, a committed Caritas red field and a first screen that belongs to the photograph.
colors:
  red: "#7c0800"
  red-hover: "#650600"
  red-press: "#540500"
  red-50: "#fbf0ee"
  on-red: "#ffffff"
  on-red-2: "#f6d9d4"
  red-on-dark: "#f3a69b"
  carbon: "#161412"
  carbon-2: "#221f1c"
  carbon-line: "#3b3733"
  on-dark: "#eeebe7"
  on-dark-2: "#b4ada5"
  ink: "#161412"
  ink-2: "#45403a"
  muted: "#69635c"
  line: "#e5e1db"
  line-2: "#cbc4bb"
  band: "#f2f0ed"
  band-2: "#e7e3dd"
  white: "#ffffff"
  error: "#b42318"
  wa: "#1fa855"
  wa-hover: "#188c46"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "clamp(2.9rem, 1.5rem + 4.4vw, 5.6rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "0"
    fontVariation: "'wdth' 64"
  headline:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.3rem, 1.5rem + 2.6vw, 3.9rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "0"
    fontVariation: "'wdth' 64"
  title-narrow:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 0.9rem + 0.8vw, 1.6rem)"
    fontWeight: 800
    lineHeight: 1
    fontVariation: "'wdth' 64"
  title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.3rem"
    fontWeight: 700
    lineHeight: 1.22
    letterSpacing: "-0.01em"
  quote:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 1.4rem + 2.2vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 72"
  control:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 750
    lineHeight: 1
    letterSpacing: "0.02em"
    fontVariation: "'wdth' 72"
  lead:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.1rem, 1rem + 0.4vw, 1.3rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  citation:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 700
    letterSpacing: "0.08em"
  label:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "13.5px"
    fontWeight: 400
    lineHeight: 1.45
rounded:
  none: "0"
  circle: "50%"
spacing:
  gutter: "clamp(16px, 4vw, 48px)"
  section: "clamp(72px, 9vw, 128px)"
  doc-section: "clamp(64px, 8vw, 112px)"
  section-head: "clamp(36px, 4.5vw, 60px)"
  action-gap: "12px"
components:
  button-primary:
    backgroundColor: "{colors.red}"
    textColor: "{colors.white}"
    typography: "{typography.control}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.red-hover}"
  button-primary-active:
    backgroundColor: "{colors.red-press}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "52px"
  button-ghost-hover:
    backgroundColor: "{colors.white}"
    textColor: "{colors.carbon}"
  button-white:
    backgroundColor: "{colors.white}"
    textColor: "{colors.red}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "52px"
  button-white-hover:
    backgroundColor: "{colors.red-50}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "52px"
  button-line-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  button-ink:
    backgroundColor: "{colors.carbon}"
    textColor: "{colors.white}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "52px"
  button-small:
    padding: "0 18px"
    height: "44px"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 14px"
    height: "46px"
  input-on-dark:
    backgroundColor: "{colors.carbon-2}"
    textColor: "{colors.white}"
    rounded: "{rounded.none}"
    padding: "0 14px"
    height: "52px"
  file-link:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 12px"
    height: "38px"
  file-link-hover:
    textColor: "{colors.red}"
  nav-link:
    textColor: "{colors.ink}"
    padding: "0 14px"
    height: "80px"
  utility-bar:
    backgroundColor: "{colors.carbon}"
    textColor: "{colors.on-dark}"
    height: "38px"
  footer:
    backgroundColor: "{colors.carbon}"
    textColor: "{colors.on-dark}"
  whatsapp-button:
    backgroundColor: "{colors.wa}"
    textColor: "{colors.white}"
    rounded: "{rounded.circle}"
    size: "56px"
---

# Design System: Caritas Africa (v2)

## Overview

**Creative North Star: "The Campaign Front Page"**

Caritas Africa speaks here the way the largest international NGOs speak: a documentary photograph owns the first screen, the headline is a campaign line set heavy, condensed and uppercase, and giving is one red button away in the header, the hero and a full-width red giving band. The voice is loud where it should be (hero, section heads, the red bands) and quiet everywhere else: normal-width Archivo for reading, hairlines and heavy ink rules for data, every photograph credited on a dark tab.

One family carries everything. Archivo's width axis does the work a second typeface would do: narrow (64%) for display and section heads, condensed (72%) for buttons, quotes and small heads, full width (100%) for text and UI. Caritas red is not a sparing accent but a committed field: the primary action, the mission band and the giving band. Carbon frames the page at top (utility bar) and bottom (footer) and backs the hero; one warm grey band alternates with white.

Geometry is square without exception, except for the circular WhatsApp button. Depth is nearly absent; shadows mark the things that sit above the page (menus and toasts, the floating WhatsApp button) and the printed report cover. Faith is stated plainly, as scripture citations under the mission and vision quotes, never as ornament.

**Key Characteristics:**
- Full-bleed, credited documentary photographs under a carbon scrim; never rounded.
- Archivo variable for everything: 800 uppercase at 64% width for display and heads, 72% width for controls, 100% for text.
- Caritas red as a committed field (primary action, mission and giving bands) and as the 4px "you are here" rule.
- 4px ink rules over every data group, 1px hairlines between rows and cells; no cards.
- Square corners everywhere; the WhatsApp button is the one circle.
- One motion grammar: ease-out cubic-bezier(0.23, 1, 0.32, 1), 0.97 press at 160ms, hover only on fine pointers.

## Colors

Warm carbon, white and one warm grey, committed to a single deep red that is allowed to fill whole bands.

### Primary
- **Caritas Red** (red): the confederation's red. Primary buttons ("Faire un don"), the full-bleed mission/vision band and the giving band (the "don" anchor), the 4px marker under the current nav link, sub-nav item and zone tab, the dropdown's top edge, zone names, timeline years, the lead value, icon accents in lists and file links, link-arrow underlines, focus outlines and text selection. Hover deepens to **Red Hover**, press to **Red Press**.
- **Red Wash** (red-50): only the hover fill of the white-on-red button.
- **Rose on Red** (on-red-2): secondary text on the red bands (band labels, giving copy, the vision/mission paragraphs).
- **Red on Dark** (red-on-dark): the red translated for carbon: the utility bar's alert icon and the footer input's focus border.

### Neutral
- **Carbon** (carbon): the dark frame: utility bar, footer, hero ground and scrims, toast, the segmented-control thumb, ink button. **Carbon Raised** (carbon-2) backs the active language and footer inputs; **Carbon Line** (carbon-line) divides on dark.
- **On Dark** (on-dark) and **On Dark Muted** (on-dark-2): text and secondary text on carbon.
- **Ink** (ink): headings, body text, the 4px rules over data groups, outline-button stroke. Same value as Carbon on purpose; named separately because one is text and the other a surface.
- **Ink Soft** (ink-2): leads, prose, descriptions under titles.
- **Muted** (muted): `dt` labels, metadata, captions, inactive tabs, counts.
- **Line** (line): default hairline between rows and cells, header and sub-nav bottom borders.
- **Line Strong** (line-2): control strokes (fields, file links), news-grid hairlines, the zone-tab baseline.
- **Band** (band): the one alternate section ground; also the segmented-control track, statute block, publication frames, empty state and menu hover.
- **Band Deep** (band-2): placeholder behind photographs while they load.
- **White** (white): the page.
- **Error** (error): field error text and border on white.

### Functional exception
- **WhatsApp Green** (wa, hover wa-hover): the floating WhatsApp button only, the platform's own color; it is a third-party mark, not a second accent.

### Named Rules
**The Committed Red Rule.** Red is a field, not a spark: it may fill a whole band (mission, giving) or the primary action, and it marks "you are here" (current nav item, selected zone tab). It never decorates (no red tints as section grounds, no red icons in cards for their own sake).

**The Three Grounds Rule.** Sections sit on white, Band or a full-width colored field (carbon or red). Surfaces change by whole-width bands, never by floating tinted boxes.

## Typography

**Display Font:** Archivo variable, width 64% (with ui-sans-serif, system-ui, Segoe UI, Roboto fallback)
**Body Font:** Archivo, width 100%
**Control Font:** Archivo, width 72%

**Character:** A single grotesque stretched across its width axis: compressed, heavy and uppercase it reads as a campaign poster; at full width it is a calm, legible text face. The contrast between the two is the hierarchy.

### Hierarchy
- **Display** (800, 64% width, uppercase, clamp(2.9rem, 1.5rem + 4.4vw, 5.6rem), 0.9, balanced): page h1 and hero slide headlines (hero copy caps at 5.2rem and 8.2em measure; 2.6–3.4rem under 720px, 2.55rem under 480px).
- **Headline** (800, 64% width, uppercase, clamp(2.3rem, 1.5rem + 2.6vw, 3.9rem), 0.92): section heads. Feature heads (lead action, featured publication, safeguarding, jobs, figures) use the same face at intermediate sizes (1.8 to 3.1rem).
- **Title Narrow** (800, 64% width, uppercase, 1.25 to 1.9rem, 1): zone codes, value names, purposes, timeline years, first column of the zone table, big figures, the library count.
- **Title** (700, 1.3rem, 1.22, -0.01em, sentence case): card and list heads, publication titles (17px).
- **Quote** (700 italic, 72% width, clamp(2.1rem, 1.4rem + 2.2vw, 3.5rem), 1): mission and vision statements on the red band.
- **Control** (750, 72% width, uppercase, 17px, 0.02em): buttons, drawer links (22px), news headlines (sentence case, 1.35–1.7rem), footer heads (16px, 0.04em).
- **Lead** (400, clamp(1.1rem, 1rem + 0.4vw, 1.3rem), 1.5, Ink Soft): one paragraph under a display or section head, max 46ch.
- **Body** (400, 17px, 1.6; 16.5px under 720px): prose at 18px in reading sections, max 68ch.
- **Citation** (700, 14px, 0.08em, uppercase, white with a 2px white top rule): the source line under a scripture quote ("Notre mission · Actes 1:8"). On light ground the statute citation is 14px Muted, sentence case.
- **Label** (400, 13.5px, Muted): `dt` labels, captions, metadata; numbers set with tabular lining figures.

### Named Rules
**The Width-Is-Hierarchy Rule.** Rank is set by width before size: 64% width 800 uppercase for anything that heads, 72% for anything you press, 100% for anything you read. Never set running text condensed, never set a heading at full width.

**The Citation-Below Rule.** Small uppercase text appears only as a citation under the quote it sources. There are no labels above headings: the heading speaks first.

## Layout

A 1280px container with a fluid gutter (gutter). Home sections breathe at the section step; document sections on inner pages at doc-section, separated by a 1px Line. Section heads sit section-head above content, with an optional link-arrow aligned to the right edge of the head (stacking under 720px).

The hero is a full-bleed carousel that fills the first viewport below the utility bar and header (clamp(540px, 100svh minus utility bar and header, 780px)), with no visible controls. Copy is anchored bottom-left over a left-and-bottom carbon scrim, padded clamp(64px, 9vh, 104px) from the bottom edge; the photograph and its credit tab are the only other things on screen. Under 720px the hero stacks: the photo on top (46svh, 280–420px), the copy on carbon below with 40px bottom padding.

Composition is asymmetric: a 12-column grid for photo-led features of unequal size (one tall 5-column lead, a wide 7-column, then 3 + 4), fractional two-column splits (1fr / 1.05fr intro, 1.65fr / 1fr newsroom, 1.15fr / 1fr featured publication), and edge-bleeding half-and-half bands (programme on carbon, giving on red) whose copy aligns to the container edge. Inner pages open on a photo or split page hero, then a sticky sub-nav, then 0.85fr / 1.15fr splits with a sticky head.

Data grids (identity, figures, coordinators, governance, contact, knowledge links, values, timeline, policies) are divided by vertical hairlines between cells rather than gaps; the first cell loses its left padding so text aligns with the container edge.

Breakpoints: 1200px (tighter nav, 3-up rail and library), 1040px (header 68px, drawer navigation, single-column splits, zone tabs scroll), 720px (stacked hero, everything single column, 2-up library), 480px (1-up library, smaller hero display).

### Named Rules
**The Ruled Data Rule.** Lists and data are ruled rows: a 4px Ink rule over the group, 1px Line between rows, vertical hairlines between cells. Never cards.

## Elevation & Depth

Flat by default. Depth comes from photographs, the carbon and red fields, and rules. A shadow means the element physically sits over something else.

### Shadow Vocabulary
- **Pop** (`box-shadow: 0 2px 4px rgb(22 20 18 / 0.06), 0 22px 44px -14px rgb(22 20 18 / 0.32)`): the nav dropdown and the toast.
- **Cover** (`box-shadow: 0 1px 2px rgb(22 20 18 / 0.1), 0 24px 40px -22px rgb(22 20 18 / 0.45)`): the featured report cover, a printed object on its Band frame.
- **Float** (`box-shadow: 0 2px 4px rgb(22 20 18 / 0.12), 0 12px 28px -8px rgb(22 20 18 / 0.4)`): the fixed WhatsApp button.

Photo scrims are carbon linear gradients (left-to-right plus bottom-up) that exist only to keep white type legible on photographs; they are part of the photograph, not a decorative gradient.

### Named Rules
**The Sits-Above Rule.** Only overlays, the floating button and the printed cover cast shadows. Sections, tiles, lists and panels stay flat.

## Shapes

Square. Buttons, fields, segmented controls, file links, rail buttons, social links, menus and the toast all have 0 radius; photographs, report frames and bands are square-cornered. The one circle is the WhatsApp button. Recurring line forms: the 1px hairline, the 4px rule (Ink over data groups; Red as the active marker under nav, sub-nav and zone tabs, and along the dropdown's top), 2px strokes on buttons, 1.5px strokes on fields and file links, and a 2px red focus outline at 3px offset (white on carbon, red and hero grounds). Icons are a Lucide-derived line set at 1.75 stroke, 22px default (18 small, 30 large).

## Components

### Buttons
Solid, square blocks in condensed uppercase; the press is felt, not decorated.
- **Shape:** 0 radius, 52px tall, 24px padding, 2px border in the fill color, 72%-width Archivo 750 at 17px with 0.02em tracking; an optional trailing arrow nudges 3px right on hover.
- **Primary (red):** Caritas Red, white text; hover Red Hover, press Red Press.
- **Ghost:** transparent with an 80% white border, on photographs and red bands; hover fills white with carbon text.
- **White:** white with red text, the primary action on a red band; hover Red Wash.
- **Line:** transparent with an Ink border; hover fills Ink with white text.
- **Ink:** Carbon fill, the safeguarding "Signaler un abus" action; hover black.
- **Size:** small 44px / 18px padding / 16px (library empty state).
- **Motion:** scale 0.97 on press in 160ms ease-out; color changes 160ms; hover only on fine pointers.

### Link arrow
700 weight text with a 2px red bottom border and a red trailing arrow; on hover the text turns red and the gap widens from 8 to 12px. On carbon and red the border and arrow take the text color.

### Segmented control
A Band track with 3px padding holding radio labels (650, 14.5px); a square carbon thumb slides behind the checked label in 240ms ease-out and the label turns white. Used by the library's document-type filter; full-width with equal options under 720px.

### Hero carousel (signature)
Three credited full-bleed slides, no visible controls. Every 7s the next slide crossfades in over 900ms while its photo settles from 1.06 to 1 over 7.4s; copy children rise 14px in 700ms with a 70ms stagger. Autoplay pauses on hover (fine pointers), focus and hidden tab; touch users can swipe between slides. Under reduced motion there is no autoplay and no settle; the first slide stays.

### Inputs / Fields
- **Style:** white, 1.5px Line Strong stroke, 0 radius, 46px in the library bar; selects carry a muted chevron, search a muted leading icon.
- **Focus:** border turns red with a 3px red halo at 14–16%.
- **On carbon (newsletter):** Carbon Raised fill, Carbon Line stroke, 52px; focus border Red on Dark with an 18% halo; errors in a light coral.
- **Error:** Error border and a 13.5–14px message.

### File links
The download chip: 38px (48px large), 1.5px Line Strong stroke, a red file icon and the language abbreviation; hover turns border and text red, press 0.96.

### Navigation
- **Utility bar:** Carbon, 38px, 14px: membership line, "Signaler un abus" with a Red on Dark shield, jobs and tenders, contact, and the FR/EN/PT switch with 18x13 flags (active = Carbon Raised).
- **Header:** sticky white, 80px (68px under 1040px), 1px Line bottom; logo 128px, five links in 650 at 16px, red "Faire un don" button.
- **States:** a 4px red rule scales in from the left (220ms) on hover, current page and open dropdown.
- **Dropdown:** 340px white panel, 4px red top edge, Pop shadow, items with a muted description line, hover Band with red text; opens in 180ms from translateY(-6px) scale(0.98).
- **Sub-nav (inner pages):** sticky under the header, 650 at 15px, the same 4px red current rule.
- **Mobile:** below 1040px a right-side drawer (max 420px, 300ms slide) with ruled 72%-width uppercase 22px links, sub-links at full width, and a red donate button kept in the header.

### Zone tabs (signature)
Six tabs over a 2px Line Strong baseline, each a narrow 800 uppercase code above a 13.5px region; one 4px red rule slides to the selected tab (260ms), the selected code turns red. The panel pairs the zone name (narrow 800, red) with a ruled coordinator grid, fading up 6px on change. Under 1040px the tabs scroll horizontally.

### Publications rail and library
Report tiles with a 4:3 Band frame (cover contained, 1.03 zoom on hover), a 700 title, red-accented metadata and the file-link row. The rail snaps 4-up (3-up under 1200px, 72% cards under 720px) with square 44px Ink-stroked arrows. The library adds a sticky filter bar (segmented type filter, language select, search, live count in narrow 800) and tiles rising in over 420ms.

### Photo credit
Every photograph carries a credit tab (12.5px light text on carbon at 66%), top-right in the hero, bottom-right elsewhere; captions under feature photos are 13.5px Muted with the source in bold Ink.

### WhatsApp button
Fixed bottom-right, 56px circle (52px mobile) in WhatsApp green with the Float shadow; a carbon tooltip slides in on hover and focus.

## Do's and Don'ts

### Do:
- **Do** let a credited documentary photograph own the first screen, with a carbon scrim only as strong as legibility needs.
- **Do** set every heading in Archivo 800 uppercase at 64% width, every control at 72% width, and all reading text at 100%.
- **Do** use Caritas red as a committed field: primary action, mission and giving bands, and the 4px current-state rule.
- **Do** build data as ruled rows and cells: 4px Ink over the group, 1px Line between rows, vertical hairlines between cells.
- **Do** keep every corner square; the WhatsApp button is the only circle.
- **Do** put the scripture or statute citation under its quote, never a label above a heading.
- **Do** use the ease-out curve (cubic-bezier(0.23, 1, 0.32, 1)), 0.97 presses at 160ms, hover only on fine pointers, and fall back to plain fades under reduced motion.
- **Do** keep "Faire un don" and "Signaler un abus" reachable from every page's header or utility bar.

### Don't:
- **Don't** put small uppercase eyebrow labels or kickers above headings.
- **Don't** put content in shadowed or tinted cards; shadows belong to overlays, the floating button and the printed cover.
- **Don't** round photographs, buttons or fields, or use pill shapes.
- **Don't** introduce a second accent color; WhatsApp green stays on the WhatsApp button.
- **Don't** use gradients except as carbon scrims over photographs.
- **Don't** use religious ornament (crosses, halos, stained glass) as decoration; the logo is the only emblem.
- **Don't** use emoji or text glyphs as icons; use the 1.75-stroke line set.
- **Don't** set running text condensed or headings at full width.
