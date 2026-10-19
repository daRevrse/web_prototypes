---
name: Caritas Africa (v6)
description: The NGO standard, dressed in Caritas Africa's own Strategic Framework 2024–2030 print identity.
colors:
  wine: "#7c0800"
  wine-hover: "#650600"
  coral: "#f96874"
  coral-hover: "#ff8a93"
  coral-ink: "#c2273a"
  night: "#3d0507"
  on-night-2: "#f3cfd1"
  on-coral-2: "#5a0d12"
  wash: "#fff0f0"
  wash-2: "#ffe2e4"
  wash-3: "#ffd2d6"
  ink: "#2a2122"
  ink-2: "#5e5455"
  line: "#eedada"
  line-2: "#ecd2d3"
  white: "#ffffff"
  wa: "#1fa855"
  wa-hover: "#188c46"
typography:
  display:
    fontFamily: "Poppins, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2.3rem, 1.5rem + 2.4vw, 3.45rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Poppins, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.45rem + 1.7vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.015em"
  scripture:
    fontFamily: "Poppins, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.85rem, 1.25rem + 1.9vw, 2.9rem)"
    fontWeight: 600
    lineHeight: 1.14
    letterSpacing: "-0.01em"
  tagline:
    fontFamily: "Poppins, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.1rem, 1rem + 0.45vw, 1.4rem)"
    fontWeight: 600
    lineHeight: 1.35
  title-feature:
    fontFamily: "Poppins, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.6rem, 1.3rem + 0.9vw, 2.1rem)"
    fontWeight: 700
    lineHeight: 1.15
  title:
    fontFamily: "Poppins, Segoe UI, system-ui, sans-serif"
    fontSize: "1.3125rem"
    fontWeight: 600
    lineHeight: 1.3
  title-list:
    fontFamily: "Poppins, Segoe UI, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 600
    lineHeight: 1.3
  lead:
    fontFamily: "Source Sans 3, Source Sans Pro, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.2rem, 1.05rem + 0.45vw, 1.45rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Source Sans 3, Source Sans Pro, Segoe UI, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "Source Sans 3, Source Sans Pro, Segoe UI, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label-button:
    fontFamily: "Poppins, Segoe UI, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "0.01em"
  label-nav:
    fontFamily: "Source Sans 3, Source Sans Pro, Segoe UI, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 600
    lineHeight: 1
  meta:
    fontFamily: "Source Sans 3, Source Sans Pro, Segoe UI, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
  caption:
    fontFamily: "Source Sans 3, Source Sans Pro, Segoe UI, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.6
  tag:
    fontFamily: "Source Sans 3, Source Sans Pro, Segoe UI, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.6
    letterSpacing: "0.04em"
rounded:
  none: "0px"
  marker: "4px"
  bullet: "5px"
  button: "12px"
  tile: "14px"
  thumb: "18px"
  jobs: "20px"
  story: "22px"
  frame-sm: "clamp(20px, 2.4vw, 32px)"
  base: "clamp(20px, 2.6vw, 36px)"
  feature: "clamp(22px, 2.6vw, 34px)"
  appeal: "clamp(24px, 3vw, 40px)"
  frame-lg: "clamp(24px, 3vw, 44px)"
  badge: "28%"
  square: "30%"
  disc: "50%"
spacing:
  gutter: "clamp(20px, 5vw, 64px)"
  section: "clamp(72px, 9vw, 128px)"
  section-head: "clamp(36px, 4vw, 56px)"
  stack-sm: "12px"
  stack-md: "18px"
  stack-lg: "30px"
