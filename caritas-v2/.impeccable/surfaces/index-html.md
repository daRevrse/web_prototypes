---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["qui-sommes-nous.html","ressources.html"]
---

## Scope

Second redesign proposal (v2) for caritas-africa.org as a static prototype at `/caritas-v2/`: Accueil (index.html, Persuade), Qui sommes-nous (qui-sommes-nous.html, Read), Ressources (ressources.html, Operate: find and download a document). v1 at `/caritas/` stays untouched for comparison.

## Audience and job

Partners and funders (credibility, reports, governance), the 46 national Caritas (resources, network), individual donors (give now), candidates and providers (jobs, tenders). "Signaler un abus" is one click away everywhere. Proof: real photographs from Caritas Africa's own reports, real statutes, mission, vision, values, governance, publications with PDFs, statements and tenders with dates. No invented impact figures, no "162 personnel".

## Direction contract

THESIS: The NGO category standard at the register of large international NGOs (Secours Catholique, CRS, UNICEF, MSF): the photograph owns the first screen, the voice is a campaign voice set heavy and condensed, giving stays one click away from every screen (header, hero, red support band), and accountability (reports, governance, safeguarding) stays one click away. It refuses v1's ruled-ledger restraint and the broken WordPress template.

OWN-WORLD: Full-bleed documentary photographs from Caritas Africa's reports, always credited. Caritas red #7C0800 as a committed field (mission band, support band, primary actions), carbon #161412 for type and the dark frame, white ground, one warm grey band #F2F0ED. Archivo variable for everything: condensed (wdth 62–70) 800 uppercase for display and section heads, normal width for text. Square geometry, photos never rounded, solid block buttons with an arrow. Photo-led features of unequal size, captions under photos; no icon cards, no eyebrow labels.

STORY: In one screen the visitor sees people of the network, reads "Cheminer ensemble pour une Afrique, Terre d'espérance", learns that Caritas Africa is the Church's social ministry across 46 national Caritas, and can give at once. Then: what we do (four photo-led actions), the APPROCHE programme, the network by zone, mission and vision, newsroom and tenders, reports, safeguarding, partners.

FIRST VIEWPORT: Dark utility bar (Signaler un abus, Emplois et appels d'offres, Contact, flag switch FR/EN/PT). White 80px header: logo, five links with a "Qui sommes-nous" dropdown, red "Faire un don". Hero: full-bleed carousel of three real photos filling the rest of the first viewport (clamp 540–780px), bottom-left scrim; the slide's headline in Archivo condensed 800 uppercase up to 5.2rem, one lead line, red "Faire un don" and white outline secondary. No visible slide controls and no docked donation module (both removed at the user's request on 2026-10-10).

SIGNATURE: the hero carousel (autoplay every 7s, 900ms crossfade with a slow 1.06 to 1 settle, pause on hover, focus and hidden tab, swipe on touch, reduced motion = no autoplay) and the zone explorer (tabs with a sliding red rule). Motion grammar: ease-out cubic-bezier(0.23,1,0.32,1), presses 0.97 at 160ms, hover only on fine pointers.

FORM: canon (the category standard, user-chosen standing exit for the third time), references Secours Catholique – Caritas France, Catholic Relief Services, UNICEF, MSF; seed key 8036390c.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- WhatsApp number: the link uses the secretariat landline (+228 22 21 29 37); Caritas Africa must confirm a WhatsApp number.
- The live donation page is broken (redirects to an empty receipt); every "Faire un don" leads to the red support band, whose button links to it.
- The carousel has no visible controls (user's choice), so it cannot be paused by keyboard users except by focusing inside it (WCAG 2.2.2 trade-off accepted for the mock-up).
- Member country list per zone is not published: the network section shows zones, coordinating Caritas and coordinators only.
- EN/PT versions do not exist in the prototype: the language switch says so.
