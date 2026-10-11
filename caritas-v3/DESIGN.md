---
name: Caritas Africa (v3)
description: The v1 public record, white, ink and the Caritas red of the logo, told as a scroll story where each home chapter has one scroll-mapped device.
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
  numeral:
    fontFamily: "Libre Franklin, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(8rem, 3rem + 14vw, 16rem)"
    fontWeight: 800
    lineHeight: 0.8
    letterSpacing: "-0.05em"
  figure:
    fontFamily: "Libre Franklin, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.4rem, 2rem + 4.2vw, 5.8rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  page-title:
    fontFamily: "Libre Franklin, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.3rem, 1.5rem + 2.8vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.032em"
  statement:
    fontFamily: "Libre Franklin, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.2rem + 2.5vw, 3.5rem)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.032em"
  headline:
    fontFamily: "Libre Franklin, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.8rem, 1.25rem + 1.7vw, 2.75rem)"
    fontWeight: 780
    lineHeight: 1.08
    letterSpacing: "-0.026em"
  ink-sentence:
    fontFamily: "Libre Franklin, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.45rem, 1.05rem + 1.25vw, 2.15rem)"
    fontWeight: 650
    lineHeight: 1.28
    letterSpacing: "-0.022em"
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
    fontSize: "clamp(1.8rem, 1.3rem + 1.6vw, 2.6rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.012em"
  quote-stage:
    fontFamily: "Source Serif 4, Georgia, Times New Roman, serif"
    fontSize: "clamp(2.2rem, 1.3rem + 2.7vw, 3.9rem)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.016em"
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
  stage: "calc(100svh - 84px)"
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
  segmented-filter:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sharp}"
    padding: "0 15px"
    height: "40px"
  segmented-filter-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  nav-link:
    textColor: "{colors.ink}"
    padding: "0 14px"
    height: "84px"
  utility-bar:
    backgroundColor: "{colors.night}"
    textColor: "{colors.night-text}"
    height: "38px"
  reading-rule:
    backgroundColor: "{colors.caritas-red}"
    height: "2px"
  chapter-meter:
    backgroundColor: "{colors.line-strong}"
    height: "2px"
  chapter-meter-fill:
    backgroundColor: "{colors.caritas-red}"
  photo-credit:
    textColor: "{colors.night-text}"
    padding: "6px 12px"
  night-chapter:
    backgroundColor: "{colors.night}"
    textColor: "{colors.night-text}"
  footer:
    backgroundColor: "{colors.night}"
    textColor: "{colors.night-text}"
---

# Design System: Caritas Africa (v3)

## Overview

**Creative North Star: "The Public Record, Read Aloud"**

v3 is v1's world, unchanged at rest, and told in order. Everything a visitor sees when the page is still is the v1 proposal: white paper, near-black ink, the single Caritas red of the logo, documentary photographs credited on dark tabs, heavy tight Franklin headings, Source Serif 4 kept for scripture, ruled ledgers instead of cards. What v3 adds is time: the home page's v1 sections become chapters, and each chapter has exactly one device whose state is a direct function of scroll position (the opening photograph widening to full bleed, a sentence inking word by word, mission and vision revealing phrase by phrase, a horizontal track of action photographs, the APPROCHE figures stepping through a focus band, a numeral counting to 46 before the six zones light in turn). The inner pages keep v1's documentary layout with quieter devices: title words rising on load, a page photograph widening from the content column to the viewport edge, timelines and the organisation ladder lighting step by step, values taking the red as they cross the centre.

Density stays that of a well-edited annual report. Pinned chapters occupy one stage (the viewport under the 84px header) and hold for 2.3 to 4.2 stage-heights of scroll; reading sections between them are v1 sections with v1 spacing. Nothing autoplays: apart from the single load moment (title words and the white unveil over the opening photograph) and the looping line of the "Faites défiler" cue, which fades as soon as the reader scrolls, every movement waits for the reader's scroll. The page is still framed by ink (utility bar, footer, and now the APPROCHE chapter), and donation and safeguarding stay one click away everywhere.