components:
  button-wine:
    backgroundColor: "{colors.wine}"
    textColor: "{colors.white}"
    typography: "{typography.label-button}"
    rounded: "{rounded.button}"
    padding: "0 28px"
    height: "52px"
  button-wine-hover:
    backgroundColor: "{colors.wine-hover}"
  button-soft:
    backgroundColor: "{colors.wash-2}"
    textColor: "{colors.wine}"
    typography: "{typography.label-button}"
    rounded: "{rounded.button}"
    padding: "0 28px"
    height: "52px"
  button-soft-hover:
    backgroundColor: "{colors.wash-3}"
  button-coral:
    backgroundColor: "{colors.coral}"
    textColor: "{colors.night}"
    typography: "{typography.label-button}"
    rounded: "{rounded.button}"
    padding: "0 28px"
    height: "52px"
  button-coral-hover:
    backgroundColor: "{colors.coral-hover}"
  button-white:
    backgroundColor: "{colors.white}"
    textColor: "{colors.wine}"
    typography: "{typography.label-button}"
    rounded: "{rounded.button}"
    padding: "0 28px"
    height: "52px"
  button-white-hover:
    backgroundColor: "{colors.wash-2}"
  nav-link:
    textColor: "{colors.ink}"
    typography: "{typography.label-nav}"
    padding: "12px 14px"
  nav-link-active:
    textColor: "{colors.wine}"
  input-newsletter:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 16px"
    height: "52px"
  card-lead-story:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.story}"
    padding: "clamp(28px, 3vw, 44px)"
  card-jobs:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.jobs}"
    padding: "28px"
  toast:
    backgroundColor: "{colors.night}"
    textColor: "{colors.white}"
    padding: "14px 22px"
  whatsapp:
    backgroundColor: "{colors.wa}"
    textColor: "{colors.white}"
    rounded: "{rounded.disc}"
    size: "56px"
---

# Design System: Caritas Africa (v6)

## Overview

**Creative North Star: "The Strategic Framework Cover"**

The home page opens the way Caritas Africa's own Strategic Framework 2024–2030 cover does: wine-red geometric headings top-left, real photographs from the network in rounded-square frames overlapping on a diagonal, a coral rounded square and the white Caritas cross on a coral badge, and a layered wave (wine ribbon, white gap, coral field) closing the composition. That print identity is worn by a straight, category-standard NGO page at the craft level of CRS, CAFOD / Trócaire, ICRC and MSF: clear sections, visible giving, reports one click away, safeguarding never buried.

The ground is white. Sections alternate white, coral wash, full-bleed coral and deep night wine, always with straight edges and full bleed; the rounding lives on the objects set into those fields (photographs, frames, cards, buttons, bullets), never on the fields themselves. Poppins carries the voice (700 for headings in sentence case, italic 600 for scripture and taglines); Source Sans 3 carries everything that is read. Depth is tonal: colour fields and overlapping frames, not shadows.

Motion is quiet except for one signature: on load, the hero frames open from a small rounded square to their full rounded frame, staggered, and the coral square and cross badge settle last. Every photograph is Caritas Africa's own, drawn from its reports and strategic framework, and carries a credit. The world deliberately departs from v5's caritas.org rounded section panels and pill buttons, v2's condensed poster, and v1's ruled ledger, and it sets headings in sentence case where the cover itself uses capitals. The user replaced the earlier cut-corner and hexagonal forms with rounded squares (2026-10-19); no chamfer or hexagon remains.

