---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: []
---

# Surface: mannequin/index.html

Scope: the whole one-page site of a fashion and photographic model based in Dakar. Visitor mode: Experience (the work leads from the first viewport), with a booking action always one tap away.

Audience and job: agencies, brands, photographers, casting directors and show organisers judge her look, measurements and experience in seconds, then send a booking request.

Proof and content: no real content yet. Name, measurements, agency, career entries, clients and contacts are provisional `.tbc` marks counted in the review bar; every photo is an Unsplash stock photo tagged "Photo provisoire" and credited in the footer.

Quality bar (user, 2026-10-26): model pages of the big agencies (IMG Models, Elite, Women Management), fashion magazines (Vogue, i-D), fashion photographers' portfolios.

## Direction contract

THESIS: The page is her comp card, the booker's own working object: one card seen on a studio seamless, front then back, then its printed system carried down the page. It refuses the category default of a full-bleed hero under an overlaid nav, a masonry grid and an "À propos" paragraph.

OWN-WORLD: White matte card stock with print crop marks, on a black studio seamless (user, 2026-10-26: "le bleu là non, va sur du blanc ou du noir"; black chosen so the white card reads as the object). Black type in one family, Sofia Sans: the name in Extra Condensed capitals at poster scale, everything else in sentence case. Photos in plain rectangular windows with thin white gutters, hairline rules, no shadows, no gradients, no rounded corners.

STORY: A booker sees her face, name, measurements, base city and agency at once, turns the card to see four selects and full stats, browses the book by category and her polaroids, reads a dated career path, then sends a precise booking request or prints the card.

FIRST VIEWPORT: Slim header (name, four links, "Demander un booking"). Black seamless. A landscape card about 88% of the remaining height with crop marks at its corners: left 46% a full-height portrait; right the name on two lines at about a fifth of the card height, descriptor, measurement row, agency, the primary action "Demander un booking" and "Voir le verso". Mobile: the same card in portrait format.

FORM: Comp card (carte composite), rank 1 on my grounded list, chosen as IMPECCABLE'S PICK; seed key 8eb7c332. Signature interaction: the card turns over as the visitor scrolls (sticky 3D flip), also driven by "Voir le verso" / "Revoir le recto" buttons and by keyboard focus; print gives the card as a two-page PDF.

MOTION (user, 2026-10-26: "je veux plus d'animation, utilise les librairies d'animation comme gsap"): GSAP 3.13 with ScrollTrigger, SplitText and Flip, plus Lenis smooth scrolling, all from jsDelivr. One grammar, the print developing: crop marks draw out, photos reveal bottom-up with a slow scale settle, display letters rise from their line, the card flip is scrubbed with back photos developing after 90 degrees. Plus a velocity-driven ticker of services, polaroids dropped onto the seamless, a parcours line that draws year by year, book filtering with Flip, a square "Voir" cursor tag on the book, header hiding on scroll down. Second layer (user, same day: "ajoute encore plus d'animation"): an opening screen (the name rises, a 0-100 count follows the card images loading, then a black curtain lifts; once per session), the card tilting toward the pointer with the portrait in counter-parallax, measurements counting up, a difference-blend square cursor that becomes "Voir" on the book and "Lancer" on polaroids, nav letters rolling on hover, magnetic primary buttons, paragraphs rising line by line, book prints with inner parallax and velocity skew, the year's photo following the pointer in the parcours, draggable polaroids with inertia (Draggable + InertiaPlugin), a reading-progress line, a reverse "Demander un booking" band, a giant footer name whose letters rise, and a back-to-top link. Pointer effects only on fine pointers. Reduced motion: none of it, stacked card faces.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Open decisions

- Real name, measurements, agency, contacts and career facts from the client.
- Real photographs to replace the stock set.
- Booking form delivery (email, WhatsApp) once contacts exist.
