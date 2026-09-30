---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["villas.html","villa.html"]
---

## Scope

Redesign proposal for 228villa.com as a static prototype: Accueil (index.html), Trouver une villa (villas.html), Fiche villa (villa.html?ref=…). Mode: Persuade for the home, Operate for the list and the fiche (task first).

## Audience and job

Diaspora/expats booking from abroad, Lomé residents (long term), companies/NGOs, owners who want to list. Action: filter, open a villa, request a visit (in person or video) or message the agent on WhatsApp; owners submit their property. Proof: real photos, real prices in F CFA per month, real room counts, furnished/utilities, named agent. No testimonials, ratings or counts exist: none invented.

## Direction contract

THESIS: The category standard for a rental site, played straight at Airbnb / Plum Guide craft with SeLoger / Rightmove clarity: photos first, facts as plain comparable numbers, one obvious way to book a visit or reach the agent. It refuses the incumbent template (floating stock render, tiny grey type, badge confetti, empty bands) and any novelty identity.

OWN-WORLD: White ground, ink #14181F, one green #0B7A44 reserved for actions and live state, neutral greys for secondary text, soft neutral band #F4F5F3. Figtree only, 400 to 800, tabular numerals on prices. Photos at 14px radius, pill controls, 1px hairlines #E3E5E2, soft offset shadows only on floating things (search panel, sticky booking card, popovers, compare tray). Authored line icons, 1.75 stroke.

STORY: In seconds the visitor knows 228 Villa rents villas around Lomé, sees real houses with monthly price, filters by quartier, chambres, budget and durée, opens one, and requests a visit or writes to Aurore on WhatsApp. Owners find "Proposer mon bien" from the header and a dedicated band.

FIRST VIEWPORT: Header: logo left, nav, WhatsApp pill right. Left 5/12: headline "Votre villa à Lomé, en quelques clics." at clamp(2.6rem, 5vw, 4.4rem), one subline, then the search panel (Quartier, Chambres, Budget/mois, Durée) whose green button reads the live count "Voir 5 villas": the primary action. Right 7/12: a collage of three real listing photos (Agodeke exterior large, Kohé and Agoè smaller), each with a price chip linking to its fiche. At 1440x900 the first listing row peeks below.

SIGNATURE: the live result count on the search button (updates per filter, zero state offers the recovery), and on the fiche the visit composer (day chips, real 10:00 to 17:00 slots, En personne / Appel vidéo, live summary sentence, WhatsApp message prefilled with the villa reference). Motion grammar: ease-out cubic-bezier(0.23,1,0.32,1); press scale 0.97 at 160ms; popovers 180ms from trigger; count swaps with a 2px blur crossfade; one authored load moment, the hero collage revealing by clip-path inset with 60ms stagger; reduced motion keeps opacity only.

FORM: canon (the category standard, user-chosen standing exit), references Airbnb / Plum Guide + SeLoger / Rightmove; seed key 3727ca44.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- Exact coordinates exist only for Villa-0001 (Agodeke) and Villa-0003 (Kohé); the others show quartier only, never a fake pin.
- Villa-0004 Sagbado has a single photo; the gallery must handle one image gracefully.
- Forms are demo-only (no backend); success states say so.