**Key Characteristics:**
- Rounded squares on photographs, frames, cards, buttons and bullets, all four corners alike, the radius growing with the object (12px buttons to 44px hero frame).
- Logo wine (#7c0800) for headings, links and actions; coral (#f96874) for fields, rounded-square accents and the wave; night wine (#3d0507) for dark sections and the footer.
- Poppins 700/600 sentence-case headings, Poppins italic 600 for scripture and taglines, Source Sans 3 for text.
- Coral rounded-square bullets, accent and cross badge.
- The layered wave closes the hero and opens the footer.
- One motion grammar: ease-out cubic-bezier(0.23, 1, 0.32, 1), presses at 0.97, hover only on fine pointers, a reduced-motion path that shows the rest state.

## Colors

A two-hue print palette lifted from the cover: a dark logo wine and a warm coral, with their tints and one near-black wine for night fields.

### Primary
- **Logo Wine** (wine): the Caritas Africa logo's own red. Every heading on white or wash, every primary action, links, the utility bar, the hero's large-frame keyline and the hover colour of navigation. Darkens to **Wine Hover** (wine-hover) on pointer hover.

### Secondary
- **Cover Coral** (coral): the cover's flat field. Full-bleed sections (mission and vision, the appeal), the wave and its band, rounded-square bullets, the hero accent square, the outline frame and the cross badge, the 3px top rule of dropdowns and the toast, the coral button on night. Lightens to **Coral Hover** (coral-hover).
- **Coral Ink** (coral-ink): coral darkened to pass AA on white. Taglines, content-type labels in metadata, zone codes, and the default focus ring.

### Tertiary
- **Night Wine** (night): the deep field. The APPROCHE programme section, the safeguarding band, the footer body, the toast, the drawer backdrop (at 45%) and text on coral.
- **Rose on Night** (on-night-2): secondary text on wine and night (utility bar, footer address and links, figure labels, captions).
- **Wine on Coral** (on-coral-2): secondary text and captions on coral fields.

### Neutral
- **White** (white): the page ground, cards set into wash sections, the header, the 5px ring around the cross badge.
- **Coral Wash** (wash): alternating section ground (action, news), the network footnote panel, dropdown item hover, empty cover tiles.
- **Blush** (wash-2) and **Rose** (wash-3): the soft button at rest and on hover; Blush is also the empty frame tint behind loading photographs.
- **Ink** (ink): body text, a wine-tinted near-black.
- **Ink Soft** (ink-2): leads, card text, metadata and captions on white.
- **Line** (line): 1px hairlines between facts, job items and drawer rows on white, the header's bottom rule, the zone top rule (2px), the language tag border.
- **Line Deep** (line-2): the hairline set directly on Coral Wash, between news-list items; one step deeper than Line so the rule still reads on the wash ground.

### Functional
- **WhatsApp Green** (wa, hover wa-hover): the floating contact disc only.

### Named Rules
**The Two Hues Rule.** The palette is wine and coral and their tints. No third hue enters the page except WhatsApp green on its own button and the partner logos at rest in greyscale.

**The Coral Ink Rule.** Coral text never sits on white at its field value; on white, coral-coloured type is Coral Ink. Full coral is a field, a shape or a button.

**The Night On Coral Rule.** Text and focus on coral fields are Night Wine; white type never sits on coral.

## Typography

**Display Font:** Poppins (with Segoe UI, system-ui)
**Body Font:** Source Sans 3 (with Source Sans Pro, Segoe UI, system-ui)

**Character:** A geometric sans read straight off the cover, set heavy and tight in wine for authority, softened by its own italic for faith and mottoes; a humanist text face keeps long French and Portuguese reading comfortable on mid-range phones.

### Hierarchy
- **Display** (Poppins 700, clamp(2.3rem, 1.5rem + 2.4vw, 3.45rem), 1.08, -0.02em): the hero H1 only, wine, balanced over three to four lines.
- **Headline** (Poppins 700, clamp(2rem, 1.45rem + 1.7vw, 3rem), 1.12, -0.015em): section heads; wine on white and wash, night on coral, white on night.
- **Scripture** (Poppins italic 600, clamp(1.85rem, 1.25rem + 1.9vw, 2.9rem), 1.14): mission and vision verses in French guillemets, with the reference in a figcaption below.
- **Tagline** (Poppins italic 600, clamp(1.1rem, 1rem + 0.45vw, 1.4rem), 1.35): the motto under the H1 and under a publication title, in Coral Ink.
- **Title Feature** (Poppins 700, clamp(1.6rem, 1.3rem + 0.9vw, 2.1rem), 1.15): the lead news story; the publication feature uses the same weight one step larger.
- **Title** (Poppins 600, 1.3125rem, 1.3): action titles, jobs head, zone names and the reports rail at 1.375rem. The lead action item's title is a single local step up (clamp(1.5rem, 1.2rem + 0.9vw, 2rem)), a one-off for the one tall item, not a reusable role.
- **Title List** (Poppins 600, 1.1875rem, 1.3): news and job links, programme figures, report years at 1.25rem.
- **Lead** (Source Sans 3 400, clamp(1.2rem, 1.05rem + 0.45vw, 1.45rem), 1.5): section openers; hero and section-head paragraphs sit at 1.1875rem, 44–48ch.
- **Body** (Source Sans 3 400, 1.125rem, 1.6): running text; card text 1.0625rem.
- **Body Small** (Source Sans 3 400, 1rem, 1.6): footnotes and secondary text (network footnote, zone meta, safeguarding text, newsletter text and field, footer address and links, the toast); also the Poppins 600 "more" link at the same size.
- **Label Button** (Poppins 600, 0.9375rem, 0.01em, sentence case): every button and the band counter.
- **Label Nav** (Source Sans 3 600, 1.0625rem): header links and dropdown items, each dropdown item with an optional 0.875rem Ink Soft sub-line.
- **Meta** (Source Sans 3, 0.875rem, Ink Soft): content type in Coral Ink 600, date in tabular figures; always after the title. Also the utility bar and photo credits on fields.
- **Caption** (Source Sans 3, 0.8125rem): photo credits under action items, the FR / EN / PT switch (600), the band credit on small screens.
- **Tag** (Source Sans 3 600, 0.75rem, 0.04em, capitals): the bordered language tag in news metadata; the smallest size in the system.

### Named Rules
**The Sentence-Case Rule.** Headings, buttons and navigation are in sentence case. Capitals appear only in acronyms (zone codes, language tags).

**The Italic Is Faith Rule.** Poppins italic is reserved for scripture and taglines; it never sets a heading or a button.

**The Metadata-After Rule.** Type, date and language follow the title they describe. No label sits above a heading.

## Layout

A 1280px container with a fluid gutter (clamp(20px, 5vw, 64px)); full-bleed section fields with vertical padding clamp(72px, 9vw, 128px). Section heads cap at 780px; a head with a "see all" link becomes a row that wraps. Grids are asymmetric two- and three-column splits (6/6 hero, 5/6 who-we-are, 1.15/1 actions with one tall lead item spanning three rows, 1.2/1/0.95 news), all collapsing to one column at 900px. The header is sticky at 84px over a 38px wine utility bar; below 1060px the header drops to 70px and the navigation moves into a right-hand drawer. Reports run five across, three at 1180px, two at 700px. Lists are divided by 1px hairlines rather than boxed.

## Elevation & Depth

Flat by default. Depth comes from colour fields (white, wash, coral, night), the overlapping rounded frames of the hero (with a coral outline frame and a 7% ink ghost square behind them) and the wave's three layers. Shadows exist only on things that float above the page.

### Shadow Vocabulary
- **Dropdown** (`box-shadow: 0 22px 44px -18px rgba(0, 0, 0, 0.22)`): header dropdowns, with a 3px coral top rule.
- **Overlay** (`box-shadow: 0 20px 40px -18px rgba(0, 0, 0, 0.5)`): the toast, with a 3px coral top rule.
- **Float** (`box-shadow: 0 12px 26px -10px rgba(0, 0, 0, 0.45)`): the WhatsApp disc.

### Named Rules
**The Fields Not Shadows Rule.** Sections, cards, frames and buttons never carry a drop shadow; only overlays (dropdown, toast, floating disc) do. The cross badge's 5px white ring (`box-shadow: 0 0 0 5px`) is a keyline, not elevation.

## Shapes

The form language is the rounded square: an even border-radius on all four corners, set through a local `--k` that grows with the object. Buttons 12px; report tiles 14px; action thumbnails 18px; the jobs card 20px; the lead story 22px; feature photographs (the lead action, programme, publication cover) clamp(22px, 2.6vw, 34px); the appeal photograph clamp(24px, 3vw, 40px); the hero's small frame clamp(20px, 2.4vw, 32px) and large frame clamp(24px, 3vw, 44px). The large frame carries a 2px wine keyline: a wine outer frame with the photographs inset 2px at a radius of `--k` minus 2px, so the curves stay concentric. Photographs clip inside their frame (overflow hidden) and fill it with object-fit cover.

Secondary shapes are small rounded squares in coral: the hero accent square (30% radius), the cross badge (28% radius, 5px white ring), 18px fact bullets (5px radius) and 13px zone markers (4px radius); plus a 2px coral outline frame and a 7% ink ghost square behind the hero frames, both at clamp(20px, 2.6vw, 36px). The newsletter field and the footer's social tiles take the button's 12px and the language tag 5px; sections, the network footnote panel, dropdowns and the toast stay square; the WhatsApp button is the only disc; the wave is the only free curve.

### Named Rules
**The Radius Scales Rule.** The radius grows with the object, from 4px markers through 12px buttons to 44px for the large hero frame; a report tile and a hero frame never share a radius.

**The Concentric Keyline Rule.** A frame drawn inside a frame takes the outer radius minus its inset (the 2px keyline sits at `--k` minus 2px), so the two curves never pinch.

## Components

### Buttons
Rounded slabs, confident and printed.
- **Shape:** gently rounded rectangles (12px radius), 52px tall, 0 28px padding, no border.
- **Wine:** Logo Wine with white text; the default action (Faire un don, downloads, subscribe).
- **Soft:** Blush with wine text; the secondary action on white.
- **Coral:** coral with night text; the action on night fields.
- **White:** white with wine text; the secondary action on coral.
- **Hover / Focus:** the background is a registered `@property --bg` colour so it transitions (180ms); hover only on fine pointers; press scales to 0.97 (160ms ease-out); focus is a 3px outline offset 3px in Coral Ink, Night on coral, Coral on night.
- **Text link ("more"):** Poppins 600 1rem wine with a chevron that slides 3px on hover; white on night.

### Cards / Containers
- **Corner Style:** rounded (lead story 22px, jobs 20px).
- **Background:** white cards set into wash sections; the network footnote is a flat, square wash panel.
- **Shadow Strategy:** none (see Elevation).
- **Internal Padding:** clamp(28px, 3vw, 44px) for the lead story, 28px for jobs.
- **Media cards:** action items and report tiles are links pairing a rounded photograph with a Poppins title; on hover the photograph scales to 1.03–1.04 over 600–700ms inside its rounded frame and the title underlines or turns wine.

### Inputs / Fields
- **Style:** white field on the coral band, 1.5px night border, 12px radius like its button, 52px tall, wine caret.
- **Focus:** 3px night ring by box-shadow.
- **Error:** wine border plus 2px wine ring, with a 600 night message beneath.

### Navigation
- **Utility bar:** wine, 38px, 0.875rem white text; "Signaler un abus" with a shield icon, flag-marked FR / EN / PT switch (0.8125rem) separated by 30% white rules.
- **Header:** white, sticky, 1px Line bottom rule; logo left, five sentence-case links in Ink turning wine on hover or when open, chevron rotating 180°; dropdowns 320px wide, white, 3px coral top rule, items highlight to Coral Wash.
- **Mobile:** a 420px right-hand drawer sliding in on cubic-bezier(0.32, 0.72, 0, 1) at 320ms, Poppins 600 1.3125rem wine summaries with hairline dividers, the two actions pinned at the foot, a night-wine backdrop at 45%.

### Hero Frames (signature)
Two rounded-square frames on a diagonal: the large one (74% by 74%, 2px wine keyline) holds the three-photo carousel crossfading every 7s over 900ms; the small one holds a portrait. Behind them, a coral outline frame and an ink ghost square; in front, the coral accent square and the cross badge. On load the frames open by `clip-path: inset()` with rounded corners, from `inset(24% round 28px)` (a small rounded square at the centre) to `inset(0 round var(--k))` (1150ms ease-out, 120ms and 300ms delays), while photographs settle from scale 1.12 over 1600ms; the outline fades in at 560ms; the accent square (900ms) and badge (1000ms) pop in last from scale 0.9 and -12°. Copy rises 12px by translate only, staggered 0–200ms. Under reduced motion the frames show their rest state and autoplay stops.

### Wave Band (signature)
Three SVG layers, a white gap, a wine ribbon and a coral field, overlap the bottom of the hero and continue as a coral band holding the photo credit and the carousel controls (40px night icon buttons, tabular counter). The same wave opens the footer above the coral newsletter band and the night footer body.

### Toast
Night bar, 3px coral top rule, overlay shadow, centred at the bottom, white link; enters by translateY(10px) and fades.

## Do's and Don'ts

### Do:
- **Do** round photographs, frames, cards and buttons as rounded squares, all four corners alike, scaling the radius with the object (12px buttons to 44px for the large hero frame).
- **Do** keep an inner keyline concentric: its radius is the outer radius minus the inset.
- **Do** set headings in Poppins 700 sentence case in Logo Wine on white and wash, night on coral, white on night.
- **Do** reserve Poppins italic 600 for scripture and taglines, taglines in Coral Ink.
- **Do** use full-bleed, straight-edged fields (white, wash, coral, night) to separate sections.
- **Do** use small coral rounded squares for list bullets, the hero accent and the cross badge, and the layered wave to close the hero and open the footer.
- **Do** draw button colour through the registered `--bg` property so hover transitions, with 0.97 presses and hover only on fine pointers.
- **Do** credit every photograph in a caption, using only Caritas Africa's own images.
- **Do** put content type, date and language after the title.
- **Do** keep "Faire un don" in the header and "Signaler un abus" in the utility bar.

### Don't:
- **Don't** cut corners or use hexagons; the user retired chamfers and hexagonal forms in favour of rounded squares.
- **Don't** round section fields or turn buttons into pills; rounding belongs to objects set into straight-edged fields.
- **Don't** return to v5's rounded section panels and pill buttons, v2's condensed poster or v1's ruled ledger.
- **Don't** set coral text on white; use Coral Ink. Don't set white text on coral.
- **Don't** shadow sections, cards, frames or buttons; shadows belong to dropdowns, the toast and the WhatsApp disc.
- **Don't** add a third hue to the wine and coral palette.
- **Don't** put small labels or kickers above headings.
- **Don't** use emoji or text glyphs as icons; use the inline stroke icon set.
- **Don't** move copy by anything but translate (copy never fades or clips in), and don't let any entrance run under reduced motion; that path shows the rest state.