Light theme only. Copy is French and must tolerate the longer strings of the EN and PT publications. With reduced motion requested, the site is v1's static layout: nothing pinned, every device at its final state.

**Key Characteristics:**
- At rest, v1 exactly: white ground, ink text, one red for brand, primary action and state.
- Libre Franklin for all structure at 650 to 800 weight with negative tracking; Source Serif 4 only for scripture, statutes and institutional quotes.
- Near-square geometry: 2px corners on controls, photographs never rounded.
- Hairlines and 3px rules instead of cards and shadows; the red rule also measures progress (reading rule, chapter meter, ladder fill).
- One scroll-mapped device per home chapter, no autoplay, every state reachable by scrolling back.
- Documentary photographs, always credited on a dark caption tab.
- Reduced motion returns the static v1 layout with every device in its final state.

## Colors

v1's restrained institutional palette, unchanged: warm-neutral paper and ink, lifted by exactly one saturated voice, the Caritas red.

### Primary
- **Caritas Red**: the logo's red. Primary buttons ("Faire un don", "S'abonner"), the full-bleed donation band, the active marker under nav links and tabs, the dropdown's top edge, the active TOC entry, focus outlines, icon accents in lists and file links, scripture citations, the type label in dated document meta, the current region and the ends of the organisation ladder, hover color for links. In v3 it is also the colour of progress: the 2px reading rule under the header, the fill of the chapter meter, the timeline and ladder fill, the current chapter mark on the rail, the zone code that is "now" in the network chapter, the value that crosses the centre. Hover deepens to **Caritas Red Hover**, press to **Caritas Red Press**.
- **Red Wash** and **Red Tint**: the red at paper strength. Wash backs the safeguarding shield disc, the contact form's success message (with a 3px red top rule) and the hover of white-on-red buttons; Tint is the text selection colour.
- **Red on Night**: the red translated for dark surfaces: the alert icon in the utility bar, focus on footer inputs, the rail's current mark when it crosses a night chapter (APPROCHE, donation band). The donation band's body text uses a paler rose (#f6dcd8) on red; the APPROCHE "more" link hovers to #f6c9c2.

### Neutral
- **Ink**: headings, body text, secondary button outline and its hover fill, the ink button ("Signaler un abus"), the segmented filter's outline and thumb, the 3px rule above lists and data groups, the network numeral.
- **Ink Soft**: lead paragraphs, long prose, descriptions under titles.
- **Muted**: metadata, `dt` labels, breadcrumbs, counts, inactive tabs, the "Faites défiler" cue.
- **Faint**: lowest-priority text only; never body copy.
- **Line**: default hairline between list rows, header bottom border.
- **Line Strong**: field and file-link borders, the stronger hairline framing purposes, ladder rows, zones and regions; the chapter meter's track; the unread colour of words in the ink-fill sentence before they ink.
- **Stone**: alternate section band, inner-page title band, the mission/vision stage and the network stage, statute block, empty state, hover fill in menus and tabs.
- **Stone Deep**: placeholders behind photographs and covers, including the opening window before the image paints.
- **White**: the page, and the unveil panel that wipes off the opening photograph on load.
- **Night**, **Night Raised**, **Night Line**, **Night Muted**, **Night Text**: the dark frame (utility bar, footer) and the APPROCHE chapter. Night shares Ink's value on purpose; it is named separately because it is a surface, not text.
- **Error**: field error text and border on light ground (#ff9e92 on night).

### Named Rules
**The One Red Rule.** Caritas Red is the only chromatic colour in the interface. It marks brand, the primary action, "you are here" and "how far you have read"; if an element is red it is clickable, current, progress, or the logo's voice. No second accent.

**The Band Rule.** Surfaces change by whole-width bands (white, stone, night, red), never by floating tinted boxes. Pinned chapters are bands too: stone for mission/vision and the network, night for APPROCHE. The red band is reserved for the donation appeal.

## Typography

**Display Font:** Libre Franklin (with ui-sans-serif, system-ui, Segoe UI fallback)
**Body Font:** Libre Franklin
**Scripture / Quote Font:** Source Serif 4 (with Georgia, Times New Roman fallback)

**Character:** A sober American grotesque set heavy and tight for headings, reading like a well-set report cover; a transitional serif in italic carries the voice of scripture and the statutes, so faith reads as a quoted source rather than decoration. v3 adds larger steps of the same Franklin for the scroll story's numerals and statements; it adds no family.

### Hierarchy
- **Display**: the home h1 in the opening chapter only; 2.2rem at 480px and below (clamp(2.05rem ... 2.6rem) inside the opening under 720px). Split into words that rise on load.
- **Numeral**: the network chapter's counting "46" only; clamp(6rem ... 9rem) under 1040px. Tabular lining figures.
- **Figure**: the APPROCHE chapter's stepped counters (2,5 / 17 / 40), with the unit in a `small` at 0.3em, 700.
- **Page Title**: the h1 of inner pages in the stone title band, split into words that rise on load.
- **Statement**: the sentence that appears over the full-bleed opening photograph ("Depuis 1995, 46 Caritas nationales…"), white, max 21ch.
- **Headline**: section heads, including the APPROCHE and actions chapter heads. Document sections and featured publications use clamp(1.6 to 1.7rem ... 2.3rem); the network chapter's h2 under the numeral uses clamp(1.4rem ... 2rem) at 760.
- **Ink Sentence**: the "who we are" sentence that inks word by word, max 28ch.
- **Title** (720 to 760, 1.05 to 1.3rem): sub-heads, list heads, mission/vision pane heads, zone and value names, publication and document titles (dated items at 1.15rem 700).
- **Lead**: one sentence under a display or page title, Ink Soft, max 40 to 62ch.
- **Body**: prose at 18px in reading sections (19px for the mission/vision phrases, 16.5px in action panels), max 46 to 72ch; 16.5px under 720px.
- **Quote**: Source Serif 4 italic for mission and vision on the inner pages, max 30ch.
- **Quote Stage**: the same quote at stage size inside the pinned mission/vision chapter; clamp(1.9rem ... 2.8rem) under 1040px.
- **Citation**: uppercase, Caritas Red; the scripture reference under a quote ("Actes 1:8"). It is a citation attached to a quote, not a label above a heading.
- **Label**: `dt` labels, metadata, footnotes, dated meta (14px); numbers set with tabular lining figures.

### Named Rules
**The Serif Is Scripture Rule.** Source Serif 4 appears only for scripture, the statutes, institutional quotes and publication subtitles. Headings, UI, data and the scroll story's numerals are always Franklin.

**The Heavy-and-Tight Rule.** Headings run 700 to 800 with negative tracking (-0.01em to -0.05em, tightest on the largest numerals) and `text-wrap: balance`. The only lighter large text is the ink sentence at 650. Light or wide-tracked headings break the voice.

## Layout

A 1280px container with a fluid gutter (`gutter`); full-bleed pieces align their copy to the container edge (the "edge": the larger of the gutter and the centred container's inner edge). Reading sections breathe at `section` vertically; section heads sit `section-head` above their content, with an optional "more" link right-aligned in the head.

Composition is asymmetric two-column grids with fractional weights (1.05fr / 1fr intro and mission/vision, 0.9fr / 1.1fr network, 1fr / 1fr APPROCHE, 1.25fr / 1fr featured publication, 1.2fr / 1fr donation band, 0.8fr / 1.2fr organisation, 0.85fr / 1.15fr contact, list plus a 300px sticky aside on news and jobs), collapsing to one column at 1040px. Grids of data (facts, figures, governance, contact, knowledge links, regions) are divided by vertical hairlines between cells rather than gaps; the first cell in each row loses its left padding so text aligns with the container edge.

**Stages.** A pinned chapter is a tall section (the scroll runway) holding a sticky stage exactly one viewport under the header (`stage`, 100svh minus the header). Runways as coded: opening 230vh (210vh at 1040px, 200vh at 720px), mission/vision 250vh (230vh at 1040px), network 300vh (280vh at 720px), actions measured from the track (track overflow divided by 0.9, plus one stage). Pinned stages clip overflow and carry the chapter meter 26px above their bottom edge.

**The opening window.** At rest the opening photograph covers the v1 split window: the right 42.5% of the stage (copy confined to the left 57.5%, max 680px), edge to edge to the viewport. Under 1040px the window is the top 44% of the stage and the copy sits at the bottom.

Inner pages: a stone title band, then the page photograph window (clamp(220px, 34vw, 480px) tall; 56vw under 720px), then a 250px sticky table of contents beside the document body; the TOC becomes a horizontal tab row under 1040px. Library, news and jobs pages put a sticky filter bar under the header (static under 720px).

Breakpoints: 1200px (tighter nav, 2-up publications), 1040px (drawer navigation, single-column grids, opening window moves to the top, APPROCHE unpinned, chapter rail hidden), 720px (header 68px, everything single column, filters full-width, zone details folded to the current zone), 480px (display at 2.2rem).

### Named Rules
**The Ruled Ledger Rule.** Lists and data are laid out as ruled rows (1px Line between items, 3px Ink over the group), not as cards. The scroll story keeps this: zones, the organisation ladder, figures and dated documents are all ledgers.

**The One Device Rule.** Each home chapter has one scroll-driven device and each pinned stage pins one idea. Reading sections between chapters stay still apart from a translate-only rise.

## Elevation & Depth

Flat by default, as in v1. Depth is conveyed by tonal bands and rules; content never floats. Shadows exist only for things physically on top of the page or physically an object. The scroll story adds no shadow: its depth comes from clipping (photo windows that open) and from the dark scrim that rises over the full-bleed opening photograph so the white statement reads.

### Shadow Vocabulary
- **Pop** (`box-shadow: 0 2px 4px rgb(23 24 26 / 0.06), 0 18px 40px -12px rgb(23 24 26 / 0.28)`): overlays only, the nav dropdown and the toast.
- **Cover** (`box-shadow: 0 1px 2px rgb(23 24 26 / 0.08), 0 20px 40px -20px rgb(23 24 26 / 0.35)`): the featured publication cover, a printed document resting on the page.

### Named Rules
**The Overlays-Only Rule.** A shadow means "this sits above the page": menus, toasts, a printed cover. Sections, stages, panels, list items and cards stay flat.

**The Scrim-for-Type Rule.** A gradient appears only as a legibility scrim under type set on a photograph (the opening's ink scrim, 0.78 to 0.12 from bottom to top, faded in by scroll) or as the fading tail of the scroll cue's line. Never as a decorative fill.

## Shapes

Near-square. Buttons, fields, file links, segmented filters, menu items, the toast, rail labels and social links take a 2px corner. Photographs, photo windows, action panels, publication frames, stages and bands are square-cornered; windows open by rectangular clip-path insets, never by masks or rounded reveals. The only circles are functional: the safeguarding shield disc (64px), timeline nodes (12px, 2px red ring on white, filled red once lit) and the third-party WhatsApp button. The recurring line forms are the 1px hairline, the 3px rule (ink over groups; red as the active marker under nav, tabs, dropdown top, TOC, mission/vision panes and the ladder fill), the 2px red line (reading rule, chapter meter, timeline fill, rail mark) and the 2px red focus outline at 3px offset (white on night and red surfaces).

## Components

### Buttons
Firm, square, and plain; the press is felt, not decorated.
- **Shape:** squared (2px), 50px tall, 24px horizontal padding, Franklin 680 at 15.5px, 1.5px border.
- **Primary:** Caritas Red with white text; hover Caritas Red Hover, active Caritas Red Press.
- **Secondary:** white with a 1.5px Ink border; hover fills Ink with white text.
- **Ink:** Ink fill with white text, for the safeguarding action.
- **On red / on night:** white with red text (hover Red Wash), and a transparent variant with a 75% white border.
- **Small:** 42px tall, 16px padding, 14.5px (empty-state reset, header donate under 720px).
- **Motion:** every button scales to 0.97 on press over 160ms with the ease-out curve; hover changes only apply on fine pointers.

### Text links ("more")
Franklin 680 with a 1.5px Line Strong underline at 6px offset and a trailing arrow; on hover the text and underline turn red and the arrow nudges 3px right. On night the link is white with a Night Line underline.

### File links
The document download chip: 34px tall (46px large), 1px Line Strong border, 2px corner, a red download icon, "PDF" and the language abbreviation (FR / EN / PT) with an accessible name stating title and language; hover turns border and text red, press scales to 0.96.

### Dated document items
The unit of the news, jobs, statements and consultancies lists: a meta line (14px Muted, tabular figures) leading with the type in red 650 ("Déclaration", "Offre d'emploi", "Appel à manifestation d'intérêt"), then the date ("Publié le 12 mai 2026" for notices) and a language note when not French; a 1.15rem 700 title linked to the source, balanced, max 62ch; an optional Ink Soft subtitle; an optional file-link row. Items are ruled rows under a 3px Ink rule, single or two columns (column gap clamp(32px, 5vw, 72px)); the title turns red and underlines on hover.

### Filterable lists
Library, news and jobs share one pattern in a sticky white bar: the segmented filter, an optional language select, a search field (120ms debounce) and a live count right-aligned ("**12** publications", "Aucun résultat"). The type filter can be preset by `?type=` in the URL. An empty result shows a Stone empty state with a title, a hint and a small secondary "Tout afficher" reset.

### Segmented filter
A 1.5px Ink outline holding radio labels (40px, 14.5px 650, hairline separators); an Ink thumb slides (240ms) behind the checked label, which turns white; keyboard focus draws the red outline on the label. Becomes a two-column grid on mobile.

### Inputs / Fields
- **Style:** white, 1.5px Line Strong border, 2px corner, 50px tall (43px in filter bars), 16px text; labels above at 14.5px 650 with a muted "facultatif" for optional fields; textareas 160px minimum.
- **Focus:** border turns Caritas Red with a 3px halo at 16% red; on night, the border turns Red on Night.
- **Error:** on submit, every invalid field gets an Error border, `aria-invalid` and a 13.5px message under it, and focus moves to the first invalid field; typing in a field clears its error. Success replaces nothing: a Red Wash message with a 3px red top rule appears under the form.
- **Choices:** radio rows use native inputs at 18px with the red accent colour. Selects use the field stroke with a chevron icon; search puts a muted icon at the left.

### Navigation
- **Utility bar:** Night, 38px, 13.5px; holds "Signaler un abus" (with a Red on Night shield), jobs and tenders, contact and the FR/EN/PT switch.
- **Header:** sticky white, 84px (68px mobile), 1px Line bottom border; logo left, five links in Franklin 600 at 15.5px, red "Faire un don" right. A 2px Caritas Red reading rule sits on the header's bottom edge on every page, scaled from the left by reading progress.
- **States:** a 3px red underline scales in from the left (220ms) on hover, current page and open dropdown.
- **Dropdown:** white panel with a 3px red top edge and the Pop shadow, items with a muted description line, hover Stone; opens in 180ms from its trigger.
- **Mobile:** below 1040px a right-side drawer (max 420px, 280ms slide) with ruled 19px links, plus a persistent red donate button in the header.
- **Chapter rail (home, 1041px and up):** fixed at the right edge, one 2px mark per chapter (14px at 40% opacity, the current one 28px in Caritas Red, Red on Night over night chapters); a label tab (Ink, white 13px, 2px corner) slides in on hover or keyboard focus. It hides over the opening and the actions track, and near the page end.

### Organisation ladder and regions
The network's governance as a ruled ladder: rows of a 740 name beside an Ink Soft description under a 3px Ink rule, its top rule filling red as the rungs light in reading order. The seven Caritas regions as a 4-column hairline grid (2 at 1040px, 1 at 720px), Africa marked in red as "you are here", the others linking out.

### Figures
Ruled `dt`/`dd` cells under a 3px Ink rule, four across (two at 1040px, one at 720px), numerical values at 1.6rem 800; counters with `data-to` count up once when visible.

### Network explorer (reseau page)
v1's zone tabs: a single 3px red rule slides to the selected tab (240ms); the panel shows the zone name at clamp(2.2rem ... 3.4rem) 800, its full conference name in Muted Franklin at 15.5px, beside a white coordinator block of `dt`/`dd` pairs, crossfading on change.

### Publication library
Publication tiles with a 4:3 Stone Deep frame (cover contained, 1.025 zoom on hover), a Franklin title and the file-link row; tiles rise in (380ms) after a filter change.

### Photo credit
Every photograph carries a credit tab: 12.5px light text on 72% Night, at the bottom right; at the top right on the opening photograph, where the statement occupies the bottom.

### WhatsApp contact button
A user-requested third-party mark carried from v1: fixed bottom right, 60px (52px under 720px) circle in WhatsApp green with a soft shadow. It is a sanctioned exception for that brand's mark only, not a pattern for other controls.

### Scroll story (home)
Every device reads one progress value: 0 when the chapter's top reaches the header, 1 when its stage releases (`p`). One requestAnimationFrame loop updates all scenes on scroll; geometry is re-measured on load, font load and real resizes (mobile toolbar height changes under 160px do not re-measure). Values below are as coded.

- **Opening photo window** (230vh runway). `lift = p / 0.3` lifts the copy (opacity 1 − 1.5·lift, translateY −9vh·lift) and fades the cue (1 − 4·lift). `e = easeInOut((p − 0.04) / 0.5)` opens the clip-path from `inset(0 0 0 57.5%)` to `inset(0)` while the image transform interpolates from covering the v1 window (focal point 58% / 40%) to covering the stage; under 1040px the clip opens from `inset(0 0 56% 0)`. `shade = (p − 0.42) / 0.25` raises the ink scrim; `say = easeOut((p − 0.55) / 0.22)` brings in the statement (opacity, translateY 28px to 0).
- **Ink fill** (who we are). The sentence is split into words; `k = (0.86·vh − top) / (0.56·vh + 0.6·height)`, and the first `ceil(k·n)` words turn from Line Strong to Ink (260ms colour transition).
- **Mission and vision** (pinned stone stage, 250vh). The mission pane shows for `p < 0.5`, the vision pane after (panes swap by opacity and translateY 16px, 420/520ms). Each pane's body is split into phrases at commas, semicolons and colons; phrases go from 0.2 to full opacity over `(p − 0.04) / 0.34` for mission and `(p − 0.56) / 0.34` for vision. The first photograph eases from scale 1.07 to 1 across the pin; the second wipes up over it by `clip-path inset(top)` with `wipe = easeInOut((p − 0.42) / 0.16)`. Meter: `scaleX(p)`.
- **Actions track** (pinned, runway measured). The track holds still for the first 10% (`HOLD`), then translates by `((p − 0.1) / 0.9)·maxX`. Each panel's photograph sits at scale 1.08 and shifts by up to ±4% horizontally with its distance from the viewport centre. Meter: `scaleX(p)`. Keyboard: when focus enters a panel, the stage's native scroll is reset and the window scrolls to the progress that brings that panel to the left edge, so the focused link is always on screen.
- **APPROCHE** (night, sticky photograph half-left, steps right). Steps are 62vh tall (82vh first and last); a focus band (the middle 24% of the viewport) lights the current step from 0.3 to full opacity (500ms). Figures count up once (1300ms, ease-out, French number format) at 80% visibility. Under 1040px the photograph is a 52vh static band and every step is lit.
- **Network** (pinned stone stage, 300vh). The numeral counts `round(46·easeOut(t))` from the moment it enters the viewport (0.6 stage before the pin) to the first quarter of the pin. From `p = 0.3` the six zones light in order over the next 0.62 of progress: lit zones go from 0.34 to full opacity (300ms), the current zone's code turns red and its coordinator detail opens (`grid-template-rows` 0fr to 1fr, 360ms); under 720px only the current zone shows its coordinator.
- **Reading rule** (every page). `scaleX(scrollY / (scrollHeight − vh))` on the header's 2px red rule.
- **Chapter rail**: current chapter is the last whose top is above mid-viewport; theme follows the chapter's `data-theme`.
- **Rise** (reading sections): translate only, from 18px, 900ms with a 70ms stagger, once at 10% inside the viewport; opacity is never touched, so content is legible before it moves.

### Scroll story (inner pages)
- **Title word rise** (load): page-title words from opacity 0 and 0.32em down, 800ms with a 45ms stagger; breadcrumbs and lead rise 700ms (lead delayed 260ms). On home the display words take 900ms with a 50ms stagger, the rest of the opening copy rises at 420ms and 520ms, and a white panel unveils the photograph (scaleX 1 to 0 from the left, 1000ms; scaleY from the top under 1040px).
- **Page photo window**: from when its top enters the viewport to 40px under the header, `k = 1 − easeInOut(t)` closes the side insets (`clip-path inset(0 edge·k)`) so the photograph widens from the content column to full bleed, while the 116%-tall image drifts up to 13%.
- **Sequential timelines and ladder**: `k = (0.78·vh − top) / height` fills the line (timeline: a 2px red line `scaleY(k)` over the grey track; ladder: a 3px red rule `scaleX(k)` over the ink rule) and lights the first `ceil(k·n)` rows from 0.36 to full opacity (320ms); timeline nodes fill red.
- **Values focus band**: the value crossing the middle 24% of the viewport turns its name red (300ms).
- **Counters** on figures, as on home.

### Reduced motion
The `rm` class is set on `<html>` in the head, before paint, when `prefers-reduced-motion: reduce` matches; the engine also checks it. With `rm`: no load class (no word rise, no unveil); every runway collapses to its content height and every stage becomes static (the opening is a v1 hero of clamp(520px, viewport minus header and utility bar, 760px) with the photograph in its window; the statement and cue are hidden); mission and vision stack with a 56px gap; meters are hidden; the actions track becomes a native horizontal scroller; all zones are lit with details open; the ink sentence, phrases, steps, values, ladder and timelines are at their final state; page windows are unclipped; counters show their final value. A global media rule also cuts all CSS animation and transition durations to 1ms.

## Do's and Don'ts

### Do:
- **Do** keep Caritas Red for brand, primary action, current state and progress, on white or as the one full-width donation band.
- **Do** set headings in Libre Franklin 700 to 800 with negative tracking, and reserve Source Serif 4 for scripture, statutes and institutional quotes.
- **Do** build lists and data as ruled rows: 1px Line between rows, a 3px Ink rule over the group, vertical hairlines between grid cells.
- **Do** use 2px corners on every control and leave photographs square; open photographs with rectangular clip-path insets.
- **Do** credit every photograph on its dark caption tab.
- **Do** drive story devices directly from scroll position (one device per chapter), with transforms, opacity and clip-path for anything scroll-mapped and the ease-out curve (cubic-bezier(0.23, 1, 0.32, 1)) for state transitions; 160ms presses at 0.97.
- **Do** ship every device with a reduced-motion final state: nothing pinned, everything lit, v1's static layout.
- **Do** keep keyboard focus on screen inside pinned or translated content.
- **Do** keep "Faire un don" and "Signaler un abus" reachable from every page's header or utility bar.

### Don't:
- **Don't** introduce a second accent colour, decorative gradients, or tints of red as decorative fills; a gradient is only a scrim under type on a photograph.
- **Don't** put content in shadowed cards; shadows are for overlays and the printed cover only.
- **Don't** round photographs or use pill-shaped buttons.
- **Don't** autoplay: no carousels, no timed slides, no motion that runs without the reader's scroll beyond the single load moment and the opening's scroll cue.
- **Don't** hide content behind its entrance: reading-section reveals translate only, and dimmed story states always resolve to full ink.
- **Don't** use religious ornament (crosses, halos, stained-glass textures) as decoration; the logo is the only emblem.
- **Don't** use emoji or text glyphs as icons; use the 1.75-stroke line set.
- **Don't** place small uppercase labels above headings; uppercase red is for the scripture citation beneath a quote.
