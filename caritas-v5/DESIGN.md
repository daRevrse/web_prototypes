---
name: Caritas Africa (v5)
description: Caritas Africa as a region of the confederation, in caritas.org's own interface language.
colors:
  red: "#b10017"
  red-hover: "#960014"
  on-red-2: "#f7d9dd"
  red-dot: "#efc3c9"
  teal: "#007a6c"
  teal-deep: "#00665a"
  teal-hover: "#005147"
  teal-plate: "#e3f0ee"
  on-teal-2: "#e8f5f2"
  sky: "#60b4cd"
  sky-ink: "#2a7c97"
  navy: "#2e2c54"
  navy-hover: "#222040"
  on-navy-2: "#d8d7ea"
  amber-ink: "#a85a0c"
  sand: "#ebe3d7"
  ink: "#2c2c2c"
  ink-2: "#5a5a5a"
  line: "#e4ddd2"
  white: "#ffffff"
  black: "#000000"
  wa: "#1fa855"
  wa-hover: "#188c46"
typography:
  display:
    fontFamily: "Literata, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2.35rem, 1.3rem + 3.5vw, 4.5rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Literata, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2rem, 1.45rem + 1.7vw, 2.85rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.012em"
  title-book:
    fontFamily: "Literata, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(1.8rem, 1.3rem + 1.5vw, 2.6rem)"
    fontWeight: 400
    lineHeight: 1.08
  title-card:
    fontFamily: "Literata, Georgia, 'Times New Roman', serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.2
  title:
    fontFamily: "Literata, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(1.4rem, 1.15rem + 0.8vw, 1.75rem)"
    fontWeight: 600
    lineHeight: 1.15
  quote:
    fontFamily: "Literata, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(1.45rem, 1.2rem + 0.7vw, 1.8rem)"
    fontWeight: 500
    lineHeight: 1.2
  body:
    fontFamily: "'Hanken Grotesk', 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label-pill:
    fontFamily: "'Hanken Grotesk', 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "0.04em"
  label-nav:
    fontFamily: "'Hanken Grotesk', 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.05em"
  meta:
    fontFamily: "'Hanken Grotesk', 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.06em"
rounded:
  img: "14px"
  card: "18px"
  panel: "clamp(18px, 1.8vw, 24px)"
  pill: "999px"
spacing:
  gutter: "clamp(10px, 1.7vw, 24px)"
  edge: "calc(clamp(10px, 1.7vw, 24px) + clamp(10px, 1.6vw, 24px))"
  pad: "clamp(20px, 4.6vw, 72px)"
  panel-block: "clamp(44px, 5.4vw, 80px)"
  section-open: "clamp(72px, 9vw, 136px)"
  container: "1240px"
components:
  button-primary:
    backgroundColor: "{colors.red}"
    textColor: "{colors.white}"
    typography: "{typography.label-pill}"
    rounded: "{rounded.pill}"
    padding: "0 26px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.red-hover}"
  button-white:
    backgroundColor: "{colors.white}"
    textColor: "{colors.red}"
    typography: "{typography.label-pill}"
    rounded: "{rounded.pill}"
    padding: "0 26px"
    height: "48px"
  button-white-hover:
    backgroundColor: "{colors.on-red-2}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.red}"
    typography: "{typography.label-pill}"
    rounded: "{rounded.pill}"
    padding: "0 26px"
    height: "48px"
  button-line-hover:
    backgroundColor: "{colors.red}"
    textColor: "{colors.white}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    typography: "{typography.label-pill}"
    rounded: "{rounded.pill}"
    padding: "0 26px"
    height: "48px"
  button-ghost-hover:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
  button-navy:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.white}"
    typography: "{typography.label-pill}"
    rounded: "{rounded.pill}"
    padding: "0 26px"
    height: "48px"
  button-navy-hover:
    backgroundColor: "{colors.navy-hover}"
  tab-spotlight:
    backgroundColor: "{colors.teal-deep}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "46px"
  tab-spotlight-selected:
    backgroundColor: "{colors.white}"
    textColor: "{colors.teal}"
  tab-spotlight-hover:
    backgroundColor: "{colors.teal-hover}"
  panel-red:
    backgroundColor: "{colors.red}"
    textColor: "{colors.white}"
    rounded: "{rounded.panel}"
    padding: "{spacing.panel-block} {spacing.pad}"
  panel-sand:
    backgroundColor: "{colors.sand}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "{spacing.panel-block} {spacing.pad}"
  panel-teal:
    backgroundColor: "{colors.teal}"
    textColor: "{colors.white}"
    rounded: "{rounded.panel}"
    padding: "{spacing.panel-block} {spacing.pad}"
  panel-sky:
    backgroundColor: "{colors.sky}"
    textColor: "{colors.navy}"
    rounded: "{rounded.panel}"
    padding: "{spacing.panel-block} {spacing.pad}"
  panel-navy:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.white}"
    rounded: "{rounded.panel}"
    padding: "{spacing.panel-block} {spacing.pad}"
  card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "clamp(22px, 2.2vw, 30px)"
  input-on-red:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "48px"
  nav-link:
    textColor: "{colors.ink}"
    typography: "{typography.label-nav}"
    padding: "12px 13px"
  utility-bar:
    backgroundColor: "{colors.black}"
    textColor: "{colors.white}"
    height: "36px"
