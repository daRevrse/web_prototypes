---
name: Caritas Africa (v3)
description: The NGO category standard in its immersive register, a home page told as scroll-driven chapters on alternating warm night and white grounds, Epilogue set large and tight, Literata for reading, and Caritas red as a committed field.
colors:
  red: "#7c0800"
  red-hover: "#650600"
  red-press: "#540500"
  red-wash: "#fbefec"
  red-on-night: "#ee7466"
  on-red: "#ffffff"
  on-red-2: "#f7d8d2"
  night: "#120f0e"
  night-2: "#1d1916"
  night-3: "#2a2420"
  night-line: "#3a332e"
  on-night: "#f3eee8"
  on-night-2: "#ada399"
  day: "#ffffff"
  day-2: "#f2f2f0"
  ink: "#18130f"
  ink-2: "#4d453e"
  muted: "#6e655c"
  line: "#e6e0d8"
  line-2: "#cfc6bb"
  error-on-night: "#ff9e92"
  wa: "#1fa855"
  wa-hover: "#188c46"
typography:
  display:
    fontFamily: "Epilogue, ui-sans-serif, system-ui, Segoe UI, sans-serif"
    fontSize: "clamp(2.9rem, 1.4rem + 4.6vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.96
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Epilogue, ui-sans-serif, system-ui, Segoe UI, sans-serif"
    fontSize: "clamp(2.2rem, 1.3rem + 2.8vw, 4rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Epilogue, ui-sans-serif, system-ui, Segoe UI, sans-serif"
    fontSize: "clamp(1.25rem, 1.05rem + 0.5vw, 1.55rem)"
    fontWeight: 750
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  numeral:
    fontFamily: "Epilogue, ui-sans-serif, system-ui, Segoe UI, sans-serif"
    fontSize: "clamp(9rem, 4rem + 18vw, 22rem)"
    fontWeight: 900
    lineHeight: 0.8
    letterSpacing: "-0.06em"
    fontFeature: "'tnum'"
  figure:
    fontFamily: "Epilogue, ui-sans-serif, system-ui, Segoe UI, sans-serif"
    fontSize: "clamp(3.4rem, 2rem + 4.4vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "-0.04em"
    fontFeature: "'tnum'"
  control:
    fontFamily: "Epilogue, ui-sans-serif, system-ui, Segoe UI, sans-serif"
    fontSize: "16px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.005em"
  nav:
    fontFamily: "Epilogue, ui-sans-serif, system-ui, Segoe UI, sans-serif"
    fontSize: "15px"
    fontWeight: 600
  label:
    fontFamily: "Epilogue, ui-sans-serif, system-ui, Segoe UI, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.45
  statement:
    fontFamily: "Literata, Georgia, Times New Roman, serif"
    fontSize: "clamp(1.6rem, 1.1rem + 1.7vw, 2.75rem)"
    fontWeight: 450
    lineHeight: 1.3
    letterSpacing: "-0.012em"
  quote:
    fontFamily: "Literata, Georgia, Times New Roman, serif"
    fontSize: "clamp(2.4rem, 1.4rem + 3.4vw, 4.6rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  citation:
    fontFamily: "Literata, Georgia, Times New Roman, serif"
    fontSize: "18px"
    fontWeight: 400
  lead:
    fontFamily: "Literata, Georgia, Times New Roman, serif"
    fontSize: "clamp(1.15rem, 1.02rem + 0.45vw, 1.4rem)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Literata, Georgia, Times New Roman, serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.65
rounded:
  none: "0"
  circle: "50%"
spacing:
  gutter: "clamp(16px, 4vw, 56px)"
  container: "1280px"
  header: "72px"
  chapter: "clamp(96px, 12vw, 168px)"
  read: "clamp(72px, 9vw, 128px)"
  doc-section: "clamp(64px, 8vw, 104px)"
components:
  button-primary:
    backgroundColor: "{colors.red}"
    textColor: "{colors.on-red}"
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
    textColor: "{colors.on-night}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "52px"
  button-ghost-hover:
    backgroundColor: "{colors.on-night}"
    textColor: "{colors.night}"
  button-white:
    backgroundColor: "{colors.day}"
    textColor: "{colors.red}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "52px"
  button-white-hover:
    backgroundColor: "{colors.red-wash}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "52px"
  button-line-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.day}"
  button-small:
    padding: "0 16px"
    height: "42px"
  input-on-night:
    backgroundColor: "{colors.night-2}"
    textColor: "{colors.on-night}"
    rounded: "{rounded.none}"
    padding: "0 14px"
    height: "50px"
  input:
    backgroundColor: "{colors.day}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 14px"
    height: "44px"
  file-link:
    backgroundColor: "{colors.day}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 12px"
    height: "38px"
  file-link-hover:
    textColor: "{colors.red}"
  header:
    backgroundColor: "{colors.night}"
    textColor: "{colors.on-night}"
    height: "72px"
  nav-link:
    textColor: "{colors.on-night}"
    typography: "{typography.nav}"
    padding: "0 12px"
    height: "72px"
  footer:
    backgroundColor: "{colors.night}"
    textColor: "{colors.on-night}"
  whatsapp-button:
    backgroundColor: "{colors.wa}"
    textColor: "{colors.day}"
    rounded: "{rounded.circle}"
    size: "54px"
