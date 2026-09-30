---
name: Digital Dreamers
description: The free youth coding programme of BostonSolux Academy, told straight in BostonSolux red and ink on white.
colors:
  red: "#b40000"
  red-700: "#950000"
  red-800: "#7a0000"
  red-100: "#f8dad7"
  red-50: "#fdf0ef"
  ink: "#1e1818"
  ink-2: "#423a3a"
  muted: "#665d5d"
  faint: "#9a9191"
  line: "#ebe4e3"
  line-2: "#d9cfce"
  band: "#f6f3f2"
  white: "#ffffff"
  night: "#1e1818"
  night-2: "#2a2323"
  night-line: "#3e3535"
  night-muted: "#b8aeae"
  ok: "#1d6b3a"
  danger: "#a3161c"
typography:
  display:
    fontFamily: "Rubik, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.3rem, 1.3rem + 2.8vw, 3.7rem)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Rubik, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 1.3rem + 1.8vw, 2.9rem)"
    fontWeight: 750
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Rubik, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.3rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  lead:
    fontFamily: "Lexend, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.06rem, 1rem + 0.3vw, 1.2rem)"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Lexend, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16.5px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Rubik, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: 1
rounded:
  sm: "10px"
  md: "14px"
  lg: "18px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "24px"
  gutter: "clamp(16px, 4vw, 40px)"
  section: "clamp(64px, 8vw, 112px)"
  container: "1240px"
  header: "76px"
components:
  button-primary:
    backgroundColor: "{colors.red}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 26px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.red-700}"
  button-primary-active:
    backgroundColor: "{colors.red-800}"
  button-outline:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 26px"
    height: "52px"
  button-outline-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  button-on-red:
    backgroundColor: "{colors.white}"
    textColor: "{colors.red}"
    rounded: "{rounded.pill}"
    height: "52px"
  button-on-red-hover:
    backgroundColor: "{colors.red-50}"
  button-small:
    rounded: "{rounded.pill}"
    padding: "0 18px"
    height: "44px"
  fact-chip:
    backgroundColor: "{colors.red-50}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "9px 14px 9px 10px"
  icon-disc:
    backgroundColor: "{colors.red-50}"
    textColor: "{colors.red}"
    rounded: "{rounded.pill}"
    size: "48px"
  tab:
    backgroundColor: "transparent"
    textColor: "{colors.ink-2}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "46px"
  tab-active:
    backgroundColor: "{colors.red}"
    textColor: "{colors.white}"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "12px 16px"
    height: "52px"
  choice:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 18px"
    height: "46px"
  choice-selected:
    backgroundColor: "{colors.red-50}"
    textColor: "{colors.red-800}"
  panel:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.lg}"
    padding: "clamp(24px, 3vw, 36px)"
  panel-red:
    backgroundColor: "{colors.red}"
    textColor: "{colors.white}"
    rounded: "{rounded.lg}"
    padding: "clamp(32px, 5vw, 64px)"
---

# Design System: Digital Dreamers

## Overview

**Creative North Star: "The Open Classroom"**

Digital Dreamers is the category standard for a youth coding programme, played straight: real children in real rooms, plain answers for parents, one obvious way to register. The page behaves like a well-run school open day. White ground, ink type, BostonSolux red used for brand, action and emphasis, and nothing on the surface that is there to look clever. Its quality bar is Code.org and Scratch (clear, joyful without being childish) and Code Club and the Raspberry Pi Foundation (serious programme, institutional credibility).

Density is calm and generous. Sections breathe on a white or warm grey band, content sits in a 1240px container, and the rhythm alternates text with real session photographs. Warmth comes from three sources only: the photographs, Rubik's rounded heavy display cuts, and pill-shaped controls. Depth is flat; surfaces are separated by tone and hairlines, not by shadows.

The world rejects the AI-template language its predecessor used: sparkle marks, eyebrow pills above headings, radial glows, floating stat cards, stock photography, cards that lift on hover and gradient bands.