---

# Design System: Caritas Africa (v5)

## Overview

**Creative North Star: "The Confederation's Own Page"**

Caritas Africa speaks here in the interface language of caritas.org, as one region of the confederation rather than a campaign of its own. The page is a white sheet on which every section is an inset, rounded panel set in from the viewport edge, each panel its own colour field: Caritas red for action and the footer, sand for news, teal for publications, sky for the network, navy for safeguarding. White sections without a panel (who we are, the appeal, partners) breathe between them.

Headings are set in a book serif, Literata, in sentence case and in red or white; running text and every control are set in Hanken Grotesk, with actions as uppercase pills. The voice is warm and institutional: a serif line about hope over a real photograph of the network, then calm, evenly paced panels. The photographs are Caritas Africa's own, drawn from its reports and credited in a caption under or on each image.

The world explicitly replaces v2's condensed uppercase poster and square carbon frame. Corners are round at every scale (panel, card, image, pill), depth is mostly tonal (colour fields on white), and motion is quiet except for one signature: the pinned hero receding as the red action panel slides over it.

**Key Characteristics:**
- Inset rounded panels (gutter clamp(10px, 1.7vw, 24px), radius up to 24px), one colour field per section.
- Literata for headings in sentence case: 600 for h1/h2, book 400 for card and feature titles.
- Hanken Grotesk for text; uppercase pill buttons at 600, 0.04em tracking.
- Five rubrique colours (red, teal, sky-ink, amber-ink, navy) coding the navigation and its mega menus.
- Caritas Africa's own credited photographs, rounded 14px inside cards and panels.
- One motion grammar: ease-out cubic-bezier(0.23, 1, 0.32, 1), 0.97 presses, hover only on fine pointers.

## Colors

A committed Caritas red plus four section fields (sand, teal, sky, navy) on a white ground, with near-black ink for reading.

### Primary
- **Caritas Red** (`red`): the "Notre action" panel, the footer panel, the appeal card, every primary pill, red serif headings on white and sand, the active dot, text selection. This is caritas.org's red; the logo keeps its own darker red and is never recoloured.
- **Red Hover** (`red-hover`): hover state of red pills.
- **Rose on Red** (`on-red-2`): secondary text on red fields (panel leads, footer links, appeal copy) and the hover fill of white pills.
- **Red Dot** (`red-dot`): inactive carousel dots on white.

### Secondary
- **Caritas Teal** (`teal`): the "À la une" publications panel; the "Notre action" rubrique tone. **Teal Deep** (`teal-deep`) fills unselected spotlight tabs, **Teal Hover** (`teal-hover`) their hover. **Teal Plate** (`teal-plate`) is the light mat behind publication covers; **Mint on Teal** (`on-teal-2`) is secondary text on the teal field.