---

# Design System: Caritas Africa (v3)

## Overview

**Creative North Star: "The Long-Form Report, Told in Chapters"**

Caritas Africa speaks here the way the largest NGOs tell their interactive annual stories: the home page is a sequence of chapters the visitor scrolls through, and each chapter owns one device that moves only as fast as the reader scrolls. A photograph opens from an inset window to full-bleed, a sentence inks itself word by word, a giant numeral counts to 46 before the six zones light in turn, four action photographs travel past on a pinned horizontal track, figures step beside a sticky photograph, and scripture reveals line by line over a full-bleed image. The story closes on a red chapter that asks the reader to give, partner or report abuse. Inner pages keep the same world with quieter motion: a photographic page opening with a gentle parallax, then ruled reading.

The ground alternates by chapter between a warm night (Night) and white (Day); Caritas red is a committed field (the act chapter, every primary button) and, translated lighter, the mark of "here" on night. Two families divide the work cleanly: Epilogue, heavy, large and tight in sentence case, for everything that heads, counts or is pressed; Literata, with optical sizes, for everything that is read, including leads, the inked statement and scripture in italic.

Geometry is square without exception except the circular WhatsApp button. Depth is nearly absent: photographs, night fields and rules do the work. Every photograph is real, drawn from Caritas Africa's own reports, and credited on a night tab.

**Key Characteristics:**
- Chapters alternate warm night and white grounds; the act chapter is a full red field.
- Epilogue 800–900 for display, 600–750 for UI, always sentence case and negatively tracked; Literata for all reading text.
- One scroll-mapped device per home chapter, no autoplay; inner pages use only page-open parallax, rises and state transitions.
- Opaque night header with the official white logo set directly on night, a 3px reading-progress rule along its bottom edge, and a tick-only chapter rail on the right.
- Ruled data (2px Ink over a group, 1px Line between rows, vertical hairlines between cells); no cards, no eyebrows.
- Square corners everywhere; the WhatsApp button is the one circle.
- UI motion: ease-out cubic-bezier(0.23, 1, 0.32, 1), 0.97 press on buttons at 160ms, hover only on fine pointers. Reduced motion unpins every scene and shows final states.

## Colors

A warm night and a plain white, alternating by chapter, committed to one deep red that may fill a whole chapter.

### Primary
- **Caritas Red** (red): the confederation's red. Primary buttons ("Faire un don" in the header and opening), the full-bleed act chapter ("Marchez avec nous"), the action-track progress meter, the current chapter tick on day grounds, the TOC's current bar, timeline years, value names as they are reached, icon accents in lists, file links and news rows, hover text on titles, focus outlines and text selection. Hover deepens to **Red Hover**, press to **Red Press**.
- **Red on Night** (red-on-night): the red translated for night grounds, used only as a mark: the header's current-link underline, the reading-progress rule, the current chapter tick on night, the network's current zone code, the "Signaler un abus" shield, drawer arrows and the newsletter field's focus border.
- **Red Wash** (red-wash): only the hover fill of the white button on the red chapter.
- **Rose on Red** (on-red-2): secondary text on the red chapter (lead, door descriptions).

### Neutral
- **Night** (night): the warm near-black ground of the header, the opening, network, APPROCHE and mission chapters, the footer, inner page openings, toasts, tooltips and the segmented-control thumb. **Night Raised** (night-2) backs the footer field and social hover; **Night Active** (night-3) marks the current language; **Night Line** (night-line) divides on night.
- **On Night** (on-night) and **On Night Muted** (on-night-2): text and secondary text on night; leads on night take the muted value.
- **Day** (day): the white ground of the who, action, news and reports chapters and of reading pages.
- **Day Soft** (day-2): the one tinted surface: publication frames, the featured cover's frame, the statute block, the empty state, the segmented track and photo placeholders.
- **Ink** (ink): headings and text on day, the 2px rules over data groups, line-button stroke.
- **Ink Soft** (ink-2): descriptions, prose under titles, leads on the action track.
- **Muted** (muted): `dt` labels, metadata, captions, counts, inactive TOC links.
- **Line** (line): hairlines between rows and cells. **Line Strong** (line-2): field and file-link strokes, news-list hairlines, and the unlit colour of words in the inked statement.
- **Error on Night** (error-on-night): the newsletter field's error border and message, the only form on night.

