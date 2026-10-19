---
version: 1
slug: "caritas-v5-index-html"
primary_target: "caritas-v5/index.html"
related_targets: []
---

## Scope

New version of the v2 proposal for caritas-africa.org at `/caritas-v5/`, modelled much more closely on caritas.org (user request, 2026-10-19). Home page first (index.html, Persuade); the seven inner pages (Qui sommes-nous, Notre action, Notre réseau, Ressources, Actualités, Emplois, Contact) follow once the user validates the direction. Until then, links to those pages open a notice with a link to the v2 page instead of a 404.

## Audience and job

Partners and funders (credibility, reports, governance), the 46 national Caritas (resources, network), individual donors (give now), candidates and providers (jobs, tenders). "Signaler un abus" stays one click away. Proof: Caritas Africa's own photographs (credited), mission, vision, publications with PDFs, dated statements and tenders. No invented figures; no caritas.org text or photo.

## Direction contract

THESIS: Caritas Africa shown as a region of the confederation, in the confederation's own interface language (caritas.org): rounded inset panels, book-serif headings, colour-coded sections, red pill actions. It refuses v2's condensed uppercase poster and square carbon frame.

OWN-WORLD: White ground; panels inset 24px with 24px radius, each section its own field: Caritas red #B10017, sand #EBE3D7, teal #007A6C, sky #60B4CD with navy #2E2C54 text, navy. Literata (TypeTogether, Athelas' foundry) for headings, sentence case, red or white; Hanken Grotesk for text and uppercase pill buttons. White cards (18px), photos 14px, captions under photos.

STORY: The visitor sees people of the network, reads one serif line on hope for Africa, learns Caritas Africa coordinates 46 national Caritas, and can give. Then: our action, who we are, latest news and tenders, an appeal, reports in the spotlight, the network by zone, safeguarding, partners, red footer.

FIRST VIEWPORT: Black utility bar (Membre de Caritas Internationalis; Signaler un abus, Emplois, Contact, flags FR/EN/PT). White header: logo, five uppercase rubriques opening colour-coded mega menus, red pill "Faire un don". Hero: inset rounded carousel of three real photos, centred white Literata headline, one lead line, red pill CTA, edge arrows; the red "Notre action" panel's top edge visible at the fold.

SIGNATURE: The hero stays pinned while the red "Notre action" panel slides over it and the hero recedes (scale and dim, scroll-driven). Motion grammar: ease-out cubic-bezier(0.23,1,0.32,1); mega menus 200ms; carousel 900ms crossfade; presses scale 0.97; hover only on fine pointers; reduced motion removes pinning, scaling and autoplay.

FORM: canon, user-pinned to caritas.org (brief-pinned direction, no roll); quality bar caritas.org; no seed key.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- WhatsApp number: the link uses the secretariat landline (+228 22 21 29 37) until Caritas Africa confirms one.
- The live donation page is broken; every "Faire un don" leads to the appeal block, whose button links to it.
- Red: caritas.org's #B10017 for fields and actions; the logo keeps its own darker red.