### Tertiary
- **Sky** (`sky`): the network panel, always with navy text, never white. Also the safeguarding shield icon on navy.
- **Sky Ink** (`sky-ink`): the "Notre réseau" rubrique tone, zone codes on white cards, and the default focus ring.
- **Navy** (`navy`): the safeguarding panel, the toast, navy pills, zone-card text and arrow rings; the "Actualités" rubrique tone. **Navy Hover** (`navy-hover`) for navy pill hover; **Lavender on Navy** (`on-navy-2`) for secondary text on navy.
- **Amber Ink** (`amber-ink`): the "Ressources" rubrique tone only (nav underline, mega-menu title and links).

### Neutral
- **White** (`white`): page ground, cards inside panels, header, drawer.
- **Sand** (`sand`): the news panel field.
- **Ink** (`ink`): body text and headings that are not red. **Ink Soft** (`ink-2`): leads, captions, metadata.
- **Line** (`line`): hairlines between list rows, mega-menu links, verse separators, language chips.
- **Black** (`black`): the utility bar only.

### Functional
- **WhatsApp Green** (`wa`, hover `wa-hover`): the floating WhatsApp button only.

### Named Rules
**The One Field Per Section Rule.** Each panel is one flat colour field (red, sand, teal, sky or navy) with white cards set into it; never a gradient, never two fields in one panel, never a tinted card on white.

**The Rubrique Tone Rule.** The five rubriques keep fixed tones everywhere they appear: Qui sommes-nous red, Notre action teal, Notre réseau sky-ink, Ressources amber-ink, Actualités navy. The tone drives the nav underline, the mega-menu title, link hover and outline pill.

**The Sky Takes Navy Rule.** Text on the sky field is navy (and focus is navy); white type never sits on sky.

## Typography

**Display Font:** Literata (with Georgia, Times New Roman), Google-hosted, optical sizing on
**Body Font:** Hanken Grotesk (with Helvetica Neue, Helvetica, Arial), Google-hosted

**Character:** A contemporary book serif with the warmth of a printed report, paired with a clean, friendly grotesque for reading and for the uppercase pill controls that are caritas.org's signature.

### Hierarchy
- **Display** (600, clamp(2.35rem, 1.3rem + 3.5vw, 4.5rem), 1.04, -0.015em): hero slide headlines only, white, centred, max 17ch, balanced.
- **Headline** (600, clamp(2rem, 1.45rem + 1.7vw, 2.85rem), 1.08, -0.012em): section heads, red on white and sand, white on red, teal and navy, navy on sky. Mega-menu titles use the same face at 2.6rem in the rubrique tone.
- **Title Book** (400, clamp(1.8rem, 1.3rem + 1.5vw, 2.6rem), 1.08): feature-carousel and publication titles; red on white, white on teal.
- **Title Card** (400, 1.5rem, 1.2): news and jobs card titles in red; zone names (1.6rem) in navy; the story card title (up to 2.2rem) in white.
- **Title** (600, clamp(1.4rem, 1.15rem + 0.8vw, 1.75rem), 1.15): smaller section heads (safeguarding, partners); footer column heads at 1.2rem.
- **Quote** (500, clamp(1.45rem, 1.2rem + 0.7vw, 1.8rem), 1.2): mission and vision statements, with the source line in red 600 below. Italic Literata 400 (1.25rem) serves as a subtitle under publication titles.
- **Body** (400, 1.0625rem, 1.6): running text; panel leads 1.125rem, max 62ch; card text 1rem in Ink Soft.
- **Label Pill** (600, 0.875rem, 0.04em, uppercase): every pill button. **Label Nav** (500, 0.8125rem, 0.05em, uppercase): header rubriques.
- **Meta** (600, 0.75rem, 0.06em, uppercase): content-type tags in card footers, beside the date (tabular figures).

### Named Rules
**The Sentence-Case Serif Rule.** Every heading is Literata in sentence case. Uppercase belongs only to controls (pills, rubriques, tabs) and to metadata at the foot of a card.

**The Two Weights Rule.** Literata 600 heads sections and the page; Literata 400 names things inside them (cards, features, publications, zones). Do not set card titles at 600.

**The Metadata-Below Rule.** Type, date and language sit in a card's footer, after its title and text. No label sits above a heading.

## Layout