### Functional exception
- **WhatsApp Green** (wa, hover wa-hover): the floating WhatsApp button only, the platform's own colour.

### Named Rules
**The Alternating Ground Rule.** Chapters change ground by whole width: Night, Day, or the red field. Day Soft appears only inside a chapter, behind printed objects and quiet blocks, never as a chapter ground.

**The Two Reds Rule.** Caritas Red fills (buttons, the act chapter, meters) and marks on day; Red on Night only marks (rules, ticks, underlines, icons) on night and never fills a surface.

## Typography

**Display Font:** Epilogue (with ui-sans-serif, system-ui, Segoe UI fallback)
**Body Font:** Literata, optical sizes on (with Georgia, Times New Roman fallback)

**Character:** A heavy, tightly tracked grotesque speaks in short sentence-case lines; a warm book serif carries everything meant to be read slowly. The switch of family is the switch between telling and reading.

### Hierarchy
- **Display** (Epilogue 900, clamp(2.9rem, 1.4rem + 4.6vw, 6rem), 0.96, -0.035em, balanced): the opening title and the act chapter's call; inner page titles. On load its words rise in with a 55ms stagger.
- **Headline** (Epilogue 800, clamp(2.2rem, 1.3rem + 2.8vw, 4rem), 1, -0.03em): chapter heads and inner-page section heads. The opening's over-photo sentence uses the same voice at up to 3.6rem.
- **Title** (Epilogue 750, clamp(1.25rem, 1.05rem + 0.5vw, 1.55rem), 1.15): panel and group heads; news headlines, purposes, value names, zone codes, door names and the featured report title are the same face at 800/750 between 1.2 and 2.9rem.
- **Numeral** (Epilogue 900, up to 22rem, 0.8, -0.06em, tabular): the network's 46, the one giant figure.
- **Figure** (Epilogue 900, clamp(3.4rem, 2rem + 4.4vw, 6rem), 0.95, tabular, unit at 0.45em): APPROCHE figures; timeline years at 2rem in red.
- **Control** (Epilogue 700, 16px, -0.005em): buttons and link arrows; small buttons 15px.
- **Nav** (Epilogue 600, 15px): header links, alert link, rail labels at 12.5px.
- **Label** (Epilogue 400, 13–14px, Muted): `dt` labels, metadata, photo captions, sources, credits (12px); numbers in tabular lining figures.
- **Statement** (Literata 450, clamp(1.6rem, 1.1rem + 1.7vw, 2.75rem), 1.3, max 30ch): the who-we-are sentence that inks word by word.
- **Quote** (Literata 500 italic, clamp(2.4rem, 1.4rem + 3.4vw, 4.6rem), 1.05): mission and vision scripture; 2–3.4rem on the inner page.
- **Citation** (Literata italic, 18px; 17px on day): the sentence-case source line under a scripture quote ("Notre mission · Actes 1:8"). The statute citation is Epilogue 14px Muted, upright.
- **Lead** (Literata 400, clamp(1.15rem, 1.02rem + 0.45vw, 1.4rem), 1.55, max 58ch): one paragraph under a display or chapter head.
- **Body** (Literata 400, 18px, 1.65; 17px under 720px): prose at max 66ch, the first paragraph at 1.2em.

### Named Rules
**The Tell-Then-Read Rule.** Epilogue heads, counts and controls; Literata is read. Never set running text, leads or scripture in Epilogue, never set a heading in Literata.

**The Sentence-Case Rule.** No uppercase anywhere in the type system and no small labels above headings: the heading speaks first, and a source line, if any, sits below the quote it sources. Acronyms (zone codes, APPROCHE) keep their own spelling.

## Layout

A 1280px container with a fluid gutter (gutter); the header runs full width. Day chapters breathe at the chapter step; inner reading pages at read, with document sections at doc-section separated by a 1px Line.

The home page is built from chapters, each a `section` that declares its ground for the rail. Scroll scenes are tall sections with a sticky 100svh stage inside: opening 260vh (220vh under 720px), network 320vh (300vh), mission 260vh, and the action track sized from its own width so that the first 10% of its scroll holds still for the intro. APPROCHE pairs a sticky full-height photograph (left half) with stepped figures of 78–92vh each on the right.