**Key Characteristics:**
- White ground, ink #1E1818 text, BostonSolux red #B40000 as the single accent.
- Rubik 700 to 800 for display, Lexend for reading.
- Rounded but not bubbly: 10px fields, 14px photos, 18px panels and hero photos, pill buttons and chips.
- Authored 2px line icons, set in red-on-wash discs.
- Real, captioned photographs of the programme's own sessions; never stock.
- Flat surfaces; tone and 1px hairlines carry structure.
- One motion voice: ease-out, short, press-scale feedback.

## Colors

A two-colour brand (BostonSolux red and near-black) on white, softened by warm-tinted neutrals and a pale red wash.

### Primary
- **BostonSolux Red** (#b40000): the brand commitment. Primary buttons, the header CTA, the active edition tab pill, the thanks band under the hero, the final programme stop, the closing CTA panel, icon strokes, focus rings, link accents and the red half of the wordmark.
- **Pressed Red** (#950000): hover state of red buttons.
- **Deep Red** (#7a0000): active state of red buttons and the text of a selected choice pill.
- **Rose Line** (#f8dad7): resting underline colour of text links and the text-selection highlight.
- **Red Wash** (#fdf0ef): fact chips, icon discs, selected choice pills, the success panel and one wash section. The only tinted surface.

### Neutral
- **Ink** (#1e1818): body and heading text, outline button border, list-heading rules, speaker initials disc and the dark "visit" panel.
- **Ink Soft** (#423a3a): lead paragraphs, descriptions and nav links.
- **Muted Ash** (#665d5d): notes, captions, metadata, breadcrumbs, optional-field hints.
- **Faint Ash** (#9a9191): resting chevrons and input hover border only; never text that must be read.
- **Hairline** (#ebe4e3): row dividers, header border on scroll, tab track and quote card borders.
- **Rule** (#d9cfce): field borders, fieldset and partner panel borders, FAQ dividers, dashed programme path.
- **Warm Band** (#f6f3f2): alternating section background, nav hover, the form aside card.
- **White** (#ffffff): the ground.
- **Night** (#1e1818), **Night Raised** (#2a2323), **Night Line** (#3e3535), **Night Muted** (#b8aeae): the footer's ink band and its hover, dividers and secondary text.

### Status
- **Success Green** (#1d6b3a): the live age-check confirmation on the form.
- **Error Red** (#a3161c): field errors, error border and the error summary; kept distinct from brand red.

### Named Rules
**The One Accent Rule.** Red is the only hue. Status green and error red appear only inside the form; no other accent colour enters the system.

**The One Ink Band Rule.** Full-bleed dark surfaces are reserved for the footer. Inside the page, dark appears only as a bounded panel with radius.

## Typography

**Display Font:** Rubik (with ui-sans-serif, system-ui fallback), loaded at weights 500 to 800
**Body Font:** Lexend (with ui-sans-serif, system-ui fallback), loaded at 400, 500, 600

**Character:** Rubik's softened corners at heavy weights read chunky and friendly without turning childish; Lexend was designed for reading fluency and carries every paragraph, form label and nav link.

### Hierarchy
- **Display** (Rubik 800, clamp(2.3rem, 1.3rem + 2.8vw, 3.7rem), 1.04, -0.025em): the single page h1. The inscription page's h1 uses the same voice one step smaller.
- **Headline** (Rubik 750, clamp(1.9rem, 1.3rem + 1.8vw, 2.9rem), 1.08, -0.02em): section h2s. Secondary headings (edition titles, list heads, success heading) sit on intermediate clamps between Headline and Title.
- **Title** (Rubik 700, 1.3rem, 1.25): programme stops, partner and fieldset legends. Row and point titles use Rubik 650 at 1.1rem.
- **Quote** (Rubik 600, clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem), 1.35): expert quotes, wrapped in red French guillemets.
- **Lead** (Lexend 400, clamp(1.06rem, 1rem + 0.3vw, 1.2rem), 1.6, Ink Soft): the paragraph under a display or section heading, capped at 46 to 62ch.
- **Body** (Lexend 400, 16.5px, 1.65; 16px under 640px): all reading text. Secondary copy steps to 15 to 15.5px.
- **Label** (Rubik 600, 16 to 16.5px, line-height 1): buttons, tabs, "more" links, drawer links and FAQ questions.

### Named Rules
**The Rubik Speaks, Lexend Explains Rule.** Anything you click or scan as a heading is Rubik; anything you read is Lexend. Headings balance (`text-wrap: balance`), paragraphs pretty-wrap.

**The Sentence Case Rule.** No uppercase labels, no tracked-out small caps, no label or kicker above a heading (a breadcrumb trail on inner pages is navigation, not a label). A section starts with its heading.

## Layout

A centred 1240px container with a fluid gutter (clamp(16px, 4vw, 40px)). Sections take vertical padding of clamp(64px, 8vw, 112px) and alternate white, Warm Band and (once) Red Wash. The sticky header is 76px (66px under 640px). Section heads are a flex row: heading and lead on the left (max 62ch), a "more" link bottom-aligned on the right.

Most content is two-column: hero 1fr / 1fr, about 1fr / 1.05fr, editions 1.15fr / 1fr, FAQ 0.8fr / 1.2fr, form 1.5fr / 1fr with a sticky aside. The programme path is a five-step row whose last step is wider (1.25fr) and filled red.

Breakpoints: at 1100px the path goes to two columns and the footer to two; at 960px every split collapses to one column, the nav gives way to a drawer and the hero photo moves above the copy; at 640px hero buttons go full width, tabs stretch edge to edge and the path becomes a vertical list with stops on the left.

## Elevation & Depth

The system is flat. Depth comes from tonal layering (white, Warm Band, Red Wash, Ink panel) and 1px or 2px hairlines. Nothing lifts on hover.

### Shadow Vocabulary
- **Caption float** (`box-shadow: 0 2px 10px -2px rgb(30 24 24 / 0.25)`): only the white caption pill sitting on a photograph, so it separates from the image.
- **Focus halo** (`box-shadow: 0 0 0 4px rgb(180 0 0 / 0.14)`): text inputs on focus, paired with a red border.

### Named Rules
**The Flat Ground Rule.** Cards, panels and rows carry no shadow at rest or on hover. Hover changes colour, never altitude.

## Shapes

Rounded but not bubbly. Four radii: 10px for fields and error summaries, 14px for edition photos, 18px for hero and about photos and every panel (quotes, partners, CTA, fieldsets, aside, success), and full pills for buttons, tabs, chips, choices, tool tags and nav hover. Circles are reserved for icon discs, programme stops, speaker initials, social links and the mobile menu button. Borders are 1px for structure and 2px for interactive outlines (buttons, fields, choices, programme stops). The one broken line in the system is the dashed 2px rule that joins the programme stops.

## Components

### Buttons
Confident pills with a short, tactile press.
- **Shape:** full pill (999px), 52px tall, 2px border, Rubik 600, optional trailing arrow icon at 19px.
- **Primary:** red fill, white text, 0 26px padding. Hover goes to Pressed Red, active to Deep Red.
- **Outline:** white fill, 2px ink border, ink text; hover inverts to ink fill with white text.
- **On red:** white fill with red text, used inside red panels; hover to Red Wash.
- **Small:** 44px tall, 0 18px, 15px; used for the header CTA.
- **Press:** every button scales to 0.97 over 160ms ease-out. Hover effects apply only on fine pointers.

### Text Links ("more")
Rubik 600 red text with a Rose Line underline 6px below; hover darkens the underline to red and nudges the arrow 3px right.

### Fact Chips
- **Style:** Red Wash pill, ink Lexend 500 at 15px, red 20px line icon on the left.
- **Layout:** a 2 by 2 grid in the hero; wraps freely under 640px. Facts only, never a label above a heading.

### Icon Discs
48px circles (40px in the aside, on white) in Red Wash with a red 2px line icon. They lead list rows, about points and aside facts.

### Cards / Containers
- **Corner Style:** 18px.
- **Background:** white with a Hairline or Rule border (quotes, partners, fieldsets); Warm Band without border (form aside); Red Wash (success); red (CTA, final path step); ink (visit panel, clipped photo half).
- **Shadow Strategy:** none (see Elevation).
- **Internal Padding:** clamp(24px, 3vw, 36px) typical; CTA clamp(32px, 5vw, 64px).

### Inputs / Fields
- **Style:** 52px tall, 2px Rule border, 10px radius, white, 12px 16px padding; labels Lexend 500 above, optional marker in Muted Ash.
- **Hover / Focus:** hover border Faint Ash; focus border red plus the 4px Focus halo.
- **Error:** border and message in Error Red with an icon; an error summary panel lists links to the failing fields.
- **Choices:** radio options render as 46px pills with a 2px Rule border; selected turns red border, Red Wash fill, Deep Red text.

### Navigation
White sticky header that gains a Hairline bottom border on scroll. Typographic wordmark (Rubik 800, "Dreamers" in red), with no sub-line: it is the only logo. The footer repeats it at 2rem in white with "Dreamers" in #ef5350 (4.9:1 on Night); BostonSolux Academy is credited in footer text only. Nav links are Lexend 500 15px in Ink Soft with a Warm Band pill on hover; the current page is red. Under 960px a 48px circular menu button opens a right-side drawer (max 400px, slides in 280ms) with Rubik 600 20px links between hairlines and full-width buttons.

### Editions Switcher (signature)
A segmented control: white pill track with a Hairline border and 6px inset, Rubik 600 tabs 46px tall. The active tab is marked by a red pill that slides beneath the labels (240ms ease-out) while the label turns white. Panels fade in over 280ms. Under 640px the track spans the full width with equal tabs.

### Programme Path (signature)
Unnumbered steps shown as 64px white circles with a 2px red border and a red icon, joined by a dashed Rule line. The final step is a filled red 18px panel with the stop inverted to white.

### Motion
One easing: cubic-bezier(0.23, 1, 0.32, 1). Press scale 0.97 at 160ms; colour changes 160 to 200ms; tab pill 240ms; FAQ plus icon rotates 45 degrees and answers fade in; drawer 280ms. One load moment: the hero photo settles from scale 0.97 with opacity over 900ms. Reduced motion keeps opacity only.

## Do's and Don'ts

### Do:
- **Do** keep BostonSolux red (#b40000) as the only accent and ink (#1e1818) on white as the base.
- **Do** set display and headings in Rubik 700 to 800 and all reading text in Lexend.
- **Do** use real, captioned photographs of Digital Dreamers sessions, at 14px or 18px radius.
- **Do** use authored 2px line icons in red, inside Red Wash discs when they lead an item.
- **Do** make every action a pill (999px) that scales to 0.97 on press.
- **Do** separate surfaces with tone (white, Warm Band #f6f3f2, Red Wash #fdf0ef) and hairlines.
- **Do** give every interactive element the 3px red focus outline at 3px offset (white on red or ink surfaces).

### Don't:
- **Don't** put eyebrow pills, kickers or uppercase labels above headings.
- **Don't** use radial glows, gradient bands or floating stat cards.
- **Don't** lift cards or panels on hover or give them drop shadows.
- **Don't** use stock photography or illustrated stand-ins for the children.
- **Don't** introduce a second accent hue; green and error red stay inside form feedback.
- **Don't** use Plus Jakarta Sans, system fonts or any third family for display.