The page is a white sheet with panels inset by a fluid gutter (clamp(10px, 1.7vw, 24px)) on the left, right and between panels; the footer is the last inset panel. Panel content is padded by clamp(20px, 4.6vw, 72px) horizontally and clamp(44px, 5.4vw, 80px) vertically, and centred to a 1240px column (1320px for the appeal grid, 1180px for the spotlight). Unpanelled white sections open with clamp(72px, 9vw, 136px) of vertical space.

Chrome: a 36px black utility bar, then a sticky 84px white header (70px under 1080px). The hero frame fills the first viewport minus the header and an 88px "peek", so the top of the red action panel shows at the fold; height clamps between 440px and 760px.

Grids are simple and stack predictably: three columns for who-we-are and news (the story card spans two), a 12-column overlap for the appeal (photo on 1-9, red card on 8-12), two columns for the spotlight and feature slides, three for network zones. Breakpoints: 1180px (tighter nav), 1080px (drawer replaces nav and mega menus), 900px (two-column and stacked layouts), 700px (single column, zones become a horizontal snap scroller at 84%), 560px (hero type step-down), 420px (narrow pills).

Horizontal carousels (features, mobile zones) use native scroll-snap with hidden scrollbars and dot or peek affordances.

## Elevation & Depth

Depth is mostly tonal: coloured fields on white and white cards inside fields. Shadows are soft, warm-tinted and offset downward with a negative spread; they mark things that sit above the page or respond to the pointer.

### Shadow Vocabulary
- **Mega drop** (`0 28px 48px -20px rgba(30, 20, 10, 0.28)`): mega menus under the header.
- **Cover lip** (`0 -18px 40px -28px rgba(0, 0, 0, 0.45)`): top edge of the red action panel as it slides over the hero.
- **Appeal lift** (`0 28px 50px -30px rgba(80, 0, 10, 0.6)`): the red appeal card overlapping its photograph.
- **Hover lift** (`0 18px 34px -20px rgba(70, 45, 20, 0.35)` with translateY(-3px)): news cards; zone cards use a navy tint `rgba(20, 30, 60, 0.45)`.
- **Printed cover** (`0 22px 40px -18px rgba(0, 0, 0, 0.4)`): publication covers on the teal plate.
- **Overlay** (`0 20px 40px -18px rgba(0, 0, 0, 0.5)`): toast; the WhatsApp button uses `0 12px 26px -10px rgba(0, 0, 0, 0.45)`.

### Named Rules
**The Fields Not Shadows Rule.** Panels and cards are flat at rest; a section is separated by its colour field, not by a shadow. Shadows belong to overlays, the overlapping appeal card, the sliding action panel, printed covers and pointer hover.

## Shapes

Everything is rounded, in three nested steps: panels and the hero frame at clamp(18px, 1.8vw, 24px), cards and large photographs at 18px, photographs inside cards at 14px. Every button, tab, input and chip is a full pill (999px); icon buttons, dots, arrow rings and social links are circles. Photographs are never shown square-cornered and never full-bleed: they sit inside the inset frame. Mega menus round only their bottom corners, hanging from the header.

## Components

### Buttons
Confident, rounded and uppercase, exactly caritas.org's pill.
- **Shape:** full pill (999px), min-height 48px, 0 26px padding (20px under 420px), 1.5px border.
- **Primary (red):** red field, white label. Hover Red Hover. Used for "Faire un don" and the main action of a feature or slide.
- **White:** white field, red label (teal label on teal); for the primary action on a coloured field. Hover Rose on Red.
- **Line:** transparent with a red 1.5px outline and red label; inside mega menus the outline and label take the rubrique tone. Hover fills with the tone.
- **Ghost:** transparent, white 85% outline, white label; the secondary action on red, teal, navy and photographs. Hover fills white with ink label.
- **Navy:** navy field on the sky panel.
- **Press / Focus:** scale(0.97) at 160ms ease-out; 3px focus outline at 3px offset in Sky Ink, white on dark fields, navy on sky.

### Chips
- **Spotlight tabs:** 46px pills, Teal Deep with white uppercase label; selected turns white with teal label; hover on unselected darkens to Teal Hover.
- **Language chip:** 1px Line outline pill, 0.6875rem 600, beside the date in card footers.

