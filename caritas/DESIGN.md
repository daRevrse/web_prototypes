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
  textarea:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sharp}"
    padding: "12px 14px"
    height: "160px"
  form-confirmation:
    backgroundColor: "{colors.red-wash}"
    textColor: "{colors.ink}"
    padding: "14px 16px"
  empty-state:
    backgroundColor: "{colors.stone}"
    textColor: "{colors.ink}"
    padding: "40px"
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
- **Caritas Red** (#7c0800): the logo's red. Primary buttons ("Faire un don", "S'abonner"), the full-bleed donation band, the active marker under nav links and tabs, the dropdown's top edge, the active TOC entry, focus outlines, icon accents in lists and file links, the type word at the head of a dated item's metadata, the current region in the Caritas Internationalis grid, the 3px rule over the contact form's confirmation, scripture citations, and hover color for links. Hover deepens to **Caritas Red Hover** (#650600), press to **Caritas Red Press** (#540500).
- **Red Wash** (#f8eeec) and **Red Tint** (#efd6d2): the red at paper strength. Wash backs the safeguarding shield disc, the hover of white-on-red buttons and the contact form's confirmation message; Tint is the text selection color.
- **Red on Night** (#f0a59b): the red translated for dark surfaces, used for the alert icon in the utility bar and focus on footer inputs. The donation band's body text uses a paler rose (#f6dcd8) on red.

### Neutral
- **Ink** (#17181a): headings, body text, secondary button outline and its hover fill, the ink button ("Signaler un abus"), and the 3px rule above lists and data groups.
- **Ink Soft** (#3a3c40): lead paragraphs, long prose, descriptions under titles.
- **Muted** (#5d6066): metadata, `dt` labels, breadcrumbs, counts, inactive tabs, figure captions, the "facultatif" marker on optional fields.
- **Faint** (#8b8e93): lowest-priority text only; never body copy.
- **Line** (#e3e2de): default hairline between list rows, header bottom border.
- **Line Strong** (#cfcdc8): field and file-link borders, the stronger hairline framing mission/vision and purposes, rows of the organisation ladder and cells of the regions grid, the hairline over the safeguarding note.
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
- **Title** (700 to 760, 1.05 to 1.3rem, 1.25 to 1.35): sub-heads, list heads, zone and value names, publication titles, dated item titles (700 at 1.15rem, max 62ch), ladder rungs and region names. The contact form heading sits between Title and Headline (780, clamp(1.5rem, 1.2rem + 0.8vw, 1.9rem)).
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

The hero photograph bleeds to the right viewport edge while the copy aligns to the container edge. The facts strip closes the hero within the first viewport. Every inner page (Qui sommes-nous, Notre réseau, Nos actions, Ressources, Actualités, Emplois et appels d'offres, Contact) opens on the stone title band with breadcrumbs, h1 and lead. Long reading pages (Qui sommes-nous, Nos actions) then put a 250px sticky table of contents beside the document body; the TOC becomes a horizontal tab row under 1040px. List pages (Actualités, Emplois) put the sticky filter bar under the title band, then the ruled list beside a 300px aside that sticks below the header (static under 1040px). Contact splits 0.85fr / 1.15fr: coordinates and the safeguarding note left, the form right. Notre réseau alternates white and stone bands: zone explorer, organisation (0.8fr / 1.2fr), network news in two ruled columns, the regions grid.

Breakpoints: 1200px (tighter nav, 2-up publications), 1040px (drawer navigation, single-column grids and page splits, regions and programme figures 2-up, hero photo moves above copy at 4:3), 720px (header 68px, everything single column including form rows, member lists and the regions grid; filters go full-width), 480px (display at 2.2rem).

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

Near-square. Buttons, fields, file links, segmented filters, menu items, the toast and social links take a 2px corner. Photographs, banners, publication frames and bands are square-cornered. The only circles are functional: the safeguarding shield disc (64px), timeline nodes (12px, 2px red ring on white) and the native radio buttons of the contact form (18px, tinted red). The recurring line forms are the 1px hairline, the 3px rule (ink over groups; red as the active marker under nav, tabs, dropdown top and TOC), and the 2px red focus outline at 3px offset.

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
- **Labels:** 14.5px at 650 above the field, 6px gap; an optional field adds "facultatif" at 400 in Muted. Textareas keep the field style at 160px minimum, resizable vertically, 1.5 line height.

### Segmented filter
A 1.5px Ink outline holding radio labels (40px, 650 at 14.5px, 1px Line Strong dividers); an Ink thumb slides (240ms) behind the checked label, which turns white, and jumps without animation on load and resize. Becomes a two-column grid on mobile. It filters the publication library, the news list (Tout, Déclarations, Réseau, Communiqués, Programmes, Publications) and the jobs list (Tout, Offres d'emploi, Consultances, Appels d'offres et avis); a `?type=` link preselects an option.

### Navigation
- **Utility bar:** Night, 38px, 13.5px; holds "Signaler un abus" (with a Red on Night shield), "Emplois et appels d'offres" (emplois.html), "Contact" (contact.html) and the FR/EN/PT switch. On its own page, the jobs or contact link turns white and underlined.
- **Header:** sticky white, 84px (68px mobile), 1px Line bottom border; logo left, five links in Franklin 600 at 15.5px (Qui sommes-nous with its dropdown, Notre réseau, Nos actions, Ressources, Actualités, each its own page), red "Faire un don" right.
- **States:** a 3px red underline scales in from the left (220ms) on hover, current page and open dropdown.
- **Dropdown:** white panel with a 3px red top edge and the Pop shadow, items with a muted description line, hover Stone; opens in 180ms from its trigger.
- **Mobile:** below 1040px a right-side drawer (max 420px, 280ms slide) with ruled 19px links (the five header pages plus Emplois et appels d'offres), plus a persistent red donate button in the header.

### Network explorer (signature)
Zone tabs across a Line Strong baseline, each with a bold code and a muted subtitle; a single 3px red rule slides to the selected tab (240ms). The panel shows the zone name at clamp(2.2rem ... 3.4rem) 800 beside a white coordinator block of `dt`/`dd` pairs, crossfading on change. The same explorer opens the Notre réseau page, where the panel adds the conference's full official name under the region.

### Publication library (signature)
Publication tiles with a 4:3 Stone Deep frame (cover contained, 1.025 zoom on hover), a Franklin title and the file-link row. A sticky filter bar holds the segmented type filter, a language select, search and a live count; tiles rise in with a 40ms stagger.

### Filterable lists
Actualités and Emplois reuse the library's sticky filter bar: segmented type filter, a language select (news only), search (120ms debounce, accent-insensitive) and a live count announced politely ("**12** publications", "Aucun résultat"). The list re-renders in place. With no match, the list is replaced by the empty state: a Stone block (40px padding) with a 1.35rem 750 heading, one line suggesting another type or word, and a small Secondary button "Tout afficher" that resets every filter and slides the thumb back.

### Dated document items
The record of statements, news, job notices and consultancies: a ruled row (20px top, 22px bottom) under a 3px Ink rule. A metadata line comes first, 14px Muted with tabular figures: the type in Caritas Red at 650, the date, and the language when it is not French ("En anglais"; for notices, "Avis en français, anglais"). Then the title, 700 at 1.15rem, linking to the source and turning red and underlined on hover; an optional Ink Soft sub-line (16px, 64ch); and, when a PDF exists, one file link ("PDF FR"). Lists run one column beside an aside, or two columns (column gap clamp(32px, 5vw, 72px)) under a 3px rule on full-width bands.

### News and jobs aside
A 300px column next to the list, sticky below the header, opened by a 3px Ink rule: short 1.1rem 740 heads, 15.5px Ink Soft paragraphs and a "more" link each (how to apply, newsletter, the archives, the contact page).

### Organisation ladder
How the network is governed, top to bottom: an ordered list under a 3px Ink rule, each rung a two-column row (minmax(180px, 0.9fr) / 1.4fr) with the body's name at 740 and its role in Ink Soft, separated by Line Strong. Stacks under 720px.

### Caritas Internationalis regions
Seven regions in a four-column grid under a 3px Ink rule, cells divided by Line Strong hairlines (the first cell of each row flush left). Each cell is the region name at 740, 1.05rem, over the regional Caritas in 14.5px Muted, linking out; on hover the name turns red. Africa is not a link: its name is set red and its line says "Vous êtes ici". Two columns under 1040px, one under 720px.

### Programme figures and timeline
Inside a reading section, key figures form a four-cell ruled data group: 3px Ink over the group, 1px Line under it and between cells, a 13.5px Muted `dt`, and a `dd` at 700 or, for a number, 800 at 1.6rem with -0.02em tracking and tabular figures. Two cells per row under 1040px, one under 720px. A 1.2rem 730 sub-head then introduces the timeline (2px Line Strong spine, 12px red-ringed nodes, the date at 760 and its line in Ink Soft).

### Document figures
A photograph inside a reading section, 460px wide (full width for landscape group photos), square on a Stone Deep placeholder, with a 13.5px Muted caption under it that carries the source ("Photo : rapport annuel 2021").

### Member list
Participating organisations as a two-column ruled list (max 720px) under a 3px Ink rule: 12px rows at 650, Line between them. One column under 720px.

### Contact list and safeguarding note
Coordinates are a ruled `dt`/`dd` list under a 3px Ink rule: a 110px Muted label column (14px) and the value at 600, 1.55 line height, one column under 720px. Beneath it, after a map "more" link, the safeguarding note: a 1px Line Strong hairline, a red shield icon in a 24px column, a 720 heading telling the reader not to use the form to report abuse, one Ink Soft sentence and a "Signaler un abus" more link.

### Contact form
An open form under a 3px Ink rule, 18px between rows: Nom and Prénom, E-mail and an optional Téléphone in two-column rows (one under 720px); the Destinataire choice as inline native radios (18px, accent Caritas Red, 500 at 16px, 8px / 22px gaps) inside a borderless fieldset whose legend reads like a label; Objet; Message as a textarea. Validation runs on submit only: each failing field takes the Error border and shows its own sentence ("Saisissez une adresse e-mail valide, par exemple nom@domaine.org."), focus moves to the first error, and typing in a field clears its error. The foot holds the primary "Envoyer le message" button and a 14px Muted note. Success reveals a status message: Red Wash ground, 3px Caritas Red top rule, 600 weight, 14px 16px padding.

### Photo credit
Every photograph carries a credit tab at the bottom right: 12.5px light text on 72% Night. Document figures inside reading sections carry the credit in their caption instead.

## Do's and Don'ts

### Do:
- **Do** keep Caritas Red for brand, primary action, and current-state markers, on white or as the one full-width donation band.
- **Do** set headings in Libre Franklin 700 to 800 with negative tracking, and reserve Source Serif 4 for scripture, statutes and institutional quotes.
- **Do** build lists and data as ruled rows: 1px Line between rows, a 3px Ink rule over the group, vertical hairlines between grid cells.
- **Do** use 2px corners on every control and leave photographs square.
- **Do** credit every photograph, on its dark caption tab or, for a figure inside a reading section, in the caption under it.
- **Do** use the ease-out curve (cubic-bezier(0.23, 1, 0.32, 1)), 160ms presses at 0.97, and reduce motion to opacity when the user asks.
- **Do** keep "Faire un don" and "Signaler un abus" reachable from every page's header or utility bar.
- **Do** open every dated item with its metadata line (type in red, date, language) and attach its PDF as a file link, never as a bare link.

### Don't:
- **Don't** introduce a second accent color, gradients, or tints of red as decorative fills.
- **Don't** put content in shadowed cards; shadows are for overlays and the printed cover only.
- **Don't** round photographs or use pill-shaped buttons.
- **Don't** use religious ornament (crosses, halos, stained-glass textures) as decoration; the logo is the only emblem.
- **Don't** use emoji or text glyphs as icons; use the 1.75-stroke line set.
- **Don't** place small uppercase labels above headings; uppercase red is for the scripture citation beneath a quote.