Composition is asymmetric: fractional splits (1.25fr / 1fr who, 1.6fr / 1fr news and jobs, 1.1fr / 1fr reports and act chapter, 1fr / 1fr network), a six-column report shelf, a five-column library. Inner pages open on a 78svh night photograph with copy anchored bottom-left and breadcrumbs, then a 220px sticky TOC beside the document.

Data groups are ruled rows and cells with vertical hairlines rather than gaps; the first cell loses its left padding so text aligns with the container edge.

Breakpoints: 1240px (tighter nav, chapter rail hidden, 4-up shelf and library, 3-column footer), 1040px (64px header, drawer navigation, single-column splits, APPROCHE photo unpinned at 56vh, TOC hidden), 720px (17px body, opening window rises from below, compact network rows, 82vw track panels, 2-up shelf and library, filter bar unstuck).

### Named Rules
**The One Device Per Chapter Rule.** Each home chapter owns one scroll-driven device at most, and its copy must read complete at the device's final state.

## Elevation & Depth

Flat by default. Depth comes from photographs, the night grounds and rules; scrims are night gradients that exist only to keep type legible on photographs (the opening's left-to-right shade, the mission's left scrim, the inner opening's bottom-up scrim).

### Shadow Vocabulary
- **Pop** (`box-shadow: 0 2px 4px rgb(18 15 14 / 0.08), 0 24px 48px -16px rgb(18 15 14 / 0.4)`): the toast.
- **Cover** (`box-shadow: 0 1px 2px rgb(18 15 14 / 0.1), 0 26px 44px -24px rgb(18 15 14 / 0.5)`): the featured report cover, a printed object on its Day Soft frame.
- **Float** (`box-shadow: 0 2px 4px rgb(18 15 14 / 0.14), 0 12px 28px -8px rgb(18 15 14 / 0.45)`): the fixed WhatsApp button.

### Named Rules
**The Sits-Above Rule.** Only the toast, the floating button and the printed cover cast shadows. Chapters, panels, lists and photographs stay flat.

## Shapes

Square. Buttons, fields, the segmented control, file links, social links, the drawer, tooltips, the toast, photographs, frames and the inset opening window all have 0 radius. The one circle is the WhatsApp button. Recurring line forms: the 1px hairline, the 2px Ink rule over data groups, 2px marks (nav underline, rail ticks, TOC bar, action meter), the 3px reading-progress rule, 1.5px strokes on buttons and link-arrow underlines, 1px strokes on fields and file links, and a 2px focus outline at 3px offset (red on day, On Night on night and red). Icons are a Lucide-derived line set at 1.75 stroke, 22px default and 18px small.

## Components

### Buttons
Solid square blocks in Epilogue; the press is felt, not decorated.
- **Shape:** 0 radius, 52px tall, 24px padding, 1.5px border in the fill colour, trailing arrow nudges 3px right on hover.
- **Primary (red):** Caritas Red with white text; hover Red Hover, press Red Press.
- **Ghost:** transparent with a 55% On Night border on night; hover fills On Night with Night text.
- **White:** white with red text, the primary action on the red chapter; hover Red Wash.
- **Line:** transparent with an Ink border; hover fills Ink with white text (On Night stroke inside the drawer).
- **Small:** 42px, 16px padding, 15px (header donate).
- **Motion:** scale 0.97 on press with the ease-out curve; colour changes 160ms; hover only on fine pointers.

### Link arrow
Epilogue 700 at 16px with a 1.5px bottom border in the text colour and a trailing arrow; on hover the gap widens from 8 to 12px.

### Navigation
- **Header:** fixed, opaque Night, 72px (64px under 1040px); the official white logo at 112px sits directly on night; five links in Epilogue 600 at 15px; "Signaler un abus" with a Red on Night shield; FR/EN/PT with 18x13 flags (current on Night Active); red small "Faire un don".
- **States:** a 2px Red on Night underline scales in from the left in 220ms on hover and current page.
- **Reading progress:** a 3px Red on Night rule along the header's bottom edge scales with page progress.
- **Mobile:** under 1040px a right-side Night drawer (max 420px, 300ms slide) with ruled 21px Epilogue 700 links, the language switch and stacked actions; a short "Don" button stays in the header.

### Chapter rail (signature)
Fixed at the right edge, vertically centred: one 14px tick per chapter at 35% opacity; the current tick grows to 28px in Red on Night (Caritas Red on day chapters). Labels appear only on hover (fine pointers) or focus, as a Night tooltip that slides 6px in. The rail takes the current chapter's ground colour and fades out over full-bleed scenes (opening, action track, mission). Hidden under 1240px.

### Scroll scenes (signature)
All driven by one requestAnimationFrame loop reading scroll position; nothing plays on its own.
- **Opening window:** a tall inset photograph (clip-path inset) opens to full-bleed while the title and lead lift away and fade, a night shade rises, and one sentence settles in over the photo. Under 720px the window rises from below the copy.
- **Ink fill:** the statement's words turn from Line Strong to Ink as it crosses the viewport.
- **Network:** the numeral counts 0 to 46 in the first quarter, then the six zones light in turn; the current zone code turns Red on Night and its detail opens.
- **Action track:** pinned horizontal track of an intro and four photo panels; holds still for the first 10% of its scroll, then translates; photos drift with a small counter-parallax and a 2px red meter tracks progress. Focus inside a panel scrolls the page to bring it on screen.
- **APPROCHE:** sticky photograph; figures count up once on entering view.
- **Mission:** full-bleed photograph scales from 1.08 to 1 while the mission then the vision pane show, their lines brightening from 18% to full opacity.
- **Page open (inner pages):** the opening photograph translates at 0.22 of scroll.
- **Reduced motion:** with `prefers-reduced-motion`, scenes are unpinned and shown in their final state (window full-bleed, all words inked, 46 and all zones lit, track scrolls natively, both mission panes stacked, figures at final values).

### Network zone rows
Ruled rows on night: zone code (Epilogue 800, 1.25rem), region (14px On Night Muted), coordinating Caritas and coordinator; unlit rows at 32% opacity.

### Inputs / Fields
- **On night (newsletter):** Night Raised fill, Night Line stroke, 50px, 0 radius; focus border Red on Night with a 3px 20% halo; errors in Error on Night.
- **On day (library):** white, 1px Line Strong stroke, 44px; selects carry a muted chevron, search a muted leading icon; focus border red with a 3px 14% halo.

### Segmented control
A Day Soft track with 3px padding; a square Night thumb slides behind the checked label in 240ms ease-out and the label turns white. Full width with equal options under 720px.

### File links
The download chip: 38px (48px large, 32px on shelf tiles), 1px Line Strong stroke, a red file icon and the language abbreviation; hover turns border and text red; press 0.96.

### Publications
Report tiles with a 3:4 Day Soft frame (cover contained, 1.04 zoom on hover), an Epilogue 700 title, red-accented metadata and a file-link row. The featured report sits on a Day Soft frame with the Cover shadow.

### Photo credit
Every photograph carries a credit: a 12px tab on 70% Night at the bottom-right of full-bleed and sticky photos, or a 13px Muted caption under inline photos.

### WhatsApp button
Fixed bottom-right, 54px circle (50px under 720px) in WhatsApp green with the Float shadow; a Night tooltip slides in on hover and focus; press 0.95.

## Do's and Don'ts

### Do:
- **Do** alternate chapters between Night and Day by whole width, and give the call to act a full Caritas Red field.
- **Do** set heads, counts and controls in Epilogue (800–900 display, 600–750 UI), sentence case and negatively tracked; set everything read in Literata.
- **Do** drive chapter devices directly from scroll position, one device per chapter, with copy complete at the final state.
- **Do** unpin every scene and show final states under reduced motion.
- **Do** use Red on Night only for marks on night grounds, and Caritas Red for fills and marks on day.
- **Do** build data as ruled rows and cells: 2px Ink over the group, 1px Line between rows, vertical hairlines between cells.
- **Do** keep every corner square; the WhatsApp button is the only circle.
- **Do** credit every photograph, and put scripture citations below their quote in Literata italic.
- **Do** use the ease-out curve (cubic-bezier(0.23, 1, 0.32, 1)), 0.97 presses on buttons, hover only on fine pointers.
- **Do** keep "Faire un don" and "Signaler un abus" in the header of every page.

### Don't:
- **Don't** put small labels, kickers or eyebrows above headings, or set any text in uppercase.
- **Don't** put content in shadowed or tinted cards; shadows belong to the toast, the floating button and the printed cover.
- **Don't** autoplay a chapter device or loop a carousel; motion follows the reader's scroll.
- **Don't** round photographs, buttons or fields, or use pill shapes.
- **Don't** fill a surface with Red on Night, or introduce a second accent; WhatsApp green stays on the WhatsApp button.
- **Don't** use gradients except as night scrims over photographs.
- **Don't** set the white logo on a plate; it sits directly on night.
- **Don't** use religious ornament as decoration, or emoji and text glyphs as icons; use the 1.75-stroke line set.