### Cards / Containers
- **Panel:** inset, rounded field (see Layout and Shapes); the section heading sits at its top, max 1240px.
- **Card:** white, 18px radius, clamp(22px, 2.2vw, 30px) padding, inside the sand panel. Whole-card link via the title's stretched pseudo-element; hover lifts 3px with the warm shadow and underlines the title.
- **Feature card:** a white card inside the red panel holding a snap carousel of photo (3:2, 14px) plus book-serif red title and red pill, with dots below.
- **Zone card:** white, navy text, zone name in Literata 400 above its code in Sky Ink 600; a 42px navy-outlined arrow ring fills navy on hover.

### Inputs / Fields
- **Newsletter (on red):** 48px pill with 1.5px white 70% outline, transparent ground, white text and caret, placeholder white 80%.
- **Error:** border turns solid white with a 2px white ring, message in white 500 below. No coloured error state on red.

### Navigation
- **Utility bar:** 36px black strip, 0.8125rem; "Membre de Caritas Internationalis" left, "Signaler un abus", Emplois, Contact and three flag buttons (18x13, 2px radius) right.
- **Header rubriques:** uppercase Hanken 500 at 0.8125rem; a 2px underline in the rubrique tone scales in from the left (200ms) on hover and while its mega menu is open.
- **Mega menu:** white, hanging from the header with rounded bottom corners and the mega drop shadow; left column a tone-coloured Literata title, lead and outline pill, right a two-column list of 56px ruled links that take the tone on hover. A warm 40% scrim dims the page.
- **Mobile:** under 1080px a right-side drawer (min(420px, 100%)) slides in on cubic-bezier(0.32, 0.72, 0, 1) over 320ms; each rubrique is a disclosure with a Literata 600 summary in its tone, and the red and line pills sit at the bottom.

### Hero Recede (signature)
The hero is a rounded inset carousel of three credited photographs (900ms crossfade, slow 1.06 to 1 settle, staggered copy rise, edge arrows and a pause button). It stays sticky under the header while the red "Notre action" panel slides over it; a CSS scroll-driven animation scales the hero frame to 0.94 (radius growing 1.4x) and dims it to 50% black over the first 72vh of the panel's entry. The effect requires `animation-timeline` support and is removed under prefers-reduced-motion and at max-height 560px, where the hero returns to normal flow.

### Story card
A two-column news card: the photograph is set grayscale and multiplied with Caritas red (90%), with a left-to-right deep-red gradient for legibility, white Literata title, rose text and a ghost pill; credit top right.

## Do's and Don'ts

### Do:
- **Do** set every section as an inset rounded panel or a white breathing section, one colour field per panel.
- **Do** set headings in Literata sentence case: 600 for page and section heads, 400 for card, feature, publication and zone titles.
- **Do** make every action an uppercase Hanken Grotesk pill (48px, 999px, 0.04em), red on white, white or ghost on coloured fields.
- **Do** keep each rubrique's tone (red, teal, sky-ink, amber-ink, navy) consistent across nav, mega menu and drawer.
- **Do** use Caritas Africa's own photographs, rounded, with a credit caption under or on each one.
- **Do** put type, date and language at the foot of a card, after its title.
- **Do** use ease-out cubic-bezier(0.23, 1, 0.32, 1), 0.97 presses, hover only on fine pointers, and drop pinning, scaling and autoplay under reduced motion.
- **Do** keep "Faire un don" in the header and "Signaler un abus" in the utility bar.

### Don't:
- **Don't** return to v2's condensed uppercase headings or square carbon frames.
- **Don't** put white text on the sky field; sky takes navy.
- **Don't** put small uppercase labels or kickers above headings.
- **Don't** use square-cornered photographs, buttons or fields.
- **Don't** shadow panels or cards at rest; depth comes from colour fields.
- **Don't** recolour the logo to caritas.org's red; it keeps its own darker red.
- **Don't** use emoji or text glyphs as icons; use the 1.75-stroke line icon set.
- **Don't** use gradients except as photograph scrims and the story card's red duotone.
