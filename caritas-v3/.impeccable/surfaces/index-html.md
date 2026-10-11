---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["qui-sommes-nous.html","reseau.html","actions.html","ressources.html","actualites.html","emplois.html","contact.html"]
---

## Scope

Third redesign proposal for caritas-africa.org at `/caritas-v3/`, rebuilt on 2026-10-11 at the user's request: "refaire la v3 en reprenant le design v1 et en appliquant un style dynamique de la v3 actuelle". The previous v3 (night immersive story) moved unchanged to `/caritas-v4/`. Eight pages, the same as v1: Accueil (Persuade, scroll story), Qui sommes-nous, Notre réseau, Nos actions (Read, quieter motion), Ressources, Actualités, Emplois et appels d'offres (Operate), Contact (Operate).

## Audience and job

Partners and funders, the 46 national Caritas, individual donors, candidates and providers. "Signaler un abus" one click away everywhere. Proof: the same verified content as v1 (statutes, mission, vision, values, governance, publications with PDFs, statements and tenders with dates from the live site's API). No invented impact figures. Keeps the WhatsApp button and flag language switch from v1.

## Direction contract

THESIS: The v1 proposal (the institutional NGO standard played straight, at the craft of the Caritas family and MSF / ICRC), told as a scroll story with the devices of the immersive proposal now at v4: the home page's v1 sections become chapters, each with one device driven directly by scroll position; the inner pages keep v1's documentary layout with quieter scroll devices. It refuses a new visual world: everything a visitor sees at rest is v1.

OWN-WORLD: v1's world, inherited unchanged: white ground, ink #17181A, Caritas red #7C0800 from the logo for brand, primary actions and rules, stone band #F3F2EF, ink night #17181A for the footer and the APPROCHE chapter. Libre Franklin for everything structural (700 to 800 headings, tight tracking); Source Serif 4 only for scripture and institutional quotes. 2px radius on controls, unrounded photos, thin rules and 3px red or ink top rules as the section device, authored line icons. Added: a 2px red reading-progress rule under the white header, a thin red meter under pinned chapters, a chapter rail on the home page.

STORY: The visitor opens on v1's first screen (tagline, lead, donate and network buttons, the children at the water pump), then the photograph opens to fill the screen and says that 46 national Caritas have walked together since 1995. They read who Caritas Africa is, its mission then vision, its actions as a horizontal track of photographs, the APPROCHE programme's figures, the network counting to 46 then lighting its six zones, and finish on v1's reports, news, giving band and safeguarding.

FIRST VIEWPORT: v1's utility bar and white header unchanged; v1's hero split unchanged at rest (title in Franklin 800, lead, red "Faire un don", outlined "Découvrir notre réseau"; the Paul Jeffrey / Caritas Internationalis photograph covering the right 42.5% edge to edge (v1's 1.15fr / 0.85fr split), composed as in v1). A "Faites défiler" cue bottom left, whose short line loops (the one autoplaying detail). The facts strip follows the opening chapter.

SIGNATURE: one device per home chapter, all scroll-mapped, no autoplay: the hero photo window widens to full screen while the copy lifts away and a sentence appears (opening); the lead sentence inks word by word (who we are); pinned stone stage where mission then vision reveal phrase by phrase while a second photograph wipes in (mission); pinned horizontal track of five action photographs with a meter (actions); sticky photograph with stepped counters on the ink night (APPROCHE); pinned giant numeral counting to 46 then the six zones lighting in turn with the current coordinator (network). Inner pages: title words rise on load, the page photograph widens from the content column to full bleed, timelines and the organisation ladder light step by step, values take the red as they cross the centre, counters on figures. Motion grammar: movement through transforms, opacity and clip-path; state through colour (ink fill, focus band, current zone) and the zone detail's row reveal; UI ease-out cubic-bezier(0.23,1,0.32,1), presses 0.97 at 160ms. Amended 2026-10-11 after the finish review to match the build. Reduced motion: nothing pinned, every state final, v1's static layout.

FORM: canon (user-pinned: v1's design plus v4's dynamics; no new direction rolled), references the v1 and v4 proposals themselves; seed key n/a (pinned).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- WhatsApp number: the link uses the secretariat landline; Caritas Africa must confirm a WhatsApp number.
- The live donation page is broken; "Faire un don" leads to the giving band, whose button links to it.
- Member country list per zone is not published: the network chapter shows zones, coordinating Caritas and coordinators only.
- EN/PT versions do not exist in the prototype: the language switch says so.
- The user's uncommitted hero carousel experiment in v1 (three slides, one Unsplash stock image) is not carried into v3: the opening chapter replaces the carousel, and stock imagery is not verified Caritas content.
